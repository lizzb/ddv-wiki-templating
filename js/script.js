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
      outputHTML = renderClothingFurnitureArticle(dataArray);
      outputHTML += renderPSBundles(dataArray);
      break;
    default:
      outputHTML = "Unsure what template generating function to use, templateType: ", templateType;
  }

  // i really should do better event handling....
  collectionConfirmed = $("#collectionConfirmedCB").prop("checked");
  functionsConfirmed = $("#functionsConfirmedCB").prop("checked");

  console.log(`collectionConfirmed = ${collectionConfirmed},  functionsConfirmed = ${functionsConfirmed}`);

  // if a custom template is provided in the textarea, use that instead of the one specified by the function
  var inputTemplateValue = document.getElementById("template-input").value;
  if (inputTemplateValue) {
    outputHTML = renderVariableTemplate(dataArray, inputTemplateValue);
  }
  // Set the value
  //document.getElementById("template-input").value = "New content for the textarea.";
  //%%name%%: %%type%%

  //outputHTML += renderUpdatedFlooring(flooring);
  //outputHTML += renderClothingFurnitureArticle(flooring);

  return outputHTML;
}



function output_image(item) {
  var output = '|image=' + item.name + '.png\n';
  if (item.itemType == 'Clothing' && !isAccessory(item))
    output += '|image_m=' + item.name + '_m.png\n';
  return output;
}

function output_type(item) {
  //console.log("type, itemtype, craftingcategory", item.type, item.itemType, item.craftingcategory, item.category)
  var output = '|type=%%itemType%%\n';
  // if  crafting then
  if (isCraftable(item)) {
    output += '|craftingcategory=%%craftingCategory%%\n'; //Furniture
  }
  return output;
}

// only useful for handling clothing/furniture
function output_category(item) {
  if (!item.category) {
    if (item.itemType == 'Clothing') {
      item.category =
        '<!--Accessories, Companions, Tools, Hats, Masks, Glasses, Earrings, Neckwear, Coats, Tops, Back, Bracelets, Gloves, Pants, Shorts, Skirts, Hose Socks, Shoes, Dresses, Costumes, Gliders-->';
    } else {
      // defaults to furniture
      item.category = '<!--OPTIONS: Furniture: House, Essentials, Decor, Trimmings, Tables, Beds, Seating, Storage, Appliance, Electronics, Utilities, Art, Lighting, Foliage, Rugs, Misc., Floors, Windows, Landscaping, Wall, Ceiling, Trees, Rocks, Fencing, Attractions-->'; // TODO: Ceiling Textures, Ceiling Decorations
    }

  }

  var output = '|category=%%category%%\n';

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

  // Possibly crafting
  if (isCraftable(item) || item.buyprice == 'n/a' || item.buyprice == '-') {
    output = '';
  }

  // TODO - fix this logic
  if (output != '' && !item.buyprice) {
    item.missingCategories.push('[[Category: Missing Price]]');
  }

  // not sure this is still required
  //const regex = /\n\|buyprice=\d\d [tT]okens/gi;
  //output = output.replaceAll(regex, "");

  return output;
}

function output_color(item) {
  if (!item.color && !(isHairstyle(item) || isAccessory(item)))
    item.color =
    '<!--OPTIONS: blue, green, red, pink, white, black, yellow, orange, brown, purple, gray-->';
  // Hairstyles/Accessories have no color

  var output = '|color=%%color%%\n';
  return output;
}

function output_tags(item) {
  if (!item.tags && !(isHairstyle(item) || isAccessory(item))) {
    item.missingCategories.push('[[Category: Missing Tags]]');
    item.tags = '<!--xxx, xxx, xxx-->';
  }
  if (isHairstyle(item)) {
    item.tags = 'Hairstyle';
  }
  // Hairstyles/Accessories have no tags

  var output = '|tags=%%tags%%\n';
  return output;
}

