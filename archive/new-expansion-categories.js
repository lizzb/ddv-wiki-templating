// generateNewExpansionTemplate: category pages (and memory and seed article starters) to create for a new
// expansion. It was in js/engine.js, never called, and DDV-31 (commit 005550a, 2026-11-02) removed it as
// dead code. Kept here unchanged from 005550a^:js/engine.js so it can be found and wired in again.

// TODO - generateNewExpansionTemplate is not used yet anywhere
  function generateNewExpansionTemplate(item) {
    var template = 'TODO - generate list of category page articles for new expansion';

    let expansionCollection = "EXPANSIONCOLLECTION";

  /*
  // === CATEGORIES in preparation of an expansion:
  Category:EXPANSIONCOLLECTION Store Exclusive
  Category:EXPANSIONCOLLECTION Resources
  Category:EXPANSIONCOLLECTION Foraging Collection
  Category:Fish from EXPANSIONCOLLECTION
  Category:Fruit from EXPANSIONCOLLECTION
  Category:Gems from EXPANSIONCOLLECTION
  Category:Vegetables from EXPANSIONCOLLECTION
  Category:Sweets from EXPANSIONCOLLECTION
  */

    let category_Foraging = `Category:${expansionCollection} Foraging Collection\n\n` + `{{categoryheader|the [[Foraging]] [[collections|collection]] categorized under [[${expansionCollection}]]}}\n\n[[Category:${expansionCollection} Collection]]`;

    let category_StoreExclusive = `{{categoryheader|[[Clothing]], [[Furniture]], [[:Category:Wallpaper|Wallpaper]], and [[:Category:Flooring|Flooring]] items which are only sold at [[Scrooge's Store]] located in [[${expansionCollection}]] and no other location}}\n\n[[Category:Gameplay]]`;

    let category_Resources = `{{categoryheader|items that can be found in the '''{{name|${expansionCollection}|link=${expansionCollection}}}'''}}\n\n[[Category: Resource Locations]]`;

    let category_Fish = `{{categoryheader|[[Ingredients]] categorized as '''{{inlineIcon|Fish|link=:Category:Fish}}''' that can be found in the '''{{name|${expansionCollection}}}'''}}\n\n[[Category:Fish Locations]] [[Category:${expansionCollection} Resources]]`;

    let category_Fruit = `{{categoryheader|[[Ingredients]] categorized as '''{{inlineIcon|Fruit|link=:Category:Fruit}}''' that can be found in the '''{{name|${expansionCollection}}}'''}}\n\n[[Category:Fruit Locations]] [[Category:${expansionCollection} Resources]]`;

    let category_Gems = `{{categoryheader|items categorized as '''{{inlineIcon|Gems|link=:Category:Gems}}''' that can be found in the '''{{name|${expansionCollection}}}'''}}\n\n[[Category: Gem Locations]] [[Category:${expansionCollection} Resources]]`;

    let category_Vegetables = `{{categoryheader|[[Ingredients]] categorized as '''{{inlineIcon|Vegetables|link=:Category:Vegetables}}''' that can be found in the '''{{name|${expansionCollection}}}'''}}\n\n[[Category:Vegetable Locations]] [[Category:${expansionCollection} Resources]]`;

    let category_Sweets = `{{categoryheader|[[Ingredients]] categorized as '''{{inlineIcon|Sweets|link=:Category:Sweets}}''' that can be found in the '''{{name|${expansionCollection}}}'''}}\n\n[[Category:Sweets Locations]] [[Category:${expansionCollection} Resources]]`;



    let template_Memory = `{{stub}}\n{{infobox\n|image=%%name%%.png\n|width=300px\n|type=Memory\n|description=%%description%%\n|universe=%%universe%%\n|collection=%%new${expansionCollection}%%\n|found=TBA\n|from=<!--{{quest|QUESTNAME|friendship=CHARACTERNAME|realm=Story}}-->\n}}\n'''%%name%%''' is a [[Memories#%%universe%%|%%universe%%]] [[Memories|Memory]].\n\nOnce collected it will be added to the [[:Category:%%new${expansionCollection}%% Memories Collection|%%new${expansionCollection}%% Memories Collection]]{{cleanup|Verify -- , and can be viewed in items with [[:Category:Memory Frame|Memory Frame]] functionality}}.\n<!--\n==Acquisition==\n:{{quest|QUESTNAME}} - Unlocked after fishing up/picking up/digging up/eating [[xxxx]] which is cooked using [[Ingredients]] and a [[QUESTITEM]] caught during the quest, then reading [[ITEM]] in Inventory.\n\n==Quests==\nThis memory is collected during the following quests:\n*{{quest|QUESTNAME|friendship=CHARACTERNAME|realm=Story}}\n-->\n==History==\n{{history|%%version%%|Added}}\n\n{{NavboxMemory}}`;

    let template_seed = `{{stub}}\n{{infobox\n|image=%%name%%.png\n|description=%%description%%\n|type=Seed\n|buyprice=\n|sellprice=\n|giftreward=\n|growtime=<!--{{growthTime|15}}<br>{{growthTime|15|biome=PREFERREDBIOME}}-->\n|waterings=\n|yield=<!--{{name|CROPNAME|CROPCOUNT}}-->\n|from={{inlineIcon|Goofy's Stall|size=20|link=Goofy's Stall#%%new${expansionCollection}%%}}\n|found={{name|%%new${expansionCollection}%%}}\n|gridSize=\n|placement=\n|stackMax=\n}}\n'''%%name%%''' is a [[Crop Seeds|seed]] type which can be planted and harvested to obtain [[Ingredients]].\n\nThey can be purchased from [[Goofy's Stall]] in [[%%new${expansionCollection}%%]] after the initial Stall repair.\n<!--\nIt takes XXXX minutes to grow<!-- and XXXX total waterings-- until CROPCOUNT [[CROPNAME]] can be harvested.\n-->\nThey can be planted in any Biome<!--, but will grow 10% faster when planted in either the [[PREFERREDBIOME#REGION1|REGION1]] or [[PREFERREDBIOME#REGION2|REGION2]] biomes in the [[Wishing Alps]]. This accelerated growth is denoted in the UI by a caret (^) icon that appears on the upper left corner of the seed image when choosing a seed to plant in its preferred Biome-->.\n\n==History==\n{{history|%%version%%|Added}}\n\n{{NavboxSeed|%%new${expansionCollection}%%}}`;

    return template;

  }
