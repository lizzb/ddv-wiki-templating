function getInlineDataTemplate(templateID) {
  return document.getElementById(templateID).getAttribute('data-template');
}

function getElementId(elementID) {
  return document.getElementById(elementID);
}

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

function isVowel(x) {
  return x == 'A' || x == 'E' || x == 'I' || x == 'O' || x == 'U';
}

function createUniverseLink(itemType, universe) {
  var output = ' is a';

  // don't have full coverage for this conditional
  //if (itemType == "") { itemType = "XXXXX_TYPE_XXXXX";}

  if (!universe || universe == '') {
    universe = 'XXXXX_UNIVERSE_XXXXX';
    output +=
      '<!--[[' +
      itemType +
      '#' +
      universe +
      '|' +
      universe +
      ']]--><!--[[' +
      itemType +
      '#Other|non-themed]]-->';

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
    if (isVowel(universe.substr(0, 1))) {
      output += 'n';
    }
    output += ' [[' + itemType + '#' + universe + '|' + universe + ']] themed';
  }

  return output;
}

function makeHTMLComment(text) {
  return '<!--' + text + '-->';
}

function wrapComment(input, doWrap) {
  if (doWrap) return '<!--' + input + '-->';
  else return input;
}

function getFirstLetters(sentence) {
  if (!sentence) {
    return '';
  }
  const words = sentence.split(' ');
  let firstLetters = '';
  for (const word of words) {
    firstLetters += word.charAt(0);
  }
  // dont use quotes in abbreviation
  firstLetters = firstLetters.replaceAll('"', '');
  return firstLetters;
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
    'The Beast',
    'Merida',
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
    'Goofy',
    'Mickey',
    'Minnie',
    'Scrooge',
    'Maui',
    'Moana',
    'Mike Wazowski',
    'Sulley',
    'Mulan',
    'Mushu',
    'Oswald',
    'Peter Pan',
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
    'EVE',
    'WALL-E',
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

function getCharacterUniverse(charName) {
  var charactersProperNames = [
    'Aladdin',
    'Jafar',
    'Jasmine',
    'Alice',
    'Cheshire Cat',
    'Belle',
    'Gaston',
    'The Beast',
    'Merida',
    'The Fairy Godmother',
    'The Forgotten',
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
    'Donald Duck',
    'Goofy',
    'Mickey Mouse',
    'Minnie Mouse',
    'Scrooge McDuck',
    'Maui',
    'Moana',
    'Mike Wazowski',
    'Sulley',
    'Mulan',
    'Mushu',
    'Oswald',
    'Peter Pan',
    'Remy',
    'Aurora',
    'Maleficent',
    'Flynn',
    'Mother Gothel',
    'Rapunzel',
    'Nala',
    'Pumbaa',
    'Scar',
    'Simba',
    'Timon',
    'Ariel',
    'Prince Eric',
    'Ursula',
    'Vanessa',
    'Tiana',
    'Merlin',
    'Jack Skellington',
    'Sally',
    'Buzz Lightyear',
    'Woody',
    'EVE',
    'WALL-E',
    'Vanellope',
    'Snow White',
    'Tigger',
    'Cruella de Vil'
  ];

  var universe = 'TODO_UNIVERSE';

  for (let i = 0; i < charactersProperNames.length; i++) {
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
      case 'Vanellope':
        universe = 'TODO_UNIVERSE';
        break;
    }
  }
  return universe;
}

function lookupToken(starpath) {
  var output = '';

  switch (starpath) {
    case 'Pixar Fest':
      output = 'pixartoken';
      break;
    case "Villains'":
      output = 'villaintoken';
      break;
    case 'Festive':
      output = 'festivetoken';
      break;
    case 'Centennial':
      output = 'centennialtoken';
      break;
    case 'Disney Parks':
      output = 'parkstoken';
      break;
    case 'Wonder of Pixar':
      output = 'wonderpixartoken';
      break;
    case 'Haunted Holiday':
      output = 'hauntedtoken';
      break;
    case 'Royal Winter':
      output = 'royalwintertoken';
      break;
    case 'Lovely Monsters':
      output = 'monstertoken';
      break;
    case 'A Day at Disney':
      output = 'dayatdisneytoken';
      break;
    case 'Majesty and Magnolias':
      output = 'magnoliatoken';
      break;
    case 'Dapper Delights':
      output = 'lilypadtoken';
      break;
    case 'The Night Show':
      output = 'rockstartoken';
      break;
    case 'Frost & Fairies': // The Frost & Fairies
      output = 'icecrystaltoken';
      break;
    case 'Oasis Retreat':
      output = 'tranquiltoken';
      break;
    case 'Garden of Whimsy':
      output = 'whimsytoken';
      break;
    case 'Adventures in Never Land':
      output = 'compasstoken';
      break;
    case 'Retro Roadtrip':
      output = 'maltshoptoken';
      break;
    case 'Witchful Thinking':
      output = 'brewtoken';
      break;
    default:
      output = 'ORIGINALTOKENNAME';
  }
  return output;
}

