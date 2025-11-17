function getInlineDataTemplate(templateID) {
  return document.getElementById(templateID).getAttribute('data-template');
}

function getElementId(elementID) {
  return document.getElementById(elementID);
}

// Render a template composed of variables defined inline
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


function insertCookingLink(mealType) {
  var output = '';
  switch (mealType) {
    case 'Appetizers':
      return '[[Cooking#Appetizers|appetizer meal]]';
    case 'Entrees':
      return '[[Cooking#Entrees|entrée meal]]';
    case 'Desserts':
      return '[[Cooking#Desserts|dessert meal]]';
    default: {
      return 'meal';
      break;
    }
  }
  return output;
}

function renderMeals(dataArray) {
  var renderedHTML = '===== Template:ItemRecipe switch:=====\n';
  var delimiter = '';
  dataArray.forEach(function (item) {
    // meal switch statement template
    template =
      '\n|%%name%%=<!--{{name|ING1NAME}}<br>{{name|ING2NAME}}<br>{{name|ING3NAME}}<br>{{name|ING4NAME}}<br>{{name|ING5NAME}}-->\n';
    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

  renderedHTML += '\n\n===== MEAL ARTICLES =====\n\n';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {
    template = '';
    // meal article template
    template += '\n{{stub}}\n{{infobox\n|image=%%name%%.png\n|description=';
    template += '\n|type=Meal'; // TODO - if 5 stars and no versatile ingredients, do meals
    template += '\n|category=%%type%%<!--Appetizers/Entrées/Desserts-->';
    template += '\n|stars=%%stars%%';
    template += '\n|energy=';
    template += '\n|sellprice=';
    template += '\n|collection=Dreamlight Valley'; // todo - logic here and in body
    template +=
      '\n|giftreward=\n|orderReward=\n|size=\n|placement=\n|ingredients=<!--{{IngredientList | ING1, ING2, ING3, ING4, ING5 | addCategories }}-->\n}}';
    template +=
      "\n'''%%name%%''' is a " +
      insertNumberWord(item.stars) +
      '' +
      insertCookingLink(item.type) +
      ' which can be made at a [[:Category:Cooking Stations|cooking station]].';

    template +=
      '\n\n<!--It can be [[Cooking|cooked]] by using [[:Category:Grains|any Grain]]. It can be [[Cooking|cooked]] by combining [[:Category:Vegetables|any Vegetable]], [[ING2]], [[ING3]], and [[ING4]]. -->Once collected it will be added to the [[:Category:Storybook Vale Meals Collection|Storybook Vale Meals Collection]].';

    template +=
      "\n\n[[Cooking#Meals|Meals]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. After a meal has been removed from inventory it can be positioned using [[Furniture Menu#Placing Furniture|furniture placement mode]].";

    template += output_history(item);
    template += '\n\n{{NavboxMeal}}';
    template +=
      '\n\n[[Category:Missing Size]] [[Category:Missing Placement]] [[Category: Missing Description]]';

    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

  renderedHTML += '\n\n===== MEAL ARTICLES =====\n\n';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {
    template = '';
    template =
      '\n|-\n| [[File:%%name%%.png|center|50x50px|link=%%name%%]]\n| [[%%name%%]]\n| {{inlineIcon|%%type%%}}\n| {{stars|%%stars%%}}\n| <!--{{energy|XXXXX}}-->\n| <!--{{price|XXXXX}}-->\n| {{ItemRecipe | %%name%% }}';
    template += '\n| [[Storybook Vale]]';

    renderedHTML += microTemplate(template, item);
    renderedHTML += delimiter;
  });

  return renderedHTML;
}


function renderIngredients(dataArray) {
  var newExpansionCollection = "Wishblossom Ranch";
  // Create stub articles for quest items
  var renderedHTML = '';
  var delimiter = '';
  delimiter = '\n\n\n-----------------------------\n\n\n';
  dataArray.forEach(function (item) {
    template = '';
    template += '{{stub}}';
    template += '\n{{infobox';
    template += '\n|image=%%name%%.png';
    template += '\n|description=';
    template += '\n|type=Ingredient';
    template += '\n|ingtype=<!--Seafood/Fruit/Vegetables/Spices/Dairy and Oil/Grains/Protein-->';
    template += '\n|collection='+newExpansionCollection;
    template += '\n|collectioncategory=<!--Fish/Vegetables-->';
    template += '\n|energy=';
    template += '\n|buyprice=';
    template += '\n|sellprice=';
    template += '\n|giftreward=';
    template += '\n<!--';
    template += '\n|from=fishing';
    template += '\n|pool=';
    template += '\n';
    template += '\n|from={{name|Foraging}}<br>{{--}}{{inlineIcon|Trees|iconOnly|size=20|link=INGREDIENTNAME Tree}} [[INGREDIENTNAME Tree]]';
    template += '\n|from={{name|Foraging}}<br>{{--}}{{inlineIcon|Underbrush|iconOnly|size=20|link=INGREDIENTNAME Bush}} [[INGREDIENTNAME Bush]]';
    template += '\n';
    template += '\n|from={{name|Goofy\'s Stall|link=Goofy\'s Stall#BIOME1NAME{{!}}Goofy\'s Stall}}<br>';
    template += '\n{{name|Gardening}}';
    template += '\n|seed=INGREDIENTNAME Seed';
    template += '\n|growtime={{growthTime|XXXXX}}<br>{{growthTime|XXXXX|biome=BIOME1NAME|biome2=BIOME2NAME}}';
    template += '\n';
    template += '\n|biomes={{name|BIOME1NAME|link=BIOME1NAME{{!}}REGION1NAME}}<br>{{name|BIOME1NAME|link=BIOME1NAME{{!}}REGION2NAME}}';
    template += '\n|biomes=BIOME1NAME, BIOME2NAME';
    template += '\n-->';
    template += '\n|gridSize=';
    template += '\n|placement=';
    template += '\n|stackMax=';
    template += '\n}}';
    template += "\n'''%%name%%''' is a <!--[[:Category:Vegetables|vegetable]]--> type [[Ingredients|ingredient]] used in [[cooking]]. <!--It can be [[Gardening|grown]] from [[%%name%% Seed]]s, which are purchased from [[Goofy's Stall]] in [[BIOME1]] and the [[BIOME2]]. It can be found growing on [[%%name%% Tree]]s in '''REGION1''' and '''REGION2''' areas of the [[BIOME1]].";
    template += '\n';
    template += "\nEach harvest gives YIELDCOUNT '''%%name%%''', and the fruit takes XXXXX hour to regrow. Trees/Bushes will continue to produce fruit even if moved outside their origin biome.";
    template += '\n';
    template += "\nThe [[%%name%% Seed|seeds]] are unlocked for sale after the first upgrade of [[Goofy\'s Stall]] in [[BIOME1]], and after the initial repair of [[Goofy\'s Stall]] in the [[BIOME2]]. The [[BIOME1]] stall also has a chance to sell '''%%name%%''' directly. After planting it takes XXXXX minutes to grow, and WATERINGCOUNT total waterings until YIELDCOUNT can be harvested.";
    template += '\n-->';
    template += '\nIt can be consumed to regain [[energy]], or used as an [[Ingredients|ingredient]] in [[Cooking#Meal_Recipes|cooked meals]]. Once collected it will be added to the [[:Category:'+newExpansionCollection+' Ingredients Collection|'+newExpansionCollection+' Ingredients Collection]].';
    template += '\n ';
    template += "\n[[Ingredients]] can be placed in the world by highlighting them inside the [[Inventory]] window and selecting ''Drop''. After removing from inventory, they can be positioned using [[Furniture menu#Placing Furniture|furniture placement mode]].";
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
    /*
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
    */
    template += '\n-->';

  template += output_history(item);
    template += '\n\n{{NavboxIngredient}}';
    template +=
      '\n\n[[Category:Missing Size]] [[Category:Missing Placement]] [[Category: Missing Description]]';

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
  var result =  (
    (item.universe && item.universe.includes('Stall')) ||
    (item.name && item.name.includes('Stall'))); 
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