function output_collection(item) {
  if (!collectionConfirmed) {
    item.missingCategories.push('[[Category: Missing Collection]]');
  }

  // TODO - think calling this at wrong time, some values entering are <!--Dreamlight Valley-->
  // TODO - since item isnt the thing returned from this function, nothing happens below
  switch (item.collection) {
    case 'Tracked Wall':
    case 'Tracked Floor':
    case 'DV':
    case 'Dreamlight Valley': // still not sure why this is getting fed sometimes, must be modified somewhere
      item.collection = wrapComment('Dreamlight Valley', !collectionConfirmed);
      break;
    case 'EI':
      //item.collection = wrapComment('Eternity Isle', !collectionConfirmed);
      item.collection = 'Eternity Isle';
      break;
    case 'SV':
      //item.collection = wrapComment('Storybook Vale', !collectionConfirmed);
      item.collection = 'Storybook Vale';
      break;
    case 'WR':
      //item.collection = wrapComment('Wishblossom Mountains', !collectionConfirmed);
      item.collection = 'Wishblossom Mountains';
      break;
    case 'Dream Style':
      item.collection = 'n/a - CHARACTER DREAM STYLE';
      break;
    case 'Well':
      item.collection = 'n/a - WELL';
      break;
    case '--':
      // accessory or otherwise indicated no collection
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


  var output = '|collection=' + wrapComment('%%collection%%', !collectionConfirmed) + '\n';
  return output;
}

function output_traits(item) {
  if (!item.traits && !(isHairstyle(item) || isAccessory(item))) {
    item.missingCategories.push('[[Category: Missing Traits]]');
    item.traits =
      '<!--Lavish/Simple, Calm/Playful, Delicate/Strong, Familiar/Wondrous-->';
  }
  // Hairstyles/Accessories have no traits

  var output = '|traits=%%traits%%\n';
  return output;
}

function output_universe(item) {
  if (!item.universe) {
    item.missingCategories.push('[[Category: Missing Universe]]');
  }
  if (item.universe == 'General') item.universe = 'Other';


  var output = '|universe=%%universe%%\n'; //`|universe=${item.universe}\n`;

  // do not modify the original universe value for accessories - needed for navbox
  if (isAccessory(item)) {
    output = '|universe=none\n';
  }

  return output;
}

function output_functions(item) {
  var output = '|functions=%%functions%%\n';
  // TODO 2025.09.24 - functions empty
  // (!item.functions || item.functions == '-')
  if (!item.functions) {
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
  return output;
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
function output_relatedItems(item) {
  var output = '';
  //output = '\n<!--\n{{relatedItems | xxx, xxx, xxx}}\n-->\n';
  return output;
}

function output_history(item) {
  item = updateAppropriateVersion(item);
  var output = '\n\n==History==\n{{history|' + item.version + '|Added}}';
  return output;
}

function updateAppropriateVersion(item) {
  if (!item.version) item.version = updateNumber;

  switch (item.version) {
    case "1.20.11":
      item.version = "1.20"; // different wiki user-facing version
      break;
    default:
      break;
  }

  // Replace correct sheet version number with generalized version label for wiki history template
  if (item.collection == "EI" || item.collection == "Eternity Isle") {
    switch (item.version) {
      case "1.8":
        item.version = "Expansion 1-1";
        break;
      default:
        break;
    }
  }
  if (item.collection == "SV" || item.collection == "Storybook Vale") {
    switch (item.version) {
      case "1.14.1":
        item.version = "Expansion 2-1";
        break;
      case "1.14.3":
        item.version = "1.14";
        break;
      case "1.17.11":
        item.version = "Expansion 2-2";
        break;
      default:
        break;
    }
  }
  if (item.collection && (item.collection.includes("WR") || item.collection.includes("WM") || item.collection == "Wishblossom Mountains")) {
    switch (item.version) {
      //case "1.2":
      case "1.20":
      case "1.20.1":
      case "1.20.2":
        item.version = "Expansion 3";
        break;
      default:
        break;
    }
  }


  return item;
}

/*
const getHighestPriorityMatch = (str, priorities) => {
  const values = str.split(",").map(s => s.trim());
  return priorities.find(p => values.includes(p));
};
*/


// TODO - insert correct category for Other navboxes furniture categories
function output_prioritizedCategory(categoryVal) {

  /*
  const str = "hello world";
  const keywords = ["hello", "bye", "test"];

  // version 1: case insensitive
  const containsAny = keywords.some(k => str.toLowerCase().includes(k.toLowerCase()) );
  console.log(containsAny); // true

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
  var output = categoryVal;

  // TODO: verify prioritization of categories
  //Wallpaper, Flooring, Appliance, TAbles, Beds, Trimmings, Essentials, Attractions, Decor, Misc., Wall, Electronics, Storage, Utilities, Rugs, Lighting, Seating, Art, Foliage, Landscaping
  // i think a few are missing, fences, paths, rocks...

  var categoryValArray = categoryVal.split(",").map(s => s.trim());
  var priorities = ["Wallpaper", "Flooring", "Appliance", "Seating", "Tables", "Beds", "Essentials", "Lighting", "Misc.", "Storage"];


  // find() returns the first match → your list = priority ranking. Stops early → efficient. Very readable: “give me the first priority that appears”
  const match = priorities.find(p => categoryValArray.includes(p)) || "";
  output = match;

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
    //output = '{{Navbox' + itemType + '|' + category.toLowerCase().trim().replace(/\s/g, '') + '|general}}';
    output = '{{Navbox' + itemType + '|' + output_prioritizedCategory(item.category) + '|general}}';
  } else {
    if (itemType == 'Clothing' || itemType == 'Furniture') {
      output =
        '{{Navbox' +
        itemType +
        '|' +
        universe.toLowerCase().trim().replace(/\s/g, '') +
        '|disney}}';
    } else output = disneyNavClothing + disneyNavFurniture;
  }
  if (isCraftable(item)) {
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

  // TODO - need to group accessory items with their thematic unvierse even though they techncially don't have one
  output = '\n\n' + output;

  // navbox fixes - need to make a more robust regex for comma, period, ampersand removal
  var newStr = output;
  newStr = newStr.replaceAll("timburton\'sthenightmarebeforechristmas", 'nightmarebeforechristmas');
  newStr = newStr.replaceAll('lilo&stitch', 'liloandstitch');
  newStr = newStr.replaceAll('mickey&friends', 'mickeyandfriends');
  newStr = newStr.replaceAll('{{NavboxFurniture|monsters,inc.|disney}}', '{{NavboxFurniture|monstersinc|disney}}');
  newStr = newStr.replaceAll('{{NavboxFurniture|wall-e|disney}}', '{{NavboxFurniture|walle|disney}}');
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

// EMPTY FUNCTION ATM - refactoring needed
function parseItemUsage(item) {
  return item;
}

// Set other item properties based on the value of item.location - parsing and interpreting logic
function parseItemSource(item) {

  //if (!item.location) item.location = "";

  var itemSource = '';
  var itemFrom = '';
  //console.log(item);


  // not tested
  // ===== Player Level =====
  if (item.location == 'level') {
    const string = item.source;
    const regex = /Level (\d+)/;
    const result = string.split(regex);
    item.level = result[1]; // player level
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

  // ===== Quest =====
  if (item.location == 'quest') {
    const string = item.source;
    // Note: capital Q in quest source value
    const regex = /([\w\W ]+) Level (\d+) Quest \(([\w\W ]+)\) \(reward\)/;
    const result = string.split(regex);
    item.character = result[1]; //character value
    item.level = result[2]; // friendship level
    item.quest = result[3]; // quest name
  }
  // ===== Star Path =====
  if (isStarPath(item)) {

    /*
    var item = {};
    item.source = "Star Path - Garden of Whimsy - B2C - Bonus Items (25 tokens)";
    item.source = "Star Path - Paw-fect Romance - 4A - T4 Premium (70 tokens)";
    item.source = "Star Path - Frost & Fairies - 1D - T1 (8 tokens)";
    parseStarPathData(item);
    */
    /*
    Star Path - Garden of Whimsy - B2C - Bonus Items (25 tokens)
    Star Path - Paw-fect Romance - 4A - T4 Premium (70 tokens)
    Star Path - Frost & Fairies - 1D - T1 (8 tokens)
    */

    const string = item.source;
    const regex = /^Star Path - (.+?) - ([A-Z0-9]+) - (?:(?:T(\d))(?: Premium)?|Bonus Items) \((\d+) tokens\)$/;
    const match = string.match(regex);

    if (!match) {
      console.log("FAILED TO PARSE ITEM SOURCE:", string);
      return item;
    }

    item.starpath = match[1]; // star path name
    item.tile = match[2]; // tile
    item.eventtokens = Number(match[4]); // event token item cost

    // ✅ FIX: tier fallback to tile (B2C → 2)
    if (match[3]) {
      item.tier = Number(match[3]);
    } else {
      const tileMatch = item.tile.match(/\d/);
      item.tier = tileMatch ? Number(tileMatch[0]) : null;
    }

    // derived flags (don’t overcomplicate regex)
    item.premium = /Premium|Bonus Items/.test(string) ? "yes" : "no";
    item.bonus = /Bonus/.test(string) ? "yes" : "no";

    item.premiumInline = "";
    if (item.premium == "yes") {
      item.premiumInline = " Premium";
    }

    item.bonusInline = "";
    if (item.bonus == "yes") {
      item.bonusInline = " Bonus";
    }

    /*
    // 2025.09.30 - if these are being set correctly, then why are they coming up undefined later....
    //console.log(`item.starpath: ${item.starpath}`);
    //console.log(`item.eventtokens: ${item.eventtokens}`);
    //console.log(item);
    // maybe getting overridden later? also the editor is lagging...
    */
  }

  // ===== Premium Item (may include returning Star Path) =====
  if (isPremium(item)) {
    if (item.location.includes('starpath')) {
      item.returning = true; // both premium and returning star path
    }
    const string = item.source;
    const regex = /Premium Bundle \- ([\"\'\w\W]+) \(([\w\_\d]+) M\)/;
    const result = string.split(regex);
    item.bundleName = result[1];
    item.bundlePrice = result[2];

    if (showItemDebug) {
      console.log(item.bundleName, ' contains the item: ', item.name);
    }
    if (item.name == item.bundleName) {
      item.standalone = true;
    }

    if (item.bundlePrice == '____') {
      item.bundlePrice = 'XXX___XXX';
      item.bundlePrice = 'TBA_' + getFirstLetters(item.bundleName);
    }
  }

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

  item.itemSource = itemSource;
  item.itemFrom = itemFrom;

  return item;
}

// **** TODO: condition for including premium/Bundle AND starpath???
// TODO - INFOBOX FROM NEEDS TO HAVE BOTH BUNDLENAME AND STAR PATH INFO FOR RETURNING ITEMS
function output_from(item) {
  item = parseItemSource(item);

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

  switch (item.inStore) {
    case 'EI':
    case 'x - SV':
    case 'SV':
    case 'WM':
      if (showItemDebug) {
        console.log(item.name, ' is a scrooge item');
      }
      itemSource = itemSource_scroogeDefault + ' in [[' + item.collection + ']].';
      infoboxFrom += "|from=Scrooge's Store (" + item.collection + ")\n|storeSlots=";
      break;
    case 'x':
      if (showItemDebug) {
        console.log(item.name, ' is a scrooge item');
      }
      itemSource = itemSource_scroogeDefault + '.'; // default to basic scrooge text
      infoboxFrom = "|from=Scrooge's Store\n|storeSlots="; // default to basic scrooge params
      break;
    default:
      infoboxFrom = ''; // '<!--TODO-->'; // TODO - from=Premium Shop, from=friendship, from=reward, crafting |from=Lorekeeper Tale ****
      itemSource = 'SOURCE TODO.'; // crafting
      break;
  }

  if (isCraftable(item)) {

    if (showItemDebug) {
      console.log(item.name, ' is a craftable item');
    }

    infoboxFrom = '|recipe=' + createInfoboxRecipe(item) + '\n';

    if (item.event) {
      // if regex Crafting \(([\w+\!]\)
      itemSource = 'It can be crafted using seasonal [[ingredients]] that are available during the [[' + item.event + ']] event at a [[:Category:Crafting Stations|Crafting Station]].'
    } else {
      itemSource = 'It can be crafted using a [[:Category:Crafting Stations|Crafting Station]].';
    }
  }




  // quick hack
  if (infoboxFrom.includes('Scrooge')) {
    item.missingCategories.push('[[Category: Missing Store Slot]]');
  }

  // ========== 3 CHECK IF FROM friendship ==========
  if (item.location == 'friendship') {
    if (showItemDebug) {
      console.log(item.name, ' is a friendship reward item', item.source);
    }
    // source should have already been parsed in parseItemSource
    itemSource =
      'It is automatically rewarded after reaching [[' +
      item.character +
      '#Friendship Rewards|Friendship Level ' +
      item.level +
      ']] with [[' +
      item.character +
      ']].';

    infoboxFrom =
      '|reward={{Friendship|' + item.character + '|' + item.level + '}}';
  }

  // ========== 4 CHECK IF FROM quest ==========
  if (item.location == 'quest') {
    if (showItemDebug) {
      console.log(item.name, ' is a quest reward item', item.source);
    }

    // source should have already been parsed in parseItemSource
    itemSource =
      'It is automatically rewarded after reaching [[' +
      item.character +
      '#Friendship Rewards|Friendship Level ' +
      item.level +
      ']] with [[' +
      item.character +
      ']] and completing the quest [[' +
      item.quest +
      ']].';

    infoboxFrom =
      '|reward={{quest|' +
      item.quest +
      '|friendship=' +
      item.character +
      '|level=' +
      item.level +
      '}}';
  }

  // ========== 5 CHECK IF FROM STARPATH (either returning or current)==========

  // EXAMPLE: "source":"Star Path - Lovely Monsters - 3E - T3 (25 tokens)\nPremium Bundle - Monster Plushies (1200 M) [___ M]"
  if (item.location && item.location.includes('starpath')) {
    if (showItemDebug) {
      console.log(item.name, ' is/was a star path item');
    }

    // source should have already been parsed in parseItemSource
    // properties: starpath, tile, tier, premiumInline-->"yes" or "no", eventtokens

    //infoboxFrom = "|from="+item.starpath+"\n|tier=%%tier%%\n|premium=%%premium%%\n|eventTokens='+item.eventtokens+'";
    // **** TODO: why isnt microtemplating working for this?
    infoboxFrom = `|from=${item.starpath} Star Path`;
    if (item.isBonus == "yes") {
      infoboxFrom += `\n|bonus=${item.isBonus}`;
    }

    infoboxFrom += `\n|tier=${item.tier}\n|premium=${item.premium}\n|eventTokens=${item.eventtokens}`;

    // not sure why interpolation isnt working TODO -- why did interpolation stop working 2025.04.23
    // not sure why it was ever working before to show correct star path, this might be being overridden somewhere for returning sp furniture
    itemSource = `It was available to unlock and collect for a limited time during the [[${item.starpath}  Star Path]] event using {{price|${item.eventtokens}|` +
      lookupToken(item.starpath) + `|showLabel}} from the Tier ${item.tier}${item.premiumInline}${item.bonusInline} Rewards`;

    if (item.bonus == "yes") {
      itemSource += ", which were available after all regular Star Path rewards have been collected";
    }
    itemSource += ".";


    // CURRENT STAR PATH
    if (item.starpath == starPathName) {
      // current tense
      itemSource = itemSource.replaceAll('was available', 'is available');
      itemSource = itemSource.replaceAll('were available', 'are available');
    }
  }

  // ========== 6 CHECK IF PREMIUM ITEM (may include returning starpath) ==========

  if (isPremium(item)) {
    if (showItemDebug) {
      console.log(item.name, ' is a premium item');
    }

    // source should have already been parsed in parseItemSource
    // properties: bundleName, bundlePrice, also adjusted for placeholder vals
    itemSource = generateBodyFromPremiumShop(item);

    // ****TODO - why isn't microtemplating working here? ***********
    //infoboxFrom = '|from=Premium Shop' + '\n|bundleName=%%bundleName%%\n|bundlePrice=%%bundlePrice%%';
    // REFACTORED PORTION REMOVED

    // item is a returning star path item to premium shop
    if (item.returning) {
      infoboxFrom = `|from=${item.starpath} Star Path\n|tier=${item.tier}\n|premium=${item.premium}\n|eventTokens=${item.eventtokens}`;
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

    infoboxFrom += '\n|bundlePrice=' + item.bundlePrice;
  }

  // value of collection should already be changed from DV-->Dreamlight Valley by some other collection function from the infobox

  // not sure why interpolation stopped working here as well..2025.08.18
  var inlineBundleLink_default = `[[${item.bundleName}]]`;
  var inlineBundleLink_standalone = `[[${item.bundleName} (Bundle)|${item.bundleName}]]`;
  var tokenLookup = lookupToken(item.starpath);

  var originallySPtext = `It was originally available to unlock and collect during the [[${item.starpath} Star Path]] event using {{price|$(item.eventtokens}|` +
    tokenLookup + `|showLabel}} from the Tier ${item.tier} ${item.premiumInline} Rewards. It later returned to the [[Premium Shop]] in the `;

  //Star Path - Elements of Nature - TILE - Vault (__ tokens)

  if (item.returning) {
    itemSource = originallySPtext + inlineBundleLink_default + ` bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;
  }
  if (item.name == item.bundleName) {
    if (item.returning)
      itemSource = originallySPtext + inlineBundleLink_standalone + ` bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;
    else
      itemSource = 'It is available to purchase from the [[Premium Shop]] in the ' + inlineBundleLink_standalone + ` bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;
  }

  // TODO: It later returned to the Vault Rewards of the [[STARPATH]] event and will be/was available to unlock after MONTH DAY, 2026.
  // insert before premium bundle (if relevant)


  // todo: tale/crafting
  // ========== 7 CHECK IF FROM tale ==========
  if (isTale(item)) {

    if (showItemDebug) {
      console.log('item.taleUniverse: ', item.taleUniverse);
    }
    // parseitemsource should have provided item.taleUniverse
    itemSource =
      'It can be collected as a reward after reordering the [[Snippets#Lorekeeper Tales|' +
      item.taleUniverse +
      ' Lorekeeper Tale]].';
    if (showItemDebug) {
      console.log(itemSource);
    }

    infoboxFrom = '|from=Lorekeeper Tale';
  }

  item.infoboxFrom = infoboxFrom;
  item.itemSource = itemSource;
  var output = '%%infoboxFrom%%\n';
  return output;
}

function generateFrom_Crafting(item) {

}



function output_itemSource(item) {
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
  //console.log(`${item.name} iswallpaperflooring? ${isWallpaperFlooring(item)}`)
  if (isWallpaperFlooring(item)) {
    collectionText = "sdsdfasdfads Once collected it will be added to the [[:Category:%%collection%% %%itemType%% Sets Collection|%%collection%% %%itemType%% Sets Collection]] and more can be ordered from [[Scrooge's Store#Catalog|Scrooge's Catalog]].";
  }

  // todo  - move untracked logic here instead

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
    output +=
      'It can be positioned and placed using the [[Furniture menu]] inside the [[Inventory]]';
    switch (item.placement) {
      case 'surfaces':
        output += ', and it can be placed either on the ground or on surfaces.';
        break;
      case 'walls (indoor)':
        output +=
          ', and must be placed on a wall.';
      case 'walls':
        output +=
          ', and must be placed on a wall.'; /*TODO is this being hit? naboo decor..., naboo fireplace not triggering proper reaading of environment etc*/
        break;
      case 'wall-mounted':
        output += ', and must be placed against a wall.';
        break;
      default:
        output += '';
    }

    if (item.environment == 'outdooronly') {
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
    } // ***** TODO - use case where we know its a table but either don't know surface area or the surface area is weirdly shaped, so leave it generic - check number of spaces

    // TODO - appropriate text for returning SP item wallpaper/flooring - currently not working
    if (isWallpaperFlooring(item)) {
      //output = "Once collected it can be applied to rooms inside the [[Player's House]] using the [[Furniture menu]] inside the [[Inventory]].";
    }


    // add a period at end if doesnt exist
    if (output.charAt(output.length - 1) != '.') output += '.';

    output += item.itemUseBody; // set in output_itemIntro - super hacky of me
  }

  // janky - create full sentence with environment
  output = output.replace(', and it can only be placed outdoors.,', ', it can only be placed outdoors, and');


  return output;
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
    case 'Hairstyle':
      itemUseIntro_clothing = ' piece of ' + '[[:Category:Hairstyle|hairstyle]]' + ' [[clothing]].';
      break;
    case 'Accessories':
      itemUseIntro_clothing = ' piece of ' + '[[:Category:Accessories|accessory]]' + ' [[clothing]].';
      break;
    case 'Character':
    case 'Character Dream Style':
      itemUseIntro_clothing = '';
      break;
    default:
      itemUseIntro_clothing = ' piece<!--/pair--> of <!--back/costume/dress/shoes--> [[clothing]].';
  }
  //'<!--Accessories, companions, tools, Gliders-->';

  if (showItemDebug) {
    console.log("item.functions for ", item.name, ": ", item.functions);
  }



  switch (item.functions) {
    case 'Light (Constant)':
    case 'Lighting (Constant)':
      itemUseIntro = 'lighting';
      itemUseBody = 'Once it is placed in the world, the object acts as a light source, but the Player cannot interact with it.'; // ....
      break;
    case 'Light (Automatic)':
    case 'Lighting (Automatic)':
      itemUseIntro = 'lighting';
      itemUseBody = 'Once it is placed in the world, the object acts as a light source, but the Player cannot interact with it. It will automatically turn on or off depending on the [[Environment#Time-Based Lighting Effects|time of day]].'; // ....
      break;
    case 'Light':
    case 'Lighting':
      itemUseIntro = 'lighting';
      itemUseBody = "Once it is placed in the world, the Player can '''Interact''' with the object to toggle its light on and off."; // ....
      break;
    case 'Arch':
      itemUseIntro = 'arch';
      itemUseBody = ''; // " Once it is placed in the world, the Player can walk underneath and through the object."
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
      itemUseBody = " Once it is placed in the world, the Player can '''Sit''' on the object.";
      break;
    case 'Lounge':
      itemUseIntro = 'seating'; //'<!--seating/bed-->'; // sometimes this is bed... but should probs just display seating anyway, as bed has no intrinsic meaning
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


  // TODO: this is overriding any values set above, need to fix
  // janky catch for more lighting objects - this is not robust!!!! cases where i've written extra info in the box
  if (item.functions && item.functions.includes('Light')) {
    itemUseIntro = 'lighting';
    itemUseBody = "<!-- Once it is placed in the world, the Player can '''Interact''' with the object to toggle its light on and off. // the object acts as a light source, but the Player cannot interact with it. It will automatically turn on or off depending on the [[Environment#Time-Based Lighting Effects|time of day]]. -->";
  }


  // override default filler content for wallpaper and flooring, which don't use "function"
  if (isWallpaperFlooring(item)) {
    //console.log('DETECTED WALLPAPER/FLOORING FOR ', item.name);

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

  //console.log('VALUES OF ITEMUSEINTRO AND ITEMUSEBODY',itemUseIntro, itemUseBody, "and category=", item.category)

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
    if (item.functions && item.functions.includes('Cooking Station')) {
      output += " that functions as a [[:Category:Cooking Station|cooking station]]";
      itemUseBody = " Once it is placed in the world, the Player can '''Use''' the item as a [[:Category:Cooking Stations|Cooking Station]] to make [[Cooking|meal recipes]].";
      //itemUseBody = " Once it is placed in the world, the Player can interact with ('''Use''') the item as a [[:Category:Cooking Stations|Cooking Station]] to make [[Cooking|meal recipes]].";
    }
    if (item.functions && item.functions.includes('Crafting Station')) {
      output += " that functions as a [[:Category:Crafting Station|crafting station]]";
      itemUseBody = " Once it is placed in the world, the Player can '''Use''' the item as a [[:Category:Crafting Stations|Crafting Station]] to make [[Crafting|crafting recipes]].";
    }
    if (item.functions && item.functions.includes('Gathering')) {
      output += ""; //" that functions as a [[:Category:Gathering.....|....]]";
      // TODO: detect and insert number of villagers from functions=Gathering (X)
      var numVillagers = '2';
      itemUseBody = ' It has a special gathering function. When the player stands beside it will highlight and prompt to gather villagers, and activating the [[Camera]] will fade the screen out and teleport ' + numVillagers + ' random villagers to the location.';
    }
    if (item.functions && item.functions.includes('Companion Home')) {
      output += "that functions as a [[:Category:Companion Home|companion home]]";
      itemUseBody = " Once it is placed in the world, the Player can '''Interact''' with the item to select up to 4 [[Companions|companions]]. These companions will roam in the immediate area and interact with nearby Companion items.";
    }

    output += ".";
  }




  if (isCharacterDreamStyle(item)) {
    //console.log(`item info for ${item.name}:   category: ${item.category}   universe: ${item.universe}    itemType: ${item.itemType}.    universe:${item.universe}`)
    var charProperName = determineCharacterFromDreamStyle(item.name);
    var uni = getCharacterUniverse(charProperName);

    itemUseIntro = ` that can be applied to the [[Dream Styles#${uni}|${uni}]] Character [[${charProperName}]].`;
    output += itemUseIntro;
  }

  // i'm not sure how these assignments are actually working? is item a global object or something?
  item.itemUseIntro = itemUseIntro;
  item.itemUseBody = itemUseBody;

  return output;
}


function parseItem(item) {


  return item;
}

/* ============= */
function renderClothingFurnitureArticle(dataArray) {
  var renderedHTML = '';


  var delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function(item) {

    // =*=*=*=*= PARSING ITEM START =*=*=*=*=
    // trying to troubleshoot why interpolation doesnt work for bundleName etc params
    if (!item) return;
    item.missingCategories = [];

    item = parseItemSource(item);
    item = parseSizePlacementEnv(item);

    switch (item.collection) {
      case 'DV':
        item.collection = 'Dreamlight Valley';
        break;
      case 'EI':
        item.collection = 'Eternity Isle';
        break;
      case 'SV':
        item.collection = 'Storybook Vale';
        break;
      case 'WM':
        item.collection = 'Wishblossom Mountains';
        break;
      default:
        break;
    }

    // TODO... . THIS IS FEELING A BIT JANKY
    if (isCastle(item)) {
      //in game: type=Dream Castle Skin, collection=none, category=none
      item.itemType = 'Dream Castle Skin';
      item.category = 'Dream Castle';
      item.collection = 'none';
    }

    if (isBuilding(item)) {
      //console.log(`item name=${item.name}, category=${item.category}, universe=${item.universe}, itemType${item.itemType} `);
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

      //console.log(`LOOP END: item name=${item.name}, category=${item.category}, universe=${item.universe}, itemType${item.itemType} `);
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

      // save Accessory "fake" universe to a new param
      const string = item.universe;
      const regex = /None - (([\w\W ]+)\(([\w\W ]+)\))/;
      const result = string.split(regex);
      //console.log(result[2],"      ", result[3]);
      if (result[3]) {
        item.groupedUniverse = result[3];
      } else {
        item.groupedUniverse = "Other";
      }
      //console.log("ITEM GROUPED UNIVERSE inside isAccessory = ",item.groupedUniverse);
      // None - Accessory (Aladdin) or None - Accessory
      item.universe = 'none';
    }

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
    template += output_sizePlacementEnv(item);
    template += output_functions(item);
    template += '}}\n';

    template += itemIntro; //output_itemIntro(item);
    template += itemSource; //output_itemSource(item);
    template += collectionStatus; //output_collectionStatus(item);
    template += itemUsage; //output_itemUsage(item);

    template += output_relatedItems(item);
    template += output_history(item);
    template += output_navbox(item);
    template += output_missingCategories(item);

    if (item.returning) {
      var returningItemTemplate =
        itemFrom + '\n' + itemIntro + itemSource + collectionStatus + itemUsage;
      // TODO - collection confirmed ONLY for returning items, do not impact global setting collectionConfirmed
      template = returningItemTemplate;
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
      //todo further
      ////template = generateStallTemplate(item);
      template = generateBuildingSkinTemplate(item);
    }

    if (isWishingWell(item)) {
      //todo further
      ////template = generateWishingWellTemplate(item);
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


    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

  return jankyCleanup(renderedHTML);
}




function generateBodyFromPremiumShop(item) {
  // TODO - this is repeated content, need to make a function for generating premium shop items and detecting standalone link vs not

  //console.log("item from inside generateBodyFromPremiumShop", item);

  var template = '';
  // item.standalone is not yet defined here!!! -- i think it is now
  //console.log(`${item.name} -- is standalone? (use fx) -- ${isStandalone(item)}`);
  //template = 'It is available to purchase from the [[Premium Shop]] in the [[%%bundleName%%]] bundle for {{price|%%bundlePrice%%|moonstone|showLabel}}.';
  template =
    `It is available to purchase from the [[Premium Shop]] in the [[${item.bundleName}]] bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;

  // 2025.08.19 this is not catching, item.standalone isn't defined yet
  // this is catching... sometimes??
  if (isStandalone(item)) {
    template =
      'It is available to purchase from the [[Premium Shop]] in the ' +
      '[[' + item.bundleName + ' (Bundle)|' + item.bundleName + ']]' +
      ' bundle for {{price|' + item.bundlePrice + '|moonstone|showLabel}}.';
    //template = `It is available to purchase from the [[Premium Shop]] in the [[${item.bundleName} (Bundle)|${item.bundleName}]] bundle for {{price|${item.bundlePrice}|moonstone|showLabel}}.`;
  }

  return template;
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
      '}}\n' +
      '{{ItemDescription\n|%%name%%\n|type=House Dream Style\n|universe=%%universe%%';

    if (item.tier) {
      item.itemFrom =
        '|from=' + item.starpath + ' Star Path|tier=' + item.tier + '|premium=%%premium%%|eventTokens=' + item.eventtokens + '';
    }

    // todo - theese 3 params (from, bundleName, bundlePrice) are repeated in wayyyy too many places
    var addText = '';
    if (item.bundleName) {
      addText = '\n|from=Premium Shop\n|bundleName=%%bundleName%%\n|bundlePrice=%%bundlePrice%%';
    }
    if (item.bundleName == item.name) {
      addText = '\n|from=Premium Shop\n|bundleName=%%bundleName%% (Bundle){{!}}%%bundleName%%\n|bundlePrice=%%bundlePrice%%';
    }
    item.itemFrom += addText;

    template +=
      item.itemFrom +
      '\n}}';

    template += output_history(item) + output_navbox(item);
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
    /*template +=
      '{{infobox\n' +
      output_image(item) +
      '|width=225px\n' +
      output_type(item) +
      '|appliedto=%%appliedto%%' +
      '\n|universe=%%universe%%' +
      '\n' +
      output_from(item) +
      '}}\n';
      */
    // for some reason type was populating with Dream Style not Character Dream Style -- too lazy to fix everything atm
    template +=
      `{{infobox\n${output_image(item)}|width=225px\n|type=Character Dream Style\n|appliedto=%%appliedto%%\n|universe=%%universe%%\n${output_from(item)}}}\n`

    // this could be more elegant.... usually use the itemdescription, unless it is a returning starpath item
    if (item.returning) {
      template += "THIS IS A RETURNING SP ITEM - should use regular article generation";
    } else {
      template +=
        '{{ItemDescription\n|%%name%%\n|type=Character Dream Style\n|character=%%appliedto%%\n|universe=%%universe%%';
      if (item.tier) {
        item.itemFrom +=
          '\n|from=' + item.starpath + ' Star Path\n|tier=' + item.tier + '\n|premium=%%premium%%\n|eventTokens=' + item.eventtokens + '';
      }

      // todo - theese 3 params (from, bundleName, bundlePrice) are repeated in wayyyy too many places
      var addText = '';
      if (item.bundleName) {
        addText =
          '\n|from=Premium Shop\n|bundleName=%%bundleName%%\n|bundlePrice=%%bundlePrice%%';
      }
      if (item.bundleName == item.name) {
        addText =
          '\n|from=Premium Shop\n|bundleName=%%bundleName%% (Bundle){{!}}%%bundleName%%\n|bundlePrice=%%bundlePrice%%';
      }
      item.itemFrom += addText;

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
    //console.log("item character,",item.character)

    if (item.character) {
      item.itemFrom =
        '|from=Friendship|character=%%character%%|level=%%level%%';
    }

    if (item.tier) {
      item.itemFrom =
        '|from=' + item.starpath + ' Star Path|tier=' + item.tier + '|premium=%%premium%%|eventTokens=' + item.eventtokens + '';
    }

    if (item.inStore) {
      item.itemFrom = "|from=Scrooge's Store";
    }

    template +=
      item.itemFrom +
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
  var newStr = originalRenderedHTML;
  newStr = newStr.replaceAll('=null', '=');
  /*newStr = newStr.replaceAll(
    '[[:Category:<!--Dreamlight Valley--> Furniture Sets Collection|<!--Dreamlight Valley--> Furniture Sets Collection]]',
    '[[:Category:Dreamlight Valley Furniture Sets Collection|Dreamlight Valley Furniture Sets Collection]]'
  );
  newStr = newStr.replaceAll(
    '[[:Category: <!--Dreamlight Valley--> Clothing Sets Collection|<!--Dreamlight Valley--> Clothing Sets Collection]]',
    '[[:Category:Dreamlight Valley Clothing Sets Collection|Dreamlight Valley Clothing Sets Collection]]'
  );
  newStr = newStr.replaceAll(
    '[[:Category:<!--Storybook Vale--> Furniture Sets Collection|<!--Storybook Vale--> Furniture Sets Collection]]',
    '[[:Category:Storybook Vale Furniture Sets Collection|Storybook Vale Furniture Sets Collection]]'
  );
  newStr = newStr.replaceAll(
    '[[:Category: <!--Storybook Vale--> Clothing Sets Collection|<!--Storybook Vale--> Clothing Sets Collection]]',
    '[[:Category:Storybook Vale Clothing Sets Collection|Storybook Vale Clothing Sets Collection]]'
  );*/

  newStr = newStr.replaceAll('\n|size=remove', '');
  newStr = newStr.replaceAll('\n|gridSize=remove', '');

  // need to figure out why for crafted items theres extra space?
  newStr = newStr.replaceAll('\n\n|gridSize', '\n|gridSize');

  // main culprit of double space is itemUseIntro
  newStr = newStr.replaceAll('  ', ' ');


  // TODO: double check this in output - need to make functions value streamlining more robust, and not here
  newStr = newStr.replaceAll('Light \(Constant\)', 'Lighting \(Constant\)');
  newStr = newStr.replaceAll('Light \(Automatic\)', 'Lighting \(Automatic\)');
  newStr = newStr.replaceAll('Cooking Station \(Use\)', 'Cooking Station');
  newStr = newStr.replaceAll('Crafting Station \(Use\)', 'Crafting Station');


  // for crafted furniture
  newStr = newStr.replaceAll('[[Crafted Furniture#', '[[Furniture#');


  // todo - substitute none collection text with untracked text

  // It can be crafted using using seasonal [[ingredients]] that are available during the [[Lucky You!]] event at a [[:Category:Crafting Stations|Crafting Station]]. Once collected it will be added to both the [[:Category:none Crafting Collection|none Crafting Collection]] and the [[:Category:none Furniture Sets Collection|none Furniture Sets Collection]].
  //[[Category:none Furniture Sets Collection]]

  // Global flag required when calling replaceAll with regex
  // do not think this is working - 2026.04.05
  const regex = /Once collected it will be added to the \[\[\:Category: none ([\w]+) Sets Collection\|none ([\w]+) Sets Collection\]\]\./gi;
  // todo - should move this into output_collection function
  newStr = newStr.replaceAll(regex, 'Once collected it will not be added to the [[:Category:Untracked $1 Sets Collection|$2 Sets Collection]].');

  // TODO replace (\w),(\w) with $1, $2 for psBundleItems fix

  //const regex = /(\w),(\w)/gi;
  //newStr = newStr.replaceAll(regex, "$1, $2");
  // TODO replace (\w),(\w) with $1, $2 for psBundleItems fix

  // TODO - not sure why not working??? saying untehemed is redundant since accessories don't have universes
  newStr = newStr.replaceAll('is an unthemed piece of [[:Category:Accessories', 'is a piece of [[:Category:Accessories');


  // NOT WORKING
  newStr = newStr.replaceAll('\{\{inlineIcon\|\|iconOnly\}\}', '<!--{{inlineIcon|ICON_TBA|iconOnly}}-->');

  newStr = newStr.replaceAll('energy=-', 'energy=');
  newStr = newStr.replaceAll('\n|functions=-', '');
  //newStr = newStr.replaceAll('\n|functions=-', '\n|functions=none');
  newStr = newStr.replaceAll('\n|functions=Rug', '');

  // todo: get rid of trailing space before line break
  return newStr;
}