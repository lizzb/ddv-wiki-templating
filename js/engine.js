/*!
 * engine.js
 * DDV wiki templating engine (DDV-9)
 *
 * Turns parsed sheet rows into wiki text. No DOM, no jQuery: everything the page used to read
 * from its checkboxes and from globals.js is passed in through `settings`.
 *
 *   DDVEngine.render(rows, templateType, settings) -> string
 *
 *   rows          array of row objects, one per sheet row (the page builds them from the pasted
 *                 TSV with CSVParser, see app.js)
 *   templateType  spDuties, spRewards, questItems, meals, ingredients, gems, flowers,
 *                 companions, clothingFurniture
 *   settings      an object; every name, type, required or default is in SETTINGS below.
 *                 render() refuses an unknown name, a missing required value and a value of the
 *                 wrong type, with a message that names it (DDV-28).
 *
 *   DDVEngine.settings()         -> copy of SETTINGS (for pages and tests)
 *   DDVEngine.defaultSettings()  -> the defaults of the optional settings
 *
 * render() keeps nothing between calls: it works on copies of the rows it is given (the caller's
 * rows are not changed) and resets every engine variable before and after each call.
 *
 * The code below is helpers.js followed by script.js as they were before the split (originals in
 * archive/), wrapped in one function so nothing leaks onto the page. It was not re-indented
 * after the split; DDV-31 re-indented the functions whose indentation did not match their
 * nesting (CR31) and nothing else.
 */