function insertNumberWord(num) {
  var output = '';
  switch (num) {
    case 1:
      return 'one-star ';
    case 2:
      return 'two-star ';
    case 3:
      return 'three-star ';
    case 4:
      return 'four-star ';
    case 5:
      return 'five-star ';
    default: {
      break;
    }
  }
  //if (num >= 1 && num <=5 ) output += "-star ";
  return '';
}








function parseUniqueBundles(dataArray) {
  // TODO - add to relatedItems in alpha sort order
  var resultArray = [];

  dataArray.forEach(function (item) {
    const searchItem = item.bundleName;
    //item = parseItemSource(item); // Item source already parsed for infobox
    const foundObject = resultArray.find(
      (obj) => obj.bundleName === searchItem
    );
    if (foundObject) {
      //console.log(`'${searchItem}' (bundleName) is already present in our resultArray`);
      //if (!foundObject.psBundleItems) foundObject.psBundleItems = [];
      foundObject.psBundleItems.push(item.name);
      //console.log("psBundleItems: ", foundObject.psBundleItems);
    } else {
      //console.log(`'${searchItem}' is not present in our resultArray, adding.`);
      // **** TODO - single-item bundles seem to have duplicate values??? or perhaps just using the wrong template - also not including one of the items in multi-item bundles??
      item.psBundleItems = [];
      item.psBundleItems.push(item.name);
      resultArray.push(item);
    }
  });
  //console.log(resultArray);
  resultArray.forEach(function (bundleObj) {
    bundleObj.psBundleItems.sort(); // alpha sort each bundle's items
  });

  return resultArray;
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
  var psBundleTables =
    psBundleNavbox +
    '\n\n' +
    psTopTable +
    '\n\n' +
    psPageListing +
    '\n\n' +
    psHistoricalTableRow;

  dataArray.forEach(function (item) {
    item = parseItemSource(item);
    renderedHTML += '\n\n';

    // TODO - this doesnt seem to be catching
    if (item.name == item.bundleName) {
      if (showItemDebug) { console.log(item.bundleName, ' IS A STANDALONE ITEM'); }
      item.standalone = true;

      //console.log(itemFrom); // TODO - 2025.06.24 - figure out why this errors out, itemFrom needs to always be defined??
      // TODO - if standalone item, replace '|bundleName=' + item.bundleName + '(Bundle){{!}}' + item.bundleName

      item.psBundleNavbox =
        "'''[[%%bundleName%% (Bundle)|%%bundleName%%]]''' •";
      item.psTopTable =
        '| [[File:%%bundleName%% Store.png|450px|right|link=%%bundleName%% (Bundle)]]<!--row 1 right-->';
      item.psPageListing =
        "File:%%bundleName%% Store.png|'''[[%%bundleName%% (Bundle)|%%bundleName%%]]'''|link=%%bundleName%% (Bundle)";
      item.psHistoricalTableRow =
        '|-\n| [[%%bundleName%% (Bundle)|%%bundleName%%]]\n| {{name|%%bundleName%%}}'; //+ psHistoricalTableRow_price;
      item.psBundleArticle =
        '{{infobox\n|name=%%bundleName%%\n|image=%%bundleName%% Store.png\n|width=350px\n|type=Premium Bundle\n|category=%%itemType%%\n|from=Premium Shop\n|sellprice={{price|%%bundlePrice%%|moonstone}}\n|items=%%name%%\n}}\n{{BundleDescription\n|%%bundleName%%\n|type=Premium Bundle\n|category=%%itemType%%\n|from=Premium Shop\n|bundlePrice=%%bundlePrice%%\n|items=%%name%%\n|dates=\n* 2025-MM-DD - 2025-MM-DD\n}}\n\n==History==\n{{history|' +
        item.version +
        '|Added}}\n\n{{NavboxPremiumBundle}}';
    } else {
      item.standalone = false;
      if (showItemDebug) { console.log('psBundleItems: ', item.psBundleItems); }
      item.psBundleNavbox = "'''[[%%bundleName%%]]''' • ";
      item.psTopTable =
        '| [[File:%%bundleName%%.png|450px|right|link=%%bundleName%%]]<!--row 1 right-->';
      item.psPageListing =
        "File:%%bundleName%%.png|'''[[%%bundleName%%]]'''|link=%%bundleName%%";
      item.psHistoricalTableRow = '|-\n| [[%%bundleName%%]]\n|'; // + psHistoricalTableRow_price;
      //item.psHistoricalTableRow = "|-\n| [[%%bundleName%%]]\n|\n{{name|xxxxxx}}<!-- ({{price|XXXXXXX|moonstone}})--><br>\n{{name|xxxxxx}}<!-- ({{price|XXXXXXX|moonstone}})--><br>"; // + psHistoricalTableRow_price;
      // TODO - rather than interpolating psBundleItems, add spaces between the commas of items for readability - for some reason below code wont work
      /*if (item.psBundleItems && psBundleItems.length > 1){
        console.log("BUNDLE ITEMS SHOULD BE JOINED WITH COMMA SPACE");
        item.psBundleItemsString=item.psBundleItems.join(", ");
      } 
      else {
        item.psBundleItemsString="";
      }*/
      item.psBundleArticle =
        '{{infobox\n|name=%%bundleName%%\n|image=%%bundleName%%.png\n|width=350px\n|type=Premium Bundle\n|category=%%itemType%%\n|from=Premium Shop\n|sellprice={{price|%%bundlePrice%%|moonstone}}\n|items=%%psBundleItems%%<!--TODO: VERIFY ORDER BEFORE COPY/PASTING BELOW-->\n}}\n{{BundleDescription\n|%%bundleName%%\n|type=Premium Bundle\n|category=%%itemType%%\n|from=Premium Shop\n|bundlePrice=%%bundlePrice%%\n|items=\n|dates=\n* 2025-MM-DD - 2025-MM-DD\n}}\n\n==History==\n{{history|' +
        item.version +
        '|Added}}\n\n{{NavboxPremiumBundle}}';
    }
  });
  dataArray = parseUniqueBundles(dataArray);

  renderedHTML += '\n\n============ Premium Bundle Navbox ============\n\n';
  dataArray.forEach(function (item) {
    //console.log(item.bundleName + psBundleNavbox);
    renderedHTML += microTemplate(item.psBundleNavbox, item) + '\n\n\n';
  });

  renderedHTML += '\n\n============ Premium Bundle Top Table ============\n\n';
  dataArray.forEach(function (item) {
    renderedHTML += microTemplate(item.psTopTable, item) + '\n\n\n';
  });

  renderedHTML +=
    '\n\n============ Premium Bundle Page Listing ============\n\n';
  dataArray.forEach(function (item) {
    renderedHTML += microTemplate(item.psPageListing, item) + '\n\n\n';
  });

  // ****TODO FIX currently rendering dupes of standalone items in historical table
  // ****TODO FIX currently not listing all items in the bundle -- think fixed?
  renderedHTML +=
    '\n\n============ Premium Bundle Historical Table ============\n\n';
  dataArray.forEach(function (item) {
    renderedHTML += microTemplate(item.psHistoricalTableRow, item);
    if (item.psBundleItems && item.psBundleItems.length > 1) {
      item.psBundleItems.forEach(function (bundleItem) {
        renderedHTML += '\n{{name|' + bundleItem + '}}';
        if (item.returning)
          // TODO - and not standalone
          renderedHTML += '<!-- ({{price|XXXXXXX|moonstone}})-->';
        renderedHTML += '<br>';
      });
    }
    renderedHTML += microTemplate(psHistoricalTableRow_price, item);
    renderedHTML += '\n\n\n';
  });

  renderedHTML += '\n\n============ Bundle Article ============\n\n';
  dataArray.forEach(function (item) {
    renderedHTML +=
      microTemplate(item.psBundleArticle, item) +
      '\n\n----------------------------------------------------------\n\n';
  });

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
    case 'Dairy and Oil':
      return '[[:Category:Dairy and Oil|any Dairy and Oil]]';
    case 'Sweets':
      return '[[:Category:Sweets|any Sweet]]';
    case 'Fruit':
      return '[[:Category:Fruit|any Fruit]]';
    case 'Spices':
      return '[[:Category:Spices|any Spice]]';
    case 'Seafood':
      return '[[:Category:Seafood|any Seafood]]';
    case 'Vegetables':
      return '[[:Category:Vegetables|any Vegetable]]';
    case 'Grains':
      return '[[:Category:Grains|any Grain]]';
    case 'Meat':
      return '[[:Category:Meats|any Meat]]';
    case 'Protein':
      return '[[:Category:Protein|any Protein]]';
    case 'xxxxx':
      return 'xxxxx';
    default: {
      return 'meal'; // default use is placeholder meal text for new stub articles
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
      return 'meal'; // default use is placeholder meal text for new stub articles
      break;
    }
  }
  return output;
}




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
        //console.log(`detected that ${item.ingredientArray[i]} is versatile ingredient`);
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
  return false;
}