var DDVEngine = (function () {

// ===== settings (DDV-28: one description, checked on every render) =====
//   type      'string', 'boolean' or 'labels' (an object of sheet version -> wiki label, all text)
//   required  the caller must pass it: per-update text with no safe default
//   nonEmpty  a required text that may not be blank either
//   default   used when an optional setting is not passed
// The page shows the per-update values as fields it remembers (index.html, js/globals.js).

var SETTINGS = {
  // per-update text, required
  updateNumber: { type: 'string', required: true, nonEmpty: true,
    about: 'game update of the new items, for {{history}} when a row has no version (e.g. 1.25)' },
  newExpansionCollection: { type: 'string', required: true, nonEmpty: true,
    about: 'village of the newest expansion, for the meal, gem, flower and ingredient collections (e.g. Honeyglow Woods)' },
  starPathNameShort: { type: 'string', required: true, about: 'current star path, short name (may be blank)' },
  starPathName: { type: 'string', required: true, about: 'current star path, full name (may be blank)' },
  starPathToken: { type: 'string', required: true, about: 'current star path token icon, e.g. pumpkintoken (may be blank)' },

  // per-update text, optional
  mealNavbox: { type: 'string', default: '',
    about: 'value in {{NavboxMeal|...}}; blank = newExpansionCollection in lower case without spaces' },
  bundleStartDate: { type: 'string', default: '2026-MM-DD', about: 'first day of the shop week, in premium bundle articles' },
  bundleEndDate: { type: 'string', default: '2026-MM-DD', about: 'last day of the shop week, in premium bundle articles' },
  companionCollection: { type: 'string', default: 'Dreamlight Valley',
    about: 'collection named in the companion article sentence ("... Companions Collection")' },
  wikiVersionLabels: { type: 'labels', default: {},
    about: 'extra sheet version -> {{history}} label pairs; they win over the built-in WIKI_VERSION_RULES' },

  // confirmation boxes: false = the value is still to check, so it is wrapped in <!-- -->
  priceConfirmed: { type: 'boolean', default: false, about: 'price confirmed' },
  categoriesColorsTraitsConfirmed: { type: 'boolean', default: false, about: 'categories, colors and traits confirmed' },
  tagsConfirmed: { type: 'boolean', default: false, about: 'tags confirmed' },
  collectionConfirmed: { type: 'boolean', default: false, about: 'collection confirmed (else wrapped in a cleanup tag)' },
  functionsConfirmed: { type: 'boolean', default: false, about: 'furniture functions confirmed (else filler text)' },
  placementConfirmed: { type: 'boolean', default: false,
    about: 'size, placement, surface area and environment confirmed (part of categoriesColorsTraitsConfirmed before DDV-28)' },

  // other
  showItemDebug: { type: 'boolean', default: false, about: 'print the detected item source to the console' },
  renderPSbundles: { type: 'boolean', default: true, about: 'add the premium shop bundle blocks' },
  customTemplate: { type: 'string', default: '', about: 'template used instead of the built-in one (%%column%% placeholders)' }
};

// Sheet version -> the label the wiki's {{history}} template uses (CR28: was four switch blocks in
// updateAppropriateVersion). Checked in order; a later match wins, as in the switches it replaces.
// A version only matches as text, as the switches did. New pairs for an update can be passed in
// the wikiVersionLabels setting instead of editing this table.
var WIKI_VERSION_RULES = [
  { labels: { '1.14.3': '1.14', '1.20.11': '1.20', '1.24.1': 'Adventure Pack 1' /* "temporary hard force" */, '1.24.11': '1.24' } },
  { when: function (item) { return item.collection == 'EI' || item.collection == 'Eternity Isle'; },
    labels: { '1.8': 'Expansion 1-1', '1.10': 'Expansion 1-2', '1.12': 'Expansion 1-3' } },
  // Merida/Flynn/Hades friendship or quest items released in 1.14.1 count as Expansion 2-1 even in DV
  { when: function (item) { return item.source && (item.source.includes('Merida') || item.source.includes('Flynn') || item.source.includes('Hades')); },
    labels: { '1.14.1': 'Expansion 2-1' } },
  { when: function (item) { return item.collection == 'SV' || item.collection == 'Storybook Vale'; },
    labels: { '1.14.1': 'Expansion 2-1', '1.17.11': 'Expansion 2-2' } },
  { when: function (item) { return item.collection && (item.collection.includes('WR') || item.collection.includes('WM') || item.collection == 'Wishblossom Mountains'); },
    labels: { '1.20': 'Expansion 3', '1.20.1': 'Expansion 3', '1.20.2': 'Expansion 3' } },
  // 1.24 is temporary, the sheet should not have that value
  { when: function (item) { return item.collection == 'HW' || item.collection == 'Honeyglow Woods'; },
    labels: { '1.24': 'Adventure Pack 1', '1.24.1': 'Adventure Pack 1' } }
];

// Sheet village code -> village name (CR25: was two switch blocks). WR is the old code for WM.
var VILLAGE_NAMES = { DV: 'Dreamlight Valley', EI: 'Eternity Isle', SV: 'Storybook Vale', WM: 'Wishblossom Mountains', HW: 'Honeyglow Woods' };

var updateNumber, newExpansionCollection, starPathNameShort, starPathName, starPathToken;
var mealNavbox, bundleStartDate, bundleEndDate, companionCollection, wikiVersionLabels;
var collectionConfirmed, priceConfirmed, categoriesColorsTraitsConfirmed, tagsConfirmed, functionsConfirmed, placementConfirmed;
var showItemDebug, renderPSbundles, customTemplate;

// Variables some functions below assign without declaring them (they used to become page
// globals). Declared here so they stay inside the engine; reset before and after every render().
var template, output, placeholderCommentBodyDetailsQuest, itemUseIntro_clothing, bundleArray, tempTemplate;


// ===== helpers.js =====
// (DDV-9) getInlineDataTemplate() and getElementId() read the DOM and were not called; they stay
// in archive/helpers.js.

// Render a template composed of variables defined inline -- TODO - renderflowers looks like the same ??
function renderVariableTemplate(dataArray, template) {
  var renderedHTML = '';
  var separator = ''; // Chars to visually separate template renderings
  //separator = "\n\n\n-----------------------------\n\n\n";
  dataArray.forEach(function (item) {
    renderedHTML += microTemplate(template, item);
    renderedHTML += separator;
  });
  return renderedHTML;
}

function microTemplate(templateStr, objData) {
  /* ===== DEFINE DELIMITERS HERE ===== */
  for (var prop in objData)
    templateStr = templateStr.replace(
      new RegExp('%%' + prop + '%%', 'g'),
      objData[prop]
      );
  return templateStr;
}

// TODO: do NOT return true if universe is One Hundred.... because that uses an "a" not an "an"
function isVowel(x) {
  return x == 'A' || x == 'E' || x == 'I' || x == 'O' || x == 'U';
}

function createUniverseLink(itemType, universe) {
  var output = ' is a';

  // don't have full coverage for this conditional
  //if (itemType == "") { itemType = "XXXXX_TYPE_XXXXX";}

  if (!universe || universe == '') {
    universe = 'XXXXX_UNIVERSE_XXXXX';
    output +='<!--[[' + itemType + '#' + universe + '|' + universe + ']]--><!--[[' +itemType + '#Other|non-themed]]-->';

    //output +=`<!--[[${itemType}#${universe}|${universe}]]--><!--[[${itemType}#Other|non-themed]]-->`;
  } else if(universe == 'Character Dream Style') {
    // this feels hacky, needs better flow
    output = " is a [[Dream Styles|Character Dream Style]]";
  } else if (universe == 'Other' || universe == 'General') {
    output += ' [[' + itemType + '#Other|non-themed]]';
  }
  // catch none universe
  else if (
    universe == 'none' ||
    universe == 'none?' ||
    universe.includes('none')
  ) {
    output += 'n unthemed';
  } else {
    if (universe!= "One Hundred and One Dalmatians" && isVowel(universe.substr(0, 1))) {
      output += 'n';
    }
    output += ' [[' + itemType + '#' + universe + '|' + universe + ']] themed';
  }

  return output;
}

function stripHTMLComments(html) {
  //return html.replace(/<!--([\s\S])*?-->/g, '$1');
  //return html.replace(/<[^>]+>/g, '');
  // TODO - fix this regex to maintain the $1 value in the middle
  html = html.replace(/<!--/g, '');
  html = html.replace(/-->/g, '');
  return html;
}

function wrapComment(input, doWrap) {
  if (doWrap) return '<!--' + input + '-->';
  else return input;
}



function determineCharacterFromDreamStyle(itemName) {
  var charName = 'TODO_CHARACTERNAME';
  var characters = [
    'Aladdin',
    'Jafar',
    'Jasmine',
    'Alice',
    'Cheshire Cat',
    'Belle',
    'Gaston',
    'Beast',
    'The Beast',
    'Merida',
    'Cinderella',
    'Godmother',
    'Forgotten',
    'Mirabel',
    'Anna',
    'Elsa',
    'Kristoff',
    'Olaf',
    'Hades',
    'Joy',
    'Sadness',
    'Stitch',
    'Daisy',
    'Donald',
    'Goof',
    'Goofy',
    'Mickey',
    'Minnie',
    'Scrooge',
    'Maui',
    'Moana',
    'Mike',
    'Mike Wazowski',
    'Sulley',
    'Mulan',
    'Mushu',
    'Oswald',
    'Peter Pan',
    'Tinker Bell',
    'Remy',
    'Aurora',
    'Maleficent',
    'Flynn',
    'Gothel',
    'Rapunzel',
    'Nala',
    'Pumbaa',
    'Scar',
    'Simba',
    'Timon',
    'Ariel',
    'Eric',
    'Ursula',
    'Vanessa',
    'Tiana',
    'Merlin',
    'Jack',
    'Skellington',
    'Sally',
    'Buzz',
    'Lightyear',
    'Woody',
    'Eeyore',
    'Piglet',
    'Tigger',
    'Winnie the Pooh',
    'EVE',
    'WALL-E',
    'Ralph',
    'Vanellope',
  ];

  for (let i = 0; i < characters.length; i++) {
    if (itemName.includes(characters[i])) {
      //character determined, but may be a shortened form of name
      charName = characters[i];
    }
  }

  switch (charName) {
  case 'Scrooge':
    charName = 'Scrooge McDuck';
    break;
  case 'Godmother':
    charName = 'The Fairy Godmother';
    break;
  case 'Beast':
    charName = 'The Beast';
    break;
  case 'Minnie':
    charName = 'Minnie Mouse';
    break;
  case 'Mickey':
    charName = 'Mickey Mouse';
    break;
  case 'Forgotten':
    charName = 'The Forgotten';
    break;
  case 'Donald':
    charName = 'Donald Duck';
    break;
  case 'Goof': // TODO - if "goof" is included, thats sufficient for assuming it is goofy (e.g. "goofini")
    charName = 'Goofy';
    break;
  case 'Mike':
    charName = 'Mike Wazowski';
    break;
  case 'Gothel':
    charName = 'Mother Gothel';
    break;
  case 'Eric':
    charName = 'Prince Eric';
    break;
  case 'Jack':
    charName = 'Jack Skellington';
    break;
  case 'Buzz':
    charName = 'Buzz Lightyear';
    break;
  default: {
      break;
    }
  }
  return charName;
}

// charName is a proper name from determineCharacterFromDreamStyle
function getCharacterUniverse(charName) {
  var universe = 'TODO_UNIVERSE';

  switch (charName) {
  case 'Aladdin':
  case 'Jafar':
  case 'Jasmine':
    universe = 'Aladdin';
    break;
  case 'Alice':
  case 'Cheshire Cat':
    universe = 'Alice in Wonderland';
    break;
  case 'Belle':
  case 'Gaston':
  case 'The Beast':
    universe = 'Beauty and the Beast';
    break;
  case 'Merida':
    universe = 'Brave';
    break;
  case 'Cinderella':
  case 'The Fairy Godmother':
    universe = 'Cinderella';
    break;
  case 'The Forgotten':
    universe = 'TODO_UNIVERSE';
    break;
  case 'Mirabel':
    universe = 'Encanto';
    break;
  case 'Anna':
  case 'Elsa':
  case 'Kristoff':
  case 'Olaf':
    universe = 'Frozen';
    break;
  case 'Hades':
    universe = 'Hercules';
    break;
  case 'Joy':
  case 'Sadness':
    universe = 'Inside Out';
    break;
  case 'Stitch':
    universe = 'Lilo & Stich';
    break;
  case 'Daisy':
  case 'Donald Duck':
  case 'Goofy':
  case 'Mickey Mouse':
  case 'Minnie Mouse':
  case 'Scrooge McDuck':
    universe = 'Mickey & Friends';
    break;
  case 'Maui':
  case 'Moana':
    universe = 'Moana';
    break;
  case 'Mike Wazowski':
  case 'Sulley':
    universe = 'Monsters, Inc.';
    break;
  case 'Mulan':
  case 'Mushu':
    universe = 'Mulan';
    break;
  case 'Oswald':
    universe = 'Oswald the Lucky Rabbit';
    break;
  case 'Peter Pan':
  case 'Tinker Bell':
    universe = 'Peter Pan';
    break;
  case 'Remy':
    universe = 'Ratatouille';
    break;
  case 'Aurora':
  case 'Maleficent':
    universe = 'Beauty';
    break;
  case 'Flynn':
  case 'Mother Gothel':
  case 'Rapunzel':
    universe = 'Tangled';
    break;
  case 'Nala':
  case 'Pumbaa':
  case 'Scar':
  case 'Simba':
  case 'Timon':
    universe = 'The Lion King';
    break;
  case 'Ariel':
  case 'Prince Eric':
  case 'Ursula':
  case 'Vanessa':
    universe = 'The Little Mermaid';
    break;
  case 'Tiana':
    universe = 'Princess and the Frog';
    break;
  case 'Merlin':
    universe = 'Sword in the Stone';
    break;
  case 'Jack Skellington':
  case 'Sally':
    universe = "Tim Burton's The Nightmare Before Christmas";
    break;
  case 'Buzz Lightyear':
  case 'Woody':
    universe = 'Toy Story';
    break;
  case 'EVE':
  case 'WALL-E':
    universe = 'WALL-E';
    break;
  case 'Eeyore':
  case 'Piglet':
  case 'Tigger':
  case 'Winnie the Pooh':
    universe = 'Winnie the Pooh';
    break;
  case 'Ralph':
  case 'Vanellope':
    universe = 'Wreck-It Ralph';
    break;
  }
  return universe;
}

const starpathsObject = {
  "Pixar Fest": { "tokenName": 'pixartoken', "sheetLocationVal": 'starpath - pixar', tagName: '' },
  "Villains'": {"tokenName": 'villaintoken', "sheetLocationVal": 'starpath - villains', tagName: '' },
  "Festive": { "tokenName": 'festivetoken', "sheetLocationVal": 'starpath - festive', tagName: '' },
  "Centennial": { "tokenName": 'centennialtoken', "sheetLocationVal": 'starpath - centennial', tagName: '' },
  "Disney Parks": { "tokenName": 'parkstoken', "sheetLocationVal": 'starpath - parks', tagName: '' },
  "Wonder of Pixar": { "tokenName": 'wonderpixartoken', "sheetLocationVal": 'starpath - wonder', tagName: '' },
  "Haunted Holiday": { "tokenName": 'hauntedtoken', "sheetLocationVal": 'starpath - haunted', tagName: '' },
  "Royal Winter": { "tokenName": 'royalwintertoken', "sheetLocationVal": 'starpath - royal', tagName: '' },
  "Lovely Monsters": { "tokenName": 'monstertoken', "sheetLocationVal": 'starpath - monsters', tagName: '' },
  "A Day at Disney": { "tokenName": 'dayatdisneytoken', "sheetLocationVal": 'starpath - adad', tagName: '' },
  "Majesty and Magnolias": { "tokenName": 'magnoliatoken', "sheetLocationVal": 'starpath - majesty', tagName: '' },
  "Dapper Delights": { "tokenName": 'lilypadtoken', "sheetLocationVal": 'starpath - dapper', tagName: '' },
  "The Night Show": { "tokenName": 'rockstartoken', "sheetLocationVal": 'starpath - nightshow', tagName: '' },
  "Frost & Fairies": { "tokenName": 'icecrystaltoken', "sheetLocationVal": 'starpath - frost', tagName: '' },
  "Oasis Retreat": { "tokenName": 'tranquiltoken', "sheetLocationVal": 'starpath - oasis', tagName: '' },
  "Garden of Whimsy": { "tokenName": 'pocketwatchtoken', "sheetLocationVal": 'starpath - whimsy', tagName: '' },
  "Adventures in Never Land": { "tokenName": 'compasstoken', "sheetLocationVal": 'starpath - neverland', tagName: 'Adventures in Never Land' },
  "Retro Roadtrip": { "tokenName": 'maltshoptoken', "sheetLocationVal": 'starpath - roadtrip', tagName: 'Retro Roadtrip' },
  "Witchful Thinking": { "tokenName": 'brewtoken', "sheetLocationVal": 'starpath - witchful', tagName: 'Witchful Thinking 2025' },
  "Winter Warmth": { "tokenName": 'waffletoken', "sheetLocationVal": 'starpath - warmth', tagName: 'Winter Warmth 2025' },
  "Paw-fect Romance": { "tokenName": 'pawprinttoken', "sheetLocationVal": 'starpath - pawfect', tagName: 'Paw-fect Romance' },
  "Elements of Nature": { "tokenName": 'earthtoken', "sheetLocationVal": 'starpath - nature', tagName: 'Elements of Nature' },
  "Godly Glamor": { "tokenName": 'lightningtoken', "sheetLocationVal": 'starpath - godly', tagName: 'Godly Glamor' },
  "Pop City": { "tokenName": 'neontoken', "sheetLocationVal": 'starpath - popcity', tagName: 'Pop City' },
  "Haunting Elegance": { "tokenName": 'pumpkintoken', "sheetLocationVal": 'starpath - haunting', tagName: 'Haunting Elegance' },
};

function commentOutStarPathTags(item){
  //TODO
  // if item contains a tag that is the value of a star path tag,
  // don't show it on the wiki, comment it out
  // (previous alternative was commenting out within the spreadsheet itself)
  // Rec Room, Study, Rustic, Elegant<!--, Witchful Thinking 2025-->
  // <!--Winter Warmth 2025, -->Outdoors, Traditional, Cute
  // Elegant, <!--The Night Show, -->Quirky, Rec Room, Living Room, Study
  // Casual, Cute, Outdoors, Pop City
  // ensure that tags are not double-wrapped in case the sheet values are already wrapped in html comments
  let output = '';
  return output;
}

// The current star path's token comes from the settings, so a new season needs no edit here
// (CR28); starpathsObject keeps the past seasons.
function lookupToken(starpathName) {
  var output = 'ORIGINALTOKENNAME'; // "starpath - ......"
  if (starpathName && starPathToken && (starpathName == starPathName || starpathName == starPathNameShort)) {
    output = starPathToken;
  } else if (starpathsObject[starpathName]) {
    output = starpathsObject[starpathName].tokenName;
  }
  return output;
}

function insertNumberWord(num) {
  var output = '';
  switch (num) {
  case "1":
  case 1:
    return 'one';
  case "2":
  case 2:
    return 'two';
  case "3":
  case 3:
    return 'three';
  case "4":
  case 4:
    return 'four';
  case "5":
  case 5:
    return 'five';
  case "6":
  case 6:
    return 'six';
  default: {
      break;
    }
  }
  //if (num >= 1 && num <=5 ) output += "-star ";
  return '';
}




// COPIED PARTIALLY FROM WIKI_SHEET.JS/premiumShopLineupGenerator - BE WARY OF DUPLICATE CONTENT
function determinePremiumBundleType(bundleItemArray) {
  //const itemsById = _getWikiItemMap();
  let output = '';

  let itemTypeCounter = {};
  for (let i = 0; i < bundleItemArray.length; i++) {
    //let item = itemsById[bundleItemArray[i].id];
    let item = bundleItemArray[i];
    //let itemType = item ? item.itemType : '';

    // account for the fact that character dream styles are stored on the clothing sheet, and this value will populate once it gets into the sheet because i populate first column with sheet it came from
    if (item.itemType == "Clothing" || item.itemType == "Dream Style") {
      if (item.collection == "Character Dream Style" || item.categories.includes("Character") ) item.itemType = 'Character Style';
      if (item.collection == "Accessory" && item.categories.includes("Accessor") ) item.itemType = 'Accessory';
      if (item.collection == "Glider" && item.categories.includes("Glider") ) item.itemType = 'Glider';

      /*
      // values i use in my sheet
      if ( item.collection == 'Dream Castle' || item.universe == 'none (Dream Castle)' || item.category == 'Dream Castle Skin')
      if ( item.collection == 'Goofy's Stall' || item.universe == 'none (Stall)' || item.category == 'Goofy's Stall')
      if ( item.collection == 'Visit Station' || item.universe == 'none (Visit Station)' || item.category == 'Visit Station' )
      if ( item.collection == 'Wishing Well' || item.universe == 'none (Well)' || item.category == 'Wishing Well' )
      if ( item.collection == 'Building' && item.universe == 'none (Chez Remy)' || item.category == 'Chez Remy' )
      if ( item.collection == 'Building' && item.universe == 'none (Scrooge's Store)' || item.category == 'Scrooge's Store' )
      if ( item.collection == 'Building' && item.universe == 'none (Plaza)' || item.category == 'Plaza Square' )
      if ( item.collection == 'Building' && item.universe == 'none (Boutique)' || item.category == 'Boutique' )
      if ( item.collection == 'xxxxx' && item.universe == 'xxxxx' || item.category == 'xxxxx' )
      if ( item.collection == 'Character Dream Style' || item.collection == 'Dream Style' || item.category == 'Character' || item.universe == 'Character Dream Style')
      if ( item.collection == 'Dream Style' || item.category == 'Character' )
      if ( item.collection == 'Dream Style' && item.category.includes('Tool') ) // 'Tool Dream Style', 'Tools', 'Tool'
      if ( item.collection == 'Glider' && item.category.includes('Glider'))
      if ( item.collection == 'xxxxx' && item.universe == 'xxxxx' || item.category == 'xxxxx' )

      */

    }

    // Update tally
    itemTypeCounter[item.itemType] = (itemTypeCounter[item.itemType] ?? 0) + 1;

  }

  // Extract all unique keys (itemTypes) as an array
  const allKeys = Object.keys(itemTypeCounter);

  // Find highest frequency keys (ties handled)
  const max = Math.max(...Object.values(itemTypeCounter));
  const highestKeys = allKeys.filter(key => itemTypeCounter[key] === max);
  // TODO - this needs more work, both in the logic and in the sheet inputs/standardization


  // from the sheet tsv export for character dream style: itemType="Dream Style", collection="Character Dream Style", category.includes("Character")
  // TODO - not exporting
  // "categories": ["Character"]

  // TODO - this needs so much cleanup - fri aug 7


  if (highestKeys.includes("Building")) output = 'Building / House';
  //else if (highestKeys.includes("Character Dream Style")) output = 'Character Dream Style';
  else if (highestKeys.includes("Character Style")) output = 'Character Style';
  else if (highestKeys.includes("Skin")) output = 'Character Dream Style / Stall / Wishing Well / Castle Dream Style'; // Dream Castle Skin, Goofy's Stall Skin, Wishing Well Skin, Valley Visit Station Style
  else if (highestKeys.includes("Glider")) output = 'Glider';
  else if (highestKeys.includes("AvatarFeature")) output = 'Glider';
  else if (highestKeys.includes("Tool")) output = 'Tool Style / Accessory';
  else if (highestKeys.includes("Accessory")) output = 'Accessory';
  else if (highestKeys.includes("Clothing") && highestKeys.includes("Furniture")) output = 'Clothing/Furniture';
  else if (highestKeys.includes("Clothing")) output = 'Clothing';
  else if (highestKeys.includes("Furniture")) output = 'Furniture';
  else if (highestKeys.includes("MountGear")) output = 'Mount Customization';
  else output = 'bundleTypeTBD';

  /*
  { "id": "170100016", "name": "Un Poco Loco", "qty": "1", "price": "NA", "itemType": "Goofy's Stall Skin", "universe": "none (Stall)", "collection_icon": "premium", "categories": ["Goofy's Stall"] },
      { "id": "170200036", "name": "Un Poco Loco Wishing Well", "qty": "1", "price": "NA", "itemType": "Wishing Well Skin", "universe": "none (Well)", "collection_icon": "premium", "categories": ["Wishing Well"] },
  
  */


  // output values of bundleType are read in section_map in wiki_updater.py of project ddv-wiki-weeklyupdates
  /*
section_map = {
        "Clothing": "===Clothing===",
        "Furniture": "===Furniture===",
        "Character Style": "===Character Dream Styles===",
        
        "Building": "===Building Styles===",
        "Tool Style": "===Tool Dream Styles===",
        "Mega Bundle": "==Mega Bundles==",

  
        "Stall": "===Stall Styles===",
        "Stall/Well": "===Stall Styles===",
        "Well": "===Well Styles===",
        "Well/Furniture": "===Well Styles===",
        "House": "===House Dream Styles===",
        "House/Furniture": "===House Dream Styles===",
        "Companion/Clothing": "===Companions===",
        "Companion/Furniture": "===Companions===",
        "Companion": "===Companions===",
    }
*/

  // above is logic for assuming all item categories hold equal weight, but that is not true
  // if ANY House is contained, House should be inthe output (even if there are more furniture items)
  if (allKeys.includes("House")) {
    if (allKeys.includes("Furniture")) output = 'House/Furniture';
    else output = 'House';
  }

  if (allKeys.includes("Dream Castle Skin") || allKeys.includes("Building Skin")) {
    output = 'Building';
  }

  if (allKeys.includes("Companion")) {
    if (allKeys.includes("Furniture")) output = 'Companion/Furniture';
    else if (allKeys.includes("Clothing")) output = 'Clothing/Companion';
    else output = 'Companion';
  }

  if (allKeys.includes("Wishing Well Skin")) {
    if (allKeys.includes("Furniture")) output = 'Well/Furniture';
    else output = 'Well';
  }

  if (allKeys.includes("Goofy's Stall Skin")) {
    if (allKeys.includes("Well")) output = 'Stall/Well';
    else output = 'Stall';
  }
  //TODO - Mount Customization, Poses

  if (output == 'bundleTypeTBD' && showItemDebug){
    console.log(`bundle has bundleTypeTBD, allKeys: ${allKeys}`)
  }

  return output;
}



  function useStandaloneNaming(bundleObj) {
    return bundleObj.itemArray.some(
      item => item.name === bundleObj.friendlyName
      );
  }

  function parseUniqueBundles(dataArray) {
    // TODO - add to relatedItems in alpha sort order
    var resultArray = [];

    dataArray.forEach(function (item) {
      let itemID = item.ID || item.id || item.itemID;

      // TODO: parse source value to determine itemQty and msCost per item
      let bundleQty = item.bundleQty || "TBD";
      let msCost = item.msCost || "NA"
      let houseSize = item.W ? `${item.W}x${item.L}` : item.size; //'WWxLL'

      // bundleQty, msCost 

      const searchItem = item.bundleName;
      //item = parseItemSource(item); // Item source already parsed for infobox, shouldnt be necessary here ... but think logic flow is wonky
      const foundObject = resultArray.find( (obj) => obj.bundleName === searchItem );
      if (foundObject) {
        //if (!foundObject.psBundleItems) foundObject.psBundleItems = [];
        foundObject.psBundleItems.push(item.name);

        let itemObj = { "id": itemID, "name": item.name, "qty": bundleQty, "msCost": msCost, "itemType": item.itemType, "universe": item.universe, "collection_icon": "premium", "categories": item.category ? item.category.split(','): '' };
        itemObj.size = houseSize; // TODO: is only relevant if item is a house
        foundObject.itemArray.push(itemObj);

      } else {
        // **** TODO - single-item bundles seem to have duplicate values??? or perhaps just using the wrong template - also not including one of the items in multi-item bundles??
        item.psBundleItems = [];
        item.psBundleItems.push(item.name);

        // limited is currently the propertyname being used for icon
        //let collection_icon = (item.limited == 'b') ? 'premium' : 'notpremium';
        let itemObj = { "id": itemID, "name": item.name, "qty": bundleQty, "msCost": msCost, "itemType": item.itemType, "universe": item.universe, "collection_icon": "premium", "categories": item.category ? item.category.split(','): '' };
        itemObj.size = houseSize; // TODO: is only relevant if item is a house
        item.itemArray = [];
        item.itemArray.push(itemObj);
        //resultArray.push(item);

        // default/initialize the bundle version to whatever the version of the first item itemType was,
        // which is NOT robust for returning items - if you set to item.version
        // TODO FIX VERSION - for now, default to the global variable "updateNumber" - the current/latest update
        let bundleObj = {
          bundleName: item.bundleName,
          bundlePrice: item.bundlePrice,
          psBundleItems: item.psBundleItems,
          //bundleType: item.itemType,
          //version: updateNumber, //item.version,
          version: item.version, // versionAdded should use version of first item added for historical bundles - but this will break with returning star path bundles! in that case should use column val becameBundle

          protoDbName: "unknown",
          friendlyName: item.bundleName,
          itemArray: item.itemArray
      };

      resultArray.push( bundleObj );
    }
  });


    resultArray.forEach(function (bundleObj) {
    // Also catch the use case where an included item in the bundle exactly matches the title of the bundle (e.g. Percy, Regal Prowess Ensemble)
      bundleObj.standaloneBundleNaming = (bundleObj.itemArray.length == 1 || useStandaloneNaming(bundleObj));


      bundleObj.bundleType = determinePremiumBundleType(bundleObj.itemArray);
    });


  /*// do NOT alpha sort - use the given order of the items from data (which will be whatever order the rows were in when copy/pasted)
  resultArray.forEach(function (bundleObj) {
    bundleObj.psBundleItems.sort(); // alpha sort each bundle's items
  });
  */

  // resultArray is array of bundleobjects with bundleName, bundlePrice, psBundleItems, bundleType, version
    return resultArray;
  }

// (DDV-31) notes on the Wednesday bundle flow moved to the hub, notes/DDV-31-engine-notes.md





// output the properties needed to populate the python ddv-wiki-weeklyupdates script
// outputAsNamedPropertyObject = false to make it an array and use for ddv-wiki-weeklyupdates,
// outputAsNamedPropertyObject = true to generate for premiumShopObj.js

  function outputPSBundleJSON(bundleArray, outputAsNamedPropertyObject=true) {

  //let output = JSON.stringify(resultArray);
  //output = output.replaceAll("bundleName", "\nbundleName")

    let output = '';
    bundleArray.forEach(function (bundleObj) {

      output += `\n`;
      // TODO - i might separately need to output this as property names for premiumShopObj.js in psLineupGenerator?
      // unclear what my flow is
      // outputAsNamedPropertyObject = false to make it an array and use for ddv-wiki-weeklyupdates, true to generate for premiumShopObj.js
      //outputAsNamedPropertyObject = false;
      if (outputAsNamedPropertyObject) {
        output += `"${bundleObj.friendlyName}": `;
      }
      output += `{`;
      output += `\n\t"protoDbName": "${bundleObj.protoDbName}",`;
      output += `\n\t"friendlyName": "${bundleObj.friendlyName}",`;
      output += `\n\t"bundlePrice": "${bundleObj.bundlePrice}",`;
      output += `\n\t"versionAdded": "${bundleObj.version}",`; // don't think this is needed for weeklyupdates? - but its good to have
      output += `\n\t"bundleType": "${bundleObj.bundleType}",`;
      output += `\n\t"standaloneBundleNaming": ${bundleObj.standaloneBundleNaming},`;
    // why didn't i originally include these properties..? does weeklyupdates generate them itself?
    // no, i think it doesnt need it, weeklyUpdates only inserts new bundle titles/item titles into correct places, not generating bundle articles or historical table
    /*
    //output += `"\n\tpriceString": "{{price|${bundleObj.bundlePrice}|moonstone}}",`;
    //output += `\n\t"contentsString": "",`;
    */

    // but the bundles DO need to be in premium shop display order, and they need to be array objects, not named properties
    // in theory by the time it gets here, the itemorder inside each bundle should already be defined? (by manually changing on premiumShopObj... ... no wait, we dont have access to that here...)
    // i need to manually sort the order of the rows of the items themselves in a mirror test sheet? i think?
    // so i sitll need to change the order in just ONE spot, not sure where atm...

    output += `\n\t"itemArray": [`;

    for (var i=0; i<bundleObj.itemArray.length; i++) {
      let item = bundleObj.itemArray[i]; 
      let itemQty = item.qty || "TBD";
      let itemMSPrice = item.msCost = "NA";

      output += `\n\t    { "id": "${item.id}",`;
      output += ` "name": "${item.name}",`;
      // TODO - parse SOURCE to see if qty or price is defined
      output += ` "qty": "${itemQty}", "price": "${itemMSPrice}",`;
      output += ` "itemType": "${item.itemType}",`;
      output += ` "universe": "${item.universe}", "collection_icon": "${item.collection_icon}", "categories": ${JSON.stringify(item.categories)} `;
      if (item.itemType == 'House') {
        output += `, "size": "${item.size}",`;
      }
      output += `},`;
    }
    
    output += `\n\t]\n},`;
  })

    let header1 = `PREMIUM SHOP BUNDLES as named properties FOR psShopLineupGenerator/premiumShopObj: (outputAsNamedPropertyObject=${outputAsNamedPropertyObject} = should be true)\n\n`;
    let header2 = `PREMIUM SHOP BUNDLES as array FOR ddv-wiki-weeklyupdates/new_premium_bundles: (outputAsNamedPropertyObject=${outputAsNamedPropertyObject} = should be false)\n\n`;
    let header = outputAsNamedPropertyObject ? header1 : header2;

    output = header + output;

    return output;
  }


// dupe content from premiumShopLineupGenerator ============
  function prepBundle(bundleObj) {
    var output = '';
    var priceString = '';
    var contentsString = '';

    let bundleItems = bundleObj.itemArray;

    // determine "bundleType" to group bundle in correct invented grouping area on wiki PS page and PS navbox
    bundleObj.bundleType = determinePremiumBundleType(bundleItems);

    // Generate priceString
    bundleObj.priceString = `{{price|${bundleObj.bundlePrice}|moonstone}}`;

    // Generate contentsString
    for (var i=0; i<bundleItems.length; i++) {
      var itemObj = bundleItems[i];
      contentsString += `{{name|${itemObj.name}`;
      contentsString += (itemObj.qty && itemObj.qty > 1) ? `|${itemObj.qty}` : ``;
      contentsString += `}}`;
    // do not add a <br> after the last bundle item in the historical table
      contentsString += (i < bundleItems.length-1) ? `<br>\n`: ``;
    }

    // Also catch the use case where an included item in the bundle exactly matches the title of the bundle (e.g. Percy, Regal Prowess Ensemble)
    bundleObj.standaloneBundleNaming = (bundleItems.length == 1 || useStandaloneNaming(bundleObj));

    bundleObj.linkedName = (bundleItems.length == 1 || bundleObj.standaloneBundleNaming) ? `${bundleObj.friendlyName} (Bundle)|${bundleObj.friendlyName}` : `${bundleObj.friendlyName}`;

    // compatibility with old format
    //bundleObj.linked_name = `Tournament Gown Merida (Bundle)|Tournament Gown Merida`;
    bundleObj.linked_name = bundleObj.linkedName;

    bundleObj.contentsString = contentsString;

    return bundleObj;
  }


  function outputBundle_psNavbox(bundleObj) {
    let output = `'''[[${bundleObj.friendlyName}]]''' •`;
    if (bundleObj.standaloneBundleNaming) {
      output = `'''[[${bundleObj.friendlyName} (Bundle)|${bundleObj.friendlyName}]]''' •`;
    }
    return output;
  }

  function outputBundle_topTable(bundleObj) {
    let output = `| [[File:${bundleObj.friendlyName}.png|450px|right|link=${bundleObj.friendlyName}]]`;
    if (bundleObj.standaloneBundleNaming) {
      output = `| [[File:${bundleObj.friendlyName} Store.png|450px|right|link=${bundleObj.friendlyName} (Bundle)]]`;
    }
    output += `<!--row X leftright-->`
    return output;
  }

  function outputBundle_psPageListing(bundleObj) {
    let output = `File:${bundleObj.friendlyName}.png|'''[[${bundleObj.friendlyName}]]'''|link=${bundleObj.friendlyName}`;
    if (bundleObj.standaloneBundleNaming) {
      output = `File:${bundleObj.friendlyName} Store.png|'''[[${bundleObj.friendlyName} (Bundle)|${bundleObj.friendlyName}]]'''|link=${bundleObj.friendlyName} (Bundle)`;
    }
    return output;
  }

  function outputBundle_historicalTable(bundleObj) {
    let output = `|-\n| [[${bundleObj.friendlyName}]]`;
    if (bundleObj.standaloneBundleNaming) {
      output = `|-\n| [[${bundleObj.friendlyName} (Bundle)|${bundleObj.friendlyName}]]`;
    }
    output += "\n|";
    output += (bundleObj.itemArray.length>1) ? `\n` : ` `;
    output += bundleObj.contentsString;
    output += "\n| " + bundleObj.priceString;
    return output;
  }
// dupe content from premiumShopLineupGenerator ============



  function outputBundle_bundleArticle(bundleObj) {
    let output = '';

    let startWeekDate = bundleStartDate;
    let endWeekDate = bundleEndDate;
    let bundlePrice = bundleObj.bundlePrice;
    let bundleName = bundleObj.bundleName;
    let bundleType = bundleObj.bundleType;
    let bundleVersion = bundleObj.version;

    let psBundleItemsInline = bundleObj.psBundleItems.join(', ');

  var imageParam = `${bundleName}`; // vs '%%bundleName%% Store'
  var itemsParam1 = '<!--TODO: VERIFY ORDER BEFORE COPY/PASTING BELOW-->'; // vs ''
  var itemsParam2 = "\n<!--|itemgallery={{Gallery|ITEM_COUNTSINGLE|caption='''[[ITEM_COUNTSINGLE]]'''|link=ITEM_COUNTSINGLE}}\n{{Gallery|NITEM_COUNTMANY|caption='''[[NITEM_COUNTMANY]]''' (ITEM_COUNT)|link=NITEM_COUNTMANY}}-->"; // vs '%%psBundleItems%%'

  if (bundleObj.standaloneBundleNaming) {
    imageParam = `${bundleName} Store`;
    itemsParam1 = '';
    itemsParam2 = `${psBundleItemsInline}`; //'%%psBundleItems%%'; // will be single item, usually (unless standalone naming is being used because bundle name = item name contained but >1 item)
  }
  if (bundleType) {
    // TODO: set to "House Dream Style", "Tool Dream Style", "Character Dream Style", "Companion"
    // currently we do not have a property like that available, must be manually set from sheet as first column - jk we should have this already by determinebundletype
  }
  tempTemplate = `{{infobox\n|name=${bundleName}\n|image=${imageParam}.png\n|width=350px\n|type=Premium Bundle\n|category=${bundleType}\n|from=Premium Shop\n|sellprice={{price|${bundlePrice}|moonstone}}`;
  tempTemplate += `\n|items=${psBundleItemsInline}${itemsParam1}\n}}`;
  tempTemplate += `\n{{BundleDescription\n|${bundleName}\n|type=Premium Bundle\n|category=${bundleType}\n|from=Premium Shop\n|bundlePrice=${bundlePrice}`;
  tempTemplate += `\n|items=${itemsParam2}`;
  tempTemplate += `\n|dates=\n* ${startWeekDate} - ${endWeekDate}`;
  tempTemplate += `\n}}`;
  tempTemplate += ` {{cleanup|TODO - verify item order and counts}}`;

  //tempTemplate += `\n\n==History==\n{{history|${bundleVersion}|Added}}\n\n{{NavboxPremiumBundle}}`;
  tempTemplate += output_history(bundleObj);
  tempTemplate += `\n\n{{NavboxPremiumBundle}}`;

  // ===============
  // TODO - detect logic for returning star path premium bundles/items, right now just always adds
  let isReturningItemBundle = false;
  // ================
  if (isReturningItemBundle) {
    tempTemplate += `\n\n[[Category: Returning Star Path Premium Bundles]]`;
  }

  //output = microTemplate(tempTemplate, bundleObj);
  output += tempTemplate + '\n\n----------------------------------------------------------\n\n';

  return output;
}


function renderPSBundles(dataArray) {

  var renderedHTML = '';
  var template = '';

  var psHistoricalTableRow_price = '\n| {{price|%%bundlePrice%%|moonstone}}';

  //renderedHTML += "\n\n============ Premium Bundle CONTENT ============\n\n";
  //template = psBundleTables; // psBundleTables = psBundleNavbox + "\n\n" + psTopTable + "\n\n" + psPageListing + "\n\n" + psHistoricalTableRow + "\n\n" + psBundleArticle;

  //var psHistoricalTableRow_bundleItem = "\n{{name|%%name%%}}<!-- ({{price|XXXXXXX|moonstone}})--><br>";

  var psBundleNavbox = '';
  var psTopTable = '';
  var psPageListing = '';
  var psHistoricalTableRow = '';
  var psBundleArticle = '';

  
  // iterate through all furniture/clothing/companion/whatever items
  // assign item.standalone variable
  // is this looping necessary? YES to define item.standalone per item - but needs to be cleaned up, redundant
  // otherwise think i also get duplicate bundles?
  // in previous versions i assigned the correct templates to the items themselves so that PS bundle printout could be per-item (table, listing, bundle article grouped together) vs per-template (all tables, all listings, all bundle articles grouped together)
  dataArray.forEach(function (item) {
    // assigns item.standalone, among other values
    item = parseItemSource(item);
    //renderedHTML += '\n\n'; THIS WAS THE ISSUE OF EXTRA SPACE
    
    if (item.name == item.bundleName) {
      if (showItemDebug) { console.log(item.bundleName, ' IS A STANDALONE ITEM'); }
      // item is the row object itself (objects are passed by reference), so this sticks for the rest of the render
      item.standalone = true;
    } else {
      item.standalone = false;
      if (showItemDebug) { console.log('psBundleItems: ', item.psBundleItems); }
    }
  });

  // get unique bundles with populated items from input array
  bundleArray = parseUniqueBundles(dataArray);


  

  var tempTemplate = '';

  psBundleNavbox += '\n\n============ Premium Bundle Navbox ============\n\n';
  psTopTable += '\n\n============ Premium Bundle Top Table ============\n\n';
  psPageListing +='\n\n============ Premium Bundle Page Listing ============\n\n';
  psHistoricalTableRow += '\n\n============ Premium Bundle Historical Table ============\n\n';
  psBundleArticle += '\n\n============ Bundle Article ============\n\n';

  bundleArray.forEach(function (item) {
    psBundleNavbox += outputBundle_psNavbox(item)+ '\n\n\n';
    psTopTable += outputBundle_topTable(item) + '\n\n\n';
    psPageListing += outputBundle_psPageListing(item) + '\n\n\n';
    item = prepBundle(item);
    psHistoricalTableRow += outputBundle_historicalTable(item) + '\n\n\n';
    psBundleArticle += outputBundle_bundleArticle(item);
  });


  console.log(outputPSBundleJSON(bundleArray, true));
  console.log(outputPSBundleJSON(bundleArray, false));

  // '\n\n'
  renderedHTML += psBundleNavbox + '' + psTopTable + '' + psPageListing + '' + psHistoricalTableRow + '' + psBundleArticle;

  return renderedHTML;
}




function insertCookingLink(input) {
  var output = '';
  switch (input) {
  case 'Appetizers':
    return '[[Cooking#Appetizers|appetizer meal]]';
  case 'Entrées':
  case 'Entrees':
    return '[[Cooking#Entrées|entrée meal]]';
  case 'Desserts':
    return '[[Cooking#Desserts|dessert meal]]';
  case 'Any Dairy and Oil':
    return '[[:Category:Dairy and Oil|any Dairy and Oil]]';
  case 'Any Sweet':
    return '[[:Category:Sweets|any Sweet]]';
  case 'Any Fruit':
    return '[[:Category:Fruit|any Fruit]]';
  case 'Any Fish':
    return '[[:Category:Fish|any Fish]]';
  case 'Any Spice':
    return '[[:Category:Spices|any Spice]]';
  case 'Any Seafood':
    return '[[:Category:Seafood|any Seafood]]';
  case 'Any Vegetables':
    return '[[:Category:Vegetables|any Vegetable]]';
  case 'Any Grain':
    return '[[:Category:Grains|any Grain]]';
  case 'Any Meat':
    return '[[:Category:Meats|any Meat]]';
  case 'Any Protein':
    return '[[:Category:Protein|any Protein]]';
  case 'xxxxx':
    return 'xxxxx';
  default: {
      return 'meal'; // meal // default use is placeholder meal text for new stub articles
      break;
    }
  }
  return output;
}

function insertIngredientCategoryLink(input) {
  var output = '';
  switch (input) {
  case 'Dairy and Oil':
    return '[[:Category:Dairy and Oil|any Dairy and Oil]]';
  case 'Sweets':
    return '[[:Category:Sweets|Sweet]]';
  case 'Fish':
    return '[[:Category:Fish|Fish]]';
  case 'Fruit':
    return '[[:Category:Fruit|Fruit]]';
  case 'Spices':
    return '[[:Category:Spices|Spice]]';
  case 'Seafood':
    return '[[:Category:Seafood|Seafood]]';
  case 'Vegetables':
    return '[[:Category:Vegetables|Vegetable]]';
  case 'Grains':
    return '[[:Category:Grains|Grain]]';
  case 'Meat':
    return '[[:Category:Meats|Meat]]';
  case 'Protein':
    return '[[:Category:Protein|Protein]]';
  case 'xxxxx':
    return 'xxxxx';
  default: {
      return 'ingredient';// 'meal' // default use is placeholder meal text for new stub articles
      break;
    }
  }
  return output;
}

//const str = "hello world testing";
//const keywords = ["hello", "bye", "test"];



function oxfordJoin(arr) {
  return arr.join(', ').replace(/, ([^,]*)$/, ', and $1');
}
/*
exports.oxford = function(arr, conjunction, ifempty){
    let l = arr.length;
    if (!l) return ifempty;
    if (l<2) return arr[0];
    if (l<3) return arr.join(` ${conjunction} `);
    arr = arr.slice();
    arr[l-1] = `${conjunction} ${arr[l-1]}`;
    return arr.join(", ");
}
*/

// whether the item is a meal that contains versatile ingredients
function isVersatileRecipe(item) {
    // TODO: loop through item ingredients and check for versatile ingredients
  for (var i=0; i<item.ingredientArray.length; i++) {
    if (isVersatileIngredient(item.ingredientArray[i])) {
      return true;
    }
  }

  return false;
}

function isVersatileIngredient(ingName) {
  switch (ingName) {
  case 'Dairy and Oil':
  case 'Fruit':
  case 'Grains':
  case 'Meat':
  case 'Seafood':
  case 'Spices': 
  case 'Sweets': 
  case 'Vegetables':  
    return true;
  default: {
    break;
  }
}

  // this will correctly detect, but breaks the functions??
if (ingName && ingName.includes("Any ")) {
  return true;
} 
return false;
}


function wrapNameTemplate(ing, ingQty) {
  var output = ''; // CR26: was the engine-wide scratch variable
  output += '{{name|'+ing;
  if (ingQty>1) output += '|'+ingQty;
  output += '}}';
  return output;
}



function renderMeals(dataArray) {
  var renderedHTML = '===== Template:ItemRecipe switch:=====\n';
  var delimiter = '';
  dataArray.forEach(function (item) {
    var ingredientArray = [];
    if (item["ing1"] && item["ing1"] != "-") ingredientArray.push(item["ing1"]);
    if (item["ing2"] && item["ing2"] != "-") ingredientArray.push(item["ing2"]);
    if (item["ing3"] && item["ing3"] != "-") ingredientArray.push(item["ing3"]);
    if (item["ing4"] && item["ing4"] != "-") ingredientArray.push(item["ing4"]);
    if (item["ing5"] && item["ing5"] != "-") ingredientArray.push(item["ing5"]);
    if (item["ing6"] && item["ing6"] != "-") ingredientArray.push(item["ing6"]);

    item.ingredientArray = ingredientArray;
    item.ingredientListString = ingredientArray.join(", ");

    item.ingredientListString = item.ingredientListString.replaceAll('Any Fish', 'Fish');
    item.ingredientListString = item.ingredientListString.replaceAll('Any Fruit', 'Fruit');
    item.ingredientListString = item.ingredientListString.replaceAll('Any Seafood', 'Seafood');
    item.ingredientListString = item.ingredientListString.replaceAll('Any Spice', 'Spices');
    item.ingredientListString = item.ingredientListString.replaceAll('Any Sweet', 'Sweets');
    item.ingredientListString = item.ingredientListString.replaceAll('Any Vegetable', 'Vegetables');



    /*item.itemRecipeString = ingredientArray.forEach((ingredient) => {
      let sentence = `{{name|${ingredient}}}`;
    });*/

    // create the ItemRecipe case output
    var tempArray = [];
    for (var i=0; i<ingredientArray.length; i++) {
      if (isVersatileIngredient(tempArray[i])){
        tempArray[i] = 'A VERSATILE INGREDIENT'; // is this happening? dont think so
        if (showItemDebug) { console.log('temparray[i] = ', tempArray[i]); }
      }
      else {
        //tempArray[i] = '{{name|'+ingredientArray[i]+'}}';
        tempArray[i] = wrapNameTemplate(ingredientArray[i]); // not strictly needed here since every quantity is 1
      }
    }
    item.itemRecipeString = tempArray.join("<br>");
    var tempArray = [];
    for (var i=0; i<ingredientArray.length; i++) {
      // for versatile ingredients, add correct category link format
      if (isVersatileIngredient(ingredientArray[i])) {
        if (showItemDebug) { console.log('detect versatile ingredient: ', ingredientArray[i]); }
        tempArray[i] = insertCookingLink(ingredientArray[i]);
      }
      else {
        tempArray[i] = '[['+ingredientArray[i]+']]';
      } 
    }
    item.articleListString = oxfordJoin(tempArray);

    //[[:Category:Vegetables|any Vegetable]]

    // meal switch statement template
    //template = '\n|%%name%%=<!--{{name|ING1NAME}}<br>{{name|ING2NAME}}<br>{{name|ING3NAME}}<br>{{name|ING4NAME}}<br>{{name|ING5NAME}}-->\n';
    //template = '\n|%%name%%=<!--'+item.itemRecipeString+'-->';
    // todo - make conditional with collectionconfirmed
    template = '\n\t|%%name%%='+item.itemRecipeString+'';
    //template += '\n';

    template = template.replaceAll('{{name|Any Fish}}', '{{name|Fish|link=:Category:Fish{{!}}Any Fish}}');
    template = template.replaceAll('{{name|Any Fruit}}', '{{name|Fruit|link=:Category:Fruit{{!}}Any Fruit}}');
    template = template.replaceAll('{{name|Any Grain}}', '{{name|Grains|link=:Category:Grains{{!}}Any Grain}}');
    template = template.replaceAll('{{name|Any Seafood}}', '{{name|Seafood|link=:Category:Seafood{{!}}Any Seafood}}');
    template = template.replaceAll('{{name|Any Spice}}', '{{name|Spices & Herbs|link=:Category:Spices{{!}}Any Spice}}');
    template = template.replaceAll('{{name|Any Sweet}}', '{{name|Sweets|link=:Category:Sweets{{!}}Any Sweet}}');
    template = template.replaceAll('{{name|Any Vegetable}}', '{{name|Vegetables|link=:Category:Vegetables{{!}}Any Vegetable}}');

    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });


  // todo: standardize this better, use different template vars maybe? only implemented 1/3 atm
  var template = '';
  var templateMealArticle = '';





  renderedHTML += '\n\n===== MEAL ARTICLES =====\n\n';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {
    templateMealArticle = '';
    // meal article template
    //templateMealArticle += '\n{{stub}}';
    templateMealArticle += '\n{{infobox\n|image=%%name%%.png';
    templateMealArticle += '\n|description=';
    if (!isVersatileRecipe(item) && item.stars && item.stars == 5) {
      // If recipe is 5 stars and does NOT include versatile ingredients, do plural "Meals" instead of "Meal"
      // prevents "and more" on the energy display when rendered in infobox
      templateMealArticle += '\n|type=Meals'; 
    }
    else {
      templateMealArticle += '\n|type=Meal'; 
    }
    if (!item.category) { item.category = '<!--Appetizers/Entrées/Desserts-->'; }
    templateMealArticle += '\n|category=%%category%%';
    templateMealArticle += '\n|collection='+newExpansionCollection;
    templateMealArticle += '\n|stars=%%stars%%';
    templateMealArticle += '\n|energy=%%energy%%';
    templateMealArticle += '\n|sellprice=%%sellprice%%';
    //templateMealArticle += '\n|giftreward=\n|orderReward=\n|size=\n|placement=';
    templateMealArticle += '\n|giftreward=\n|gridSize=\n|placement=<!--surfaces-->';
    templateMealArticle += '\n|ingredients=';

    //template += wrapComment('{{IngredientList | '+item.ingredientListString+' | addCategories }}', !collectionConfirmed);
    templateMealArticle += '{{IngredientList | '+item.ingredientListString+' | addCategories }}';
    templateMealArticle += '\n}}';
    // todo - make this conditional with collectionconfirmed
    //templateMealArticle += '{{cleanup|Ingredients and ingredient order need verification}}';
    templateMealArticle += "\n'''%%name%%''' is a " + insertNumberWord(item.stars)+"-star " + '' + insertCookingLink(item.category) + ' which can be made at a [[:Category:Cooking Stations|cooking station]].';

    templateMealArticle += '\n\n';

    var itemUseBody = '';

    if (item.ingredientArray.length == 1) {
      itemUseBody =  'It can be [[Cooking|cooked]] by using '+item.articleListString + '. ';
    }
    else {
      itemUseBody = 'It can be [[Cooking|cooked]] by combining '+item.articleListString + '. ';
    }

    templateMealArticle += wrapComment(itemUseBody, !collectionConfirmed);
    templateMealArticle += 'Once collected it will be added to the [[:Category:'+newExpansionCollection+' Meals Collection|'+newExpansionCollection+' Meals Collection]].';

    templateMealArticle += "\n\n[[Cooking#Meals|Meals]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''.";
    templateMealArticle += " After a meal has been removed from inventory it can be positioned using [[Furniture Menu#Placing Furniture|furniture placement mode]].";

    templateMealArticle += output_history(item);
    // e.g. honeyglowwoods, wishblossommountains, storybookvale, eternityisle
    templateMealArticle += '\n\n{{NavboxMeal|' + (mealNavbox || newExpansionCollection.toLowerCase().replace(/[^a-z0-9]/g, '')) + '}}';
    templateMealArticle += '\n\n[[Category:Missing Size]] [[Category:Missing Placement]] [[Category: Missing Description]]';

    renderedHTML += microTemplate(templateMealArticle, item);
    renderedHTML += delimiter;
  });

  renderedHTML += '\n\n===== COOKING ARTICLE =====\n\n';
  //delimiter = '\n\n\n-----------------------------\n\n\n';
  delimiter = '';//no breaks between items, assumes already in correct category/alpha order
  dataArray.forEach(function (item) {
    template = '';
    //template = '\n|-\n| [[File:%%name%%.png|center|50x50px|link=%%name%%]]\n| [[%%name%%]]\n| {{inlineIcon|%%category%%}}\n| {{stars|%%stars%%}}\n| <!--{{energy|%%energy%%}}-->\n| <!--{{price|%%sellprice%%}}-->\n| {{ItemRecipe | %%name%% }}';
    // todo - wrap this in conditional comments
    template = '\n|-\n| [[File:%%name%%.png|center|50x50px|link=%%name%%]]\n| [[%%name%%]]\n| {{inlineIcon|%%category%%}}\n| {{stars|%%stars%%}}\n| {{energy|%%energy%%}}\n| {{price|%%sellprice%%}}\n| {{ItemRecipe | %%name%% }}';

    template += '\n| [['+newExpansionCollection+']]';

    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

  // just in case, add thingy over e
  renderedHTML = renderedHTML.replaceAll('ntree', 'ntrée');

  return renderedHTML;
}

function renderGems(dataArray) {

  // Create stub articles for gem items
  var renderedHTML = '';
  var delimiter = '';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {
    template = generateGemTemplate(item);

    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });
  return renderedHTML;
}

function generateGemTemplate(item) {
  var template = '';
  template = '';
  template += '{{infobox';
  template += '\n|image=%%name%%.png';
  template += '\n|description=';
  template += '\n|type=Gem';
  template += '\n|collection='+newExpansionCollection;
  template += '\n|buyprice=';
  template += '\n|sellprice=';
  template += '\n|giftreward=';
  template += '\n|color=';
  template += '\n|from=mining';
  template += '\n<!--|from=<span id="nametemplate">[[File:Goofy\'s Stall.png|20x20px|link=]] [[Aladdin\'s Gem Stall]] (5)</span><br>-->';
  template += '\n|from={{inlineIcon|Mining|size=20|link=Mining}}';
  //template += '\n|biomes={{name|BIOME1|link=BIOME1{{!}}REGION1NAME}}<br>{{name|BIOME1|link=BIOME1{{!}}REGION2NAME}}';
  template += '\n|biomes=%%biome%%';
  template += '\n|gridSize=';
  template += '\n|placement=<!--surfaces-->';
  template += '\n|stackMax=';
  template += '\n}}';
//  template += "\n'''%%name%%''' is a [[Mining#Gems|gem]] which can be found when [[mining]] rock nodes using the [[Pickaxe]] in [[Everafter]] area of [[Wishblossom Mountains]]. "; 
  template += "\n'''%%name%%''' is a [[Mining#Gems|gem]] which can be found when [[mining]] rock nodes using the [[Pickaxe]] in all regions of [[%%biome%%]]. "; // in the [[%%biome%%]]. // in all regions of [[%%biome%%]].
  template += '';
  template += 'It can be used as a [[Crafting|crafting material]] to make items at a [[:Category:Crafting Stations|crafting station]]. ';
  template += '<!--It also has a chance to be sold at [[Aladdin\'s Gem Stall]] in [['+newExpansionCollection+']]. -->';
  template += 'Once collected it will be added to the [[:Category:'+newExpansionCollection+' Gems Collection|'+newExpansionCollection+' Gems Collection]].';
  template += ' ';
  var defaultItemPlacementText = "can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. After removing from inventory they can be positioned using [[Furniture menu#Placing Furniture|furniture placement mode]].";
  template += "\n\n[[Mining#Gems|Gems]] " + defaultItemPlacementText;
  template += ' ';
  template += '\n<!--\nIn nodes where this gem can be found there is a chance to find [[Shiny %%name%%]], which is a less common and more valuable variant. In nodes where this gem can be found there is a chance to find [[NONSHINY]], which is a more common and less valuable variant.-->';

  //crafting recipes, quest objectives, quest recipes

  template += output_history(item);
  template += '\n\n{{NavboxGem}}';
  template +='\n\n[[Category:Missing Size]] [[Category:Missing Placement]] [[Category: Missing Description]] [[Category:Missing Colors]]';
  return template;
}



function generateFlowerTemplate(item) {
  var template = '';
  template += '{{Infobox';
  template += '\n|image=%%name%%.png';
  template += '\n|description=';
  template += '\n|type=Foraging';
  template += '\n|category=Flowers';
  template += '\n|collection='+newExpansionCollection;
  template += '\n|sellprice=';
  template += '\n|giftreward=';
  template += '\n|color=';
  template += '\n|from={{name|Foraging}}';
  template += '\n|biomes=<!--{{name|BIOME1|link=BIOME1{{!}}REGION1}}<br>{{name|BIOME1|link=BIOME1{{!}}REGION2}}-->';
  template += '\n|biomes=%%biome%%';
  template += '\n|spawnTimer={{growthTime|}}';
  template += '\n|spawnMax=';
  template += '\n|gridSize=';
  template += '\n|placement=<!--surfaces, unpaved-->';
  template += '\n|stackMax=';
  template += '\n}}';
    //template+= "\n'''%%name%%''' is a [[Foraging#Flowers|flower]] type that can be [[Foraging|found growing]] wild<!--in '''REGION1''' and '''REGION2''' areas in [[BIOME1]]-->.";
    template+= "\n'''%%name%%''' is a [[Foraging#Flowers|flower]] type that can be [[Foraging|found growing]] wild in all regions of [[%%biome%%]]."; // wild in the [[%%biome%%]].";
    template += '';
    template += "\n\n<!--There are exactly ITEMCOUNT '''{{PAGENAME}}''' found in the [[%%biome%%]], and another-->Another flower of the same type and color will only appear after one has been picked. There is an [[Flowers#Flower Spawning|internal-game timer]] for this flower type which respawns<!-- one every 60 minutes-->, and it can take up to 2 hours to fully repopulate all of these flowers between both areas.";
    // line about beast flower shop? template += 'It also has a chance to be sold at [[Aladdin\'s Gem Stall]] in [['+newExpansionCollection+']]. ';
    template += ' Once collected it will be added to the [[:Category:'+newExpansionCollection+' Foraging Collection|'+newExpansionCollection+' Foraging Collection]].';
    template += ' ';
    template += "\n\n[[Foraging#Flowers|Flowers]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''.";
    template += " For many quests which require picking a flower, dropping it from inventory and picking back up will award credit.";
    template += " After a flower has been removed from inventory, it can be positioned using [[Furniture Menu#Placing Furniture|furniture placement mode]].";
    
    //crafting recipes, quest objectives, quest recipes - easier workflow to add later as needed than to delete from a bunch of pages?
  
    template += output_history(item);
    template += '\n\n{{NavboxForage}}';
    template += '\n\n[[Category:Missing Size]] [[Category:Missing Placement]] [[Category: Missing Description]] [[Category:Missing Colors]]';
    return template;
  }



 // TODO - renderflowers looks like the same as renderVariableTemplate(dataArray, template) {
  function renderFlowers(dataArray) {
    var renderedHTML = '';
    var delimiter = '';
    delimiter = '\n\n\n-----------------------------\n\n\n';
    dataArray.forEach(function (item) {
      var template = generateFlowerTemplate(item);
      renderedHTML += microTemplate(template, item);
      renderedHTML += delimiter;
    });
    return renderedHTML;
  }

  function generateIngredientsTemplate(item) {
    var template = '';
    template += '{{stub}}';
    template += '\n{{infobox';
    template += '\n|image=%%name%%.png';
    template += '\n|description=';
    template += '\n|type=Ingredient';
    if (!item.cookingType) {
      item.cookingType = '<!--Seafood/Fruit/Vegetables/Spices/Dairy and Oil/Grains/Protein-->';
    }
    //item.cookingType = '<!--Fish-->'; // temporary hack
    template += '\n|ingtype=<!--%%cookingType%%-->'; //Vegetables, plural, on wiki - TODO FIX - MAKE SURE SHEET IN ALIGNMENT
    template += '\n|collection='+newExpansionCollection;
    if (!item.collectionType) {
      item.collectionType = '<!--Fish/Seafood/Vegetables - remove if same as ingType-->'; // e.g. Crab, Squid... tODO OTHER EXAMPLES TO REFERENCE
    }
    template += '\n|collectioncategory=%%collectionType%%';
    template += '\n|energy=%%energy%%';
    template += '\n|buyprice=';
    template += '\n|sellprice=%%sellprice%%';
    template += '\n|giftreward=';
    template += '\n<!--';
    if (item.cookingType == "Fish") {
      template += '\n|from=fishing';
      template += '\n|biomes=%%biome%%';
      template += '\n|pool=None/Gold/{{pool|White}}, can be {{pool|Blue}}';
    }
    else {
      if (item.obtainMethod == "Stall") {
        template += '\n|from={{name|Goofy\'s Stall|link=Goofy\'s Stall#BIOME1{{!}}Goofy\'s Stall}}<br>';
      } 
      else if (item.obtainMethod == "Foraging - Tree/Bush") {
        template += '\n|from={{name|Foraging}}<br>{{--}}{{inlineIcon|Trees|iconOnly|size=20|link=%%name%% Tree}} [[%%name%% Tree]]';
        template += '\n|from={{name|Foraging}}<br>{{--}}{{inlineIcon|Underbrush|iconOnly|size=20|link=%%name%% Bush}} [[%%name%% Bush]]';
      }
      else if (item.obtainMethod == "Gardening") {
        template += '\n|from={{name|Gardening}}';
        template += '\n|biomes=%%biome%%';
        template += '\n|seed=%%name%% Seed';
        template += '\n|growtime={{growthTime|XXXXX}}<br>{{growthTime|XXXXX|biome=BIOME1|biome2=BIOME2NAME}}';
      }
      else {
        //template += '\n|biomes={{name|BIOME1|link=BIOME1{{!}}REGION1NAME}}<br>{{name|BIOME1|link=BIOME1{{!}}REGION2NAME}}';
        //template += '\n|biomes=BIOME1, BIOME2';
        template += '\n|biomes=%%biome%%';
      }
    }
    template += '\n-->';
    template += '\n|gridSize=';
    template += '\n|placement=';
    template += '\n|stackMax=';
    template += '\n}}';

    if (item.cookingType == "Fish") {
      template += "\n'''%%name%%''' is a type of [[Fishing#Fish Types|fish]]<!--[[:Category:Fish|fish]]--> which can be found by [[fishing]]<!--all/COLOR/open water or white pools--> in all regions of [[%%biome%%]]."; // in all regions of [[BIOME]] //  in the [[%%biome%%]].";
    }
    else {
      template += "\n'''%%name%%''' is a "+insertIngredientCategoryLink(item.cookingType)+" type [[Ingredients|ingredient]] used in [[cooking]].";
      template += "<!--";
      //template += "It can be [[Gardening|grown]] from [[%%name%% Seed]]s, which are purchased from [[Goofy's Stall]] in [[BIOME1]] and the [[BIOME2]].";
      //template += " It can be found growing on [[%%name%% Tree]]s in '''REGION1''' and '''REGION2''' areas of the [[BIOME1]].";
      template += "It can be [[Gardening|grown]] from [[%%name%% Seed]]s, which are purchased from [[Goofy's Stall]] in the [[%%biome%%]].";
      template += " It can be found growing on [[%%name%% Tree]]s in the [[%%biome%%]].";
      
      template += " It can be found [[foraging|growing wild]] on the ground in the [[%%biome%%]]";
      template += '\n';
      template += "\nEach harvest gives YIELDCOUNT '''%%name%%''', and the fruit takes XXXXX hours/minutes to regrow. Trees/Bushes will continue to produce fruit even if moved outside their origin biome.";
      template += '\n';
      template += "\nThe [[%%name%% Seed|seeds]] are unlocked for sale after the first upgrade of [[Goofy\'s Stall]] in [[BIOME1]], and after the initial repair of [[Goofy\'s Stall]] in the [[BIOME2]].";
      template += " The [[%%biome%%]] stall also has a chance to sell '''%%name%%''' directly.";
      template += " After planting it takes XXXXX minutes to grow, and WATERINGCOUNT total waterings until YIELDCOUNT can be harvested.";
      template += '\n-->';
    }
    template += '\n\n<!--It can be consumed to regain [[energy]], or used as an [[Ingredients|ingredient]] in [[Cooking#Meal Recipes|cooked meals]]. -->';
    if (item.cookingType == "Fish") {
      template += 'Once collected it will be added to the [[:Category:'+newExpansionCollection+' Fish Collection|'+newExpansionCollection+' Fish Collection]].';
    }
    else {
      template += 'Once collected it will be added to the [[:Category:'+newExpansionCollection+' Ingredients Collection|'+newExpansionCollection+' Ingredients Collection]].';
    }
    template += '\n ';
    var defaultItemPlacementText = "can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. After removing from inventory they can be positioned using [[Furniture menu#Placing Furniture|furniture placement mode]].";
    template += "\n[[Ingredients]] " + defaultItemPlacementText;
    template += '\n<!--';
    template += '\n==Ingredient Specific Recipes==';
    template += "\n'''{{PAGENAME}}''' is specifically required in the following [[Meals#Recipes|recipes]], and other [[ingredients]] of the same type can't be substituted.";
    template += "\n{| class='wikitable sortable' id='recipe-table'";
    template += '\n! class=unsortable | Image';
    template += '\n!Name';
    template += '\n!Stars';
    template += '\n!Energy';
    template += '\n!Sell Price';
    template += '\n!Ingredients';
    template += '\n|-';
    template += '\n| [[File:RECIPENAME.png|center|50x50px|link=RECIPENAME]]';
    template += '\n| [[RECIPENAME]]';
    template += '\n| {{stars|XXXXX}}';
    template += '\n| {{energy|XXXXX}}';
    template += '\n| {{price|XXXXX}}';
    template += '\n| {{ItemRecipe | RECIPENAME }}';
    template += '\n|}';
    //template += '\n';

    //crafting recipes, quest objectives, quest recipes
  
    template += '\n-->';

    template += output_history(item);
    template += '\n\n{{NavboxIngredient}}';
    template += '\n\n[[Category:Missing Size]] [[Category:Missing Placement]] [[Category: Missing Description]]';

    return template;
  }

  function renderIngredients(dataArray) {

  // Create stub articles for quest items
    var renderedHTML = '';
    var delimiter = '';
    delimiter = '\n\n\n-----------------------------\n\n\n';
    
    dataArray.forEach(function (item) {
      var template = '';

      if (isFlower(item)) {
        template = generateFlowerTemplate(item);
      }
      else if (isGem(item)) {
        template = generateGemTemplate(item);
      }

      else {
        template = generateIngredientsTemplate(item);
      }

      renderedHTML += microTemplate(template, item);
      renderedHTML += delimiter;
    });
    return renderedHTML;
  }


  function isCompanion(item) {

  // return false; // TEMPORARY FOR UPDATE DAY
  //return "TODO - determineCritterType";

    var isCompanion =
    //(item.collection && item.collection.includes('Companion')) ||
    //(item.name && item.name.includes('Castle')) ||
    //(item.universe && item.universe.includes('Companion') ||
    (item.category && item.category.includes('Companion'));

    return isCompanion;
  }

function generateCompanionTemplate(item) {

  template = '';

  {

    //template += "{{stub}}";
    template += '{{infobox\n';
    template += output_image(item); // template += '\n|image=%%name%%.png';
    template += output_type(item); // "\n|type=Companions"; // PLURAL Companions
    template += "|category=<!--Animal/Notable Companions"; //output_category(item); // Animal Companions / Notable Companions
    template += "-->\n";
    template += '|critterType=<!--Capybara-->\n';
    template += output_collection(item);  // Dreamlight Valley
    template += output_universe(item);
    template += '|hangout=<!--Flowers-->';
    template += '\n'+output_from(item);

    template += '}}'; // END OF INFOBOX
    //template += `{{infobox\n${output_image(item)}|width=225px\n|type=Character Dream Style\n|appliedto=%%appliedto%%\n|universe=%%universe%%\n${output_from(item)}}}\n`;

    let infoboxHangout = `[[Foraging]] / [[Foraging#Flowers{{!}}Flowers]]`;
    let inlineLink1 = `[[Foraging#Flowers|Flowers]] / [[Foraging]]`;
    let inlineLink2 = `[[Foraging]]`;
    let level4Icon = `Companion Gather Flowers Icon`;
    let level4HangoutType = `[[Foraging|Flower Gathering Bonus]]`;
    let level4LinkLabel = `[[Foraging|Resource Collection]]`;
    let level2LinkLabel = `[[Ingredients|Ingredient]] / [[Foraging#Flowers|Flower]]`;
    let level2RewardItem = `REWARDITEM`;
    let level2RewardQty = `COUNT`;

    template += '\n{{ItemDescription';
    template += '\n|%%name%%';
    template += '\n|type=Companion'; // SINGULAR Companion, not plural
    template += '\n|critterType=<!--Goose/Bee/Skunk/Sunbird/Capybara-->\n';
    template += output_from(item);
    //template += '\n|from=Premium Shop';
    //template += '\n|bundleName=XXX_COMPANIONNAME_XXX (Bundle){{!}}XXX_COMPANIONNAME_XXX';
    //template += '\n|bundlePrice=XXX_BUNDLEPRICE_XXX';
    template += '|critterCollection=%%collection%%';
    template += `\n|hangout=<!--${infoboxHangout}-->`;
    template += '\n}}';

    // is a limited time premium [[Companions#Event Companions|event companion]]
    // is a premium [[Companions#Premium Companions|companion]].
    var introLink = "premium [[Companions#Event Companions|event companion]]";
    var introSecondary = ""; // TODO?: " which was available during the [[Pixar Fest Star Path]]";

    template += '\n'+"'''%%name%%''' is a " + introLink + introSecondary + ".";
    template += '\n\n' + generateBodyFromPremiumShop(item);

    // TODO - why is the star path body text not generating??

    /*
    It was originally available to unlock and collect during the [[Pixar Fest Star Path]] event
    using {{price|40|pixartoken|showLabel}} from the Tier 1 Premium Rewards.
    It later returned to the [[Premium Shop]] in the [[IncrediSquirrel (Bundle)|IncrediSquirrel]] bundle
    for {{price|2000|moonstone|showLabel}}.
    */

    var companionCollectionText = ' Once collected it will be added to the [[:Category: %%collection%% %%itemType%% Collection|%%collection%% %%itemType%% Collection]].';
    companionCollectionText = ' Once collected it will be added to the [[:Category:' + companionCollection + ' Companions Collection|' + companionCollection + ' Companions Collection]].';
    template += companionCollectionText;

    template += `\n\nIt can be equipped using the [[Wardrobe menu]] inside the [[Inventory]], under the '''Companions''' category.`;
    template += ` Once equipped, it will follow the Player as they move between Biomes and wander nearby.`;
    template += ` It can collect`;
    template += `<!-- ${inlineLink1}-->`;
    template += ` resources near to the player, and after reaching [[friendship]] level 4 it can has a chance to produce bonus `;
    template += `<!-- ${inlineLink2}-->`
    template+= ` resources when gathering.`;
    template += ` Companions can also be photographed in unique poses using [[Phone#Photo Mode|Photo Mode]], or housed in a [[:Category:Companion Home|Companion Home]].`;

    template += '\n{{cleanup|Uncomment when confirmed --';
    template += `\n==Friendship Rewards==`;
    template += `\n'''{{PAGENAME}}''' will award the following rewards when [[Friendship]] levels are reached. Friendship can be leveled up through activities while the companion is equipped.`;
    template += `\n{| class=wikitable id='recipe-table'`;
    template += `\n!Lvl`;
    template += `\n!Image`;
    template += `\n!Name`;
    template += `\n!Type`;
    template += `\n|-`;
    template += `\n|[[File:Friendship_2.png|32px|center|link=Friendship]] || <!--[[File:${level2RewardItem}.png| 50x50px| center]]--> || <!--[[${level2RewardItem}]] (${level2RewardQty})--> || <!--${level2LinkLabel}-->`;
    template += `\n|-`;
    template += `\n|[[File:Friendship_3.png|32px|center|link=Friendship]] || [[File:Companion Inventory Bonus Icon.png| 50x50px| center]] || [[Inventory|Inventory Increase]] (+4) || [[Inventory]]`;
    template += `\n|-`;
    template += `\n|[[File:Friendship_4.png|32px|center|link=Friendship]] || <!--[[File:${level4Icon}.png| 50x50px| center]]--> || <!--${level4HangoutType}--> || ${level4LinkLabel}`;
    template += `\n|-`;
    template += `\n|[[File:Friendship_5.png|32px|center|link=Friendship]] || [[File:Companion Decor Reward.png| 50x50px| center]] || [[Companion Decor Reward]] || [[Furniture]]`;
    template += `\n|}`;
    template += `\n}}`;

    template += output_history(item) + output_navbox(item);

    //template += '\n\n[[Category:Missing xxxxx]]';
  }

  return template;
}



function generateCompanionTemplateOriginal(item) {

  var isCritter = true;

  template = '';
  template += "{{stub}}";
  template += "\n{{Infobox";
  template += "\n|image=%%name%%.png";
  template += "\n|type=Companions";
  template += "\n|category=Animal Companions"

  if (isCritter) { template += ", Critter"; }

  template += "\n|collection="+newExpansionCollection;
  template += "\n|hangout=<!--Flowers/Ore/Fruit-->";
    template += "\n|critterType=%%type%%"; //<!--Goose/Bee/Skunk/Sunbird/Capybara/Squirrel-->;

    if (isCritter) { 
      template += "\n|found={{name|%%biome%%}}"; //<br>(%%region%%)";
      template += "\n|favfood=<!--{{name|FAV1}}<br>{{name|FAV2}}-->";
      template += "\n|likedfoods=<!--{{inlineIcon|Gems|link=Mining#Gems}}{{inlineIcon|Grains|link=:Category:Grains}}-->";
      /*
      template += "\n|likedfoods=<!--{{inlineIcon|Gems|link=Mining#Gems}}{{inlineIcon|Grains|link=:Category:Grains}}<br>";
      template += "\n{{inlineIcon|Spices & Herbs|link=:Category:Spices}}*<br>";
      template += "\n{{inlineIcon|Vegetables|link=:Category:Vegetables}}*<br><--Refers to the Grains, Spices & Herbs, and Vegetables Ingredient Categories as defined in the '''Collection Menu''', not while Cooking - e.g. no Seaweed, includes Vanilla.--*''(Collection Menu Categorization)''<br>";
      template += "\n{{inlineIcon|Fruit}} grown from [[Crop Seeds|seeds]]-->";
      */
      template += "\n|minfeedings=<!--%%numFeedings%%-->";
    }
    
    template += "\n}}";

    template += "\n{{ItemDescription";
    template += "\n|%%name%%";
    template += "\n|type=Companion";
    template += "\n|critterType=%%type%%"; //<!--Goose/Bee/Skunk/Sunbird/Capybara-->;
    
   //remmoved stuff


    template += output_history(item);
    template += "\n\n{{NavboxCompanion}}";
    

    return template;
  }



  function renderCompanions(dataArray) {
  // Create stub articles for critter items
    var renderedHTML = '';
    var delimiter = '';
    delimiter = '\n\n\n-----------------------------\n\n\n';
    dataArray.forEach(function (item) {

      template = generateCompanionTemplateOriginal(item);

      renderedHTML += microTemplate(template, item);
      renderedHTML += delimiter;
    });
    return renderedHTML;
  }



  function renderQuestItems(dataArray) {
  // Create stub articles for quest items
    var renderedHTML = '';
    var delimiter = '';
    delimiter = '\n\n\n-----------------------------\n\n\n';
  // It is crafted during the Honeyglow Woods [[Winnie the Pooh]] story quest [[Chapter 11: The Anti-monster Camp]],
    dataArray.forEach(function (item) {
      let name = item.name || 'ITEMNAME';
    let description = item.description || ''; // TODO: add missing description category
    let questname = item.questname || item.quest || 'QUESTNAME';
    let questType = item.questType || 'QUESTTYPE'; // either 'story' or ''
    let questcharacter = item.questcharacter || 'CHARACTER';
    let realmname = item.realmname || 'REALMNAME';
    let characterlevel = item.characterlevel || 'LEVEL';
    template = ``;
    template += `{{stub}}`;
    template += `\n{{infobox`;
    template += `\n|image=${name}.png`;
    template += `\n|description=${description}`;
    template += `\n|type=Quest Item`;
    template += `\n|found=<!--Given by {{name|${questcharacter}}} / Found in [[${realmname}]]-->`;
    template += `\n|from=<!--{{quest|${questname}|friendship=${questcharacter}|level=${characterlevel}|realm=${realmname}}}-->`; // TODO - LOGIC ON WHETHER COMMENTED OR NOT
    template += `\n|recipe=`;
    template += `\n}}`;
    template += `\n'''${name}''' is a [[Quests|quest]] item`;
    template += `<!--which is collected during // which is given by [[${questcharacter}]] during the [[${realmname}]] quest [[${questname}]] `;
    template +=  `// which is crafted during the [[${questcharacter}#Friendship Quests|${questcharacter} Level ${characterlevel} Friendship quest]] [[${questname}]]. `;
    template += `// item which is [[Fishing|fished up]] in the [[${realmname}]] during the realm quest [[${questname}]]-->.`;
    template += `\n`;
    template += `\n==Acquisition==`;
    template += `\n:{{quest|${questname}}} - TBA<!--Crafted during quest / Given by [[${questcharacter}]]-->`;
    template += `\n`;
    template += `\n<!--==Quest Objectives==`;
    template += `\n{{Objectives|header}}`;
    template += `\n{{ObjectivesRow|{{quest|${questname}|friendship=${questcharacter}|level=${characterlevel}|realm=${realmname}}}|1|'''Use''' from Inventory.}} '''Interact''' with item, then '''Transfer''' from Inventory to keyhole labeled \"Keyhole Label\"`;
    template += `\n{{Objectives|footer}}`;
    template += `\n-->`;
    template += `\n==History==`;
    template += '\n{{history|'+updateNumber+'|Added}}';
    template += `\n`;
    template += `\n{{NavboxQuestItem}}`;
    template += !description ? '\n\n[[Category: Missing Description]]' : ''; 
    renderedHTML += template;
    renderedHTML += delimiter;
  });

   // janky cleanup
    renderedHTML = renderedHTML.replaceAll(/level=(\d+)\|realm=REALMNAME/g, "level=$1");
  //renderedHTML = renderedHTML.replaceAll('|realm=Friendship}}', '}}');
    renderedHTML = renderedHTML.replaceAll('|realm=}}', '}}');
  //renderedHTML = renderedHTML.replaceAll('|realm=REALMNAME}}', '}}');

    return renderedHTML;
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


// TODO - also generate the separating column row breaks for html table
  function renderSPRewardTable(dataArray) {
    var renderedHTML = '';
    var delimiter = '';
  //delimiter = '\n\n\n-----------------------------\n\n\n';
    dataArray.forEach(function (item) {
    // WHY DID THIS microtemplating STOP WORKING - 2025.09.25 - maybe i modified the output_from?
    // for some reason this function causes a problem!>??!
    //output_from(item); // this function also modifies item to add tile, eventtoken, and premium properties
      template = '';
      template +=
      '{{StarPathRewardRow\n|starpath=' +
      starPathNameShort +
      '\n|id=%%tile%%\n|name=%%name%%\n|type=%%itemType%%' +
      '\n|price=%%eventtokens%%\n|premium=%%premium%%\n}}\n';

    // <!--Types: Accessory, Clothing, Hairstyle, Eye Shadow, Face Paint, Furniture, Wallpaper, Flooring, Motif, Companion, Moonstones, Character Dream Style -->

      renderedHTML += microTemplate(template, item);
      renderedHTML += delimiter;
    });
  // prevent premium=null
    renderedHTML = renderedHTML.replaceAll('=null', '=');

    return renderedHTML;
  }


  function renderSPDuties(dataArray) {
  // Create table of star path duties for star path page from array spDuties
  //getElementId('output').innerHTML = renderVariableTemplate(spDuties, spDutyRow);

    var renderedHTML = '';
    var delimiter = '';
  //delimiter = '\n\n\n-----------------------------\n\n\n';
    dataArray.forEach(function (item) {
      template =
      '|-\n| align="center" | %%num%% || align="center" | {{inlineIcon|%%icon%%|iconOnly}} || %%name%% || %%qty%% || {{price|%%reward%%|' +
      starPathToken +
      '}}\n';

      renderedHTML += microTemplate(template, item);
      renderedHTML += delimiter;
    });

  // comment out icons if missing
    renderedHTML = renderedHTML.replaceAll('{{inlineIcon|null|iconOnly}}', '<!--{{inlineIcon|TBA|iconOnly}}-->');
    renderedHTML = renderedHTML.replaceAll('{{inlineIcon|ICON_TBA|iconOnly}}', '<!--{{inlineIcon|ICON_TBA|iconOnly}}-->');

    return renderedHTML;
  }



// is flower or gem
  function isFlower(item) {
    return (
      (item.name && item.name.includes('Flower')) ||
      (item.cookingType && item.cookingType == 'Flower'));
  }
  function isGem(item) {
    return (
      (item.name && item.name.includes('Shiny')) ||
      (item.cookingType && item.cookingType == 'Gem') ||
      (item.collectionType && item.collectionType.includes('Gem'))
      );
  }

  function isWallpaper(item) {
    return (
      (item.name && item.name.includes('Wallpaper')) ||
      (item.category && item.category == 'Wallpaper') ||
      (item.category && item.category.includes('Wallpaper')));
  }

// will no longer work
  function isFlooring(item) {
    return (
      (item.name && item.name.includes('Flooring')) ||
      (item.name && item.name.includes(' Tile')) ||
      (item.category && item.category == 'Flooring') || 
      (item.category && item.category.includes('Flooring'))
      );
  //return true;
  }

  function isWallpaperFlooring(item) {
    return (isWallpaper(item) || isFlooring(item));
  }

  function isPremium(item) {
    return (
      (item.location && item.location == 'premium') ||
      (item.source && item.source.includes('Bundle'))
      );
  }

  function isTale(item) {
    return (item.location && item.location.includes('tale'));
  }

  function isHairstyle(item) {
    var isHairstyle = (
      (item.name && item.name.includes('Hairstyle')) ||
      (item.name && item.name.includes('Hairdo')) ||
      (item.name && item.name.includes('Updo')) ||
      (item.name && item.name.includes('Haircut')) ||
      //(item.category && item.category == 'Hairstyle') || 
      (item.category && item.category.includes('Hair')) || 
      (item.tags && item.tags.includes('Hair'))
      );
    return isHairstyle;
  }

  function isHouse(item) {


    var isHouse =
    /*(item.name && item.name.includes('House')) ||*/ // TODO - make more robust, currently grabs furniture items iwth house in title
    /* do NOT do this - if category is set to commented value this will flag true - (item.category && item.category.includes('House')) ||*/
    (item.category && item.category.includes('House') || item.collection && item.collection.includes('House Dream Style'));

    return isHouse;
  }

  function isStall(item) {
  // some crafted items are called stall
    var result =  (
      (item.universe && item.universe.includes('Stall')) ||
      (item.collection && item.collection.includes('Stall'))); 
    return result;
  }

  function isAccessory(item) {
    var result =  (
      (item.collection && item.collection.includes('Accessory')) ||
      (item.universe && item.universe.includes('Accessory')) ||
      //(item.name && item.name.includes('Accessory')) || // remove so "Hannah Montana Accessory Rack" is not flagged
      (item.name && item.name.includes('Handheld')) ||
      (item.category && item.category == 'Accessory') ||
    (item.category && item.category == 'Accessories')); // do NOT catch Umbrella - not safe
  /*if (result) {
    item.category = 'Accessories';

    // this was original location of groupedUniverse assignment

  }*/

    return result;
  }

// todo: isBuilding - Chez Remy, Plaza, Scrooge's Store
  function isBuilding(item) {
    var isBuilding =
    (item.collection && item.collection.includes('Building')) ||
    //(item.name && item.name.includes('Building')) ||
    (item.category && item.category.includes('Building'))  ||
    (item.category && item.category.includes('Chez Remy'))  ||
    (item.category && item.category.includes('Plaza Square'))  ||
    (item.category && item.category.includes('Scrooge\'s Store'))  ||
    (item.universe && item.universe.includes('Building'));

    // TODO - might need more thoroughness

    return isBuilding;
  }

  function isCastle(item) {
    var isCastle =
    (item.collection && item.collection.includes('Castle')) ||
    //(item.name && item.name.includes('Castle')) ||
    (item.category && item.category.includes('Castle'))  ||
    (item.universe && item.universe.includes('Castle'));

    return isCastle;
  }

  function isVisitStation(item) {
    var isVisitStation =
    (item.collection && item.collection.includes('Visit Station')) ||
    //(item.name && item.name.includes('Visit Station')) ||
    (item.category && item.category.includes('Visit Station'))  ||
    (item.universe && item.universe.includes('Visit Station'));

    return isVisitStation;
  }

  function isWishingWell(item) {
    var isWishingWell =
    (item.collection && item.collection.includes('Well')) ||
    (item.name && item.name.includes('Wishing Well')) ||
    (item.category && item.category.includes('Well')) ||
    (item.universe && item.universe.includes('Well'));

    return isWishingWell;
  }

// this may also be catching wishing wells? need to investigate
  function isCharacterDreamStyle(item) {

  //category: Character Dream Style   universe: Character Dream Style    itemType: Dream Style.    universe:Character Dream Style

  // for chardreamstyles, itemType = Dream Style (originally Clothing from sheet, script overwrites), category = Character Dream Style, universe = Character Dream Style ...
  // IS SOMETHING WRONG HERE... 2026.03.24
  // TODO: double check values used in sheet for character dream styles, category=Dream Style is not exclusive to character skins

  // why is this broken...
    var isDreamStyle = 
    (item.collection == 'n/a - CHARACTER DREAM STYLE') ||
    (item.itemType == 'Clothing' &&  item.collection == 'Dream Style') ||
    (item.category == 'Character Dream Style') ||
    (item.universe == 'Character Dream Style') ||
    (item.category && item.category.includes('Character')) ||
    (item.universe && item.universe.includes('Character'));

    // this will not do anything
    /*
  if (isDreamStyle) {
    item.itemType = 'Dream Style';
    item.category = 'Character Dream Style';

    //item.universe = 'Character Dream Style'; this will overwrite the infobox value if set here
  }
  */
    return isDreamStyle;
  }

  function isStandalone(item) {
  //item isnt parsed yet, below wont work?  not sure

    return (
      (item.name == item.bundleName && (item.source && item.source.includes('Premium Bundle - ' + item.name))) ||
      item.standalone
      );
  }

  function isCraftable(item) {
    var isCraftable =
    (item.location && item.location.includes('crafting')) ||
    (item.source && item.source.includes('Crafting'));

    if (isCraftable) {
      item.itemType = 'Crafted Furniture';
    item.craftingCategory = 'Furniture'; // Refined Materials
  }
  return isCraftable;
}

function isStarPath(item) {
  var isStarPath = 
  item.location && item.location.includes('starpath') ||
  item.source && item.source.includes('Star Path');
  return  isStarPath;
}

function isQuestItem(item) {
  var isQuestItem = 
  item.location && item.location.includes('quest') ||
  item.source && item.source.includes(' quest ') ||
  item.source && item.source.includes('Quest - ') ||
  item.source && item.source.includes(' Quest ');
  return isQuestItem;
}


/*
const getHighestPriorityMatch = (str, priorities) => {
  const values = str.split(",").map(s => s.trim());
  return priorities.find(p => values.includes(p));
};
*/

function getFirstCategoryMatch(categoryVal, prioritizedCategoryArray) {
  /*
  const str = "hello world";
  const keywords = ["hello", "bye", "test"];

  // version 1: case insensitive
  const containsAny = keywords.some(k => str.toLowerCase().includes(k.toLowerCase()) );

  // version 2
  // const regex = new RegExp(keywords.join("|"));
  // const containsAny = regex.test(str);

  // Why this is solid: some() stops early (efficient) / Reads like plain English: “does some keyword match?” / Easy to extend or tweak
  // version 3: one liner
  const containsAny = (str, arr) => arr.some(s => str.includes(s));
  */

  /*
  const str = "Essentials, Lighting";
  const priorities = ["Essentials", "Lighting", "Other"];
  //basic
  const match = priorities.find(p => str.includes(p));
  // case insensitive
  const match = priorities.find(p => str.toLowerCase().includes(p.toLowerCase()) );
  // safe (avoid partial matches)
  const match = priorities.find(p => { const regex = new RegExp(`\\b${p}\\b`, "i"); return regex.test(str);});
  */

  var categoryValArray = categoryVal.split(",").map(s => s.trim());

  // find() returns the first match → your list = priority ranking. Stops early → efficient. Very readable: “give me the first priority that appears”
  return prioritizedCategoryArray.find(p => categoryValArray.includes(p)) || "";
};


// ===== script.js =====

// (DDV-31) the pasted refactoring audit moved to the hub, notes/DDV-31-engine-notes.md


// https://jsbin.com/regoqaw/edit?html,js,output - straight templating, no logic, can't use ctrl f

// **** todo: hairstyle articles, accessories articles, character dream style articles
// TODO - desert bloom coffee table not populating surfaceArea in infobox, leaving empty functions param

function renderParent(dataArray, templateType) {
  //var dataArray = sampleItems;
  // templateType is a global var changed by radio buttons


  var outputHTML = '';
  switch (templateType) {
  case "spDuties":
    outputHTML = renderSPDuties(dataArray);
    break;
  case "spRewards":
    outputHTML = renderSPRewardTable(dataArray);
    break;
  case "questItems":
    outputHTML = renderQuestItems(dataArray);
    break;
  case "meals":
    outputHTML = renderMeals(dataArray);
    break;
  case "ingredients":
      outputHTML = renderIngredients(dataArray); //"Ingredient template missing";
      break;
    case "companions":
      outputHTML = renderCompanions(dataArray);
      break;
    case "gems":
      outputHTML = renderGems(dataArray);
      break;
    case "flowers":
      outputHTML = renderFlowers(dataArray);
      break;
    case "clothingFurniture":
      // necessary prepping of items (e.g. re-setting itemType, etc) is done here, so call this before renderPSBundles
      // ... i think? but i'm not even positive if dataArray is being modified... but this seems to be working once i swap them?
      outputHTML += renderClothingFurnitureArticle(dataArray);
      // todo - currently just a global var
      if (renderPSbundles) {
        outputHTML = renderPSBundles(dataArray) + outputHTML;
      }
      break;
    default:
      outputHTML = "Unsure what template generating function to use, templateType: ", templateType;
    }

    // (DDV-9) the checkboxes used to be read here, after rendering, so each render used the
    // previous state; render() now sets them from `settings` before anything is rendered.

    if (showItemDebug) {
      console.log(`priceConfirmed = ${priceConfirmed}, categoriesColorsTraitsConfirmed = ${categoriesColorsTraitsConfirmed}, tagsConfirmed = ${tagsConfirmed}, collectionConfirmed = ${collectionConfirmed},  functionsConfirmed = ${functionsConfirmed}`);
    }
    
  // if a custom template is provided in the textarea, use that instead of the one specified by the function
    var inputTemplateValue = customTemplate; // settings.customTemplate (the page's template-input box)
    if (inputTemplateValue) {
      outputHTML = renderVariableTemplate(dataArray, inputTemplateValue);
    }

    return outputHTML;
  }



  function output_image(item) {
    var output = '|image=' + item.name + '.png\n';
    if (item.itemType == 'Clothing' && !isAccessory(item) && !isHairstyle(item))
      output += '|image_m=' + item.name + '_m.png\n';
    return output;
  }

  function output_type(item) {
    var output = '|type=%%itemType%%\n';
  // if  crafting then
    if (isCraftable(item)) {
    // as of 1.22? 1.23? there are no crafting categories any more
    //output += '|craftingcategory=%%craftingCategory%%\n'; //Furniture
    }
    return output;
  }

  // Consolidates the "if (!confirmed) push missing-category tag; wrap value in
  // an HTML comment" pattern duplicated across output_category, output_color,
  // output_tags, and output_traits. See js/todos.
  function applyConfirmationWrap(item, value, isConfirmed, missingCategoryLabel) {
    if (!isConfirmed) {
      item.missingCategories.push('[[Category: Missing ' + missingCategoryLabel + ']]');
    }
    return wrapComment(value, !isConfirmed);
  }

  // only useful for handling clothing/furniture
  function output_category(item) {

    /*
    if (!item.category) {
      if (item.itemType == 'Clothing') {
      // temporary fix: remove Companions, after Accessories to prevent items with empty categories being flagged as companions
      // TODO: make this more robust - if the value is empty of a param the placeholder shouldn't be inserted until the very end? or something?
        item.category =
        '<!--Accessories, Tools, Hats, Masks, Glasses, Earrings, Neckwear, Coats, Tops, Back, Bracelets, Gloves, Pants, Shorts, Skirts, Hose Socks, Shoes, Dresses, Costumes, Gliders-->';
      } else {
      // defaults to furniture
      item.category = '<!--OPTIONS: Furniture: House, Essentials, Decor, Trimmings, Tables, Beds, Seating, Storage, Appliance, Electronics, Utilities, Art, Lighting, Foliage, Rugs, Misc., Floors, Windows, Landscaping, Wall, Ceiling Decorations, Trees, Rocks, Fencing, Attractions-->'; // TODO: Ceiling Textures, Ceiling Decorations
      }
    }
    */

  //var output = '|category=%%category%%\n';
  let inlineCategory = applyConfirmationWrap(item, item.category, categoriesColorsTraitsConfirmed, 'Categories');
  if (!item.category) {
    // output placeholder comment vals for categories
    if (item.itemType == 'Clothing') {
      inlineCategory = '<!--Accessories, Tools, Hats, Masks, Glasses, Earrings, Neckwear, Coats, Tops, Back, Bracelets, Gloves, Pants, Shorts, Skirts, Hose Socks, Shoes, Dresses, Costumes, Gliders-->';
    }
    else {
      // defaults to furniture
      inlineCategory = '<!--OPTIONS: Furniture: House, Essentials, Decor, Trimmings, Tables, Beds, Seating, Storage, Appliance, Electronics, Utilities, Art, Lighting, Foliage, Rugs, Misc., Floors, Windows, Landscaping, Wall, Ceiling Decorations, Trees, Rocks, Fencing, Attractions-->'; // TODO: Ceiling Textures, Ceiling Decorations
    }
  }
  // TODO - evaluate if this is a cleaner approach than setting the actual value if empty to placeholders?
  // TODO - differentiating between missing data vs genuinely empty fields?
  var output = `|category=${inlineCategory}\n`;

  if (isBuilding(item) || isCastle(item) || isWishingWell(item) || isStall(item) || isVisitStation(item)) {
    output = '|category=none\n'; // i use categories in my sheet and elsewhere in parser, but technically these items have no category
  }

  return output;
}

function output_buyprice(item) {

  var output = '|buyprice=%%buyprice%%\n';

  // Don't include empty buyprice for clothing from Star Path or Premium Shop
  if (item.itemType == 'Clothing' && (item.starpath || isPremium(item))) {
    output = '';
  }

  // Possible crafting input values from sheet
  if (isCraftable(item) || item.buyprice == 'n/a' || item.buyprice == '-') {
    output = '';
  }

  // TODO - fix this logic for second half
  if (!priceConfirmed || (output != '' && !item.buyprice) ) {
    item.missingCategories.push('[[Category: Missing Price]]');
  }

  // TODO - conditionals to prevent |buyprice=<!--null--> as output
  item.buyprice = wrapComment(item.buyprice, !priceConfirmed);

  // not sure this is still required
  //const regex = /\n\|buyprice=\d\d [tT]okens/gi;
  //output = output.replaceAll(regex, "");

  return output;
}

function output_color(item) {
  var output = '|color=%%color%%\n';

  // Hairstyles/Accessories have no color
  if (!item.color && !(isHairstyle(item) || isAccessory(item))) {
    item.color = '<!--OPTIONS: blue, green, red, pink, white, black, yellow, orange, brown, purple, gray-->';
  }

  item.color = applyConfirmationWrap(item, item.color, categoriesColorsTraitsConfirmed, 'Colors');

  return output;
}

function output_tags(item) {

  if (!item.tags && !(isHairstyle(item) || isAccessory(item))) {
    item.tags = '<!--xxx, xxx, xxx-->';
  }
  if (isHairstyle(item)) {
    // Hairstyles/Accessories have no tags
    item.tags = 'Hairstyle';
  }
  if (isAccessory(item)) {
    // Hairstyles/Accessories have no tags
    item.tags = '';
  }

  item.tags = applyConfirmationWrap(item, item.tags, tagsConfirmed, 'Tags');
  // TODO: implement and call commentOutStarPathTags, especially if the overall tags are commented out

  var output = '|tags=%%tags%%\n';
  return output;
}

function output_collection(item) {
  if (!collectionConfirmed) {
    item.missingCategories.push('[[Category: Missing Collection]]');
    item.missingCategories.push('[[Category: Missing Icon]]');
  }

  // TODO - think calling this at wrong time, some values entering are <!--Dreamlight Valley-->
  // the switch below writes item.collection itself (objects are passed by reference), so later functions see the new value
  switch (item.collection) {
  case 'Tracked Wall':
  case 'Tracked Floor':
  case 'Dreamlight Valley': // the article loop has already turned DV into the full name
  case 'DV':
  case 'EI':
  case 'SV':
  case 'WM':
  case 'WR':
  case 'HW':
    item.collection = wrapComment(VILLAGE_NAMES[item.collection == 'WR' ? 'WM' : item.collection] || 'Dreamlight Valley', !collectionConfirmed);
    break;
  case 'Dream Style':
      item.collection = 'remove'; //'n/a - CHARACTER DREAM STYLE';
      break;
    case 'Well':
      item.collection = 'n/a - WELL';
      break;
    case '--':
      // accessory or otherwise indicated no collection
      item.collection = 'none';
      break;
    case '-- (DV)':
    case '-- (EI)':
    case '-- (SV)':
    case '-- (WM)':
    case '-- (HW)':
    case '-- DV':
    case '-- EI':
    case '-- SV':
    case '-- WM':  
    case '-- HW':
      item.collection = 'none';
      break;
    default: {
      if (showItemDebug) {
        console.log('Unusual item.collection value:', item.collection);
      }
      //item.collection = 'Dreamlight Valley'; //'<!--Dreamlight Valley-->'; // TODO - THIS IS APPLYING AS DEFAULT WHEN IT SHOULDNT BE??
      //item.missingCategories.push('[[Category: Missing Collection]]'); // TODO - check more use cases for this, otherwise was adding to wallpaper unnecessarily
    }
  }

  // // TODO - test with returning star path items, both premium and nonpremium, and not returning of both
  //Fishing Trinkets Light Fixture: item.premium = no / item.limited =  / item.icon = undefined / item.collection_icon = undefined / item.speculated =  / item.becameBundle = undefined
  //Giant String Lights: item.premium = undefined / item.limited = Premium / item.icon = Premium / item.collection_icon = undefined / item.speculated =  / item.becameBundle = undefined
  //Enchanted Holiday Fireplace: item.premium = yes / item.limited =  / item.icon = undefined / item.collection_icon = undefined / item.speculated =  / item.becameBundle = undefined

  // let collection_icon = (item.limited == 'b') ? 'premium' : 'notpremium';
  // isPremium(item)
  // limited --> icon or collection_icon
  // speculated --> becameBundle
  // limited : "Premium"
  // location == "premium"
  
  var output = '|collection=' + wrapComment('%%collection%%', !collectionConfirmed) + '\n';

  // this is really janky, not sure if i should set it when i parse source or here
  // or only take value from the read column or what
  let eventOrPremium = isPremium(item) || isStarPath(item);

  if (eventOrPremium) {
    // Only output collectiontag infobox param if value = premium or event, omit by default (no icon)
    let collectionIconType = ''; // 'premium'/'event'
    let columnIconValue = item.icon || item.collection_icon;

    if (item.premium == "yes" || columnIconValue == "b" || isPremium(item)) collectionIconType = 'premium';
    if (item.premium == "no" || columnIconValue == "c") collectionIconType = 'event';

    // if item.premium is defined and "yes" then icon=premium/b,
    // if item.premium is defined but "no" then icon=event/c

    output += '|collectiontag=' + wrapComment(collectionIconType, !collectionConfirmed) + '\n';
  }
  
  return output;
}

function output_recipe(item) {
  var output = '';
    // temporary takeover of npcInterest field for recipe

  if (item.npcInterest) {
    try {
    var stringifiedObjArray = JSON.parse(item.npcInterest); // parse a string that was created using JSON.Stringify backinto JSON object
    // int id, name, int qty, bool is_category
    for (var i=0; i<stringifiedObjArray.length; i++) {
      var ingredient = stringifiedObjArray[i];
      output += `{{name|${ingredient.name}|${ingredient.qty}}}<br>\n`
    }
    // todo: remove |1}}, unless that helps for clarity? remove trailing <br>\n
    // .replace(/(\s*<br\s*\/?>\s*)+$/gi, '');
    output = '|recipe=' + output.replace(/(?:<br\s*\/?>\s*)+$/i, '') + '\n';
  } catch (ex) {
    console.error(ex);
  }
}

return output;
}

function output_traits(item) {
  // Hairstyles/Accessories have no traits
  if (!item.traits && !(isHairstyle(item) || isAccessory(item))) {
    item.traits = '<!--Lavish/Simple, Calm/Playful, Delicate/Strong, Familiar/Wondrous-->';
  }

  item.traits = applyConfirmationWrap(item, item.traits, categoriesColorsTraitsConfirmed, 'Traits');

  var output = '|traits=%%traits%%\n';
  return output;
}

function output_universe(item) {
  if (showItemDebug) {
    console.log(`item.universe / item.groupedUniverse inside output_universe: ${item.universe} / ${item.groupedUniverse} for ${item.name}`)
  }
  if (!item.universe) {
    item.missingCategories.push('[[Category: Missing Universe]]');
  }
  if (item.universe == 'General') item.universe = 'Other';

  var output = '|universe=%%universe%%\n'; //`|universe=${item.universe}\n`;

  /*
    if (item.universe == "(none)") {
      item.universe = "none";
    }
  */

  // do not modify the original universe value for accessories - needed for navbox
  if (isAccessory(item)) {
    output = '|universe=none\n';
  }

  return output;
}

function output_functions(item) {
  var output = '|functions=%%functions%%\n';
  // TODO 2025.09.24 - functions empty
  if (!item.functions || item.functions == '-') {
    // ****NOTE - usually missing functions indicates there are none, not that they are missing -- || item.functions == '-'
    //item.missingCategories.push('[[Category: Missing Functions]]');

    output = '';
  }
  return output;
}



  




function output_sizePlacementEnv(item) {
  //item = parseSizePlacementEnv(item);
  if (!item.size) {
    item.size = '<!--WxD*<!--DIMENSIONS NOT FILLED-->';
    if (item.itemType != 'Clothing') {
      item.missingCategories.push('[[Category: Missing Size]]');
    }
  }

  if (!item.placement) {
    item.placement = '<!--default-->';
    if (item.itemType != 'Clothing') {
      item.missingCategories.push('[[Category: Missing Placement]]');
    }
  }

  //var output = '|size=%%size%%\n';
  var output = '|gridSize=%%size%%\n'
  if (item.surfaceArea) {
    output += '|surfaceArea=%%surfaceArea%%\n';
  }
  output += '|placement=%%placement%%\n';

  if (item.environment) {
    output += '|environment=%%environment%%\n';
  }

  // these params not applicable for clothing
  if (item.itemType == 'Clothing') output = '';

  // the placeholders are filled later (microTemplate), so the wrapped values below end up in this text
  let newStr = output;

  // their own confirmation box since DDV-28 (placementConfirmed)
  item.size = wrapComment(item.size, !placementConfirmed);
  item.placement = wrapComment(item.placement, !placementConfirmed);
  item.surfaceArea = wrapComment(item.surfaceArea, !placementConfirmed);
  item.environment = wrapComment(item.environment, !placementConfirmed);

  // TODO - should be using a struture similar to the following, but this function has already added missing categories,
  // which would be added a second time by doing the below
  /*
  item.size = applyConfirmationWrap(item, item.size, categoriesColorsTraitsConfirmed, 'Size');
  item.placement = applyConfirmationWrap(item, item.placement, categoriesColorsTraitsConfirmed, 'Placement');
  item.surfaceArea = applyConfirmationWrap(item, item.surfaceArea, categoriesColorsTraitsConfirmed, 'Surface Area');
  item.environment = applyConfirmationWrap(item, item.environment, categoriesColorsTraitsConfirmed, 'Environment');
  */

  return newStr;
}

function parseSizePlacementEnv(item) {
  if (item.size && item.size.includes('(not full)')) {
    item.size = item.size.split(' ')[0] + '*<!--DIMENSIONS NOT FILLED-->';
  }

  if (item.placement && item.placement.includes('(outdoor)')) {
    item.placement = item.placement.split(' ')[0]; // todo - more robust logic
    item.environment = 'outdooronly';
  } else if (item.placement && item.placement.includes('(indoor)')) {
    item.placement = item.placement.split(' ')[0];
    item.environment = 'indooronly';
  } else {
    //item.placement = "";
    item.environment = '';
  }

  // **** todo. if either of these, also get rid of surfaceArea
  if (item.placement == 'wall') item.placement = 'walls'; // TODO: also remove (wall) from gridSize value
  if (item.placement == 'ceiling') item.placement = 'ceilings'; // TODO: also remove (wall) from gridSize value
  if (item.placement == 'under') item.placement = 'underneath';

  // this is sloppy and weak, consolidate - also double check that not overwriting indoor or outdoor content
  if (item.size && item.size.includes('(wall)')) {
    item.size = item.size.replaceAll('(wall)', '');
    //item.placement = 'walls'; // think this should already be set, so it's redundant?
  } else if (item.size && item.size.includes('(ceiling)')) {
    item.size = item.size.replaceAll('(ceiling)', '');
    //item.placement = 'ceilings'; // think this should already be set, so it's redundant?
  }

  // override for wallpaper, flooring |placement=wallpaper|environment=indooronly
  if (isWallpaperFlooring(item)) {
    item.size = 'remove'; // janky
    item.placement = 'wallpaper'; // flooring
    item.environment = 'indooronly';
  }


  return item;
}

// TODO: output related items alphabetically for premium bundle items
// TODO: do NOT output "relatedItems" that are part of an unnamed bundle
function output_relatedItems(item) {


  /*// alpha sort related items before outputting
  resultArray.forEach(function (bundleObj) {
    bundleObj.psBundleItems.sort(); // alpha sort each bundle's items
  });
  */

  var output = '';
  //output = '\n<!--\n{{relatedItems | xxx, xxx, xxx}}\n-->\n';
  if (item.bundleName && item.relatedItems && item.relatedItems.length >= 1) {
    //output = `\n<!--\n{{relatedItems | ${item.relatedItems.join(', ')} }}\n-->`;

    // alpha size related items before outputting
    output = `\n\n{{relatedItems | ${item.relatedItems.sort().join(', ')} }}`;
  }
  //output = `\n<!--\n{{relatedItems | ${item.relatedItems} }}\n-->\n`;

  return output;
}

function output_history(item) {
  item = updateAppropriateVersion(item);

  let inlineVersion = item.wikiVersion ? item.wikiVersion : item.version;
  //var output = '\n\n==History==\n{{history|' + item.version + '|Added}}';

  // TODO - general fixes for including final 0s
  // (not a per-update value: the sheet's number format turns 1.10 into 1.1)
  if (inlineVersion == '1.1') inlineVersion = '1.10';
  var output = `\n\n==History==\n{{history|${inlineVersion}|Added}}`;
  return output;
}

function updateAppropriateVersion(item) {
  if (!item.version) item.version = updateNumber;

  // different wiki user-facing version values than actual: WIKI_VERSION_RULES (top of the file),
  // then the pairs from the wikiVersionLabels setting
  var own = Object.prototype.hasOwnProperty;
  for (var i = 0; i < WIKI_VERSION_RULES.length; i++) {
    var rule = WIKI_VERSION_RULES[i];
    if (rule.when && !rule.when(item)) continue;
    if (typeof item.version === 'string' && own.call(rule.labels, item.version)) item.wikiVersion = rule.labels[item.version];
  }
  if (item.version != null && own.call(wikiVersionLabels, String(item.version))) item.wikiVersion = wikiVersionLabels[String(item.version)];

  return item;
}


// TODO - insert correct category for Other navboxes furniture categories
function output_prioritizedCategory(categoryVal) {

  var output = categoryVal;

  // TODO: verify prioritization of categories

  // contain both furniture and clothing categories
  var prioritizedCategories = ["House", "Wallpaper", "Flooring", "Attractions", "Windows", "Appliance", "Utilities", "Electronics", "Seating", "Tables", "Beds", "Rugs", "Foliage", "Landscaping", "Rocks", "Lighting", "Misc.", "Storage", "Art", "Decor", "Wall", "Essentials", "Trimmings", "Companions", "Tools", "Hats", "Masks", "Glasses", "Earrings", "Neckwear", "Coats", "Tops", "Back", "Bracelets", "Gloves", "Pants", "Shorts", "Skirts", "Hose Socks", "Shoes", "Dresses", "Costumes", "Gliders"];
  //TODO: "Floors", "Ceiling Textures", "Ceiling Decorations", "Trees", "Fencing"... Paths?

  output = getFirstCategoryMatch(categoryVal, prioritizedCategories);

  return output.toLowerCase().trim().replace(/\s/g, '').replace(/\./g, '');
}

function output_navbox(item) {
  var itemType = item.itemType;
  var universe = item.universe;
  var category = item.category;

  var genericNavClothing = '<!--{{NavboxClothing|back|nondisney}}-->';
  var genericNavFurniture = '<!--{{NavboxFurniture|seating|general}}-->'; // not sure if this will ever be used becase the default category is being set to a placeholder comment? 2026.04.01 check
  var disneyNavClothing = '<!--{{NavboxClothing|XXXXXXXX|disney}}-->';
  var disneyNavFurniture = '<!--{{NavboxFurniture|XXXXXXXX|disney}}-->';

  var output = '\n\n<!--NAVBOX-->';



  if (!universe || universe == '') {
    if (itemType == 'Clothing') {
      output = disneyNavClothing + genericNavClothing;
    }
    if (itemType == 'Furniture')
      output = disneyNavFurniture + genericNavFurniture;
  } else if (universe == 'Other' || (universe == 'General' && category)) {
    if (category == 'Hairstyle') {
      // append s to match navbox naming
      category = 'Hairstyles';
    }

    // Other universe items use their type in the navbox insteaad of their universe
    output = '{{Navbox' + itemType + '|' + output_prioritizedCategory(stripHTMLComments(item.category)) + '|general}}';

  } else {
    if (itemType == 'Clothing' || itemType == 'Furniture') {
      output = '{{Navbox' + itemType + '|' + universe.toLowerCase().trim().replace(/\s/g, '') + '|disney}}';
    } else output = disneyNavClothing + disneyNavFurniture;
  }
  if (isCraftable(item)) {
    // TODO: do not display with {{navboxcrafting}} if i is not in the crafting collection
    output = `{{NavboxCrafting|${item.collection.toLowerCase().trim().replace(/\s/g, '')}}}`;

    /// todo - wrap conditional
    output += `\n\n` + wrapComment(`[[Category:${item.collection} Furniture Sets Collection]]`, !collectionConfirmed);
  }
  if (isCharacterDreamStyle(item)) {
    output = '{{NavboxDreamStyle|character}}';
  }

  if (isHouse(item)) {
    output = "{{NavboxDreamStyle|house}}";
  }
  if (isStall(item)) {
    output = "{{NavboxDreamStyle|stalls}}"; // Goofy's Stall
  }
  if (isWishingWell(item)) {
    output = '{{NavboxDreamStyle|wells}}';
  }
  if (isBuilding(item)) {
    output = '{{NavboxDreamStyle|building}}'; // Chez Remy, Scrooge's Store, Plaza Square
  }
  if (isCastle(item)) {
    output = '{{NavboxDreamStyle|building|castle}}'; // Dream Castle
  }
  if (isVisitStation(item)) {
    output = '{{NavboxDreamStyle|visitstations}}'; // Valley Visit Station Skin
  }

  if (isAccessory(item)) {
    // use accessories|general if no universe clear
    if (item.groupedUniverse == 'Other') {
      output = `{{Navbox${item.itemType}|${item.category.toLowerCase().trim().replace(/\s/g, '')}|general}}`;
    } else {
      // use universe|disney if disney universe
      output = `{{Navbox${item.itemType}|${item.groupedUniverse.toLowerCase().trim().replace(/\s/g, '')}|disney}}`;
    }
  }

  if (isCompanion(item)) {
    output = '{{NavboxCompanion}}';
  }

  // TODO - need to group accessory items with their thematic unvierse even though they techncially don't have one
  output = '\n\n' + output;

  // navbox fixes - need to make a more robust regex for comma, period, ampersand removal
  var newStr = output;
  newStr = newStr.replaceAll("timburton\'sthenightmarebeforechristmas", 'nightmarebeforechristmas');
  newStr = newStr.replaceAll('lilo&stitch', 'liloandstitch');
  newStr = newStr.replaceAll('mickey&friends', 'mickeyandfriends');
  newStr = newStr.replaceAll('abug\'slife', 'abugslife');
  newStr = newStr.replaceAll('{{NavboxFurniture|monsters,inc.|disney}}', '{{NavboxFurniture|monstersinc|disney}}');
  newStr = newStr.replaceAll('{{NavboxFurniture|wall-e|disney}}', '{{NavboxFurniture|walle|disney}}');
  newStr = newStr.replaceAll('wreck-itralph', 'wreckitralph');

  output = newStr;

  return output;

  //item.universe = 'none';
  // None - Accessory (Aladdin) or None - Accessory
}

function output_missingCategories(item) {
  var output = item.missingCategories.join(' ');
  output = '\n\n' + output;
  return output;
}

// TODO: clean this up - but at least it's centralized now
// isStarpath(item) =true comes here, then isPremium
function generateReturningPremiumStarPathBodyText(item) {
  var output = "";

  // TODO - checking for if its a returning item - sometimes this is catching regular premium items
  var output = `It was `;
  // premium items that have returned to the star path
  if (isPremium(item)) {
    output += `originally `;
  }
  output += `available to unlock and collect `;
  if (!isPremium(item)) {
    output += `for a limited time `;
  }
  output += `during the [[${item.starpath} Star Path]] event`;


  // extra premiumInline and bonusInline property assignments
  var premiumInline = "";
  if (item.premium == "yes") {
    premiumInline = " Premium";
  }

  var bonusInline = "";
  if (item.bonus == "yes") {
    bonusInline = " Bonus";
  }

  // TODO: placeholder vals if not defined
  if (item.eventtokens && item.tier && item.premium && item.bonus) {
    output += ` using {{price|${item.eventtokens}|` + lookupToken(item.starpath) + `|showLabel}}`;
    output += ` from the Tier ${item.tier}${premiumInline}${bonusInline} Rewards`;
  }
  else {
    output += `{{cleanup|TODO --`;
    output += ` using {{price|XXXXX|` + lookupToken(item.starpath) + `|showLabel}}`;
    output += ` from the Tier TXXXXX / Premium/Bonus Rewards`;
    output += `}}`
  }

  if (item.bonus == "yes") {
    output += ", which were available after all regular Star Path rewards have been collected";
  }
  output += `.`;

  var inlineBundleLink = `[[${item.bundleName}]]`;

  // item is a standalone item premium bundle - returning or not
  if (item.name == item.bundleName) {
    inlineBundleLink = `[[${item.bundleName} (Bundle)|${item.bundleName}]]`;
  }

  if (isPremium(item)) {
    output += ` It later returned to the [[Premium Shop]] in the ` + inlineBundleLink;
    output +=  ` bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;
  }

  // strengthen regular premium bundle logic....
  if (isPremium(item) && !isStarPath(item)) {
    output = 'It is available to purchase from the [[Premium Shop]] in the ' + inlineBundleLink;
    output +=  ` bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;
  }


  //Star Path - Elements of Nature - TILE - Vault (__ tokens)
  // TODO: It later returned to the Vault Rewards of the [[STARPATH]] event and will be/was available to unlock after MONTH DAY, 2026.
  // insert before premium bundle (if relevant)
  // TODO: It later returned to the Vault Rewards of the [[STARPATH]] event.
  // It later returned as a Vault Reward in the [[Elements of Nature Star Path]].

  //|from=ORIGINALSP Star Path\n|vaultreward=NEWSP Star Path

  // CURRENT STAR PATH tense adjustments
  if (item.starpath == starPathName) {
      // current tense
    output = output.replaceAll('was available', 'is available');
    output = output.replaceAll('were available', 'are available');
    output = output.replaceAll('had been', 'have been');
  }

  return output;
}


// Set other item properties based on the value of item.location - parsing and interpreting logic
// CR23: renderPSBundles, renderClothingFurnitureArticle and output_from (and the special
// templates through output_from) all ask for the parsed source; it is parsed once per item
// per render, so its warnings print once.
var sourceParsed = null;
function parseItemSource(item) {
  if (sourceParsed && item && typeof item === 'object') {
    if (sourceParsed.has(item)) return item;
    sourceParsed.add(item);
  }
  return parseItemSourceOnce(item);
}

function parseItemSourceOnce(item) {

  if (!item.source) return item; // Failsafe for undefined sources
  //if (!item.location) item.location = "";

  var itemSource = '';
  var itemFrom = '';

  // not tested
  // ===== Player Level =====
  if (item.location == 'level') {
    const string = item.source;
    const regex = /Level (\d+)/;
    const match = string.split(regex);
    // Safely captures the first group
    if (match) { item.level = match[1]; } // player level  
  }

  // TODO: location == premium/friendship not working
  // ===== Friendship =====
  if (item.location == 'friendship' || item.location == 'premium/friendship') {
    const string = item.source;
    const regex = /([\w\W ]+) Level (\d)/;
    const result = string.split(regex);
    item.character = result[1]; // friendship character
    item.level = result[2]; // friendship level
  }



  // ===== (Dreamlight) Achievement =====
  if (item.location == 'achievement' || item.source.includes('Achievement')) {
    const sourceRegex = /^Achievement \((?<achievementTab>[^)]+)\) - (?<achievementName>.*?)(?<achievementLevel>\s*\([^)]+\))?$/;
    const match = item.source.match(sourceRegex);

    if (match) {
    const { achievementTab, achievementName, achievementLevel = '' } = match.groups;

    // Derive achievementIcon (defaults to tab name or a custom mapped icon)
    const achievementIcon = achievementName.includes("Pooh Sticks") ? "Pooh Sticks" : achievementTab;

    item.achievementTab = achievementTab;
    item.achievementIcon = achievementIcon;
    item.achievementName = achievementName;
    item.achievementLevel = achievementLevel;
    }
  }

  // ===== Scrooge - Conditional =====
  // Store - after unlocking Pocahontas
  // Store - only after Peter Pan Realm Quest (The Music's On the Walls)
  if (item.inStore) {
    const string = item.source;
    const regex = /Store - after unlocking ([\w\W ]+)/;
    const result = string.split(regex);
    item.character = result[1]; // friendship character - TODO - need to catch more conditions, e.g. quests
  }

  // ===== Quest =====
  if (isQuestItem(item)) {
    const string = item.source;

    /*
    // Regex breakdown: (outdated regex/details, but nice comment format)
    // ^(.+?)           -> Captures Character (Lazy match until "Level")
    // Level (\d+)      -> Captures Level digits
    // \s+[Qq]uest\s+   -> Matches "Quest" or "quest" with surrounding whitespace
    // \((.+?)\)        -> Captures Quest Name inside parentheses
    // \s+\(            -> Matches the space and opening paren for reward info
    // (?:(\d+)\s+)?    -> OPTIONAL: Captures digits if they exist (qtyRewarded)
    // (.+?)            -> Captures the text (whenRewarded)
    // \)/              -> Matches the closing paren
    
    // TODO: also parse if the source is still generic, fed from the sheet data
    // Quest - Pocahontas Level 10 Quest (A Raccoon's Return)
    */

    /*
    // CASES HANDLED
    Sadness Level 4 quest (The Fortress of Saditude) (during) - limit 1
    Hades Level 10 quest (Fine, I'll Do It Myself) (reward) - limit 1
    Pocahontas Level 10 quest (A Raccoon's Return) (during)
    Pocahontas Level 10 quest (A Raccoon's Return) (4 during)
    Winnie the Pooh story quest (Epilogue: See You Next Summer) - unlocks automatically (unlisted reward during)
    Winnie the Pooh story quest (Interlude 4: Curiosity Satisfied) (reward) 
    Cinderella Level 10 Quest (The Friendship Ball) (post-quest mailbox reward) ("I found this...")
    Crafting after Joy Level 7 quest (Imagination Land) (reward)
    Winnie the Pooh story (Chapter 11: The Anti-monster Camp) (1 crafted during) (unlocks recipe)
    Winnie the Pooh story (Chapter 11: The Anti-monster Camp) (1 crafted during) - unlocks recipe
    */

    //const regex = /^\d*\s*(?:(?:[A-Za-z]+\s+)*?(?:after|during|for)\s+)?(?<character>.+?)\s+(?:Level\s+(?<levelNum>\d+)|(?<questType>story))\s*(?:quest)?\s+\((?<quest>[^)]+)\)(?:\s*\((?:(?<qty>\d+)\s+(?:[A-Za-z]+\s+)?)?(?<whenParen>[^)]+)\))?(?:\s*-\s*(?<tailHyphen>[^(\n]+))?/i;
    
    //const regex = /^\d*\s*(?:(?:[A-Za-z]+\s+)*?(?:after|during|for)\s+)?(?<character>.+?)\s+(?:Level\s+(?<levelNum>\d+)|(?<questType>story))\s*(?:quest)?\s+\((?<quest>[^)]+)\)(?:\s*\((?:(?<qty>\d+)\s+)?(?:(?<actionVerb>crafted|given|found|made)\s+)?(?<whenParen>[^)]+?)\))?(?:\s*\("(?<quote>[^"]+)"\))?(?:\s*-\s*(?<tailHyphen>[^(\n]+))?/i;
    
    const regex = /^\d*\s*(?:(?:[A-Za-z]+\s+)*?(?:after|during|for)\s+)?(?<character>.+?)\s+(?:Level\s+(?<levelNum>\d+)|(?<questType>story))\s*(?:quest)?\s+\((?<quest>[^)]+)\)(?<tail>.*)$/i;
    const match = string.match(regex);

    if (match) {

      /*
      // use https://regex101.com/
      */




      const { character, levelNum, questType, quest, tail } = match.groups;

      item.character = character ? character.trim() : "";
      item.level = levelNum || "";
      item.questType = questType || "";
      item.quest = quest ? quest.trim() : "";

  // Initialize outputs
      item.qtyRewarded = "";
      item.howObtained = "";
      item.whenRewarded = "";
      item.whenCollected = "";
      item.postQuestMailboxMessageTitle = "";
      item.maxLimit = "";

      if (tail) {
    // Extract quoted strings ("I found this...")
        const quoteMatch = tail.match(/\("(?<quote>[^"]+)"\)/);
        if (quoteMatch) {
          item.postQuestMailboxMessageTitle = quoteMatch.groups.quote.trim();
        }

    // Extract all parenthetical contents: (...)
        const parenBlocks = [...tail.matchAll(/\(([^)]+)\)/g)]
        .map(m => m[1].trim())
      .filter(text => !text.startsWith('"')); // Ignore quote blocks

    // Extract hyphenated tail text: - ...
      const hyphenMatch = tail.match(/-\s*([^(\n]+)/);
      const hyphenText = hyphenMatch ? hyphenMatch[1].trim() : "";

    // 1. Process parenthetical blocks
      parenBlocks.forEach(block => {
      // Check for quantity + action verb (e.g., "1 given", "4 crafted")
        const qtyActionMatch = block.match(/(?:^|\b)(?<qty>\d+)\s+(?<verb>given|crafted|found|made)\b/i);
        if (qtyActionMatch) {
          item.qtyRewarded = qtyActionMatch.groups.qty;
          item.howObtained = qtyActionMatch.groups.verb.toLowerCase();
        } else {
        // Fallback: standalone action verb (e.g. "crafted during")
          const verbMatch = block.match(/\b(?<verb>given|crafted|found|made)\b/i);
          if (verbMatch) item.howObtained = verbMatch.groups.verb.toLowerCase();
        }

      // Check for collection triggers (e.g., "automatically collected", "pick up after completed")
        if (block.match(/collected|pick up|unlocks/i)) {
          item.whenCollected = block;
        } 
      // Otherwise, extract timing (e.g., "during", "reward", "unlisted reward, ...")
        else if (block.match(/during|reward|post-quest/i)) {
        // Clean out quantity/verb phrases if they were inside the same block
          let timing = block
          .replace(/\b\d+\s+(?:given|crafted|found|made)\b/gi, "")
          .replace(/,\s*,/g, ",")
          .replace(/^,\s*|\s*,\s*$/g, "")
          .trim();
          item.whenRewarded = timing;
        }
      });

    // 2. Process hyphenated tail rules (e.g., "- limit 1", "- unlocks recipe")
      if (hyphenText) {
        if (hyphenText.match(/^limit/i)) {
          item.maxLimit = hyphenText;
        } else if (hyphenText.match(/^unlocks/i)) {
          item.whenCollected = hyphenText;
        }
      }
    }
    if (showItemDebug) {
      console.log(`Quest-related parameters captured for ${item.name} from source:\n"${item.source}":\ncharacter: ${item.character}\nlevel: ${item.level}\nquestType: ${item.questType}\nquest: ${item.quest}\nqtyRewarded: ${item.qtyRewarded}\nhowObtained: ${item.howObtained}\npostQuestMailboxMessageTitle: ${item.postQuestMailboxMessageTitle}\nwhenRewarded: ${item.whenRewarded}\nwhenCollected: ${item.whenCollected}\nmaxLimit: ${item.maxLimit}`)
    }

  } else {
      console.warn("Failed to parse quest source for item (", item.name, "): ", string); // NOTE: THIS IS BEING HIT 3X PER RUN PER ITEM - 2026.05.26
    }


  }

  // (DDV-31) sample quest sentences and cases moved to the hub, notes/DDV-31-engine-notes.md
  if (isStarPath(item)) {
    // TODO - parse/set tentative icon/collection_icon value
    /*
    // Sample values

    1. "Premium Bundle - Garden Teapot House (____ M) // Star Path - Garden of Whimsy - B3A - Bonus Items (150 tokens)"
    2. "Star Path - Garden of Whimsy - B2C - Bonus Items (25 tokens)"
    3. "Star Path - Paw-fect Romance - 4A - T4 Premium (70 tokens)"
    4. "Star Path - Frost & Fairies - 1D - T1 (8 tokens)"
    5. "Star Path - Elements of Nature - ....."
    6. "Star Path - Winter Warmth - 9A - T9 Premium Bonus (300 tokens)"

    If an item is "Bonus Items", it is premium=yes and bonus=yes

    1. { starpath: "Garden of Whimsy", tile: "B3A", tier: "3", eventtokens: "150", premium: "yes", bonus: "yes" }
    2. { starpath: "Garden of Whimsy", tile: "B2C", tier: "2", eventtokens: "25", premium: "yes", bonus: "yes" }
    3. { starpath: "Paw-fect Romance", tile: "4A", tier: "4", eventtokens: "70", premium: "yes", bonus: "no" }
    4. { starpath: "Frost & Fairies", tile: "1D", tier: "1", eventtokens: "8", premium: "no", bonus: "no" }
    5. { starpath: "Elements of Nature", tile: "", tier: "", eventtokens: "", premium: "", bonus: "" }
    6. { starpath: "Winter Warmth", tile: "9A", tier: "9", eventtokens: "300", premium: "yes", bonus: "yes" }
    */

    // TODO - Giant Lotus Flower House = 9A - T9 Premium Bonus (desired)
    // OR B3A - Bonus Items 3 (could more closely match the sheet data)
    // ...report.html: DATA.starpath.reward_pages[8].name = "Bonus Page 3" .is_bonus = true
    // ...report.html: DATA.starpath.reward_pages[5].name = "Page 6" .is_bonus = false

    const string = item.source;

    // ===== Robust Regex Breakdown =====
    // Star Path -\s+               -> Matches literal prefix
    // ((?:(?! - [A-Z0-9])(?! -\s*\.).)+) -> Captures Star Path Name (stops before tile or dot notation)
    // (?: - ([A-Z0-9]+))?         -> OPTIONAL: Captures Tile (e.g., B3A, 4A)
    // (?: - ([^(\n]+))?            -> OPTIONAL: Captures Tier/Type details up to the opening parenthesis
    // (?:\((\d+)\s+tokens\))?      -> OPTIONAL: Captures Token digits
    const regex = /Star Path -\s+((?:(?! - [A-Z0-9])(?! -\s*\.).)+)(?: - ([A-Z0-9]+))?(?: - ([^(\n]+))?(?:\((\d+)\s+tokens\))?/;
    const match = string.match(regex);

    if (match) {

      const starPathName = match[1].trim(); // star path name
      const tileCode = match[2] || ""; // tile, e.g. 4D, B2C
      const tierType = (match[3] || "").trim();
      const tokens = match[4] ? Number(match[4]) : "";

      // Map extracted regex groups directly to object properties
      item.starpath = starPathName;
      item.tile = tileCode;
      item.eventtokens = tokens;
      item.tier = "";
      item.premium = "";
      item.bonus = "";

      // 1. Determine Tier (Safely extract first digit found in tile or tierType)
      // Extract the first numerical digit found in the tile code or the tier status string
      const tierDigit = (tileCode + tierType).match(/\d/);
      if (tierDigit) {
        item.tier = tierDigit[0];
      }

      // 2. Determine Premium and Bonus Flags using cleaner text flags
      if (tierType) {
        const isBonus = /Bonus/.test(tierType);
        const isPremium = /Premium/.test(tierType) || isBonus;

        item.premium = isPremium ? "yes" : "no";
        item.bonus = isBonus ? "yes" : "no";

      } else if (starPathName && !string.includes(".....")) {
        // Catch-all fallbacks if tierType structure doesn't exist but data is valid
        item.premium = "no";
        item.bonus = "no";
      }
    }
    else {
      console.warn("FAILED TO PARSE ITEM SOURCE (", item.name, "): ", string);
    }
  }

  // ===== Premium Item (may include returning Star Path) =====


  if (isPremium(item)) {
    // TODO - parse/set tentative icon/collection_icon value
    if (item.location.includes('starpath')) {
      item.returning = true; // both premium and returning star path
    }

    // let bundleQty = "TBD";
    // let msCost = "NA"
    // TODO - capture multiple item count
    // eg (x3) should set bundleQty = 3;
    // no parenthetical indicates bundleQty = 1
    // not yet defined = (xX) - should set bundleQty = "TBD"
    // per-item moonstone prices, if relevant, will appear with this formatting: [___ M]
    // if defined, e.g. [250 M] set msCost = 250;
    // if not defined because not present, set msCost = "NA"
    // if defiend with a placeholder, e.g. [___ M], set msCost = "TBD"

    // TODO - parse all bundles, e.g. both mega bundle and premium bundle an item appears in

    /*
    // TEST CASES for item.source values
    Premium Bundle - Swirling Leaves Set (1250 M) (x3) // Premium Bundle - Mega Bundle - Colors of Nature Bundle (6600 M) (x1)
    Premium Bundle - Savanna Living Room Set (1500 M) (x2)
    Premium Bundle - Bioluminescent Set (____ M) (xX)
    Premium Bundle - Winter Gala Ensemble (1500 M) [___ M] // Star Path - Royal Winter - 3F - T3 Premium (30 tokens)
    Premium Bundle - Mickey's 100th-Anniversary Decoration Set (1000 M) [250 M] // Star Path - Centennial - 1E - T1 (30 tokens)
    */

  // =============sat aug 8 335pm 
  /*
    const string = item.source;
    const regex = /Premium Bundle \- ([\"\'\w\W]+) \(([\w\_\d]+) M\)/;
    const result = string.split(regex);
    item.bundleName = result[1];
    item.bundlePrice = result[2];

// --------------------------------

    const string2 = item.source;
    // Regex matching any bundle occurrence in the string
    const regex2 = /Premium Bundle - (.+?) \((\d+) M\)/g;
    const matches = [...string.matchAll(regex2)];

    if (matches.length > 0) {
      // First bundle
      item.bundleName = matches[0][1].trim();
      item.bundlePrice = matches[0][2];

      // Optional: If you need the second bundle when present
      if (matches[1]) {
        item.secondBundleName = matches[1][1].trim();
        item.secondBundlePrice = matches[1][2];
      }
    }
  // =============sat aug 8 335pm 
  */

    // 1. THE EXTENDED REGEX
    // Prefix: Matches "Premium Bundle -" OR "Mega Bundle -" (one or more times)
    // Group 1: Bundle Name (lazy match)
    // Group 2: Bundle Price (digits or underscores)
    // Group 3 (Optional): Quantity inside parentheses, e.g., (x3) or (xX)
    // Group 4 (Optional): Per-item price inside brackets, e.g., [250 M] or [___ M]
    const regexExtended = /(?:(?:Premium Bundle|Signature Bundle|Companion Bundle|Mega Bundle)\s*-\s*)+(.+?)\s*\(([\d_]+)\s*M\)(?:\s*\(([xX\d]+)\))?(?:\s*\[([\d_]+)\s*M\])?/gi;
    
    const matches = [...item.source.matchAll(regexExtended)];
    
    // Create an array to hold all bundle data for this item safely
    item.bundles = [];

    for (const match of matches) {
      const bundleName = match[1].trim();
      let bundlePrice = match[2];
      const qtyMatch = match[3]; // e.g., "x3" or "xX"
      const msMatch = match[4];  // e.g., "250" or "___"

      // Process Quantity
      let bundleQty = 1; // Default
      if (qtyMatch) {
        if (qtyMatch.toLowerCase() === 'xx') {
          bundleQty = "TBD";
        } else {
          bundleQty = parseInt(qtyMatch.replace(/x/i, ''), 10);
        }
      }
      else {
        // if !qtyMatch
        bundleQty = "TBD";
      }

      // TODO FIX: this looks like its being called 3x per item?

      // Process Per-Item Cost
      let msCost = "NA"; // Default
      if (msMatch) {
        if (msMatch.includes('_')) {
          msCost = "TBD";
        } else {
          msCost = parseInt(msMatch, 10);
        }
      }

      // Process TBD Bundle Prices (Dynamic 3-character prefix)
      if (bundlePrice.includes('_')) {
        // Strips non-alphanumeric, grabs first 3 chars, capitalizes
        const prefix = bundleName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
        bundlePrice = `TBA_${prefix}`;
      }

      // Push parsed data to our array
      item.bundles.push({
        bundleName,
        bundlePrice,
        bundleQty,
        msCost
      });
    }

    // Preserve legacy root properties for the first bundle if your existing scripts expect it
    if (item.bundles.length > 0) {
      item.bundleName = item.bundles[0].bundleName;
      item.bundlePrice = item.bundles[0].bundlePrice;
      item.bundleQty = item.bundles[0].bundleQty;
      item.msCost = item.bundles[0].msCost;
    }
    // bundleQty, msCost


// --------------------------------

    if (showItemDebug) {
      console.log(item.bundleName, ' contains the item: ', item.name);
    }
    // item.name == item.bundleName
    if (isStandalone(item)) { 
      item.standalone = true;
      if (showItemDebug) { console.log(item.bundleName, ' IS A STANDALONE ITEM'); }
    }
    else {
      item.standalone = false; // TODO - will be undefined for non-premium items, is this desired?
    }

  } // end isPremium


  // ===== Lorekeeper Tale =====
  if (isTale(item)) {
    const string = item.source;
    // Lorekeeper's Tale (The Incredibles)
    const regex = /Lorekeeper's Tale \(([\w\W ]+)\)/;
    const result = string.split(regex);
    item.taleUniverse = result[1]; // tale value (universe)
  }

  // ===== Craftable Event Item =====
  if (isCraftable(item)) {
    const string = item.source || ""; // error catching in case not defined, can't split something undefined
    // Crafting (Lucky You!)
    const regex = /Crafting \(([\w\W !]+)\)/;
    const result = string.split(regex);
    item.event = result[1]; // Crafting (Event Name)
  }

  // TODO: detect if in-game recipe is required from source
  // todo: item.recipeSource = 
  // TODO: The crafting recipe is unlocked after using a [[XXX_RECIPEITEMNAME_XXX|recipe book]] send through in-game mail during [[XXX_EVENTNAME_XXX|the event]].

  item.itemSource = itemSource;
  item.itemFrom = itemFrom;

  return item;
}

// **** TODO: condition for including premium/Bundle AND starpath???
// TODO - INFOBOX FROM NEEDS TO HAVE BOTH BUNDLENAME AND STAR PATH INFO FOR RETURNING ITEMS
function output_from(item) {
  item = parseItemSource(item); // pretty sure this should have already been called?

  /*if (!item.infoboxFrom) {
      item.missingCategories.push('[[Category: Missing From]]');
    }
    */

  var infoboxFrom = ''; //item.infoboxFrom;
  var itemSource = ''; //item.itemSource; // itemSource is the body text to insert

  // ========== 1 CHECK IF FROM crafting ==========
  //jk this gets overridden
  /*if (isCraftable(item)) {
    infoboxFrom = '|recipe={{name|Petrified Wood|10}}<br>-this might get overriden\n';
    itemSource = 'It can be crafted using a [[:Category:Crafting Stations|Crafting Station]]. -this might get overriden';
  }*/

  // ========== 2 CHECK IF FROM SCROOGE ==========

  var itemSource_scroogeDefault = "It has a chance to be available for purchase as rotating stock from [[Scrooge's Store]]";

  // TODO - items from default scrooge catalog
  // It is one of the items available by default to order from [[Scrooge's Catalog]], and is also available to purchase from [[Scrooge's Store]].

  switch (item.inStore) {
  case 'EI':
  case 'SV':
  case 'WM':
  case 'HW':
  case 'HW - C':
    if (showItemDebug) {
      console.log(item.name, ' is a scrooge item');
    }
    infoboxFrom += "|from=Scrooge's Store (" + item.collection + ")\n|storeSlots=";
    itemSource = itemSource_scroogeDefault + ' in [[' + item.collection + ']]';
    // TODO - more conditional statements, also cosolidate in one place
    if (item.character) {
      itemSource += ` after [[${item.character}]] has joined the Valley`;
    }
    if (item.quest) {
      itemSource += ` after completing the quest [[${item.quest}]]`;
    }
    itemSource += '. ';
    break;

  case 'x':
    if (showItemDebug) {
      console.log(item.name, ' is a scrooge item');
    }
    infoboxFrom = "|from=Scrooge's Store\n|storeSlots="; // basic scrooge params
    itemSource = itemSource_scroogeDefault + '.'; // basic scrooge text
    break;

  case 'x - C':
    if (showItemDebug) {
      console.log(item.name, ' is a scrooge item that is conditional');
    }
    infoboxFrom = "|from=Scrooge's Store\n|storeSlots=";
    itemSource = itemSource_scroogeDefault + ` under certain conditions. `;

    // TODO - more conditional statements, also cosolidate in one place
    if (item.character) {
      itemSource = itemSource_scroogeDefault + ` after [[${item.character}]] has joined the Valley`;
    }
    if (item.quest) {
      itemSource = itemSource_scroogeDefault + ` after completing the quest [[${item.quest}]]`;
    }
    itemSource += '. ';
    break;

  default:
    infoboxFrom = '<!--|from=\n|storeSlots=-->'; // '<!--TODO-->'; // TODO - from=Premium Shop, from=friendship, from=reward, crafting |from=Lorekeeper Tale ****
    itemSource = '<!--SOURCE TODO.-->' + '<!--'+item.source+'-->'; // crafting
    break;
  }

  // try to give things a default scrooge store article text
  // REVISIT - this will cause the collection generation to not appear
  /*
    if (item.source && item.source.includes('Store')) {
      itemSource = itemSource_scroogeDefault + '. '
    }
    */

  if (item.location == 'achievement' || (item.source && item.source.includes('Achievement')) ) {
    let achievementDescription = "<!--, which requires the player to....-->";
    // achievementDescription = ", which requires the player to collect and place four pieces of egg-themed [[Eggstravaganza]] [[Crafting#Furniture|crafted furniture]]"
    // achievementDescription = ", which requires the player to play [[Pooh Sticks]] in the [[Honeyglow Woods]] on seven separate days"

    let achievementTab = item.achievementTab;
    let achievementIcon = item.achievementIcon;
    let achievementName = item.achievementName;
    let achievementLevel = item.achievementLevel;
    //let achievementDescription = achievementDescription;
    let inlineTierInfo = "<!-- at the third tier-->";

    infoboxFrom = `|reward={{inlineIcon|${achievementIcon}|iconOnly|link=Dreamlight#${achievementTab}}} [[Dreamlight#${achievementTab}|"${achievementName}"${achievementLevel} Achievement]]`;
    itemSource = `It is rewarded when redeeming the [[Dreamlight#${achievementTab}|Dreamlight Achievement]] "${achievementName}"${inlineTierInfo}${achievementDescription}.`
  }


  if (isCraftable(item)) {

    if (showItemDebug) {
      console.log(item.name, ' is a craftable item');
    }

    // TODO - check if need to call output_recipe here?

    if (item.event) {
      // if regex Crafting \(([\w+\!]\)
      itemSource = 'It can be crafted using seasonal [[ingredients]] that are available during the [[' + item.event + ']] event at a [[:Category:Crafting Stations|Crafting Station]].'
    } else {
      itemSource = 'It can be crafted using a [[:Category:Crafting Stations|Crafting Station]].';
    }
  }


  // hacky - populate storeslots sorta
  switch (item.location) {
  case "table 1":
  case "table 2":
  case "table 3":
  case "table 4":
    infoboxFrom = infoboxFrom.replaceAll('storeSlots=', 'storeSlots='+item.location);
    break;
  default:
    // quick hack because i don't have store slots tracked in sheet
    // TODO - i DO track table slots and trim, that could be accounted for
    // could also look at the size value and give defaults like lower, upper, etc
    if (infoboxFrom.includes('Scrooge')) {
      infoboxFrom = infoboxFrom.replaceAll('storeSlots=', 'storeSlots=<!--upper/lower-->');
      item.missingCategories.push('[[Category: Missing Store Slot]]');
    }
    break;
  }


  // ========== 3 CHECK IF FROM quest ==========
  if (isQuestItem(item)) {
    if (showItemDebug) {
      console.log(item.name, ' is a quest reward item', item.source);
    }
    placeholderCommentBodyDetailsQuest = `<!--<<It is rewarded after / After>> reaching [[CHARACTER#Friendship Rewards|Friendship Level LEVELNUM]] with [[CHARACTER]] and <<completing / progressing through>> the quest [[QUESTNAME]], it / <<is given/can be crafted>> during the quest, / is placed in the Valley and will remain placed after the quest is completed<<, where it is replaced with a collectible version>>.--><!--It is automatically collected during the quest. / It can be collected by picking it up.--><!--It is sent via in-game mail after reaching [[CHARACTER#Friendship Rewards|Friendship Level LEVELNUM]] with [[CHARACTER]] and completing the quest [[QUESTNAME]]. It is collected upon claiming it from the mailbox.-->`;




    /*
      // CASES TO HANDLED
      Sadness Level 4 quest (The Fortress of Saditude) (during) - limit 1
      Hades Level 10 quest (Fine, I'll Do It Myself) (reward) - limit 1
      Pocahontas Level 10 quest (A Raccoon's Return) (during)
      Pocahontas Level 10 quest (A Raccoon's Return) (4 during)
      Winnie the Pooh story quest (Epilogue: See You Next Summer) - unlocks automatically (unlisted reward during)
      Winnie the Pooh story quest (Interlude 4: Curiosity Satisfied) (reward) 
      Cinderella Level 10 Quest (The Friendship Ball) (post-quest mailbox reward) ("I found this...")
      Winnie the Pooh story (Chapter 11: The Anti-monster Camp) (1 crafted during) (unlocks recipe)
      Winnie the Pooh story (Chapter 11: The Anti-monster Camp) (1 crafted during) - unlocks recipe // Welcoming Signpost
      Crafting after Joy Level 7 quest (Imagination Land) (reward) // Imagination Land Arch
      */



    /*
Quest-related parameters captured for Heroic Helmet from source:
"Crafted during Eeyore Story quest (Chapter 5: The Big Red Monster)":
character: Eeyore
level: 
questType: Story
quest: Chapter 5: The Big Red Monster
qtyRewarded: 
howObtained: 
postQuestMailboxMessageTitle: 
whenRewarded: 
whenCollected: 
maxLimit: 

should be: It [[Crafting|crafted]] during the Honeyglow Woods [[Eeyore]] story quest [[Chapter 5: The Big Red Monster]]
output: After completing the [[Eeyore#Quests|Eeyore]] story quest [[Chapter 5: The Big Red Monster]]. 

It [[Crafting|crafted]] during the Honeyglow Woods [[Eeyore]] story quest [[Chapter 5: The Big Red Monster]], and will remain in the wardrobe after the quest is complete. 
After progressing through the [[Eeyore#Quests|Eeyore]] story quest [[Chapter 5: The Big Red Monster]], it is crafted during the quest, placed in the Village<!--Valley/[[VILLAGEorBIOME]]-->, and it will remain placed after the quest is completed. 


*/



    // TODO - more flexible placeholder language
    if (item.whenRewarded && item.whenRewarded.includes('reward')) {
      // values: unlisted reward, reward
      infoboxFrom = `|reward=${output_QuestTemplate(item)}`;
    }
    else if ((item.source.includes('unlocks recipe') || item.source.includes('Crafting after ')) || item.location == 'quest/crafting' ){
      infoboxFrom = `|unlockquest=${output_QuestTemplate(item)}`;
    }
    else {
      infoboxFrom = `|from=${output_QuestTemplate(item)}`;
    }

    let actionVerb = 'completing';
    if (item.whenRewarded && item.whenRewarded.includes('during')) {
      actionVerb = 'progressing through'
    }

    // After completing/After progressing in
    itemSource = `After`;

    if ( capitalize(item.questType) == 'Story' ) {
      itemSource += ` ${actionVerb} the [[${item.character}#Quests|${item.character}]] story quest [[${item.quest}]]`;
    }
    else {
      itemSource += ` reaching [[${item.character}#Friendship Rewards|Friendship Level ${item.level}]] with [[${item.character}]]`;
      itemSource += ` and ${actionVerb} the quest [[${item.quest}]]`;
    }
    if (actionVerb == 'completing') {
      itemSource += `.`;
    }
    else {
      itemSource += `,`;
    }

    if ((item.source.includes('unlocks recipe') || item.source.includes('Crafting after ')) && item.howObtained == '') {
      item.howObtained = 'crafted';
    }

    if (item.howObtained && item.howObtained != 'obtained' || (item.source.includes('unlocks recipe') || item.source.includes('Crafting after ')) ) {
      let tempItemQty = item.qtyRewarded ? insertNumberWord(item.qtyRewarded) : 'one';
      // one is crafted during the quest, placed in the [[Nectar Apiary]],
      // and will remain placed after the quest is completed.
      tempItemQty = (tempItemQty=='one') ? 'it is' : tempItemQty + ' are'
      itemSource += ` ${tempItemQty} ${item.howObtained} during the quest`;

      if (item.itemType != 'Clothing') {
        itemSource += `, placed in the Village<!--Valley/[[VILLAGEorBIOME]]-->, `;
        itemSource += `and `;
        itemSource += (item.qtyRewarded>1) ? `they `: `it `;
        itemSource += `will remain placed after the quest is completed`;
      }
      itemSource += `.`;

    }
    else {

      // TODO - "reward" items are currently incorrectly outputting "After reaching XX" and need replacement to not create a sentence fragment
      // ideally want to prevent this from happening rather than replacing after the fact
      if (item.whenRewarded && item.whenRewarded.includes('reward') || item.whenRewarded == 'reward' || item.whenReward == 'post-quest mailbox reward') {
        itemSource = itemSource.replace(/^After reaching/g, 'It is rewarded after reaching');
      }
      /*else {
          itemSource += ` it is made available.`;
        }  */
    }

    if (item.source.includes('unlocks recipe') || item.source.includes('Crafting after ')) {
      itemSource += ` After that quest the [[Crafting|crafting recipe]] will be permanently unlocked.`;
    }

    if (item.source.includes('automatically collected')) {
      // unless overtly stated from sheet source, do not specify how/when it is collected
      itemSource += ` It is automatically collected during the quest.`;
    }
    if (item.source.includes('pick up')) {
      // unless overtly stated from sheet source, do not specify how/when it is collected
      itemSource += ` It can be collected by picking it up.`;
    }
    if (item.maxLimit == 'limit 1') {
      itemSource += ` It is unique and is limited to one.`;
    }
    if (item.whenRewarded && item.whenRewarded.includes('post-quest mailbox reward')) {
      let postQuestMessageTitle = item.postQuestMessageTitle || 'MESSAGETITLE';
      itemSource += ` After the quest is complete, [[${item.character}]] will send a mail message <!-- titled ''"${postQuestMessageTitle}"''--> with this item attached.`;
      itemSource += `It is collected upon claiming it from the mailbox.`;
    }


    // above applies to furniture and crafted furniture, overwrite it all if it is clothing

    // && item.howObtained == 'crafted' || item.whenRewarded == 'crafted during'
    if (item.itemType == 'Clothing' && (item.whenRewarded && !item.whenRewarded.includes('reward'))) {

      // TODO: fix this: "After progressing through the [[Eeyore#Quests|Eeyore]] story quest [[Chapter 5: The Big Red Monster]], it is crafted during the quest."
      // its awkward, should instead be "It is [[Crafting|crafted]] during the [[Eeyore#Quests|Eeyore]] story quest [[Chapter 5: The Big Red Monster]]."

      // It given by [[Eeyore]] during the quest [[Tails and Tribulations]],
      // After reaching [[Eeyore#Friendship Rewards|Friendship Level 4]] with [[Eeyore]] and progressing through the quest [[Tails and Tribulations]],
      // reaching [[Jasmine#Friendship Rewards|Friendship Level 10]] with [[Jasmine]] and completing the quest [[Wild, Wild Wishes]].

      let clothingObtainTextInline = 'obtained<!--[[Crafting|crafted]]/given by [[CHARACTER]]-->';

      //[[Eeyore]] level 7 [[friendship]] quest [[The Shy Villagers Society]]
      // It is ${clothingObtainTextInline} during the .
      // It is ${clothingObtainTextInline} during the .

      let inlineQuestLink = `[[${item.character}#Quests|${item.character}]] quest [[${item.quest}]]`;

      // TODO - account for story quest vs friendship quest
      // if Story quest --> inlineQuestLink = `[[${item.character}#Quests|${item.character}]] story quest [[${item.quest}]]`;
      // if friendship quest --> inlineQuestLink = `[[${item.character}#Quests|${item.character}]] Level ${item.level} friendship quest [[${item.quest}]]`;


      itemSource = `It is ${clothingObtainTextInline} during the ${inlineQuestLink}.`;
    }

    // quick and hacky for update day use cases - override all logic above and give every item that flags isQuestItem(item) = true with this
    let useDummyQuestFallback = false;

    if ( useDummyQuestFallback || (infoboxFrom == '' && itemSource == '') || item.qtyRewarded == '' && item.howObtained == '' && item.whenCollected == '' && item.whenRewarded == '') {
      // total default fallback if not assigned before this
      // no level defined in input - assume reward language - TODO
      infoboxFrom = `|from=${output_QuestTemplate(item)}`;


      // It is available in connection with the quest [[QUESTNAME]].
      itemSource = `It is obtained in association with the [[${item.character}#Quests|${item.character}]] quest [[${item.quest}]].`;
      // itemSource = `It is obtained in association with reaching [[${item.character}#Friendship Rewards|Friendship Level ${item.level}]] with [[${item.character}]] and progressing in the quest [[${item.quest}]].`;
      itemSource += placeholderCommentBodyDetailsQuest;

    }

  }

  // ========== 4 CHECK IF FROM STARPATH (either returning or current)==========

  // EXAMPLE: "source":"Star Path - Lovely Monsters - 3E - T3 (25 tokens)\nPremium Bundle - Monster Plushies (1200 M) [___ M]"
  //item.location && item.location.includes('starpath') ||  item.source && item.source.includes('Star Path')

  if (isStarPath(item)) {
    if (showItemDebug) {
      console.log(item.name, ' is/was a star path item');
    }

    // source should have already been parsed in parseItemSource
    // properties: starpath, tile, tier, premium, eventtokens, bonus

    infoboxFrom = `|from=${item.starpath} Star Path`;
    if (item.bonus == "yes") {
      infoboxFrom += `\n|bonus=${item.bonus}`;
    }
    infoboxFrom += `\n|tier=${item.tier}\n|premium=${item.premium}\n|eventTokens=${item.eventtokens}`;

    if (showItemDebug) {
      console.log(`Various item props for source ${item.source}:   ===  item.premium: ${item.premium}   item.bonus: ${item.bonus}  `)

    }

    itemSource = generateReturningPremiumStarPathBodyText(item);

  }

  // ========== 5 CHECK IF PREMIUM ITEM (may include returning starpath) ==========

  if (isPremium(item)) {
    if (showItemDebug) {
      console.log(item.name, ' is a premium item');
    }

    // source should have already been parsed in parseItemSource
    // properties: bundleName, bundlePrice, also adjusted for placeholder vals

    // item is a returning star path item to premium shop
    if (item.returning) {
      infoboxFrom = `|from=${item.starpath} Star Path`;
      if (item.bonus == "yes") {
        infoboxFrom += `\n|bonus=${item.bonus}`;
      }
      infoboxFrom += `\n|tier=${item.tier}\n|premium=${item.premium}\n|eventTokens=${item.eventtokens}`;
    } else {
      // item is a premium shop only, not a returning star path item
      infoboxFrom = `|from=Premium Shop`;
    }

    // standalone item
    if (item.standalone) {
      if (showItemDebug) {
        console.log('ITEM IS STANDALONE:  ', item.name);
      }
      infoboxFrom += `\n|bundleName=${item.bundleName} (Bundle){{!}}${item.bundleName}`;
    } else {
      // item is part of a premium set, NOT standalone
      infoboxFrom += `\n|bundleName=${item.bundleName}`;
    }

    infoboxFrom += `\n|bundlePrice=${item.bundlePrice}`;
    itemSource = generateReturningPremiumStarPathBodyText(item);
  }

  // value of collection should already be changed from DV-->Dreamlight Valley by some other collection function from the infobox

  // ========== 6 CHECK IF FROM friendship ==========
  if (item.location == 'friendship' || item.location == 'premium/friendship') {
    if (showItemDebug) {
      console.log(item.name, ' is a friendship reward item', item.source);
    }

    let infoboxBundleLink = `${item.bundleName} (Bundle){{!}}${item.bundleName}`;
    let bodyBundleLink = `${item.bundleName} (Bundle)|${item.bundleName}`;
    if (!isKnownCompanion(item.bundleName)) {
      // if item.bundleName != any of the known companion names, assume the bundle it is included in is not named identically to the companion
      // e.g. Amelia's Pink Goose House --> inside Abigail and Amelia the Geese != Abigail the Goose
      // e.g. Mochi's Cat House --> inside Mochi (Bundle) == Mochi
      // e.g. Figaro's House --> inside Figaro Bundle != Figaro
      infoboxBundleLink = item.bundleName;
      bodyBundleLink = item.bundleName;
    }

    // source should have already been parsed in parseItemSource
    if (item.location == 'premium/friendship') {
      infoboxFrom = `|reward={{Friendship|${item.character}|${item.level}}}\n|from=Premium Shop\n|bundleName=${infoboxBundleLink}\n|bundlePrice=${item.bundlePrice}`;
    }
    else if (item.location == 'friendship') {
      infoboxFrom = `|reward={{Friendship|${item.character}|${item.level}}}`;
    }

    itemSource = `It is automatically rewarded after reaching [[${item.character}#Friendship Rewards|Friendship Level ${item.level}]] with [[${item.character}]]`;
    if (item.location == 'premium/friendship') {
      // this is a bit of a hack - assuming that the bundle will be a standalone item named after the companion - will need manual refining
      itemSource += `, which is available to purchase from the [[Premium Shop]] in the [[${bodyBundleLink}]] bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}`;
    }

    itemSource += `.`;

    // TODO: PREMIUM + FRIENDSHIP ITEMS
  }

  // todo: tale/crafting
  // ========== 7 CHECK IF FROM tale ==========
  if (isTale(item)) {

    if (showItemDebug) {
      console.log('item.taleUniverse: ', item.taleUniverse);
    }

    infoboxFrom = '|from=Lorekeeper Tale';
    // parseitemsource should have provided item.taleUniverse
    itemSource = `It can be collected as a reward after reordering the [[Snippets#Lorekeeper Tales| ${item.taleUniverse} Lorekeeper Tale]].`;
  }

  // Saved on the item (objects are passed by reference); microTemplate fills %%infoboxFrom%% and %%itemSource%% when the article is put together
  item.infoboxFrom = infoboxFrom;
  item.itemSource = itemSource; // TODO: i think this is being reverted to an empty string?

  var output = '%%infoboxFrom%%\n';
  return output;
}

function isKnownCompanion(name) {
  switch (name) {
  case 'Abigail the Goose':
  case 'Amelia the Goose':
  case 'Baby Pegasus':
  case 'BB—8':
  case 'Dinah':
  case 'Figaro':
  case 'Heihei':
  case 'Lucky':
  case 'Max':
  case 'Mochi':
  case 'Nana':
  case 'Percy':
  case 'R2-D2':
  case 'Rajah':
  case 'The Footstool':
    return true;
  default:
    return false;
  }
  return false;
}


function output_itemSource(item) {

  // TODO - pull logging into here for premium, star path, star path returning to premium, etc
  var output = '%%itemSource%%';
  return '\n\n' + output;
}

function output_collectionStatus(item) {
  var output = ''; //'ITEM COLLECTION STATUS INFO';

  var collectionText = '';
  /* 2025.04.23 - WHY DID THESE STOP INTERPOLATING */

  var clothingCollectionText =
  ' Once collected it will be added to the [[:Category: %%collection%% %%itemType%% Sets Collection|%%collection%% %%itemType%% Sets Collection]].';
  // TODO 2026.04.01 - CLEANUP - may not be added to both? needs verification/detecting
  var craftingCollectionText =
  ' Once collected it will be added to both the [[:Category:%%collection%% Crafting Collection|%%collection%% Crafting Collection]] and the [[:Category:%%collection%% Furniture Sets Collection|%%collection%% Furniture Sets Collection]].';
  var furnitureCollectionText =
  " Once collected it will be added to the [[:Category:%%collection%% %%itemType%% Sets Collection|%%collection%% %%itemType%% Sets Collection]] and more can be ordered from [[Scrooge's Store#Catalog|Scrooge's Catalog]].";

  //var clothingNoCollectionText = ' Once collected it will not be added to the [[:Category:Untracked Clothing Sets Collection|Clothing Sets Collection]].';

  // global param at top of this file, indicate whether to wrap or not
  // but never wrap if the item is returning
  if (collectionConfirmed || item.returning) {
    if (item.itemType == 'Clothing') {
      collectionText = clothingCollectionText;
    } else {
      collectionText = furnitureCollectionText;
      if (item.location && item.location.includes('crafting')) {
        collectionText = craftingCollectionText;
      }
    }
  } else {
    if (item.itemType == 'Clothing') {
      collectionText = wrapUnconfirmedCleanup(clothingCollectionText);
    } else {
      collectionText = wrapUnconfirmedCleanup(furnitureCollectionText);
      if (item.location && item.location.includes('crafting')) {
        collectionText = wrapUnconfirmedCleanup(craftingCollectionText); // todo verify closing braces okay
      }
    }
  }
  if (isCharacterDreamStyle(item)) {
    // overwrite the collection value
    collectionText = "";
  }
  // todo  - move untracked logic here instead of jankycleanup
  if (item.collection == "" || item.collection == "none" || item.collection == "--") { // do NOT check for "includes" -- because might flag with comments

    collectionText = ` It is not tracked in the `;
    //collectionText = `Once collected it will not be added to the `;
    let inlineItemType = (item.itemType == 'Crafted Furniture') ? 'Furniture' : item.itemType;
    collectionText += `[[:Category:Untracked ${inlineItemType} Sets Collection|${inlineItemType} Sets Collection]]`;

    if (item.itemType == 'Furniture' || item.itemType == 'Crafted Furniture') {
      if (item.location && item.location.includes('crafting')) {
        collectionText += ` or [[:Category:Untracked Crafting Collection|Crafting Collection]]`;
      }
      if (item.source.includes('limit')) {
        collectionText += `, and more cannot be`;
        if (item.location && item.location.includes('crafting')) {
          collectionText += ` crafted or`;
        }
        collectionText += ` ordered from [[Scrooge's Store#Catalog|Scrooge's Catalog]]`;
      }
    }

    collectionText += `.`;
  }


  if (isAccessory(item)) {
    collectionText = " Once collected it will not be added to the [[:Category:Untracked Clothing Sets Collection|Clothing Sets Collection]].";
  }

  return collectionText;
}

function wrapUnconfirmedCleanup(text) {
  return '{{cleanup|Uncomment once confirmed --' + text + '}}';
}

function output_itemUsage(item) {
  var output = '\n\n';
  //itemUseIntro and itemUseBody set on each item inside output_itemIntro

  if (item.itemType == 'Clothing') {
    output +=
    'It can be equipped using the [[Wardrobe menu]] inside the [[Inventory]]';



    if (isHairstyle(item)) {
      output += ", in the [[Wardrobe menu#Hairstyle|Hairstyle]] section under '''Customize'''";
    }
    if (isAccessory(item)) {
      output += ", and is found in the '''Accessories''' tab. Once equipped it can be toggled out or away by using the same [[Controls|control]] as for using a Tool if no other [[Tools|Tool]] is currently equipped";
    }
    output += '.';
  } else if (item.itemType == 'Dream Style') {
    output += "It can be applied from the [[Characters]] tab of the [[Collections]] menu."; // no additional info
  } else {

    // item.itemType is not Clothing, so furniture or crafted furniture -- NO reevaluate....
    output += 'It can be positioned and placed using the [[Furniture menu]] inside the [[Inventory]]';

    switch (item.placement) {
    case 'surfaces':
      output += ', and it can be placed either on the ground or on surfaces.';
      break;
    case 'walls (indoor)':
    case 'walls': // expected value at this point
      output += ', and must be placed indoors on a wall.'; /*TODO is this being hit? naboo decor..., naboo fireplace not triggering proper reaading of environment etc*/
      break;
    case 'wall-mounted':
      output += ', and must be placed indoors against a wall.';
      break;
      case 'ceiling (indoor)': // correct value from sheet
      case 'ceilings': // should be converted to this value by this point
      case 'ceilings (indoor)':
        output +=
        ', and must be placed indoors from the ceiling.';
      default:
        output += '';
      }

      // TODO - in case !categoriesColorsTraitsConfirmed (eventually needs its own variable for size/placement/surfacearea/environment), this text should be wrapped with comment until confirmed
      if (item.environment == 'outdooronly' && item.placement == 'water' ) {
        output += ', and it can only be placed outdoors on water.';
      }
      else if (item.environment == 'outdooronly') {
        output += ', and it can only be placed outdoors.';
      }

      if (item.functions && item.functions.includes('Table - ')) {
        item.surfaceArea = '' + item.functions.split(' - ')[1];
      item.functions = ''; // in wiki Table isn't a function, just my sheet
    }

    // item.functions.includes('Table') || item.surfaceArea
    if (item.surfaceArea) {
      output +=
      ', and other objects can be placed upon its ' +
        item.surfaceArea + //'<!--WxD -->' +
        ' surface area.';
    } // ***** TODO - use case where we know its a table but either don't know surface area
    // or the surface area is weirdly shaped/structured in format e.g. "2 slots", so leave it generic - check number of spaces

    // TODO - appropriate text for returning SP item wallpaper/flooring - currently not working
    if (isWallpaperFlooring(item)) {
      //output = "Once collected it can be applied to rooms inside the [[Player's House]] using the [[Furniture menu]] inside the [[Inventory]].";
    }


    // add a period at end if doesnt exist
    if (output.charAt(output.length - 1) != '.') output += '.';

    output += item.itemUseBody; // set in output_itemIntro - super hacky of me
  }

  // janky - create full sentence with environment
  // TODO - in case !categoriesColorsTraitsConfirmed (eventually needs its own variable for size/placement/surfacearea/environment), this text should be wrapped with comment until confirmed

  output = output.replace(', and it can only be placed outdoors\.\,', ', it can only be placed outdoors, ');


  return output;
}


function output_QuestTemplate(item) {
  let questName = item.quest || 'QUESTNAME';
  let questType = item.questType || ''; // either 'story' or ''
  let characterName = item.character || 'CHARACTERNAME';
  //let levelNum = item.level || 'LEVELNUM';

  let output = `{{quest|${questName}|friendship=${characterName}`;
  output += item.level ? `|level=${item.level}` : ``;
  output += questType ? `|realm=${capitalize(questType)}`: ``;
  output += `}}`;

  //`|reward={{quest|${item.quest}|friendship=${item.character}|level=${item.level}}}`;

  return output;
}

function output_itemUsageTables(item) {

  var questObjectiveTable = `\n<!--\n`;
  questObjectiveTable += `==Quest Objectives==\n{{Objectives|header}}`;
  questObjectiveTable += `\n{{ObjectivesRow|`;
  questObjectiveTable += output_QuestTemplate(item);
  questObjectiveTable += `|QUANTITY`;
  questObjectiveTable += `|Place <near the base of POI> on [[Dazzle Beach]]/in the [[BIOME]]/in the Valley.}}`; // Craft and deliver to [[Sadness]].
  questObjectiveTable += `\n{{Objectives|footer}}\n-->`;

  if (isQuestItem(item) && item.whenRewarded && item.whenRewarded != 'reward' && !item.whenRewarded.includes('post-quest mailbox reward')) {
    return questObjectiveTable;
  }
  return '';
}

function output_mailboxMessage(item) {
  var mailboxMessage = `\n<!--\n==In-Game Messaging==\n:; MESSAGETITLE\n\n:Dear {Player},\n\n:MESSAGEBODY-->`;

  if (isQuestItem(item) && item.whenRewarded && item.whenRewarded.includes('post-quest mailbox reward')) {
    return mailboxMessage;
  }
  return '';
}


function output_itemIntro(item) {
  var itemUseIntro = '';
  var itemUseBody = '';

  switch (item.category) {
  case 'Gloves':
  case 'Glasses':
  case 'Earrings':
  case 'Pants':
  case 'Shoes':
  case 'Shorts':
    itemUseIntro_clothing = ' pair of ' + item.category.toLowerCase() + ' [[clothing]].';
    break;
  case 'Hose Socks':
    itemUseIntro_clothing = ' pair of ' + 'socks' + ' [[clothing]].';
    break;
  case 'Back':
    itemUseIntro_clothing = ' piece of ' + 'back' + ' [[clothing]].';
    break;
  case 'Bracelets':
    itemUseIntro_clothing = ' piece of ' + 'bracelet' + ' [[clothing]].';
    break;
  case 'Coats':
    itemUseIntro_clothing = ' piece of ' + 'coat' + ' [[clothing]].';
    break;
  case 'Costumes':
    itemUseIntro_clothing = ' piece of ' + 'costume' + ' [[clothing]].';
    break;
  case 'Dresses':
    itemUseIntro_clothing = ' piece of ' + 'dress' + ' [[clothing]].';
    break;
  case 'Hats':
    itemUseIntro_clothing = ' piece of ' + 'hat' + ' [[clothing]].';
    break;
  case 'Masks':
    itemUseIntro_clothing = ' piece of ' + 'mask' + ' [[clothing]].';
    break;
  case 'Neckwear':
    itemUseIntro_clothing = ' piece of ' + 'neckwear' + ' [[clothing]].';
    break;
  case 'Skirts':
    itemUseIntro_clothing = ' piece of ' + 'skirt' + ' [[clothing]].';
    break;
  case 'Tops':
    itemUseIntro_clothing = ' piece of ' + 'top' + ' [[clothing]].';
    break;
  case 'Hairstyle':
    itemUseIntro_clothing = ' piece of ' + '[[:Category:Hairstyle|hairstyle]]' + ' [[clothing]].';
    break;
  case 'Accessories':
    itemUseIntro_clothing = ' piece of ' + '[[:Category:Accessories|accessory]]' + ' [[clothing]].';
    break;
  case 'Character':
  case 'Character Dream Style':
      // this case does not seem to be catching?
    itemUseIntro_clothing = '';
    break;
  default:
    itemUseIntro_clothing = ' piece<!--/pair--> of <!--back/costume/dress/shoes--> [[clothing]].';
  }
  //'<!--Accessories, companions, tools, Gliders-->';

  if (showItemDebug) {
    console.log("item.functions for ", item.name, ": ", item.functions);
  }

  /*// no idea why this isn't being caught in switch above
  if (isCharacterDreamStyle(item)) {
    itemUseIntro_clothing = '';
  }*/

  switch (item.functions) {
  case 'Light (Constant)':
  case 'Lighting (Constant)':
    itemUseIntro = 'lighting';
      itemUseBody = ' Once it is placed in the world, the object acts as a light source, but the Player cannot interact with it.'; // ....
      break;
    case 'Light (Automatic)':
    case 'Lighting (Automatic)':
      itemUseIntro = 'lighting';
      itemUseBody = ' Once it is placed in the world, the object acts as a light source, but the Player cannot interact with it. It will automatically turn on or off depending on the [[Environment#Time-Based Lighting Effects|time of day]].'; // ....
      break;
    case 'Light (Interact)':
    case 'Light':
    case 'Lighting':
      itemUseIntro = 'lighting';
      item.functions = 'Lighting';
      itemUseBody = ""; // assigned below 
      break;
    case 'Arch':
      itemUseIntro = 'arch';
      itemUseBody = ''; // " Once it is placed in the world, the Player can walk underneath and through the object."
      break;
    case 'Fireplace (Interact)':
    case 'Fireplace':
      itemUseIntro = 'fireplace';
      itemUseBody = " Once it is placed in the world, the Player can '''Interact''' with the object to toggle it on and off."; // it vs its fire?
      break;
    case 'Fountain':
      itemUseIntro = 'fountain';
      itemUseBody = ''; // " Once it is placed in the world, the object will have constant fountain animation and sound effects.
      break;
    case 'Rug':
      itemUseIntro = ''; //'rug'; many "under" items aren't considered rugs - i'll keep it in my sheet but not output to wiki
      itemUseBody = ''; //
      break;
    case 'Sit':
      itemUseIntro = 'seating'; //'<!--seating/bed-->';
      itemUseBody = ''; // overridden below
      break;
    case 'Lounge':
      itemUseIntro = 'bed';//'seating'; //'<!--seating/bed-->'; // sometimes this is bed... but should probs just display seating anyway, as bed has no intrinsic meaning
      itemUseBody = " Once it is placed in the world, the Player can '''Lounge''' on the object.";
      break;
      // 2025.12.09 - TODO - investigate this
      /*case 'Table':
        itemUseIntro = 'table';
        itemUseBody =
          ', and other objects can be placed upon its ' +
          '<!--WxD -->' +
          'surface area.';
        break;*/
    case 'Window':
      itemUseIntro = 'window';
      itemUseBody = ''; // " Once it is placed in the world, the object will let light through into the room, depending on the cardinal direction and time of day of the environment light source.
      break;
    case 'Crafting Station':
      itemUseIntro = '';
      itemUseBody = '';
      break;
    case 'Cooking Station':
      itemUseIntro = '';
      itemUseBody = '';
      break;
    case 'Companion Home':
      itemUseIntro = '';
      itemUseBody = '';
      break;
      // TODO - FIX THIS FXALITY
      /*case "-":
        // Data input must indicate "-" in functions cell - then don't include filler comments, regardless of value of functionsConfirmed
          itemUseIntro = '';
          itemUseBody = '';
        break;*/
    default:
      itemUseIntro = '<!--seating/gathering/lighting/window/table/rug-->'; // TODO - this isn't catching
      itemUseBody =
      "<!--, and it can be placed either on the ground or on surfaces.--><!--, and must be placed on/against a wall.--><!--, and it can only be placed outdoors.--><!--, and other objects can be placed upon its WxD surface area.--><!-- Once it is placed in the world, the Player can '''Sit/Lounge''' on the object.--><!--Once it is placed in the world, the Player can '''Interact''' with the object to toggle its light /and sound/animation/ on and off.-->";
      // TODO - modify data input so that items without functions are a "-" value, then detect that
      // if item is returning we know its functions already
      if (functionsConfirmed || item.returning) {
        itemUseIntro = '';
        itemUseBody = '';
      }
    }

    if (item.functions && (item.functions.includes('Table') || item.functions.includes('slots'))) {
        itemUseIntro = 'table';
        //itemUseBody = ', and other objects can be placed upon its ' + '<!--WxD -->' +'surface area.';
        // pretty sure itemUseBody is done in a different function
    }

    // mixed feelings on whether to replace or not, because "bed" vs "seating" has no intrinsic game meaning
    if (itemUseIntro == 'seating' && item.category.includes("Bed")) {
      // CR04: `==` compares instead of assigning, so beds stay "seating" (fix is DDV-24, B35)
      itemUseIntro == 'bed'
    }

    if (item.functions && item.functions.includes('Sit')) {
      itemUseBody = " Once it is placed in the world, the Player can '''Sit''' on the object.";
    }


  // TODO: this is overriding any values set above, need to fix
  // janky catch for more lighting objects - this is not robust!!!! cases where i've written extra info in the box
    if (item.functions && item.functions.includes('Light')) {
      itemUseIntro = 'lighting';

      itemUseBody = "<!-- Once it is placed in the world, the Player can '''Interact''' with the object to toggle its light on and off. // the object acts as a light source, but the Player cannot interact with it. It will automatically turn on or off depending on the [[Environment#Time-Based Lighting Effects|time of day]]. -->";

      if (item.functions.includes('Constant')) {
        itemUseBody = "<!-- Once it is placed in the world, the object acts as a light source, but the Player cannot interact with it. It will automatically turn on or off depending on the [[Environment#Time-Based Lighting Effects|time of day]]. -->";
      }
      if (item.functions == 'Lighting') {
        itemUseBody = " Once it is placed in the world, the Player can '''Interact''' with the object to toggle its light on and off.";
      }
      
    }


  // override default filler content for wallpaper and flooring, which don't use "function"
    if (isWallpaperFlooring(item)) {

    // TODO - these are not catching 2025.08.19
      if (
        item.name.includes('Wallpaper') ||
        item.category == 'Wallpaper' ||
        item.category == 'Trim - Wallpaper'
        ) {
        itemUseIntro = 'wallpaper';
      itemUseBody = 'wallpaperflooring.';
    }
    if (
      item.name.includes('Floor') ||
      item.name.includes('Flooring') ||
      item.category == 'Flooring' ||
      (item.category && item.category.includes('Flooring')) ||
      (item.category && item.category == 'Trim - Flooring')
      ) {
      itemUseIntro = 'flooring';
    itemUseBody = 'wallpaperflooring.';
  }
}
  // Once collected it can be applied to rooms inside the [[Player's House]] using the [[Furniture menu]] inside the [[Inventory]].


var output = '';
output += "'''" + item.name + "'''";
output += createUniverseLink(item.itemType, item.universe);

if (item.itemType == 'Clothing') {
  output += itemUseIntro_clothing;
}
if (item.itemType == 'Furniture' || item.itemType == 'Crafted Furniture') {
  if (item.location && item.location.includes('crafting')) {
    output += ' piece of ' + itemUseIntro + ' [[Crafting#Furniture|craftable furniture]]';
      //collectionStatus = collectionStatus_furnitureCrafted;
  } else {
    output += ' piece of ' + itemUseIntro + ' [[furniture]]';
      //collectionStatus = collectionStatus_furniture;
  }

    // SO JANKY and repetitive but its working

  if (item.functions && item.functions.includes('Storage (')) {
    output += " that has <!--16/32/48--> inventory spaces";
    itemUseBody = " Once placed it can be interacted with to store items outside of the [[Inventory|Player's Backpack]]. Crafting materials and cooking ingredients in storage are accessible at [[:Category:Crafting Stations|Crafting Stations]] and [[:Category:Cooking Stations|Cooking Stations]] even though they are no longer in Inventory.";
  }
  if (item.functions && item.functions.includes('Cooking Station')) {
    output += " that functions as a [[:Category:Cooking Stations|cooking station]]";
    itemUseBody = " Once it is placed in the world, the Player can '''Use''' the item as a [[:Category:Cooking Stations|Cooking Station]] to make [[Cooking|meal recipes]].";
      //itemUseBody = " Once it is placed in the world, the Player can interact with ('''Use''') the item as a [[:Category:Cooking Stations|Cooking Station]] to make [[Cooking|meal recipes]].";
  }
  if (item.functions && item.functions.includes('Crafting Station')) {
    output += " that functions as a [[:Category:Crafting Stations|crafting station]]";
    itemUseBody = " Once it is placed in the world, the Player can '''Use''' the item as a [[:Category:Crafting Stations|Crafting Station]] to make [[Crafting|crafting recipes]].";
  }
  if (item.functions && item.functions.includes('Gathering')) {
      output += ""; //" that functions as a [[:Category:Gathering.....|....]]";

      // TODO: detect and insert number of villagers from functions=Gathering (X)
      // Gathering (3)
      //var numVillagers = '2';

      //const str = "functions=Gathering (3)";

      const match = item.functions.match(/\((\d+)\)/);
      const numVillagers = match ? parseInt(match[1], 10) : null;

      itemUseBody = '\n\nIt has a special gathering function. When the player stands beside it will highlight and prompt to gather villagers, and activating the [[Camera]] will fade the screen out and teleport ' + numVillagers + ' random villagers to the location.';
      // also i hate this wording
    }
    if (item.functions && item.functions.includes('Companion Home')) {
      output += " that functions as a [[:Category:Companion Home|companion home]]";
      itemUseBody = " Once it is placed in the world, the Player can '''Interact''' with the item to select up to 4 [[Companions|companions]]. These companions will roam in the immediate area and interact with nearby [[:Category:Companion Interest|Companion items]].";
    }

    output += ".";
  }

  
  if (isCharacterDreamStyle(item)) {
    var charProperName = determineCharacterFromDreamStyle(item.name);
    var uni = getCharacterUniverse(charProperName);

    itemUseIntro = ` that can be applied to the [[Dream Styles#${uni}|${uni}]] Character [[${charProperName}]].`;
    output += itemUseIntro;
  }

  // item is the row object itself (objects are passed by reference), so these are seen by the functions that run after this one
  item.itemUseIntro = itemUseIntro;
  item.itemUseBody = itemUseBody;

  return output;
}


// may not be ALL related items total, will be limited to whatevers in bundleArray
function assignRelatedItemsFromInputArray(item, bundleArray) {

  item.relatedItems = [];
  bundleArray.forEach(function(bundleItem) {

    // make sure the name of bundle is defined, otherwise everything without a bundle will lump together
    if (bundleItem.bundleName) {
      if (bundleItem.psBundleItems.includes(item.name) && bundleItem.psBundleItems.length >1) {
        // Filter out the item whose name matches itemObj.name and assign to relatedItems
        item.relatedItems = bundleItem.psBundleItems.filter(
          bundleItem => bundleItem !== item.name
          );
      }
    } 
  });

  return item;
}



function assignItemType(item) {

  // todo - why is this not converting input of itemType from Furniture to House?
  if (isHouse(item)) {
    item.itemType = "House";
    item.category = "House";
    item.collection = 'House Dream Style';
  }


  if (isBuilding(item)) {
    //in game: type=Building Skin, collection=none, category=none
    item.itemType = 'Building Skin';
    item.collection = 'none';

    // category for these is technically 'none' in game, but these values are used in sheet and parser - overridden in output_category for article generation

    if ((item.category && item.category.includes("Chez Remy")) || (item.name && item.name.includes("Chez Remy"))) {
      item.category = "Chez Remy";
    }
    if (
      (item.category && item.category.includes("Scrooge's Store")) ||
      (item.category && item.category.includes("Scrooge's Shop")) ||
      (item.name && item.name.includes("Scrooge's Store")) ||
      (item.name && item.name.includes("Scrooge's Shop")) ||
      (item.name && item.name.includes("Scrooge McDuck") && item.name.includes("Store")) ||
      (item.name && item.name.includes("Scrooge McDuck") && item.name.includes("Shop"))
    ) {
      item.category = "Scrooge's Store";
    }

    // TODO - this is not robust enough, some items can contain the word plaza
    if ((item.category && item.category.includes("Plaza")) || (item.name && item.name.includes("Plaza")) || (item.category && item.category.includes("Plaza Square")) || (item.name && item.name.includes("Plaza Square"))) {
      item.category = "Plaza Square";
    }

  }

  // TODO... . THIS IS FEELING A BIT JANKY
  if (isCastle(item)) {
    //in game: type=Dream Castle Skin, collection=none, category=none
    item.itemType = 'Dream Castle Skin';
    item.category = 'Dream Castle';
    item.collection = 'none';
  }

  // Left commented: `isCharacterDreamStyle` without `(item)` is a function, so always true; uncommented, every item would become a Character Dream Style
  /*
if (isCharacterDreamStyle) {
item.itemType = 'Dream Style';
item.category = 'Character Dream Style';
item.universe = 'Character Dream Style';
}*/

  if (isCompanion(item)) {
    //in game: type=Companions, collection=<<>>, category=<<>>
    item.itemType = 'Companions';
    //item.category = item.category;
    //item.collection = 'Dreamlight Valley'; // item.collection
  }

  if (isStall(item)) {
    item.itemType = "Goofy's Stall Skin";
    item.category = "Goofy's Stall"; // technically 'none' in game, but this value is used in sheet and parser - overridden in output_category
    item.collection = 'none';
  }
  if (isVisitStation(item)) {
    item.itemType = 'Valley Visit Station Style';
    item.category = 'Visit Station'; // technically 'none' in game, but this value is used in sheet and parser - overridden in output_category
    item.collection = 'Visit Station';
  }
  if (isWishingWell(item)) {
    item.itemType = 'Wishing Well Skin';
    item.category = 'Wishing Well'; // technically 'none' in game, but this value is used in sheet and parser - overridden in output_category
    item.collection = 'Wishing Well';
  }

  if (isHairstyle(item)) {
    item.category = 'Hairstyle';
  }

  if (isAccessory(item)) {
    item.category = 'Accessories';


    // Save current universe string (so as not to lose "fake" universe/groupedUniverse)
    const string = item.universe;

    // Set a default fallback
    item.groupedUniverse = "Other";

    // Use .match() to extract the capture groups safely
    // FORMAT 1: None - Accessory (Aladdin) or None - Accessory
    // FORMAT 2: none (Aladdin) or none
    const matchFormat1 = string.match(/None - [\w\W ]+\(([\w\W ]+)\)/);
    const matchFormat2 = string.match(/none \(([\w\W ]+)\)/);

    // Use if / else if to ensure blocks don't overwrite each other
    if (matchFormat1 && matchFormat1[1]) {
      // matchFormat1[1] contains the string inside the parentheses
      item.groupedUniverse = matchFormat1[1];

    } else if (matchFormat2 && matchFormat2[1]) {
      // If string = "none (Aladdin)", matchFormat2[1] will be "Aladdin"
      item.groupedUniverse = matchFormat2[1];
    }


    // Always reset universe to 'none' at the end of the pipeline
    item.universe = 'none';



  }

  return item;
}




/* ============= */
function renderClothingFurnitureArticle(dataArray) {
  var renderedHTML = '';

  // TODO - at this point itemType has not been reset from Furniture-->House, etc

  // todo - i'm adding an extra loop here, need to decrease this
  //const users = [{ name: 'Alice' }, { name: 'Bob' }];

//  todo - check if all of the other isX functions should be moved here? also need to reduce number of loops run...

  dataArray.forEach((item) => {
  //item.name = 'Mutated'; // Modifying a property changes the source object

    item = assignItemType(item);
    item = parseItemSource(item);
    item = parseSizePlacementEnv(item);

    // TODO - handle this better, columns changed names and purposes, these are fallbacks for old data
    if (item.limited) item.icon = item.limited;
    if (item.speculated) item.becameBundle = item.speculated;
  });

  // get unique bundles with populated items from input array
  var bundleArray = parseUniqueBundles(dataArray);

  var delimiter = '\n\n\n-----------------------------\n\n\n';

  // this changes the items in dataArray (objects are passed by reference)
  dataArray.forEach(function(item) {

    // possibly assigning itself recursively...??
    item = assignRelatedItemsFromInputArray(item, bundleArray);

    // =*=*=*=*= PARSING ITEM START =*=*=*=*=
    // trying to troubleshoot why interpolation doesnt work for bundleName etc params
    if (!item) return;
    item.missingCategories = [];

    //item = parseItemSource(item);
    //item = parseSizePlacementEnv(item);

    if (own.call(VILLAGE_NAMES, item.collection)) item.collection = VILLAGE_NAMES[item.collection];
    /*
    if (item.universe == "(none)") {
      item.universe = "none";
    }
    */

    // removed if isbuilding/iscastle/isstall/isvalleyvisitstation/iswishingwell/ishairstyle/isaccessory
    // logic from this location and moved inside assignItemType
    //item = assignItemType(item);

    // =*=*=*=*= PARSING ITEM END =*=*=*=*=

    //make sure these are only called once
    var itemFrom = output_from(item);
    var itemIntro = output_itemIntro(item);
    var itemSource = output_itemSource(item);
    var collectionStatus = output_collectionStatus(item);
    var itemUsage = output_itemUsage(item);

    // ===== INFOBOX =====
    template = '';
    template += '{{infobox\n';
    template += output_image(item);

    template += output_type(item);
    template += output_category(item);
    template += output_buyprice(item);
    template += output_color(item);
    template += output_tags(item);

    template += output_collection(item);
    template += output_traits(item);
    template += output_universe(item);
    template += itemFrom; //necessary vals set/defined in output_from(item);
    template += output_recipe(item);
    template += output_sizePlacementEnv(item);
    template += output_functions(item);
    template += '}}\n';

    template += itemIntro; //output_itemIntro(item);
    template += itemSource; //output_itemSource(item);
    template += collectionStatus; //output_collectionStatus(item);
    template += itemUsage; //output_itemUsage(item);
    template += output_itemUsageTables(item);
    template += output_mailboxMessage(item);

    template += output_relatedItems(item);
    template += output_history(item);
    template += output_navbox(item);
    template += output_missingCategories(item);

    if (item.returning) {
      // previously used partial template to distinguish returning items, changed to full template
      /*
      var returningItemTemplate = itemFrom + '\n' + itemIntro + itemSource + collectionStatus + itemUsage;

      // TODO - collection confirmed ONLY for returning items, do not impact global setting collectionConfirmed
      template = returningItemTemplate;
      */
    }

    if (isWallpaperFlooring(item)) {
      template = generateWallpaperFloorsDescriptionTemplate(item);
    }

    if (isCharacterDreamStyle(item)) {
      //todo further
      // NOTE: generated template uses ItemDescription wiki template for non-returning items
      if (!item.returning) {
        template = generateCharacterDreamStyleTemplate(item);
      }
    }
    if (isHouse(item)) {
      //todo further
      template = generateHouseTemplate(item);
    }
    if (isStall(item)) {
      template = generateBuildingSkinTemplate(item);
    }
    if (isWishingWell(item)) {
      template = generateBuildingSkinTemplate(item);
    }
    if (isBuilding(item)) {
      template = generateBuildingSkinTemplate(item);
    }
    if (isCastle(item)) {
      template = generateBuildingSkinTemplate(item);
    }
    if (isVisitStation(item)) {
      template = generateBuildingSkinTemplate(item);
    }
    if (isCompanion(item)) {
      if (showItemDebug) { console.log(`${item.name} is a companion`); }
      template = generateCompanionTemplate(item);
    }


    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

return jankyCleanup(renderedHTML);
}




function generateBodyFromPremiumShop(item) {
  // TODO - this is repeated content, need to make a function for generating premium shop items and detecting standalone link vs not

  var template = '';

  if (isPremium(item)) {
    // item.standalone is not yet defined here!!! -- i think it is now
    //template = 'It is available to purchase from the [[Premium Shop]] in the [[%%bundleName%%]] bundle for {{price|%%bundlePrice%%|moonstone|showLabel}}.';
    template =
  `It is available to purchase from the [[Premium Shop]] in the [[${item.bundleName}]] bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;

    // 2025.08.19 this is not catching, item.standalone isn't defined yet
    // this is catching... sometimes??
  if (isStandalone(item)) {
    template =`It is available to purchase from the [[Premium Shop]] in the [[${item.bundleName} (Bundle)|${item.bundleName}]] bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;
  }
}

return template;
}

// Consolidates the "from=Premium Shop / bundleName / bundlePrice" block that
// was duplicated verbatim (with the same unresolved TODO) at 2+ call sites
// across generateHouseTemplate and generateCharacterDreamStyleTemplate.
// Mutates item.itemFrom directly, matching what both call sites did anyway.
// NOTE: preserves original "last write wins" behavior -- if bundleName ==
// item.name, that overwrites the plain bundleName case, it does not stack.
function appendBundleFromParams(item) {
  var addText = '';
  if (item.bundleName) {
    addText = '\n|from=Premium Shop\n|bundleName=%%bundleName%%\n|bundlePrice=%%bundlePrice%%';
  }
  if (item.bundleName == item.name) {
    addText = '\n|from=Premium Shop\n|bundleName=%%bundleName%% (Bundle){{!}}%%bundleName%%\n|bundlePrice=%%bundlePrice%%';
  }
  item.itemFrom += addText;
}

function generateHouseTemplate(item) {

  if (isHouse(item)) {
    template = '';
    template +=
    '{{infobox\n' +
    output_image(item) +
      /*output_type(item) +
      output_category(item) + Player House */
    "|type=Houses\n|category=Player House\n" +
    output_universe(item) +
    output_from(item) +
    output_sizePlacementEnv(item) +
    '}}\n';


    // === ItemDescription template for house
    var itemDescriptionTemplate = '';

    itemDescriptionTemplate += '{{ItemDescription\n|%%name%%\n|type=House Dream Style\n|universe=%%universe%%';

    if (item.tier) {
      item.itemFrom = '\n|from=' + item.starpath + ' Star Path\n|tier=' + item.tier + '\n|premium=%%premium%%\n|eventTokens=' + item.eventtokens + '';
    }

    appendBundleFromParams(item);

    itemDescriptionTemplate += item.itemFrom + '\n}}';

    /*
    template += itemIntro; //output_itemIntro(item);
    template += itemSource; //output_itemSource(item);
    template += collectionStatus; //output_collectionStatus(item);
    template += itemUsage; //output_itemUsage(item);
    */
    // === Actual article text body template for house

    //template += itemDescriptionTemplate;

    template += ''; 

    //template += output_itemIntro(item);
    template += `'''${item.name}''' is a [[Dream Styles#House Dream Styles|House Dream Style]] that can be applied to the [[Player's House]].`;

    template += output_itemSource(item);
    //template += output_collectionStatus(item);

    //template += output_itemUsage(item);
    template += "\n\nIt can be applied using the [[Furniture menu]] inside the Inventory by picking up the [[Player's House]], which enables an option to '''Replace''', and then choosing a replacement House Dream Style. The Player's House must be fully upgraded to change its Dream Style. It can be also be placed in the Valley as an [[Dream_Styles#Placing Additional House Dream Styles|additional House]].";

    // Occasionally house bundles include furniture
    template += output_relatedItems(item);
    template += output_history(item);
    template += output_navbox(item);

    // template += output_missingCategories(item);
    template += '\n\n[[Category:Missing Size]] [[Category:Missing Placement]]'; 
  }

  return template;
}


function generateBuildingSkinTemplate(item) {
  template = '';

  if (isBuilding(item) || isCastle(item) || isVisitStation(item) || isWishingWell(item) || isStall(item)) {

    template +=
    '{{infobox\n' +
    output_image(item) +
    output_type(item) +
    output_category(item) +
    output_collection(item) +
    output_from(item);

    if (isWishingWell(item)) {
      template += '|gridSize=<!--12x12-->\n|placement=<!--bare-->\n';
    } else if (isStall(item)) {
      template += '|gridSize=<!--16x8-->\n|placement=<!--bare-->\n';
    } else {
      // also janky - hardcoding placeholder size and placement placeholders
      template += '|gridSize=\n|placement=\n';
    }
    template += '}}\n';

    var introLink = "[[Dream Styles#Building Dream Styles|Building Dream Style]]"; // default + remy/scrooge/plaza
    var intro_buildingReplace = "[[" + item.category + "]]"; // default + remy/scrooge

    var body_buildingReplace, body_pickupText;

    // Default vals, override below if necessary - not sure tidiest way to handle this
    /*var introLink = "[[Dream Styles#Building Dream Styles|Building Dream Style]]";
    var intro_buildingReplace = "[["+item.category+"]]";
    var body_buildingReplace = "[["+item.category+"]]"; // XXXX_BUILDINGTYPE_XXXX / remy/scrooge / everything except plaza
    var body_pickupText = "picking up [["+item.category+"]], which enables an option to '''Replace''', and then choosing a replacement Dream Style";
    */

    switch (item.category) {
    case "Chez Remy":
      body_pickupText = "picking up [[" + item.category + "]], which enables an option to '''Replace''', and then choosing a replacement Building Dream Style";
      break;
    case "Scrooge\'s Store":
      body_pickupText = "picking up [[" + item.category + "]], which enables an option to '''Replace''', and then choosing a replacement Building Dream Style";
      break;
    case "Plaza Square":
      intro_buildingReplace = "the square in the [[Plaza]] in [[Dreamlight Valley]]";
        // plaza is only one with different val here, not a direct sub of name
      body_pickupText = "selecting the [[Plaza|Plaza Square]], which enables an option to '''Replace''', and then choosing a replacement Building Dream Style"
      break;
    case "Dream Castle":
        introLink = "[[Dream Styles#Dream Castle Dream Styles|Dream Castle Dream Style]]"; // castle
        intro_buildingReplace = "the [[Dream Castle]] in [[Dreamlight Valley]]"; // castle
        body_pickupText = "selecting the [[" + item.category + "]], which enables an option to '''Replace''', and then choosing a replacement Dream Castle Dream Style";
        break;
      case "Visit Station":
        introLink = "[[Dream Styles#Stall Dream Styles|Goofy's Stall Dream Style]]"; // valley visit 
        intro_buildingReplace = "the [[Valley Visit Station]]"; // valley visit station
        body_pickupText = "picking up the [[Valley Visit Station]], which enables an option to '''Replace''', and then choosing a replacement Stall Dream Style";
        break;
      case "Wishing Well":
        introLink = "[[Dream Styles#Well Dream Styles|Wishing Well Dream Style]]"; // wishing well
        intro_buildingReplace = "[[" + item.category + "]]s in any biome in any Village (except the singular primary Well per Village).<!--(except the large [[Plaza|Plaza Well]])-->{{cleanup|Concise language. - Library of Lore Well in SV, Plaza Well in DV, Docks Well in EI, Well in WM}}";
        body_pickupText = "picking up a [[Wishing Well]], which enables an option to '''Replace''', and then choosing a replacement Well Dream Style";
        break;
      case "Goofy's Stall":
        introLink = "[[Dream Styles#Stall Dream Styles|Goofy's Stall Dream Style]]"; // goofy
        intro_buildingReplace = "[[" + item.category + "]] in any biome in any Village"; // goofy // [[Goofy's Stall]] in any biome in [[Dreamlight Valley]], [[Eternity Isle]], [[Storybook Vale]], or [[Wishblossom Mountains]].";
        body_pickupText = "picking up [[" + item.category + "]], which enables an option to '''Replace''', and then choosing a replacement Stall Dream Style";
        break;
      default:
        body_pickupText = "picking up [[" + item.category + "]], which enables an option to '''Replace''', and then choosing a replacement Dream Style";
        break;
      }

      template += "'''%%name%%''' is a " + introLink + " that can be applied to " + intro_buildingReplace + ".";

      template += '\n\n' + generateBodyFromPremiumShop(item);

      template += " It can be applied using the [[Furniture menu]] inside the Inventory by " + body_pickupText + ".";

      if (item.category == "Goofy's Stall") {
        template += " Each [[Goofy's Stall]] must be fully upgraded to change its Dream Style.";
      // body_fullUpgradeText = " Each [["+item.category+"]] must be fully upgraded to change its Dream Style." // goofy
      }

      template += output_history(item) + output_navbox(item);

      switch (item.category) {
      case "Wishing Well":
      case "Goofy's Stall":
        // assuming these are always the same size/placement as the items they skin
        //template += '\n\n[[Category:Missing Size]] [[Category:Missing Placement]]';
        break;
      default:
        body_pickupText = "picking up [[" + item.category + "]], which enables an option to '''Replace''', and then choosing a replacement Dream Style";
        break;
      }

    //template += '\n\n[[Category:Missing Size]] [[Category:Missing Placement]]'; // only for goofy? and wishing well?

    }
    return template;

  }

function generateCharacterDreamStyleTemplate(item) {

  // TODO - returning bundle items should have both star path original token value in infobox AND bundle info
  // item = parseItemSource(item);

  // tODO - fix output_from(item) function, not outputting BOTH premium bunle info and star path info for returning items

  if (isCharacterDreamStyle(item)) {
    var charProperName = determineCharacterFromDreamStyle(item.name);
    item.appliedto = charProperName;
    item.universe = getCharacterUniverse(charProperName); //getCharacterUniverse(item.appliedTo); didnt work? -- chekc item.appliedto

    template = '';
    // for some reason type was populating with Dream Style not Character Dream Style -- too lazy to fix everything atm
    template +=
    `{{infobox\n${output_image(item)}|width=225px\n|type=Character Dream Style\n|appliedto=%%appliedto%%\n|universe=%%universe%%\n${output_from(item)}}}\n`

    // this could be more elegant.... usually use the itemdescription, unless it is a returning starpath item
    {
      template +=
      '{{ItemDescription\n|%%name%%\n|type=Character Dream Style\n|character=%%appliedto%%\n|universe=%%universe%%';
      if (item.tier) {
        item.itemFrom +=
        '\n|from=' + item.starpath + ' Star Path\n|tier=' + item.tier + '\n|premium=%%premium%%\n|eventTokens=' + item.eventtokens + '';
      }

      appendBundleFromParams(item);

      template +=
      item.itemFrom +
      '\n}}';
    }

    template += output_history(item) + output_navbox(item);
  }



  return template;
}

function generateWallpaperFloorsDescriptionTemplate(item) {
  if (isWallpaper(item)) {
    item.category = 'Wallpaper';
  }

  if (isFlooring(item)) {
    item.category = 'Flooring';
  }

  //item = parseItemSource(item);
  //item = item = parseSizePlacementEnv(item);

  if (isWallpaperFlooring(item)) {
    template = '';
    template +=
    '{{infobox\n' +
    output_image(item) +
    output_type(item) +
    output_category(item) +
    output_buyprice(item) +
    output_color(item) +
    output_tags(item) +
    output_collection(item) +
    output_traits(item) +
    output_universe(item) +
    output_from(item) +
    output_sizePlacementEnv(item) +
    '}}\n' +
    '{{WallpaperFloorsDescription|wftype=%%category%%|universe=%%universe%%';

    // todo: check for player level

    if (item.character) {
      item.itemSource =
      '|from=Friendship|character=%%character%%|level=%%level%%';
    }

    // Note: this is building the WallpaperFloorsDescription, not hte infobox params - no line breaks
    if (item.tier) {
      item.itemSource =
      '|from=' + item.starpath + ' Star Path|tier=' + item.tier + '|premium=%%premium%%|eventTokens=' + item.eventtokens + '';
    }

    if (item.inStore) {
      item.itemSource = "|from=Scrooge's Store";
    }

    template +=
    item.itemSource +
    '|collection=%%collection%%';

    /* THIS DOESN'T WORK
    // this is not perfect, given that in my sheet everything before 1.5 is set to 1.5
    if (item.version <= 1.5) {
      template += "|preUpdate5=yes";
    }
    */
    template += '}}' +
    output_history(item) +
    output_navbox(item) +
      output_missingCategories(item); // removed output_itemUsage(item) - need to capture returning SP item language
    // todo - missing collection still being added to outer space wallpaper
    }

  // if collection = Untracked/Tracked Floor/Wall or versionAdded < 1.5
  // append |preUpdate5=yes}}

    return template;
  }



  function jankyCleanup(originalRenderedHTML) {
    let newStr = originalRenderedHTML;

    newStr = newStr.replaceAll('=null', '=');

    newStr = newStr.replaceAll('buyprice=<!--null-->', 'buyprice=');

    // REVISIT - this is likely introduced with new priceCategoriesColorsTraitsConfirmed/categoriesColorsTraitsConfirmed confirmed variable
    // adjust other functions to prevent
    // this isn't working still
    newStr = newStr.replaceAll('<!--<!--', '<!--');
    newStr = newStr.replaceAll('-->-->', '-->');
    newStr = newStr.replaceAll('<!--<!--', '<!--');
    newStr = newStr.replaceAll('-->-->', '-->');



    // AI assist
    // <!-- ... --> is matched literally
    // \\s* handles any stray spaces inside the comment
    // (${keywords}) captures only the phrases you care about
    // $1 replaces the entire comment with just the captured keyword
    ////const keywords = "Dreamlight Valley|Storybook Vale|Eternity Isle";
    ////const regex2 = new RegExp(`<!--\\s*(${keywords})\\s*-->`, 'gi');
    ////newStr = newStr.replace(regex2, '$1');

    // remove extra spaces
    ////newStr = newStr.replace(/\[\[:Category:\s+/g, '[[:Category:');

    // main culprit of double space is itemUseIntro. Stays here, not in normalizeText: the
    // patches below are written for single-spaced text
    newStr = newStr.replaceAll('  ', ' ');



    

    // TODO: double check this in output - need to make functions value streamlining more robust, and not here
    newStr = newStr.replaceAll('Light \(Constant\)', 'Lighting \(Constant\)');
    newStr = newStr.replaceAll('Light \(Automatic\)', 'Lighting \(Automatic\)');
    newStr = newStr.replaceAll('Cooking Station \(Use\)', 'Cooking Station');
    newStr = newStr.replaceAll('Crafting Station \(Use\)', 'Crafting Station');
    newStr = newStr.replaceAll('\n|functions=Rug', '');
    newStr = newStr.replaceAll('\n|functions=Fireplace (Interact)', '\n|functions=Fireplace');

    
    newStr = newStr.replaceAll('|placement=(outdoor)\n|environment=outdooronly', '|placement=\n|environment=outdooronly');

    // TEMPORARY - comment out empty infobox recipes
    newStr = newStr.replaceAll('|recipe=\n', '');
    newStr = newStr.replaceAll('{{cleanup|Uncomment once confirmed -- Once collected it will be added to the [[:Category: <!--Dreamlight Valley--> Clothing Sets Collection|<!--Dreamlight Valley--> Clothing Sets Collection]].}}','{{cleanup|Uncomment once confirmed -- Once collected it will be added to the [[:Category: Dreamlight Valley Clothing Sets Collection|Dreamlight Valley Clothing Sets Collection]].}}');
    newStr = newStr.replaceAll("{{cleanup|Uncomment once confirmed -- Once collected it will be added to the [[:Category:<!--Dreamlight Valley--> Furniture Sets Collection|<!--Dreamlight Valley--> Furniture Sets Collection]] and more can be ordered from [[Scrooge's Store#Catalog|Scrooge's Catalog]].}}","{{cleanup|Uncomment once confirmed -- Once collected it will be added to the [[:Category:Dreamlight Valley Furniture Sets Collection|Dreamlight Valley Furniture Sets Collection]] and more can be ordered from [[Scrooge's Store#Catalog|Scrooge's Catalog]].}}");




    // NOTE: comma-spacing in psBundleItems lists is already handled correctly at
    // the source (helpers.js: bundleObj.psBundleItems.join(', ')  and
    // script.js output_relatedItems: item.relatedItems.join(', ')). A blanket
    // /(\w),(\w)/g replace here would risk corrupting other comma syntax
    // elsewhere in the rendered page, so it's intentionally not applied globally.
    // If a missing-space comma still shows up in generated output, it's coming
    // from a literal comma inside a raw name/data string from the sheet itself.



    newStr = newStr.replaceAll('energy=-', 'energy=');
    

    // TODO - fix functions=- at the source
    newStr = newStr.replaceAll('|placement=surfaces-', '|placement=surfaces');
    newStr = newStr.replaceAll('|placement=default-', '|placement=default');

    newStr = newStr.replaceAll('\n|functions=-', '');
    //newStr = newStr.replaceAll('\n|functions=-', '\n|functions=none');

    



  newStr = newStr.replaceAll('|universe=(unknown)','|universe=<!--(unknown)-->'); // introduced by companions

  // todo - revisit if this is necessary/appropriate, might be auto-added by page
  //newStr = newStr.replaceAll('[[Category:none Furniture Sets Collection]]','[[Category:Untracked Furniture Sets Collection]]');
  newStr = newStr.replaceAll('[[Category:none Furniture Sets Collection]]','');


  newStr = newStr.replaceAll('|collection=Accessory', '|collection=none');
    // must run here, not in output_collectionStatus: there the text still holds %%collection%% (filled later by microTemplate), so it cannot match (CR02)
  // TODO - needs more logic - if the item is not crafted initially or recipe does not unlock, add " and more cannot be ordered from [[Scrooge's Store#Catalog|Scrooge's Catalog]]"
  const target = "Once collected it will be added to both the [[:Category:none Crafting Collection|none Crafting Collection]] and the [[:Category:none Furniture Sets Collection|none Furniture Sets Collection]].";
  const replacement = "It is not tracked in the [[:Category:Untracked Furniture Sets Collection|Furniture Sets Collection]] or [[:Category:Untracked Crafting Collection|Crafting Collection]].";
  newStr = newStr.replaceAll(target, replacement);

  // space before/after category:
  var target2 = 'Once collected it will be added to the [[:Category:none Clothing Sets Collection|none Clothing Sets Collection]].';
  var replacement2 = 'Once collected it will not be added to the [[:Category:Untracked Clothing Sets Collection|Clothing Sets Collection]].';
  newStr = newStr.replaceAll(target2, replacement2);
  var target3 = 'Once collected it will be added to the [[:Category: none Clothing Sets Collection|none Clothing Sets Collection]].';
  newStr = newStr.replaceAll(target3, replacement2);



  return normalizeText(newStr);
}

// CR32: deliberate wording and character normalizing of every clothing/furniture article, as
// one named last step (the patches above fix generated text; these are house style).
function normalizeText(newStr) {
  // "×" in sizes comes from the sheet; "x" is easier for wiki users
  newStr = newStr.replaceAll('×', 'x');
  // crafted furniture links to the Furniture page
  newStr = newStr.replaceAll('[[Crafted Furniture#', '[[Furniture#');
  // accessories have no universe, so "unthemed" is dropped
  newStr = newStr.replaceAll('is an unthemed piece of [[:Category:Accessories', 'is a piece of [[:Category:Accessories');
  newStr = newStr.replace(/[ \t]+\n/g, '\n'); // strip trailing whitespace before line breaks
  return newStr;
}


// ===== public API =====

var own = Object.prototype.hasOwnProperty;

function describeValue(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'a list';
  if (typeof v === 'string') return 'the text ' + JSON.stringify(v.length > 40 ? v.slice(0, 40) + '...' : v);
  return typeof v === 'object' ? 'an object' : 'the ' + typeof v + ' ' + String(v);
}

function settingProblem(name, spec, v) {
  if (spec.type === 'labels') {
    if (v === null || typeof v !== 'object' || Array.isArray(v)) return '"' + name + '" must be an object of version -> label pairs, not ' + describeValue(v);
    for (var k in v) {
      if (own.call(v, k) && typeof v[k] !== 'string') return '"' + name + '": the label for ' + JSON.stringify(k) + ' must be text, not ' + describeValue(v[k]);
    }
    return '';
  }
  if (typeof v !== spec.type) return '"' + name + '" must be ' + (spec.type === 'boolean' ? 'true or false' : 'text') + ', not ' + describeValue(v);
  if (spec.nonEmpty && v.trim() === '') return '"' + name + '" is blank (' + spec.about + ')';
  return '';
}

function copyValue(v) {
  if (v === null || typeof v !== 'object') return v;
  var c = {};
  for (var k in v) if (own.call(v, k)) c[k] = v[k];
  return c;
}

// The settings render() runs with, or an Error naming every problem (DDV-28).
function checkSettings(given) {
  if (given === undefined || given === null) given = {};
  if (typeof given !== 'object' || Array.isArray(given)) {
    throw new Error('DDVEngine.render: settings must be an object, not ' + describeValue(given));
  }
  var problems = [];
  var key;
  for (key in given) {
    if (own.call(given, key) && !own.call(SETTINGS, key)) problems.push('unknown setting "' + key + '"');
  }
  var s = {};
  for (key in SETTINGS) {
    var spec = SETTINGS[key];
    var v = own.call(given, key) ? given[key] : undefined;
    if (v === undefined) {
      if (spec.required) problems.push('missing setting "' + key + '" (' + spec.about + ')');
      else s[key] = copyValue(spec.default);
      continue;
    }
    var problem = settingProblem(key, spec, v);
    if (problem) problems.push(problem);
    else s[key] = copyValue(v);
  }
  if (problems.length) {
    throw new Error('DDVEngine.render refused the settings:\n- ' + problems.join('\n- ') +
      '\nKnown settings: ' + Object.keys(SETTINGS).join(', '));
  }
  return s;
}

// Every engine variable back to empty, so no render sees anything from an earlier one.
function resetState() {
  updateNumber = newExpansionCollection = starPathNameShort = starPathName = starPathToken = undefined;
  mealNavbox = bundleStartDate = bundleEndDate = companionCollection = wikiVersionLabels = undefined;
  collectionConfirmed = priceConfirmed = categoriesColorsTraitsConfirmed = tagsConfirmed = functionsConfirmed = placementConfirmed = undefined;
  showItemDebug = renderPSbundles = customTemplate = undefined;
  template = output = placeholderCommentBodyDetailsQuest = itemUseIntro_clothing = bundleArray = tempTemplate = undefined;
  sourceParsed = null;
}

function render(rows, templateType, settings) {
  var s = checkSettings(settings);
  if (!Array.isArray(rows)) throw new Error('DDVEngine.render: rows must be a list of row objects, not ' + describeValue(rows));
  // the functions below change the items they work on; they get copies, the caller's rows stay as given
  rows = rows.map(function (row) { return row && typeof row === 'object' ? copyValue(row) : row; });

  resetState();
  updateNumber = s.updateNumber;
  newExpansionCollection = s.newExpansionCollection;
  starPathNameShort = s.starPathNameShort;
  starPathName = s.starPathName;
  starPathToken = s.starPathToken;
  mealNavbox = s.mealNavbox;
  bundleStartDate = s.bundleStartDate;
  bundleEndDate = s.bundleEndDate;
  companionCollection = s.companionCollection;
  wikiVersionLabels = s.wikiVersionLabels;

  collectionConfirmed = s.collectionConfirmed;
  priceConfirmed = s.priceConfirmed;
  categoriesColorsTraitsConfirmed = s.categoriesColorsTraitsConfirmed;
  tagsConfirmed = s.tagsConfirmed;
  functionsConfirmed = s.functionsConfirmed;
  placementConfirmed = s.placementConfirmed;
  showItemDebug = s.showItemDebug;
  renderPSbundles = s.renderPSbundles;
  customTemplate = s.customTemplate;
  sourceParsed = new Set();

  try {
    return renderParent(rows, templateType);
  } finally {
    resetState();
  }
}

// Copy of the settings description: name -> { type, required, nonEmpty, default, about }.
function settingsDescription() {
  var out = {};
  for (var key in SETTINGS) {
    out[key] = {};
    for (var k in SETTINGS[key]) out[key][k] = copyValue(SETTINGS[key][k]);
  }
  return out;
}

function defaultSettings() {
  var s = {};
  for (var key in SETTINGS) if (!SETTINGS[key].required) s[key] = copyValue(SETTINGS[key].default);
  return s;
}

return {
  render: render,
  settings: settingsDescription,
  defaultSettings: defaultSettings
};

})();

// Node (tests): require('./engine.js')
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DDVEngine;
}