function wrapNameTemplate(ing, ingQty) {
  output = '';
  output += '{{name|'+ing;
  if (ingQty>1) output += '|'+ingQty;
  output += '}}';
  return output;
}

// for making infobox |recipe for crafted items with ing1, ing1qty, ing2, ing2qty...
//function createIngredientList(item, wrapType, joinType) {
function createInfoboxRecipe(item) {

  /*
  |recipe={{name|Petrified Wood|10}}<br>
{{name|Moss|2}}<br>
{{name|Pine Cone|5}}<br>
{{name|Crimson Eternal Poppies|2}}*/
    var output = '|recipe=';
    var ingredientArray = [];
    if (item["ing1"] && item["ing1"] != "-") ingredientArray.push(wrapNameTemplate(item["ing1"]));
    if (item["ing2"] && item["ing2"] != "-") ingredientArray.push(wrapNameTemplate(item["ing2"]));
    if (item["ing3"] && item["ing3"] != "-") ingredientArray.push(wrapNameTemplate(item["ing3"]));
    if (item["ing4"] && item["ing4"] != "-") ingredientArray.push(wrapNameTemplate(item["ing4"]));
    if (item["ing5"] && item["ing5"] != "-") ingredientArray.push(wrapNameTemplate(item["ing5"]));
    if (item["ing6"] && item["ing6"] != "-") ingredientArray.push(wrapNameTemplate(item["ing6"]));
    //item.ingredientArray = ingredientArray;
    output = ingredientArray.join("<br>\n");

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
    /*item.itemRecipeString = ingredientArray.forEach((ingredient) => {
      let sentence = `{{name|${ingredient}}}`;
    });*/
    var tempArray = [];
    for (var i=0; i<ingredientArray.length; i++) {
      tempArray[i] = '{{name|'+ingredientArray[i]+'}}';
    }
    item.itemRecipeString = tempArray.join("<br>");
    var tempArray = [];
    for (var i=0; i<ingredientArray.length; i++) {
      // for versatile ingredients, add correct category link format
      if (isVersatileIngredient(ingredientArray[i])) {
        tempArray[i] = insertCookingLink(ingredientArray[i]);
      }
      else {
        tempArray[i] = '[['+ingredientArray[i]+']]';
      } 
    }
    item.articleListString = oxfordJoin(tempArray);

    // meal switch statement template
    //template = '\n|%%name%%=<!--{{name|ING1NAME}}<br>{{name|ING2NAME}}<br>{{name|ING3NAME}}<br>{{name|ING4NAME}}<br>{{name|ING5NAME}}-->\n';
    template = '\n|%%name%%=<!--'+item.itemRecipeString+'-->';
    //template += '\n';


    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });





  renderedHTML += '\n\n===== MEAL ARTICLES =====\n\n';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {
    template = '';
    // meal article template
    template += '\n{{stub}}\n{{infobox\n|image=%%name%%.png\n|description=';
    //console.log(`isVersatileRecipe(item) && item.stars && item.stars == 5 ${isVersatileRecipe(item)} ${item.stars} `);
    if (!isVersatileRecipe(item) && item.stars && item.stars == 5) {
      //console.log(`${item.name} successfully triggered as non-versatile recipe with 5 stars.`);
      // If recipe is 5 stars and does NOT include versatile ingredients, do plural "Meals" instead of "Meal"
      // prevents "and more" on the energy display when rendered in infobox
      template += '\n|type=Meals'; 
    }
    else {
      template += '\n|type=Meal'; 
    }
    if (!item.category) { item.category = '<!--Appetizers/Entrées/Desserts-->'; }
    template += '\n|category=%%category%%';
    template += '\n|collection='+newExpansionCollection;
    template += '\n|stars=%%stars%%';
    template += '\n|energy=';
    template += '\n|sellprice=';
    //template += '\n|giftreward=\n|orderReward=\n|size=\n|placement=';
    template += '\n|giftreward=\n|gridSize=\n|placement=<!--surfaces-->';
    template += '\n|ingredients=';

    template += wrapComment('{{IngredientList | '+item.ingredientListString+' | addCategories }}', !collectionConfirmed);
    template += '\n}}';
    template += "\n'''%%name%%''' is a " + insertNumberWord(item.stars) + '' + insertCookingLink(item.category) + ' which can be made at a [[:Category:Cooking Stations|cooking station]].';

    template += '\n\n';

    var itemUseBody = '';

    if (item.ingredientArray.length == 1) {
      itemUseBody =  'It can be [[Cooking|cooked]] by using '+item.articleListString + '. ';
    }
    else {
       itemUseBody= 'It can be [[Cooking|cooked]] by combining '+item.articleListString + '. ';
    }

    template += wrapComment(itemUseBody, !collectionConfirmed);
    template += 'Once collected it will be added to the [[:Category:'+newExpansionCollection+' Meals Collection|'+newExpansionCollection+' Meals Collection]].';

    template += "\n\n[[Cooking#Meals|Meals]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. After a meal has been removed from inventory it can be positioned using [[Furniture Menu#Placing Furniture|furniture placement mode]].";

    template += output_history(item);
    template += '\n\n{{NavboxMeal|wishblossomranch}}';// {{NavboxMeal|storybookvale}} // {{NavboxMeal|eternityisle}}
    template +=
      '\n\n[[Category:Missing Size]] [[Category:Missing Placement]] [[Category: Missing Description]]';

    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

  renderedHTML += '\n\n===== COOKING ARTICLE =====\n\n';
  //delimiter = '\n\n\n-----------------------------\n\n\n';
  delimiter = '';//no breaks between items, assumes already in correct category/alpha order
  dataArray.forEach(function (item) {
    template = '';
    template =
      '\n|-\n| [[File:%%name%%.png|center|50x50px|link=%%name%%]]\n| [[%%name%%]]\n| {{inlineIcon|%%category%%}}\n| {{stars|%%stars%%}}\n| <!--{{energy|XXXXX}}-->\n| <!--{{price|XXXXX}}-->\n| {{ItemRecipe | %%name%% }}';
    template += '\n| [['+newExpansionCollection+']]';

    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

  return renderedHTML;
}

function insertRecipeDefaults(dataArray) {
    var template = ''
    template += '\n==Crafting Recipes==';
    template += "\n'''{{PAGENAME}}''' is a required material in the following [[Crafting|crafting recipe]].";
    template += "\n{| class='wikitable sortable' id='recipe-table'";
    template += '\n! class=unsortable | Image';
    template += '\n!Name';
    template += '\n!Crafting Recipe';
    template += '\n|-';
    template += '\n|[[File:CRAFTEDITEMNAME.png|50px|center|link=CRAFTEDITEMNAME]]';
    template += '\n|[[CRAFTEDITEMNAME]]';
    template += '\n|';
    template += '\n{{name|ING1NAME|ING1QUANTITY}}<br>';
    template += '\n{{name|ING2NAME|ING2QUANTITY}}<br>';
    template += '\n{{name|ING3NAME|ING3QUANTITY}}';
    template += '\n|}';
    template += '\n';
    template += '\n==Quest Objectives==';
    template += '\n{{Objectives|header}}';
    template += '\n{{ObjectivesRow|{{quest|QUESTNAME|friendship=CHARACTERNAME|level=LEVELNUMBER}}|COUNT|USE OBJECTIVE}}';
    template += '\n{{Objectives|footer}}';
    template += '\n';
    template += '\n==Quest Recipes==';
    template += '\n{{Recipe|header|quest}}';
    template += '\n{{RecipeRow|RECIPENAME|quest={{quest|QUESTNAME|friendship=CHARACTERNAME|level=LEVELNUMBER}}}}';
    template += '\n{{Recipe|footer}}';
    return template;
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
//  template += "\n'''%%name%%''' is a [[Mining#Gems|gem]] which can be found when [[mining]] rock nodes using the [[Pickaxe]] in [[Everafter]] area of [[Wishblossom Ranch]]. ";
  template += "\n'''%%name%%''' is a [[Mining#Gems|gem]] which can be found when [[mining]] rock nodes using the [[Pickaxe]] in the [[%%biome%%]]. ";
  template += '';
  template += 'It can be used as a [[Crafting|crafting material]] to make items at a [[:Category:Crafting Stations|crafting station]]. ';
  template += 'It also has a chance to be sold at [[Aladdin\'s Gem Stall]] in [['+newExpansionCollection+']]. ';
  template += 'Once collected it will be added to the [[:Category:'+newExpansionCollection+' Gems Collection|'+newExpansionCollection+' Gems Collection]].';
  template += ' ';
  template += "\n\n[[Mining#Gems|Gems]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. After removing from inventory they can be positioned using [[Furniture menu#Placing Furniture|furniture placement mode]].";
  template += ' ';
  template += '\n<!--\nIn nodes where this gem can be found there is a chance to find [[Shiny %%name%%]], which is a less common and more valuable variant. In nodes where this gem can be found there is a chance to find [[NONSHINY]], which is a more common and less valuable variant.-->';

  //crafting recipes, quest objectives, quest recipes
  //template += insertRecipeDefaults(dataArray);

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
    template+= "\n'''%%name%%''' is a [[Foraging#Flowers|flower]] type that can be [[Foraging|found growing]] wild in the [[%%biome%%]].";
    template += '';
    template += "\n\n<!--There are exactly ITEMCOUNT '''{{PAGENAME}}''' found in the [[%%biome%%]], and another-->Another flower of the same type and color will only appear after one has been picked. There is an [[Flowers#Flower Spawning|internal-game timer]] for this flower type which respawns<!-- one every 60 minutes-->, and it can take up to 2 hours to fully repopulate all of these flowers between both areas.";
    // line about beast flower shop? template += 'It also has a chance to be sold at [[Aladdin\'s Gem Stall]] in [['+newExpansionCollection+']]. ';
    template += ' Once collected it will be added to the [[:Category:'+newExpansionCollection+' Foraging Collection|'+newExpansionCollection+' Foraging Collection]].';
    template += ' ';
    template += "\n\n[[Foraging#Flowers|Flowers]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. For many quests which require picking a flower, dropping it from inventory and picking back up will award credit. After a flower has been removed from inventory, it can be positioned using [[Furniture Menu#Placing Furniture|furniture placement mode]].";
    
    //crafting recipes, quest objectives, quest recipes
    //template += insertRecipeDefaults(dataArray);

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

/*
function generateRandomTemplate(item) {
  var template = '';
  return template;
}
*/

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
    template += '\n|ingtype=%%cookingType%%';
    template += '\n|collection='+newExpansionCollection;
    template += '\n|collectioncategory=<!--Fish/Seafood/Vegetables-->';
    template += '\n|energy=';
    template += '\n|buyprice=';
    template += '\n|sellprice=';
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
      //fishlogic
      // '''%%name%%''' is a type of [[Fishing#Fish Types|fish]]<!--[[:Category:Fish|fish]]--> which can be found by [[fishing]]<!--all/COLOR/open water or white pools--><!-- in all regions of [[BIOME]]-->.
      template += "\n'''%%name%%''' is a type of [[Fishing#Fish Types|fish]]<!--[[:Category:Fish|fish]]--> which can be found by [[fishing]]<!--all/COLOR/open water or white pools--> in the [[%%biome%%]].";
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
    template += '\n\nIt can be consumed to regain [[energy]], or used as an [[Ingredients|ingredient]] in [[Cooking#Meal Recipes|cooked meals]].';
    if (item.cookingType == "Fish") {
      template += ' Once collected it will be added to the [[:Category:'+newExpansionCollection+' Fish Collection|'+newExpansionCollection+' Fish Collection]].';
    }
    else {
      template += ' Once collected it will be added to the [[:Category:'+newExpansionCollection+' Ingredients Collection|'+newExpansionCollection+' Ingredients Collection]].';
    }
    template += '\n ';
    template += "\n[[Ingredients]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. After removing from inventory they can be positioned using [[Furniture menu#Placing Furniture|furniture placement mode]].";
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
    template += '\n';

    //crafting recipes, quest objectives, quest recipes
    //template += insertRecipeDefaults(dataArray);

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


function renderCompanions(dataArray) {
  // Create stub articles for quest items
  var renderedHTML = '';
  var delimiter = '';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {
    template = '';
    template += "{{stub}}";
    template += "\n{{Infobox";
    template += "\n|image=%%name%%.png";
    template += "\n|type=Companions";
    template += "\n|category=Animal Companions, Critter";
    template += "\n|collection="+newExpansionCollection;
    template += "\n|hangout=<!--Flowers/Ore/Fruit-->";
    template += "\n|critterType=%%type%%"; //<!--Goose/Bee/Skunk-->;
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
    template += "\n}}";
    template += "\n{{ItemDescription";
    template += "\n|%%name%%";
    template += "\n|type=Companion";
    template += "\n|critterType=%%type%%"; //<!--Goose/Bee/Skunk-->;
    template += "\n|from=Feeding Critters";
    template += "\n|found=in the '''Wishblossom Ranch''' Village<!--in '''REGION1''' area of [[%%biome%%]] all day on Sunday, Wednesday, Thursday, Friday, and Saturday / after completing the quest [[QUESTNAME]] at all times / on DAY mornings/afternoons from XXX AM to XXX PM -->";
    template += "\n|favoriteFood=TBA<!--[[FAV1]], and [[FAV2]]-->";
    ////template += "\n|likedFoods=other foods that have not yet been verified<!--all other [[Gems]]--><!--[[:Category:Grains|Grains]], [[:Category:Spices|Spices & Herbs]], and [[:Category:Vegetables|Vegetables]] as they are defined on the Ingredients tab of the '''Collection Menu''' - e.g. [[Vanilla]] is included, and [[Seaweed]] is not. They will additionally eat Fruit grown from [[Crop Seeds|seeds]], i.e. [[Cosmic Figs]], [[Grapes]], [[Melon]], [[Pineapple]]-->";
    //template += "\n|likedFoods=[[:Category:Grains|Grains]] as they are defined on the '''Ingredients''' section of the '''Collection Menu''' (not as they are grouped at a [[:Category:Cooking Stations|Cooking Station]])";
    template += "\n|likedFoods=other foods that have not yet been verified<!--all other [[Gems]]--><!--[[:Category:Grains|Grains]]-->";
    template += "\n|critterCollection="+newExpansionCollection;
    template += "\n|hangout=<!--[[Mining#Resources|Ore]] / [[Foraging#Flowers{{!}}Flowers]]-->";
    template += "\n|numFeedings=<!--(%%numFeedings%%)--><!--three <!--(3)-->}}";
    template += "\n";
    template += "\n{{CritterSchedule";
    template += "\n|location=<!--BIOME1{{!}}REGION1--><!--%%biome%%-->";
    template += "\n|sunday=TBA";
    template += "\n|monday=TBA";
    template += "\n|tuesday=TBA";
    template += "\n|wednesday=TBA";
    template += "\n|thursday=TBA";
    template += "\n|friday=TBA";
    template += "\n|saturday=TBA";
    template += "\n}}<!--";
    template += "\n";
    template += "\n==Yield==";
    template += "\n{| class=wikitable id='recipe-table'";
    template += '\n!style="" | Food Type';
    template += '\n!style="" | Item';
    template += '\n!style="" | Possible Rewards';
    template += "\n|-";
    template += "\n| Favorite";
    template += "\n| TBA";
    template += "\n|";
    //template += "\nTBA";
    template += "\n{{name|Dream Shard|2}}<br>";
    template += "\n{{name|Memory Shard}}<br>";
    template += "\n{{name|Motif Bag}}";
    template += "\n|-";
    template += "\n| Liked";
    template += "\n| TBA";
    template += "\n|";
    //template += "\nTBA";
    template += "\n{{name|Dream Shard}}<br>";
    template += "\n{{name|Memory Shard}}<br>";
    template += "\n{{name|Wheat/Carrot/Spinach Seed}}";
    template += "\n|}-->";
    template += "\n{{cleanup|Missing Love and Like rewards}}";
    template += "\n";
    template += "\n==Friendship Rewards==";
    template += "\n'''{{PAGENAME}}''' will award the following rewards when [[Friendship]] levels are reached. Friendship can be leveled up through activities while the companion is equipped.";
    template += "\n{| class=wikitable id='recipe-table'";
    template += "\n!Lvl";
    template += "\n!Image";
    template += "\n!Name";
    template += "\n!Type";
    template += "\n|-";
    template += "\n|[[File:Friendship_2.png|32px|center|link=Friendship]] || <!--[[File:REWARDITEM.png| 50x50px| center]]--> || <!--[[REWARDITEM]] (COUNT)--> || <!--[[Foraging#Flowers|Flower]]-->";
    template += "\n|-";
    template += "\n|[[File:Friendship_3.png|32px|center|link=Friendship]] || [[File:Companion Inventory Bonus Icon.png| 50x50px| center]] || [[Inventory|Inventory Increase]] (+4) || [[Inventory]]";
    template += "\n|-";
    template += "\n|[[File:Friendship_4.png|32px|center|link=Friendship]] || <!--[[File:Companion Gather Flowers Icon.png| 50x50px| center]]--> || <!--[[Foraging|Flower Gathering Bonus]]--> || [[Foraging|Resource Collection]]";
    template += "\n|-";
    template += "\n|[[File:Friendship_5.png|32px|center|link=Friendship]] || [[File:Companion Decor Reward.png| 50x50px| center]] || [[Companion Decor Reward]] || [[Furniture]]";
    template += "\n|}";

    template += output_history(item);
    template += "\n\n{{NavboxCompanion}}";
    template += "\n__noTOC__";

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
  dataArray.forEach(function (item) {
    template = '';
    template += '{{stub}}';
    template += '\n{{infobox';
    template += '\n|image=%%name%%.png';
    template += '\n|description=%%description%%';
    template += '\n|type=Quest Item';
    template +=
      '\n|found=<!--Given by {{name|%%questcharacter%%}} / Found in [[%%realmname%%]]-->';
    template +=
      '\n|from={{quest|%%questname%%|friendship=%%questcharacter%%|realm=%%realmname%%}}'; // TODO - LOGIC ON WHETHER COMMENTED OR NOT
    template += '\n|recipe=';
    template += '\n}}';
    template +=
      "\n'''%%name%%''' is a [[Quests|quest]] item<!--which is collected during // which is given by [[%%questcharacter%%]] during the [[%%realmname%%]] quest [[%%questname%%]] // which is crafted during the [[%%questcharacter%%#Friendship Quests|%%questcharacter%% Level 6 Friendship quest]] [[%%questname%%]]. // item which is [[Fishing|fished up]] in the [[%%realmname%%]] during the realm quest [[%%questname%%]]-->.";
    template += '\n';
    template += '\n==Acquisition==';
    template +=
      '\n:{{quest|%%questname%%}} - TBA<!--Crafted during quest / Given by [[%%questcharacter%%]]-->';
    template += '\n';
    template += '\n<!--==Quest Objectives==';
    template += '\n{{Objectives|header}}';
    template +=
      "\n{{ObjectivesRow|{{quest|%%questname%%|friendship=%%questcharacter%%|realm=%%realmname%%}}|1|'''Use''' from Inventory.}} '''Interact''' with item, then '''Transfer''' from Inventory to keyhole labeled \"Keyhole Label\"";
    template += '\n{{Objectives|footer}}';
    template += '\n-->';
    template += '\n==History==';
    template += '\n{{history|'+updateNumber+'|Added}}';
    template += '\n';
    template += '\n{{NavboxQuestItem}}';
    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });
  return renderedHTML;
}



/*
{{WallpaperFloorsDescription|wftype=Floors|universe=%%universe%%|from=Scrooge's Store|collection=Dreamlight Valley|preUpdate5=yes}}
*/
function renderUpdatedFlooring(dataArray) {

  

  // Create stub articles for quest items
  var renderedHTML = '';
  var delimiter = '';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {

    item.missingCategories = [];
    item = parseItemSource(item);
    item = item = parseSizePlacementEnv(item);

    // ===== Quest =====
  if (item.notes) {
    const string = item.notes;
    // Note: capital Q in quest source value
    const regex = /Renamed from ###([\w\W ]+)###;/;
    const result = string.split(regex);
    item.originalName = result[1]; //character value
    console.log(item.originalName);
  }

    template = '';
    template += '{{rename|%%name%%|Renamed in 1.18}}';
    template += '\n{{infobox';
    template += '\n|image=%%name%%.png';
    template += '\n'+output_type(item);
    template += '|category=Flooring, Ceiling Texture';
    template += '\n'+output_buyprice(item);
    template += output_color(item);
    template += output_tags(item);
    template += output_collection(item);
    template += output_traits(item);
    template += output_universe(item);
    template += '|storeSlots=paint';
    template += '\n|placement=flooring';
    template += '\n|environment=indooronly';
    template += '\n}}';
/*
    template += output_from(item); //necessary vals set/defined in output_from(item);
*/
    template +=
      "\n{{WallpaperFloorsDescription|wftype=Floors|universe=%%universe%%|from=Scrooge's Store|collection=Dreamlight Valley";
    if (item.version == "1.5") {
      template += "|preUpdate5=yes";
    }
      
      template += "}}";
    template += '\n\n==History==';
    template += `\n{{history|${item.version}|Added}}`;
    template += `\n{{history|1.18|Changed name from ''${item.originalName}'', added as [[:Category:Ceiling Texture|ceiling texture]]}}`;
    template += output_navbox(item);
    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });
  return jankyCleanup(renderedHTML);
  //return renderedHTML;
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
  return (
    (item.name && item.name.includes('Updo')) ||
    (item.name && item.name.includes('Haircut')) ||
    (item.category && item.category == 'Hairstyle')
  );
}

function isHouse(item) {
  var isHouse =
    (item.name && item.name.includes('House')) ||
    (item.category && item.category == 'House') ||
    (item.collection && item.collection.includes('House Dream Style'));

  if (isHouse) {
    item.itemType = 'Player House';
    item.category = 'House';

    ///return false; // TODO HOUSE DETECTION - type=furniture category = house?-->itemType = house dream style, or dream style?. or check collection == House Dream Style
  }
  return isHouse;
}

function isStall(item) {
  // some crafted items are called stall
  var result =  (
    (item.universe && item.universe.includes('Stall')) ||
    (item.collection && item.collection.includes('Stall'))); 
  if (result) {
    item.itemType = 'Stall';
  }
  return result;
}

function isAccessory(item) {
  var result =  (
    (item.universe && item.universe.includes('Accessory')) ||
    (item.name && item.name.includes('Accessory')) ||
    (item.name && item.name.includes('Handheld')) ||
    (item.category && item.category == 'Accessory') ||
    (item.category && item.category == 'Accessories')); // do NOT catch Umbrella - not safe
  if (result) {
    item.category = 'Accessories';

    // this was original location of groupedUniverse assignment

  }

  return result;
}


function isWishingWell(item) {
  var isWishingWell =
    (item.name && item.name.includes('Wishing Well')) ||
    (item.category && item.category == 'Well Skin') ||
    (item.collection && item.collection.includes('Well')) ||
    (item.universe && item.universe.includes('Well'));

  if (isWishingWell) {
    item.itemType = 'Dream Style';
    item.category = 'Well Skin';
  }
  return isWishingWell;
}

// this may also be catching wishing wells? need to investigate
function isCharacterDreamStyle(item) {
  
    // for chardreamstyles, itemType = Dream Style (originally Clothing from sheet, script overwrites), category = Character Dream Style, universe = Character Dream Style ...
  var isDreamStyle =
    item.collection == 'n/a - CHARACTER DREAM STYLE' ||
    (item.itemType == 'Clothing' &&
      item.collection == 'Dream Style') ||
    item.itemType == 'Dream Style';

  if (isDreamStyle) {
    item.itemType = 'Dream Style';
    item.category = 'Character Dream Style';

    //item.universe = 'Character Dream Style'; this will overwrite the infobox value if set here
  }
  return isDreamStyle;
}

function isStandalone(item) {
  //item isnt parsed yet, below wont work?  not sure
  return (
    item.name == item.bundleName ||
    (item.source && item.source.includes('Premium Bundle - ' + item.name)) ||
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
  // TODO: add OR source contains the word starpath
  return item.location && item.location.includes('starpath');
}


/*
// THIS IS NOT BEING CALLED
function generateHairstyleTemplate(item) {

  if (isHairstyle(item)) {
    item.category = 'Hairstyle';

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
      output_itemIntro(item);

    template +=
      output_history(item) +
      output_navbox(item) +
      output_missingCategories(item);
  }

  return template;
}
*/
