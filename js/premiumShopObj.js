// https://jsbin.com/gehizeq/edit?js,console

// todo: Fairy Flower Set

var premiumBundles = {
    "Tournament Gown Merida": {
        "linked_name": "Tournament Gown Merida (Bundle)|Tournament Gown Merida",
        "contentsString": "{{name|Tournament Gown Merida}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_YellowStripeMerida",
        "bundleType": "Character Style"
    },
    "Caterpillar Jacket": {
        "linked_name": "Caterpillar Jacket (Bundle)|Caterpillar Jacket",
        "contentsString": "{{name|Caterpillar Jacket}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_CaterpillarOutfitBundle",
        "bundleType": "Clothing"
    },
    "Dear Deer Ensemble": {
        "linked_name": "Dear Deer Ensemble",
        "contentsString": "{{name|Spring Doe Bucket Hat}}<br>{{name|Spring Doe Onesie}}<br>{{name|Spring Doe Hiking Boots}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_BambiOutfit",
        "bundleType": "Clothing"
    },
    "Donut Duo": {
        "linked_name": "Donut Duo",
        "contentsString": "{{name|Mickey Mouse Cocoa Donut Headband}}<br>{{name|Mickey Mouse Strawberry Donut Headband}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_DonutDuo",
        "bundleType": "Clothing"
    },
    "Floral Ensemble": {
        "linked_name": "Floral Ensemble",
        "contentsString": "{{name|Floral Mini Dress}}<br>{{name|White Floral Heels}}<br>{{name|Boater Hat}}<br>{{name|Swan Necklace}}<br>{{name|Rose Pearl Earrings}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_FloralBundle",
        "bundleType": "Clothing"
    },
    "Island-Inspired Ensemble": {
        "linked_name": "Island-Inspired Ensemble",
        "contentsString": "{{name|Blue Diving Suit}}<br>{{name|Snorkel Mask Headband}}<br>{{name|Tropical Foliage Mickey Headband}}<br>{{name|Yellow Diving Suit}}<br>{{name|Red Diving Suit}}<br>{{name|Snorkel Mask}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.6",
        "protoDbName": "Bundle_Summer23",
        "bundleType": "Clothing"
    },
    "Maleficent Wings": {
        "linked_name": "Maleficent Wings (Bundle)|Maleficent Wings",
        "contentsString": "{{name|Maleficent Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HeroItem_MaleficentWings",
        "bundleType": "Clothing"
    },
    "Patchwork Dress": {
        "linked_name": "Patchwork Dress (Bundle)|Patchwork Dress",
        "contentsString": "{{name|Patchwork Dress}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "HeroItem_SallysDress",
        "bundleType": "Clothing"
    },
    "Platinum Techwear Bundle": {
        "linked_name": "Platinum Techwear Bundle",
        "contentsString": "{{name|Platinum Techwear Pants}}<br>{{name|Melting Platinum Mickey Mouse Ears}}<br>{{name|Platinum Techwear Jacket}}<br>{{name|Platinum Holographic Backpack}}<br>{{name|Steamboat Sneakers}}<br>{{name|Vintage Mickey Bracelet}}<br>{{name|Gloved Hand Makeup}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_PlatinumTechwearOutfit",
        "bundleType": "Clothing"
    },
    "Rainbow Phoenix Wings": {
        "linked_name": "Rainbow Phoenix Wings (Bundle)|Rainbow Phoenix Wings",
        "contentsString": "{{name|Rainbow Phoenix Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_DragonWings",
        "bundleType": "Clothing"
    },
    "Rosy Maple Moth Wings": {
        "linked_name": "Rosy Maple Moth Wings (Bundle)|Rosy Maple Moth Wings",
        "contentsString": "{{name|Rosy Maple Moth Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_MapleMothWings",
        "bundleType": "Clothing"
    },
    "Silken Dagger Gown": {
        "linked_name": "Silken Dagger Gown (Bundle)|Silken Dagger Gown",
        "contentsString": "{{name|Silken Dagger Gown}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Item_RedGothelDress",
        "bundleType": "Clothing"
    },
    "Small Pink Wings": {
        "linked_name": "Small Pink Wings (Bundle)|Small Pink Wings",
        "contentsString": "{{name|Small Pink Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HeroItem_CupidWings",
        "bundleType": "Clothing"
    },
    "Villainous Vibe": {
        "linked_name": "Villainous Vibe",
        "contentsString": "{{name|Wreck-It Jean Jacket}}<br>{{name|"King of the Pride" Mane}}<br>{{name|Left Rose Eyepatch}}<br>{{name|Right Rose Eyepatch}}",
        "priceString": "{{price|1250|moonstone}}",
        "versionAdded": "Bundle_Villain",
        "protoDbName": "1.3",
        "bundleType": "Clothing"
    },
    "BamBee": {
        "linked_name": "BamBee (Bundle)|BamBee",
        "contentsString": "{{name|BamBee}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_Bambee",
        "bundleType": "Companion"
    },
    "Bountiful Croc": {
        "linked_name": "Bountiful Croc (Bundle)|Bountiful Croc",
        "contentsString": "{{name|Bountiful Croc}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.6",
        "protoDbName": "HeroItem_FruitCrocodile",
        "bundleType": "Companion"
    },
    "Fiery Raven": {
        "linked_name": "Fiery Raven (Bundle)|Fiery Raven",
        "contentsString": "{{name|Fiery Raven}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_FieryRaven",
        "bundleType": "Companion"
    },
    "R2-D2 (Bundle)|R2-D2": {
        "linked_name": "R2-D2 (Bundle)|R2-D2",
        "contentsString": "{{name|R2—D2}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_R2D2",
        "bundleType": "Companion"
    },
    "Whimsical Pink Companion Pack 2": {
        "linked_name": "Whimsical Pink Companion Pack 2",
        "contentsString": "{{name|Pink Whimsical Sunbird}}<br>{{name|Pink Whimsical Turtle}}<br>{{name|Pink Whimsical Rabbit}}<br>{{name|Pink Whimsical Fox}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_DreamlightCritter2",
        "bundleType": "Companion"
    },
    "\"Adventure Is Out There!\" Balloon Basket": {
        "linked_name": "\"Adventure Is Out There!\" Balloon Basket (Bundle)|\"Adventure Is Out There!\" Balloon Basket",
        "contentsString": "{{name|\"Adventure Is Out There!\" Balloon Basket}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Item_AdventureIsOutThereBalloonBasket",
        "bundleType": "Furniture"
    },
    "Fairy Flower Set": {
        "linked_name": "Fairy Flower Set",
        "contentsString": "{{name|Whimsical Wheelbarrow|2}}<!-- ({{price|XXXXXXX|moonstone}})--><br>{{name|Giant Trumpet Flowers|2}}<!-- ({{price|XXXXXXX|moonstone}})--><br>{{name|Teatime Bird Feeder|2}}<!-- ({{price|XXXXXXX|moonstone}})--><br>{{name|Fairy Garden Chair|4}}<!-- ({{price|XXXXXXX|moonstone}})--><br>{{name|Fairy Garden Tea Set|2}}<!-- ({{price|XXXXXXX|moonstone}})--><!--TODO: VERIFY ITEM ORDER AND COUNTS-->",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_FairyFlowersSet / Bundle_FairyMushroomSet",
        "bundleType": "Furniture"
    },
    "Finding Nemo Decoration Set": {
        "linked_name": "Finding Nemo Decoration Set",
        "contentsString": "{{name|Large Aquarium}} ({{price|550|moonstone}})<br>{{name|Manta Ray Mobile}} ({{price|450|moonstone}})",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_FindingNemoSet",
        "bundleType": "Furniture"
    },
    "Highland Will-o'—the-Wisps": {
        "linked_name": "Highland Will-o'—the-Wisps (Bundle)|Highland Will-o'—the-Wisps",
        "contentsString": "{{name|Highland Will-o'—the-Wisps|5}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_WillOTheWisps",
        "bundleType": "Furniture"
    },
    "Holiday Gift Bundle": {
        "linked_name": "Holiday Gift Bundle",
        "contentsString": "{{name|Grand Tree of Holiday Cheer}} ({{price|600|moonstone}})<br>{{name|Big Pile of Gifts}} ({{price|600|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_HolidayGiftBundle",
        "bundleType": "Furniture"
    },
    "Inside Out Headquarters Set": {
        "linked_name": "Inside Out Headquarters Set",
        "contentsString": "{{name|Memory Display Partition}} ({{price|600|moonstone}})<br>{{name|Quirky Retro Couch}} ({{price|600|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_InsideOutHeadquartersSet",
        "bundleType": "Furniture"
    },
    "Monsters, Inc.'s Restaurant Set": {
        "linked_name": "Monsters, Inc.'s Restaurant Set",
        "contentsString": "{{name|Monstrous Sushi Counter}}<br>{{name|Monstrous Sushi Booth}}<br>{{name|Short Side Table}}<br>{{name|Monstrous Sushi Plate}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_MonstersIncsRestaurantSet",
        "bundleType": "Furniture"
    },
    "Musical Mausoleum": {
        "linked_name": "Musical Mausoleum (Bundle)|Musical Mausoleum",
        "contentsString": "{{name|Musical Mausoleum}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Item_HauntedPipe",
        "bundleType": "Furniture"
    },
    "Paper Whirlwind": {
        "linked_name": "Paper Whirlwind (Bundle)|Paper Whirlwind",
        "contentsString": "{{name|Paper Whirlwind|3}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Item_FlyingPapers",
        "bundleType": "Furniture"
    },
    "Pirate's Map and Relics Bundle": {
        "linked_name": "Pirate's Map and Relics Bundle",
        "contentsString": "{{name|Mao Kun Map Table}}<br>{{name|Fountain of Youth}}<br>{{name|Chalice of Cartagena}}<br>{{name|Metal Grate|4}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "Bundle_POTCBundle1",
        "bundleType": "Furniture"
    },
    "Sea Witch's Cauldron (Bundle)|Sea Witch's Cauldron": {
        "linked_name": "Sea Witch's Cauldron (Bundle)|Sea Witch's Cauldron",
        "contentsString": "{{name|Sea Witch's Cauldron}}",
        "priceString": "{{price|750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Item_UrsulaCauldron",
        "bundleType": "Furniture"
    },
    "Cozy Bookshop Home": {
        "linked_name": "Cozy Bookshop Home (Bundle)|Cozy Bookshop Home",
        "contentsString": "{{name|Cozy Bookshop Home}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HouseSkin_LibraryStore",
        "bundleType": "House"
    },
    "Garden Teapot House": {
        "linked_name": "Garden Teapot House (Bundle)|Garden Teapot House",
        "contentsString": "{{name|Garden Teapot House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HouseSkin_GardenTeapotHouse",
        "bundleType": "House"
    },
    "Halloween Town House": {
        "linked_name": "Halloween Town House (Bundle)|Halloween Town House",
        "contentsString": "{{name|Halloween Town House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HouseSkin_NBCInspiredHouse",
        "bundleType": "House"
    },
    "Jumbeaux's Cafe (Bundle)|Jumbeaux's Cafe": {
        "linked_name": "Jumbeaux's Cafe (Bundle)|Jumbeaux's Cafe",
        "contentsString": "{{name|Jumbeaux's Cafe}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HouseSkin_JumbeauxCafe",
        "bundleType": "House"
    },
    "Mike and Sulley's Apartment (Bundle)|Mike and Sulley's Apartment": {
        "linked_name": "Mike and Sulley's Apartment (Bundle)|Mike and Sulley's Apartment",
        "contentsString": "{{name|Mike and Sulley's Apartment}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "HouseSkin_MikeSullyAppt",
        "bundleType": "House"
    },
    "Prince Eric's Ship (Bundle)|Prince Eric's Ship": {
        "linked_name": "Prince Eric's Ship (Bundle)|Prince Eric's Ship",
        "contentsString": "{{name|Prince Eric's Ship}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "HouseSkin_EricBoat",
        "bundleType": "House"
    },
    "Purple Cottage": {
        "linked_name": "Purple Cottage (Bundle)|Purple Cottage",
        "contentsString": "{{name|Purple Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "HouseSkin_Cottage",
        "bundleType": "House"

    "Belle's Royal Tools": {
        "linked_name": "Belle's Royal Tools",
        "contentsString": "{{name|Roses and Gold Shovel}}<br>{{name|Roses and Gold Pickaxe}}<br>{{name|Roses and Gold Fishing Rod}}<br>{{name|Roses and Gold Hourglass}}<br>{{name|Roses and Gold Watering Can}}<br>{{name|Roses and Gold Phone}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Bundle_BellesRoyalTools",
        "bundleType": "Tool Style"
    },
    "Monsters, Inc.'s Tool Set": {
        "linked_name": "Monsters, Inc.'s Tool Set",
        "contentsString": "{{name|Monster Shovel}}<br>{{name|Monster Pickaxe}}<br>{{name|Monster Fishing Rod}}<br>{{name|Monster Hourglass}}<br>{{name|Monster Watering Can}}<br>{{name|Monster Phone}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_MonstersIncsToolSet",
        "bundleType": "Tool Style"
    },
    "Nefarious Set": {
        "linked_name": "Nefarious Set",
        "contentsString": "{{name|Nefarious Shovel}}<br>{{name|Nefarious Pickaxe}}<br>{{name|Nefarious Fishing Rod}}<br>{{name|Nefarious Watering Can}}<br>{{name|Nefarious Phone}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "Bundle_NefariousTool",
        "bundleType": "Tool Style"
    },
    "\"Un Poco Loco\" Valley Bundle": {
        "linked_name": "\"Un Poco Loco\" Valley Bundle",
        "contentsString": "{{name|Un Poco Loco Wishing Well}}<br>{{name|\"Un Poco Loco\" Goofy Stall}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_CocoStallAndWell",
        "bundleType": "Stall/Well"
    },
    "Colors of Nature Bundle": {
        "linked_name": "Colors of Nature Bundle",
        "contentsString": "{{name|Percy}}\n{{name|Pug Treats Carousel}}\n{{name|Natural Wooden Pergola|2}}\n{{name|Natural Wooden Pergola Pond|2}}\n{{name|Natural Wooden Pergola Post|10}}\n{{name|Natural Wooden Pergola Corner Post|10}}\n{{name|Natural Wooden Pergola Side|10}}\n{{name|Swirling Leaves}}\n{{name|Swirling Forest Leaves}}\n{{name|Colors of Nature Well}}\n{{name|Colors of Nature Stall}}",
        "priceString": "{{price|6600|moonstone}} (20% off)",
        "versionAdded": "1.22",
        "protoDbName": "Megabundle_Pocahontas",
        "bundleType": "Mega Bundle"
    },
    "Colors of Nature Valley Bundle": {
        "linked_name": "Colors of Nature Valley Bundle",
        "contentsString": "{{name|Colors of Nature Well}}\n{{name|Colors of Nature Stall}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_PocahontasWellStall",
        "bundleType": "Stall/Well"
    },
    "Percy": {
        "linked_name": "Percy (Bundle)|Percy",
        "contentsString": "{{name|Percy}}\n{{name|Pug Treats Carousel}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_Percy",
        "bundleType": "Companion/Furniture"
    },
    "Natural Pergola Set": {
        "linked_name": "Natural Pergola Set",
        "contentsString": "{{name|Natural Wooden Pergola Pond|2}}\n{{name|Natural Wooden Pergola|2}}\n{{name|Natural Wooden Pergola Corner Post|10}}\n{{name|Natural Wooden Pergola Post|10}}\n{{name|Natural Wooden Pergola Side|10}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_PocahontasPergola",
        "bundleType": "Furniture"
    },
    "Swirling Leaves Set": {
        "linked_name": "Swirling Leaves Set",
        "contentsString": "{{name|Swirling Leaves|3}}\n{{name|Swirling Forest Leaves|3}}",
        "priceString": "{{price|1250|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_PocahontasLeaves",
        "bundleType": "Furniture"
    },
    "Brick Garden Set": {
        "linked_name": "Brick Garden Set",
        "contentsString": "{{name|Brick Garden Entrance}}\n{{name|Brick Garden Planter Box|4}}\n{{name|Brick Garden Planter|4}}\n{{name|Brick Garden L-Shape|8}}\n{{name|Brick Garden Wall|8}}\n{{name|Brick Garden Block|10}}\n{{name|Brick Garden Corner|8}}\n{{name|Brick Garden Lamp|8}}\n{{name|Embellished Brick Garden Lamp|8}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_GardenKit",
        "bundleType": "Furniture"
    },
    "BB—8": {
        "linked_name": "BB—8 (Bundle)|BB—8",
        "contentsString": "{{name|BB—8}}\n{{name|BB—8 Headband}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_BB8",
        "bundleType": "Companion/Clothing"
    },
    "Cozy Star Observatory": {
        "linked_name": "Cozy Star Observatory (Bundle)|Cozy Star Observatory",
        "contentsString": "{{name|Cozy Star Observatory}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HouseSkin_CelestialHouse",
        "bundleType": "House"
    },
    "Celestial Pond": {
        "linked_name": "Celestial Pond (Bundle)|Celestial Pond",
        "contentsString": "{{name|Celestial Pond}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_CelestialPond",
        "bundleType": "Furniture"
    },
    "Celestial Stunner Ensemble": {
        "linked_name": "Celestial Stunner Ensemble",
        "contentsString": "{{name|Celestial Stunner Crown}}\n{{name|Celestial Stunner Gown}}\n{{name|Celestial Stunner Shoes}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_CelestialOutfit",
        "bundleType": "Clothing"
    },
    "Enchanted Floating Set": {
        "linked_name": "Enchanted Floating Set",
        "contentsString": "{{name|Enchanted Shooting Stars}}\n{{name|Enchanted Floating Planets|2}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_CelestialVFX",
        "bundleType": "Furniture"
    },
    "Padmé Amidala's Summer Meadow Ensemble": {
        "linked_name": "Padmé Amidala's Summer Meadow Ensemble",
        "contentsString": "{{name|Padmé Amidala's Summer Meadow Gown}}\n{{name|Padmé Amidala's Summer Meadow Hairstyle}}\n{{name|Padmé Amidala's Summer Meadow Shoes}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_PadmeSummerOutfit",
        "bundleType": "Clothing"
    },
    "Tulip Town Bundle": {
        "linked_name": "Tulip Town Bundle",
        "contentsString": "{{name|Tulip Town House}}\n{{name|Tulip Town Bell Tower}}\n{{name|Tulip Town Entry Arch}}\n{{name|Tulip Town Building}}\n{{name|Tulip Town Windmill}}\n{{name|Pink Tulip Town Windmill}}",
        "priceString": "{{price|4950|moonstone}} (10% off)",
        "versionAdded": "1.22",
        "protoDbName": "Megabundle_KeukenhofKit",
        "bundleType": "Mega Bundle"
    },
    "Tulip Town Buildings": {
        "linked_name": "Tulip Town Buildings",
        "contentsString": "{{name|Tulip Town House}}\n{{name|Tulip Town Bell Tower}}\n{{name|Tulip Town Entry Arch}}\n{{name|Tulip Town Building}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_KeukenhofBuildings",
        "bundleType": "House/Furniture"
    },
    "Tulip Town Windmills": {
        "linked_name": "Tulip Town Windmills",
        "contentsString": "{{name|Tulip Town Windmill}}\n{{name|Pink Tulip Town Windmill}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_KeukenhofWindmill",
        "bundleType": "Furniture"
    },
    "Tulip Field Set": {
        "linked_name": "Tulip Field Set",
        "contentsString": "{{name|Tulip Field Bottleneck|10}}\n{{name|Tulip Field Bed|10}}\n{{name|Tulip Field End|10}}\n{{name|Tulip Field Rows|10}}\n{{name|Wild Tulip Bed|10}}\n{{name|Tulip Field — Left Curve|10}}\n{{name|Tulip Field — Right Curve|10}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_TulipBedKit",
        "bundleType": "Furniture"
    },
    "Garden Party Daisy": {
        "linked_name": "Garden Party Daisy (Bundle)|Garden Party Daisy",
        "contentsString": "{{name|Garden Party Daisy}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_DaisyGardenParty",
        "bundleType": "Character Style"
    },
    "Fennec Fox": {
        "linked_name": "Fennec Fox (Bundle)|Fennec Fox",
        "contentsString": "{{name|Fennec Fox}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_FennecFox",
        "bundleType": "Companion"
    },
    "Cozy Wood and Wicker House": {
        "linked_name": "Cozy Wood and Wicker House (Bundle)|Cozy Wood and Wicker House",
        "contentsString": "{{name|Cozy Wood and Wicker House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HouseSkin_WoodWickedHouse",
        "bundleType": "House"
    },
    "Swirling Sandstorm Set": {
        "linked_name": "Swirling Sandstorm Set",
        "contentsString": "{{name|Small Swirling Sandstorm|2}}\n{{name|Huge Swirling Sandstorm|2}}",
        "priceString": "{{price|1250|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_SandStormsVFX",
        "bundleType": "Furniture"
    },
    "Tatooine Decoration Set": {
        "linked_name": "Tatooine Decoration Set",
        "contentsString": "{{name|Tatooine Landspeeder}}\n{{name|Tatooine Market Stall}}\n{{name|Tatooine Moisture Vaporator|4}}\n{{name|Tatooine Desert Archway|2}}\n{{name|Tatooine Desert Wall|12}}\n{{name|Tatooine Desert Wall Corner|12}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_TatooineExteriorSet",
        "bundleType": "House"
    },
    "Tatooine Desert House": {
        "linked_name": "Tatooine Desert House (Bundle)|Tatooine Desert House",
        "contentsString": "{{name|Tatooine Desert House}}\n{{name|Tatooine Sand Path|1000}}\n{{name|Tatooine Sand|1000}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HouseSkin_TatooineHouse",
        "bundleType": "House"
    },
    "Cozy Rainy House": {
        "linked_name": "Cozy Rainy House (Bundle)|Cozy Rainy House",
        "contentsString": "{{name|Cozy Rainy House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HouseSkin_RainyHouse",
        "bundleType": "House"
    },
    "Lone Weather Clouds": {
        "linked_name": "Lone Weather Clouds",
        "contentsString": "{{name|Light Storm Cloud|10}}\n{{name|Heavy Storm Cloud|10}}\n{{name|Thunderstorm Cloud|10}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_RainyClouds",
        "bundleType": "Furniture"
    },
    "Duo-Tone Rain Ensemble": {
        "linked_name": "Duo-Tone Rain Ensemble",
        "contentsString": "{{name|Duo-Tone Rain Hat}}\n{{name|Duo-Tone Rain Coat}}\n{{name|Duo-Tone Rain Boots}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_RainyOutfit",
        "bundleType": "Clothing"
    },
    "Stormy Weather Evolving Pickaxe": {
        "linked_name": "Stormy Weather Evolving Pickaxe (Bundle)|Stormy Weather Evolving Pickaxe",
        "contentsString": "{{name|Stormy Weather Evolving Pickaxe}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_RainyEvolvingPickaxe",
        "bundleType": "Tool Style"
    },
    "London Clock Tower": {
        "linked_name": "London Clock Tower (Bundle)|London Clock Tower",
        "contentsString": "{{name|London Clock Tower}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_BigBen",
        "bundleType": "Furniture"
    },
    "Railway Station Set": {
        "linked_name": "Railway Station Set",
        "contentsString": "{{name|Railway Station Entrance}}\n{{name|Railway Station Awning}}\n{{name|Railway Station Ticket Booth}}\n{{name|Railway Station Crossing}}\n{{name|Train Station Track}}\n{{name|Right-Curving Train Station Track}}\n{{name|Left-Curving Train Station Track}}\n{{name|Curved Train Station Track}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Bundle_TrainStationKit",
        "bundleType": "Furniture"
    },
    "Corgi Puppy": {
        "linked_name": "Corgi Puppy (Bundle)|Corgi Puppy",
        "contentsString": "{{name|Corgi Puppy}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "HeroItem_BabyCorgi",
        "bundleType": "Companion"
    },
    "Shooting Star": {
        "linked_name": "Shooting Star (Bundle)|Shooting Star",
        "contentsString": "{{name|Shooting Star}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.22",
        "protoDbName": "Item_FlyingStar",
        "bundleType": "Furniture"
    },
    "Angelic Wings": {
        "linked_name": "Angelic Wings (Bundle)|Angelic Wings",
        "contentsString": "{{name|Angelic Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_FeatherWings",
        "bundleType": "Clothing"
    },
    "Leafy Cottage House": {
        "linked_name": "Leafy Cottage House (Bundle)|Leafy Cottage House",
        "contentsString": "{{name|Leafy Cottage House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HouseSkin_CamouflagedCottage",
        "bundleType": "House"
    },
    "Whimsical Pink Companion Pack 1": {
        "linked_name": "Whimsical Pink Companion Pack 1",
        "contentsString": "{{name|Pink Whimsical Squirrel}}\n{{name|Pink Whimsical Crocodile}}\n{{name|Pink Whimsical Raven}}\n{{name|Pink Whimsical Raccoon}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_DreamlightCritter1",
        "bundleType": "Companion"
    },
    "Figaro Bundle": {
        "linked_name": "Figaro Bundle",
        "contentsString": "{{name|Figaro}}\n{{name|Figaro's House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_Figaro",
        "bundleType": "Companion/Furniture"
    },
    "Art Deco Princess Bed": {
        "linked_name": "Art Deco Princess Bed (Bundle)|Art Deco Princess Bed",
        "contentsString": "{{name|Art Deco Princess Bed}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Item_ArtDecoPrincessBed",
        "bundleType": "Furniture"
    },
    "Magical Squirrel": {
        "linked_name": "Magical Squirrel (Bundle)|Magical Squirrel",
        "contentsString": "{{name|Magical Squirrel}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_MagicalSquirrel",
        "bundleType": "Companion"
    },
    "Nightmare Castle": {
        "linked_name": "Nightmare Castle (Bundle)|Nightmare Castle",
        "contentsString": "{{name|Nightmare Castle}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "HeroItem_DarkCastle",
        "bundleType": "House"
    },
    "Sunflower Ensemble": {
        "linked_name": "Sunflower Ensemble",
        "contentsString": "{{name|Sunflower Dress}}\n{{name|Sunflower Headband}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_SunflowerOutfit",
        "bundleType": "Clothing"
    },
    "Sunflower Wings": {
        "linked_name": "Sunflower Wings (Bundle)|Sunflower Wings",
        "contentsString": "{{name|Sunflower Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HeroItem_SunflowerWings",
        "bundleType": "Clothing"
    },
    "Ladybug Backpack": {
        "linked_name": "Ladybug Backpack (Bundle)|Ladybug Backpack",
        "contentsString": "{{name|Ladybug Backpack}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_LadybugsWings",
        "bundleType": "Clothing"
    },
    "Mysterious Moth Wings": {
        "linked_name": "Mysterious Moth Wings (Bundle)|Mysterious Moth Wings",
        "contentsString": "{{name|Mysterious Moth Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HeroItem_GypsyWings",
        "bundleType": "Clothing"
    },
    "Leafy Camping Pack and Hat": {
        "linked_name": "Leafy Camping Pack and Hat",
        "contentsString": "{{name|Leafy Camping Pack}}\n{{name|Leafy Camping Hat}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_FlikBackpackAndHat",
        "bundleType": "Clothing"
    },
    "Forest Spirit Gown": {
        "linked_name": "Forest Spirit Gown (Bundle)|Forest Spirit Gown",
        "contentsString": "{{name|Forest Spirit Gown}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_PineInspiredEnsemble",
        "bundleType": "Clothing"
    },
    "Celebration Moana": {
        "linked_name": "Celebration Moana (Bundle)|Celebration Moana",
        "contentsString": "{{name|Celebration Moana}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_Moana1Final",
        "bundleType": "Character Style"
    },
    "Moana Costume": {
        "linked_name": "Moana Costume (Bundle)|Moana Costume",
        "contentsString": "{{name|Moana Costume}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "HeroItem_MoanaOutfit",
        "bundleType": "Clothing"
    },
    "Fairy's Bloss-home": {
        "linked_name": "Fairy's Bloss-home (Bundle)|Fairy's Bloss-home",
        "contentsString": "{{name|Fairy's Bloss-home}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HouseSkin_FairyFlowerDen",
        "bundleType": "House"
    },
    "Wilted Flower Cottage": {
        "linked_name": "Wilted Flower Cottage (Bundle)|Wilted Flower Cottage",
        "contentsString": "{{name|Wilted Flower Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HouseSkin_WiltedFlowerHouse",
        "bundleType": "House"
    },
    "Tiana's Royal Tools": {
        "linked_name": "Tiana's Royal Tools",
        "contentsString": "{{name|Bayou Pickaxe}}\n{{name|Bayou Shovel}}\n{{name|Bayou Watering Can}}\n{{name|Bayou Fishing Rod}}\n{{name|Bayou Hourglass}}\n{{name|Bayou Phone}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_BayouToolSet",
        "bundleType": "Tool Style"
    },
    "Elemental Hairstyles": {
        "linked_name": "Elemental Hairstyles",
        "contentsString": "{{name|Pompadour in the Cloud}}\n{{name|Blazing Pixie}}\n{{name|Blooming Bob}}\n{{name|The Wave}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_ElementalHairstyles",
        "bundleType": "Clothing"
    },
    "Deluxe Springtime Valley Bundle": {
        "linked_name": "'''Deluxe Springtime Valley Bundle'''",
        "contentsString": "{{name|Scrooge McDuck's Cherry Blossom Store}}\n{{name|Cherry Blossom Chez Remy}}\n{{name|Cherry Blossom Plaza}}\n{{name|Cherry Blossom Dream Castle}}\n{{name|Cherry Blossom Valley Visit Station}}\n{{name|Cherry Blossom Goofy Stall}}\n{{name|Cherry Blossom Wishing Well}}\n{{name|Pink Valentine Petals}}",
        "priceString": "{{price|8000|moonstone}} (20% off)",
        "versionAdded": "1.21",
        "protoDbName": "",
        "bundleType": "Mega Bundle"
    },
    "Deluxe Springtime Valley Building Set": {
        "linked_name": "Deluxe Springtime Valley Building Set",
        "contentsString": "{{name|Scrooge McDuck's Cherry Blossom Store}}\n{{name|Cherry Blossom Chez Remy}}\n{{name|Cherry Blossom Plaza}}",
        "priceString": "{{price|3500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "",
        "bundleType": "Building"
    },
    "Cherry Blossom Dream Castle": {
        "linked_name": "Cherry Blossom Dream Castle (Bundle)|Cherry Blossom Dream Castle",
        "contentsString": "{{name|Cherry Blossom Dream Castle}}",
        "priceString": "{{price|3500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "",
        "bundleType": "Building"
    },
    "Deluxe Springtime Valley Decoration Set": {
        "linked_name": "Deluxe Springtime Valley Decoration Set",
        "contentsString": "{{name|Cherry Blossom Valley Visit Station}}\n{{name|Cherry Blossom Goofy Stall}}\n{{name|Cherry Blossom Wishing Well}}\n{{name|Pink Valentine Petals}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "",
        "bundleType": "Well/Furniture"
    },
    "Valley Jester Ensemble": {
        "linked_name": "Valley Jester Ensemble",
        "contentsString": "{{name|Valley Jester Cap}}\n{{name|Valley Jester Top}}\n{{name|Valley Jester Capris}}\n{{name|Valley Jester Shoes}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_JesterEnsemble",
        "bundleType": "Clothing"
    },
    "Valley Jester Wings": {
        "linked_name": "Valley Jester Wings (Bundle)|Valley Jester Wings",
        "contentsString": "{{name|Valley Jester Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_JesterWings",
        "bundleType": "Clothing"
    },
    "Monsters University Varsity Mike": {
        "linked_name": "Monsters University Varsity Mike (Bundle)|Monsters University Varsity Mike",
        "contentsString": "{{name|Monsters University Varsity Mike}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_MonstersUniversityVarsityMike",
        "bundleType": "Character Style"
    },
    "Jester Skunk": {
        "linked_name": "Jester Skunk (Bundle)|Jester Skunk",
        "contentsString": "{{name|Jester Skunk}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_JesterSkunk",
        "bundleType": "Companion"
    },
    "White Rabbit Waistcoat": {
        "linked_name": "White Rabbit Waistcoat (Bundle)|White Rabbit Waistcoat",
        "contentsString": "{{name|White Rabbit Waistcoat}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_WhiteRabbitOutfit",
        "bundleType": "Clothing"
    },
    "Alice Costume Dress": {
        "linked_name": "Alice Costume Dress (Bundle)|Alice Costume Dress",
        "contentsString": "{{name|Alice Costume Dress}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_AliceOutfit",
        "bundleType": "Clothing"
    },
    "Hatter Furniture Bundle": {
        "linked_name": "Hatter Furniture Bundle",
        "contentsString": "{{name|Hatter Lounge Couch}}\n{{name|Hatter Lamp}}\n{{name|Hatter Coffee Table}}\n{{name|Hatter Area Rug}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_MadHatterLivingRoomSet",
        "bundleType": "Furniture"
    },
    "Monster Plushies": {
        "linked_name": "Monster Plushies",
        "contentsString": "{{name|Purple Stitched Monster Plushie}}\n{{name|Green Spiky Monster Plushie}}\n{{name|Blue Cyclops Monster Plushie}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_PlushiesSet",
        "bundleType": "Furniture"
    },
    "Yzma's Cabinet Bundle": {
        "linked_name": "Yzma's Cabinet Bundle",
        "contentsString": "{{name|Grinning Green Statue}}\n{{name|Owlish Pink Potion Cabinet}}\n{{name|Yzma's Secret Lever}}\n{{name|Yzma's Giant Potion}}\n{{name|Yzma's Potion}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_YzmaLaboratory",
        "bundleType": "Furniture"
    },
    "A Bug's Life Decor Bundle": {
        "linked_name": "A Bug's Life Decor Bundle",
        "contentsString": "{{name|Giant String Lights}}\n{{name|Giant Clover}}\n{{name|Snail Shell Horn}}\n{{name|Cottonsedge Flower}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_ABugLifeDecoSet",
        "bundleType": "Furniture"
    },
    "Toy Story Land Set": {
        "linked_name": "Toy Story Land Set",
        "contentsString": "{{name|Toy Story Wall}}\n{{name|Toy Story Statue}}\n{{name|Toy Story Recycling Bin}}\n{{name|Popsicle Stick Bench}}\n{{name|Luxo Umbrella Table}}\n{{name|Red Umbrella Chair}}\n{{name|Blue Umbrella Chair}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.17.12/1.18",
        "protoDbName": "Bundle_ToyStoryAreaSet",
        "bundleType": "Furniture"
    },
    "Mushroom Manor": {
        "linked_name": "Mushroom Manor (Bundle)|Mushroom Manor",
        "contentsString": "{{name|Mushroom Manor}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "HouseSkin_MushroomCottage",
        "bundleType": "House"
    },
    "Swirling Snow": {
        "linked_name": "Swirling Snow (Bundle)|Swirling Snow",
        "contentsString": "{{name|Swirling Snow}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Item_IcySwirlwindVFX",
        "bundleType": "Furniture"
    },
    "Crimson Western Ensemble": {
        "linked_name": "Crimson Western Ensemble",
        "contentsString": "{{name|Crimson Western Dress}}\n{{name|Crimson Western Fascinator}}\n{{name|Western Heeled Boots}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_SaloonEnsemble",
        "bundleType": "Clothing"
    },
    "Mark Twain Riverboat": {
        "linked_name": "Mark Twain Riverboat (Bundle)|Mark Twain Riverboat",
        "contentsString": "{{name|Mark Twain Riverboat}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HouseSkin_MarkTwainRiverBoat",
        "bundleType": "House"
    },
    "Frontier General Store Stand": {
        "linked_name": "Frontier General Store Stand (Bundle)|Frontier General Store Stand",
        "contentsString": "{{name|Frontier General Store Stand}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Item_WildWestStand",
        "bundleType": "Furniture"
    },
    "Newsie Ensemble": {
        "linked_name": "Newsie Ensemble",
        "contentsString": "{{name|Newsie Top}}\n{{name|Newsie Pants}}\n{{name|Newsie Cap}}\n{{name|Newsie Shoes}}\n{{name|Maldonian Prince Hairstyle}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_NewsieEnsemble",
        "bundleType": "Clothing"
    },
    "Yeehaw Goose Bundle": {
        "linked_name": "Yeehaw Goose Bundle",
        "contentsString": "{{name|Yeehaw Goose}}\n{{name|Alpine Companion House}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_RanchGoose",
        "bundleType": "Companion/Furniture"
    },
    "Frozen — Elsa": {
        "linked_name": "Frozen — Elsa (Bundle)|Frozen — Elsa",
        "contentsString": "{{name|Frozen — Elsa}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HeroItem_WinterElsa",
        "bundleType": "Character Style"
    },
    "Icy Frozen Palace": {
        "linked_name": "Icy Frozen Palace (Bundle)|Icy Frozen Palace",
        "contentsString": "{{name|Icy Frozen Palace}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HouseSkin_ElsaInspiredCastle",
        "bundleType": "House"
    },
    "Adventurous Anna": {
        "linked_name": "Adventurous Anna (Bundle)|Adventurous Anna",
        "contentsString": "{{name|Adventurous Anna}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HeroItem_FrozenAnna",
        "bundleType": "Character Style"
    },
    "Enchanted Ice Fountain": {
        "linked_name": "Enchanted Ice Fountain (Bundle)|Enchanted Ice Fountain",
        "contentsString": "{{name|Enchanted Ice Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Item_FrozenFountain",
        "bundleType": "Furniture"
    },
    "Icy Cape": {
        "linked_name": "Icy Cape (Bundle)|Icy Cape",
        "contentsString": "{{name|Icy Cape}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_ElsaCape",
        "bundleType": "Clothing"
    },
    "Icy Wings": {
        "linked_name": "Icy Wings (Bundle)|Icy Wings",
        "contentsString": "{{name|Icy Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "HeroItem_IcyWings",
        "bundleType": "Clothing"
    },
    "Kristoff Coronation Outfit": {
        "linked_name": "Kristoff Coronation Outfit (Bundle)|Kristoff Coronation Outfit",
        "contentsString": "{{name|Kristoff Coronation Outfit}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_KristoffKingOutfit",
        "bundleType": "Clothing"
    },
    "Anna's Arendelle Gown": {
        "linked_name": "Anna's Arendelle Gown (Bundle)|Anna's Arendelle Gown",
        "contentsString": "{{name|Anna's Arendelle Gown}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.17/1.18",
        "protoDbName": "HeroItem_AnnaSummerGreenSkin",
        "bundleType": "Character Style"
    },
    "Regal Splendor Elsa": {
        "linked_name": "Regal Splendor Elsa (Bundle)|Regal Splendor Elsa",
        "contentsString": "{{name|Regal Splendor Elsa}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_PinkElsaSkin",
        "bundleType": "Character Style"
    },
    "Touch of Arendelle Kitchen": {
        "linked_name": "Touch of Arendelle Kitchen",
        "contentsString": "{{name|Ancient Stove}}\n{{name|Painted Counter}}\n{{name|Painted Cabinet}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_ArendelleKitchen1",
        "bundleType": "Furniture"
    },
    "Touch of Arendelle Corner": {
        "linked_name": "Touch of Arendelle Corner",
        "contentsString": "{{name|Cup and Emblems Hanger}}\n{{name|Painted Corner Counter}}\n{{name|Painted Corner Cabinet}}",
        "priceString": "{{price|750|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_ArendelleKitchen2_hotfix",
        "bundleType": "Furniture"
    },
    "Touch of Arendelle Pantry": {
        "linked_name": "Touch of Arendelle Pantry",
        "contentsString": "{{name|Antique Furnace}}\n{{name|Decorative Plates}}\n{{name|Colorful Dish Cabinet}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_ArendelleKitchen3",
        "bundleType": "Furniture"
    },
    "Park Stands Bundle": {
        "linked_name": "Park Stands Bundle",
        "contentsString": "{{name|Pretzel Stand}}\n{{name|Ice Cream Stand (2)|link=Ice Cream Stand (2){{!}}Ice Cream Stand}}\n{{name|Magical Balloon Bundle}} ",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_ParkStandsBundle",
        "bundleType": "Furniture"
    },
    "Madame Leota Table": {
        "linked_name": "Madame Leota Table (Bundle)|Madame Leota Table",
        "contentsString": "{{name|Madame Leota Table}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Item_MadameLeotaSet",
        "bundleType": "Furniture"
    },
    "Park Clock Set": {
        "linked_name": "Park Clock Set",
        "contentsString": "{{name|Green Park Clock}}\n{{name|Purple Park Clock}}\n{{name|Blue Park Clock}}\n{{name|Multi-face Park Clock}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_ParkClockSet",
        "bundleType": "Furniture"
    },
    "Kingdom of Corona Set": {
        "linked_name": "Kingdom of Corona Set",
        "contentsString": "{{name|Corona Spindle}}\n{{name|Corona Chair}}\n{{name|Corona Side Table}}\n{{name|Corona Pillar|6}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_CoronaFurniture2",
        "bundleType": "Furniture"
    },
    "Kingdom of Corona Trio Set": {
        "linked_name": "Kingdom of Corona Trio Set",
        "contentsString": "{{name|Corona Wardrobe}}\n{{name|Corona Clock}}\n{{name|Corona Sink}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_CoronaFurniture1",
        "bundleType": "Furniture"
    },
    "Alpine Wind Vane": {
        "linked_name": "Alpine Wind Vane (Bundle)|Alpine Wind Vane",
        "contentsString": "{{name|Alpine Wind Vane}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HeroItem_RanchWindmill",
        "bundleType": "Furniture"
    },
    "Linen Ensemble": {
        "linked_name": "Linen Ensemble",
        "contentsString": "{{name|Light Linen Pants}}\n{{name|Linen Smock}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_LinenEnsemble",
        "bundleType": "Clothing"
    },
    "Hopps' Hay Maze Kit": {
        "linked_name": "Hopps' Hay Maze Kit",
        "contentsString": "{{name|Hopps' Hay Maze Banner|4}}\n{{name|Hopps' Hay Maze Sign|4}}\n{{name|Hopps' Carrot Hay Maze Wall|4}}\n{{name|Hopps' Carrot Hay Maze Triple|4}}\n{{name|Hopps' Carrot Hay Maze Corner|4}}\n{{name|Hopps' Carrot Hay Maze Single|4}}\n{{name|Hopps' Hay Maze Wall|4}}\n{{name|Hopps' Hay Maze Double|4}}\n{{name|Hopps' Hay Maze Single|4}}\n{{name|Hopps' Hay Maze Thin Triple Stack|4}}\n{{name|Hopps' Hay Maze Triple Stack|4}}\n{{name|Hopps' Hay Maze Corner|4}}\n{{name|Hopps' Hay Maze Low Wall|4}}\n{{name|Hopps' Hay Maze Brick|4}}\n{{name|Hopps' Hay Maze Cubic Bale|4}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_ZootopiaHayMaze",
        "bundleType": "Furniture"
    },
    "Minty Set": {
        "linked_name": "Minty Set",
        "contentsString": "{{name|Wintery Fancy Shirt and Bow}}\n{{name|Mickey Mouse Choco Mint Donut Headband}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_MintDonut",
        "bundleType": "Clothing"
    },
    "Field Day Ensemble": {
        "linked_name": "Field Day Ensemble",
        "contentsString": "{{name|Scarer Overalls}}\n{{name|Brown Military Jacket}}\n{{name|Toy Cowboy Watch}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_Farmer",
        "bundleType": "Clothing"
    },
    "Tangled Watering Can": {
        "linked_name": "Tangled Watering Can (Bundle)|Tangled Watering Can",
        "contentsString": "{{name|Tangled Watering Can}}\n{{name|Tangled Watering Can Level 2|link=Tangled Watering Can}}\n{{name|Tangled Watering Can Level 3|link=Tangled Watering Can}}\n",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_TangledWateringCan",
        "bundleType": "Tool Style"
    },
    "Giselle Costume": {
        "linked_name": "Giselle Costume",
        "contentsString": "{{name|Giselle Costume Dress}}\n{{name|Giselle's Ribboned Hairdo}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_GiselleFloralOutfit",
        "bundleType": "Clothing"
    },
    "Lavish Lilac Cottage": {
        "linked_name": "Lavish Lilac Cottage (Bundle)|Lavish Lilac Cottage",
        "contentsString": "{{name|Lavish Lilac Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HouseSkin_SpringLilas",
        "bundleType": "House"
    },
    "Garden Party Minnie": {
        "linked_name": "Garden Party Minnie (Bundle)|Garden Party Minnie",
        "contentsString": "{{name|Garden Party Minnie}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Item_GardenPartyMinnie",
        "bundleType": "Character Style"
    },
    "Alice's Curious Labyrinth Bundle": {
        "linked_name": "Alice's Curious Labyrinth Bundle",
        "contentsString": "{{name|Curious Labyrinth Caterpillar}}\n{{name|Cheshire Cat Topiary}}\n{{name|Curious Labyrinth Entrance}}\n{{name|Spiral Fountain|2}}\n{{name|Topiary Bush|4}}\n{{name|Rectangular Topiary Bush|4}}\n{{name|Topiary Wall|4}}\n{{name|Topiary Corner|4}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_AliceCuriousLabyrinth",
        "bundleType": "Furniture"
    },
    "Fairy Flower Garden": {
        "linked_name": "Fairy Flower Garden (Bundle)|Fairy Flower Garden",
        "contentsString": "{{name|Fairy Flower Garden}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_GardenFlowerPetalDisplay",
        "bundleType": "Furniture"
    },
    "Casita Wall Set": {
        "linked_name": "Casita Wall Set",
        "contentsString": "{{name|Casita Archway}}\n{{name|Casita Wall — Long|4}}\n{{name|Casita Wall Corner|4}}\n{{name|Casita Wall End|4}}\n{{name|Casita Wall|4}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_EncantoWallKit",
        "bundleType": "Furniture"
    },
    "New Orleans Gazebo": {
        "linked_name": "New Orleans Gazebo (Bundle)|New Orleans Gazebo",
        "contentsString": "{{name|New Orleans Gazebo}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_NewOrleansGazebo",
        "bundleType": "Furniture"
    },
    "Park's Magical Set": {
        "linked_name": "Park's Magical Set",
        "contentsString": "{{name|Magical Keepsake Cart}}\n{{name|Iron Park Bench}}\n{{name|Magical Recyclers}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_ParksMagicalSet",
        "bundleType": "Furniture"
    },
    "Garden Fairy Flower Bundle": {
        "linked_name": "Garden Fairy Flower Bundle",
        "contentsString": "{{name|Garden Fairy Flower Dress}}\n{{name|Garden Fairy Flower Hat}}\n{{name|Garden Fairy Flower Boots}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_FlowerShapedOutfit",
        "bundleType": "Clothing"
    },
    "Blooming Flower Wings": {
        "linked_name": "Blooming Flower Wings (Bundle)|Blooming Flower Wings",
        "contentsString": "{{name|Blooming Flower Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_FlowerPetalWings",
        "bundleType": "Clothing"
    },
    "Spring Flower Fest Ensemble": {
        "linked_name": "Spring Flower Fest Ensemble",
        "contentsString": "{{name|Spring Flower Fest Dress}}\n{{name|Spring Flower Fest Sunhat}}\n{{name|Spring Flower Fest Heels}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_SpringFlowerEnsemble",
        "bundleType": "Clothing"
    },
    "Green Flapper Ensemble": {
        "linked_name": "Green Flapper Ensemble",
        "contentsString": "{{name|Green Flapper Dress}}\n{{name|Feathered Flapper Hairstyle}}\n{{name|Green Feather Boa}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_GreenFlapperEnsemble",
        "bundleType": "Clothing"
    },
    "Dreamlight Figment Topiary": {
        "linked_name": "Dreamlight Figment Topiary (Bundle)|Dreamlight Figment Topiary",
        "contentsString": "{{name|Dreamlight Figment Topiary}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Item_DreamlightFigmentTopiary",
        "bundleType": "Furniture"
    },
    "Floating Floral Inflatable": {
        "linked_name": "Floating Floral Inflatable (Bundle)|Floating Floral Inflatable",
        "contentsString": "{{name|Floating Floral Inflatable|2}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Item_FancyFloatingInflatable",
        "bundleType": "Furniture"
    },
    "Butterfly Topiary": {
        "linked_name": "Butterfly Topiary (Bundle)|Butterfly Topiary",
        "contentsString": "{{name|Butterfly Topiary}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Item_ButterflyEPCOTTopiary",
        "bundleType": "Furniture"
    },
    "Bonus Gift": {
        "linked_name": "Bonus Gift",
        "contentsString": "{{name|Moonstone|150}}",
        "priceString": "Free",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Robo Capybara": {
        "linked_name": "Robo Capybara (Bundle)|Robo Capybara",
        "contentsString": "{{name|Robo Capybara}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_BigHeroCapybara",
        "bundleType": "Companion"
    },
    "Slick Gray Supersuit Set": {
        "linked_name": "Slick Gray Supersuit Set",
        "contentsString": "{{name|Flexible Gray Supersuit}}\n{{name|Flexi-Swoop}}\n{{name|Incredibles Super-Mask}} ({{price|300|moonstone}})",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_ElasticgirlSuit",
        "bundleType": "Clothing"
    },
    "Pixar Fest Set": {
        "linked_name": "Pixar Fest Set",
        "contentsString": "{{name|Mr. Incredible Retro Suit Display}} ({{price|450|moonstone}})\n{{name|Fredricksen Fireplace}}\n{{name|Pixar Fest 2022 T-Shirt}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_PixarFestSet",
        "bundleType": "Furniture/Clothing"
    },
    "Superheroic Mansion": {
        "linked_name": "Superheroic Mansion (Bundle)|Superheroic Mansion",
        "contentsString": "{{name|Superheroic Mansion}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HouseSkin_ModernSuperhero",
        "bundleType": "House"
    },
    "Big Hero 6 Workspace Bundle": {
        "linked_name": "Big Hero 6 Workspace Bundle",
        "contentsString": "{{name|Robotic Researcher's Desk}}\n{{name|Red Tool Drawer}}\n{{name|Robotic Researcher's Tools}}\n{{name|Baymax Gaming Chair}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "Bundle_BigHero6",
        "bundleType": "Furniture"
    },
    "Edna Mode Machine Bundle": {
        "linked_name": "Edna Mode Machine Bundle",
        "contentsString": "{{name|Edna Mode Sewing Machine}}\n{{name|Edna Mode Testing Machine}}\n{{name|Edna Mode Grappling Hook}}\n{{name|Edna Mode Chair}}\n{{name|Edna Mode Table}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_EdnaModeMansionSet",
        "bundleType": "Furniture"
    },
    "Training Level Bundle": {
        "linked_name": "Training Level Bundle",
        "contentsString": "{{name|Laugh Canister Pallet}}\n{{name|M.I. Coffee Machine}}\n{{name|Green Vending Machine}}\n{{name|Cycloptic Monster Door}}\n{{name|Hypnotic Stone}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_TrainingLevelMonsters",
        "bundleType": "Furniture"
    },
    "Tron Ensemble": {
        "linked_name": "Tron Ensemble (Bundle)|Tron Ensemble",
        "contentsString": "{{name|Tron Ensemble}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_TronInspiredOutfit",
        "bundleType": "Clothing"
    },
    "Green Armor Outfit": {
        "linked_name": "Green Armor Outfit",
        "contentsString": "{{name|Green Armor Costume}}\n{{name|Training Updo}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_GreenArmorOutfit",
        "bundleType": "Clothing"
    },
    "Peter Pan Outfit": {
        "linked_name": "Peter Pan Outfit",
        "contentsString": "{{name|Peter Pan Costume}}\n{{name|Peter Pan's Hat}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_PeterPanOutfit",
        "bundleType": "Clothing"
    },
    "Green and Gold Ensemble": {
        "linked_name": "Green and Gold Ensemble",
        "contentsString": "{{name|Brassy Buckled Shoes}}\n{{name|Green and Gold Blazer}}\n{{name|Green and Gold Hat}}\n{{name|Green Checkered Capris}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_GreenCelebrationOutfit",
        "bundleType": "Clothing"
    },
    "Rainy Day Essentials 2": {
        "linked_name": "Rainy Day Essentials 2",
        "contentsString": "{{name|Incredible Umbrella}}\n{{name|Pink & Purple Umbrella}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "Bundle_Umbrella2",
        "bundleType": "Accessory"
    },
    "Junior Wilderness Explorer Outfit": {
        "linked_name": "Junior Wilderness Explorer Outfit",
        "contentsString": "{{name|Junior Wilderness Explorer Uniform}}\n{{name|Junior Wilderness Explorer Cap}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_CampingOutfit",
        "bundleType": "Clothing"
    },
    "Tropical Waterfalls Kit": {
        "linked_name": "Tropical Waterfalls Kit",
        "contentsString": "{{name|Tropical Waterfalls|3}}\n{{name|Tropical Waterfall — Tall|5}}\n{{name|Tropical Waterfall — Turn|4}}\n{{name|Tropical Waterfall — Single|6}}\n{{name|Tropical Waterfall Array|2}}\n{{name|Tropical Waterfall — End|4}}\n{{name|Never Land River — Small Straight Bank|10}} ({{price|250|moonstone}})",
        "priceString": "{{price|2750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_WaterfallKit",
        "bundleType": "Furniture"
    },
    "Fluttering Dragonflies": {
        "linked_name": "Fluttering Dragonflies",
        "contentsString": "{{name|Blue Fluttering Dragonflies}}\n{{name|Pink Fluttering Dragonflies}}\n{{name|Green Fluttering Dragonflies}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_Dragonflies",
        "bundleType": "Furniture"
    },
    "Isabela Wings Set": {
        "linked_name": "Isabela Wings Set",
        "contentsString": "{{name|Isabela Graceful Wings}}\n{{name|Isabela Colorful Wings}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_IsabelaWings",
        "bundleType": "Clothing"
    },
    "Vivid Peacock Topiary": {
        "linked_name": "Vivid Peacock Topiary (Bundle)|Vivid Peacock Topiary",
        "contentsString": "{{name|Vivid Peacock Topiary}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Item_PeacockTopiary",
        "bundleType": "Furniture"
    },
    "Chanterelle Mushroom Gazebo": {
        "linked_name": "Chanterelle Mushroom Gazebo (Bundle)|Chanterelle Mushroom Gazebo",
        "contentsString": "{{name|Chanterelle Mushroom Gazebo}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_MushroomGazebo",
        "bundleType": "Furniture"
    },
    "Coco Celebration Bundle": {
        "linked_name": "Coco Celebration Bundle",
        "contentsString": "{{name|Miguel's Guitar}} ({{price|400|moonstone}})\n{{name|Papel Picados}} ({{price|400|moonstone}})\n{{name|Burro Pi\u00f1ata}} ({{price|400|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_CocoCelebrationBundle",
        "bundleType": "Furniture"
    },
    "Coco's Stage Showstopper": {
        "linked_name": "Coco's Stage Showstopper (Bundle)|Coco's Stage Showstopper",
        "contentsString": "{{name|Coco's Stage Showstopper}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_CocoLandOfTheDeadStage",
        "bundleType": "Furniture"
    },
    "Jungle Cruise Boat Bundle": {
        "linked_name": "Jungle Cruise Boat Bundle",
        "contentsString": "{{name|Broken Jungle Cruise Boat}}\n{{name|Jungle Cruise Boat}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_JungleCruiseBoatBundle",
        "bundleType": "Furniture"
    },
    "Tinker Bell House Bundle": {
        "linked_name": "Tinker Bell House Bundle",
        "contentsString": "{{name|Leafy Canopy Bed}}\n{{name|Tinkerer's Lamp}}\n{{name|Fungi Fireplace}}\n{{name|Thread Spool Chair|2}}\n{{name|Tinkerer's Table}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_TinkerbellInteriorHouseSet",
        "bundleType": "Furniture"
    },
    "Plant Beard & Mustache Bundle": {
        "linked_name": "Plant Beard & Mustache Bundle",
        "contentsString": "{{name|Blooming Beard}}\n{{name|Leafy Mustache}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "Bundle_FaceHair_Elemental",
        "bundleType": "Clothing"
    },
    "Isabela Garden Room": {
        "linked_name": "Isabela Garden Room",
        "contentsString": "{{name|Isabela's Floral Rug}}\n{{name|Isabela's Armchair}}\n{{name|Isabela's Floral Table}}\n{{name|Isabela's Floral Tower}}\n{{name|Isabela's Floral Vine}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_IsabellaRoom",
        "bundleType": "Furniture"
    },
    "Isabela Costume Ensemble": {
        "linked_name": "Isabela Costume Ensemble",
        "contentsString": "{{name|Isabela Costume Dress}}\n{{name|Isabela Ballet Flats}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_IsabelaPurpleDress",
        "bundleType": "Clothing"
    },
    "Never Land River Kit": {
        "linked_name": "Never Land River Kit",
        "contentsString": "{{name|Never Land Waterfall}}\n{{name|Never Land Pond}}\n{{name|Never Land River — Bank Corner|10}}\n{{name|Never Land River — Bank Corner Bridge|2}}\n{{name|Never Land River — Log Bank Corner|2}}\n{{name|Never Land River — Exterior Bank Corner|10}}\n{{name|Never Land River — Stone Corner|10}}\n{{name|Never Land River — Left Bank Corner|10}}\n{{name|Never Land River — Right Bank Corner|10}}\n{{name|Never Land River — Plant Bank|10}}\n{{name|Never Land River — Straight Bank|10}}\n{{name|Never Land River — Small Straight Bank|10}}\n{{name|Never Land River — Large Water Pool|5}}\n{{name|Never Land River — Lily Pad Rocks|2}}\n{{name|Never Land River — Lily Pad Logs|2}}\n{{name|Never Land River — Water Pool|2}}\n{{name|Never Land River — Water Square}}\n{{name|Never Land River — Large Water}}\n{{name|Never Land River — Water}}\n{{name|Never Land River — Small Water|10}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_NeverlandRiverKit",
        "bundleType": "Furniture"
    },
    "Pride Lands Backpack Set 1": {
        "linked_name": "Pride Lands Backpack Set 1",
        "contentsString": "{{name|Lion Cub Backpack}}\n{{name|Merry Warthog Backpack}}\n{{name|Happy Meerkat Backpack}}",
        "priceString": "{{price|2250|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_Backpack1",
        "bundleType": "Clothing"
    },
    "Pride Lands Backpack Set 2": {
        "linked_name": "Pride Lands Backpack Set 2",
        "contentsString": "{{name|Grinning Hyena Backpack}}\n{{name|Cheerful Baboon Backpack}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_Backpack2",
        "bundleType": "Clothing"
    },
    "Pet Shop House": {
        "linked_name": "Pet Shop House (Bundle)|Pet Shop House",
        "contentsString": "{{name|Pet Shop House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HouseSkin_PetShop",
        "bundleType": "House"
    },
    "Mochi": {
        "linked_name": "Mochi (Bundle)|Mochi",
        "contentsString": "{{name|Mochi}}\n{{name|Mochi's Cat House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_Mochi",
        "bundleType": "Companion/Furniture"
    },
    "Pawfect Pet Playground": {
        "linked_name": "Pawfect Pet Playground (Bundle)|Pawfect Pet Playground",
        "contentsString": "{{name|Pawfect Pet Playground}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Item_PetsPlayground",
        "bundleType": "Furniture"
    },
    "Snuggly Kitty Ensemble": {
        "linked_name": "Snuggly Kitty Ensemble",
        "contentsString": "{{name|Snuggly Kitty Onesie}}\n{{name|Snuggly Kitty Hairstyle}}\n{{name|Snuggly Paw Slippers}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_KittySuit",
        "bundleType": "Clothing"
    },
    "Slinky Dog Zigzag Spin": {
        "linked_name": "Slinky Dog Zigzag Spin (Bundle)|Slinky Dog Zigzag Spin",
        "contentsString": "{{name|Slinky Dog Zigzag Spin}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_SlinkyDogZigzagSpin",
        "bundleType": "Furniture"
    },
    "Red Panda Pillars": {
        "linked_name": "Red Panda Pillars",
        "contentsString": "{{name|Red Panda Pillar}}\n{{name|Grinning Red Panda Pillar}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_RedPandaPillars",
        "bundleType": "Furniture"
    },
    "Alpine Chicken Coop": {
        "linked_name": "Alpine Chicken Coop (Bundle)|Alpine Chicken Coop",
        "contentsString": "{{name|Alpine Chicken Coop}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HeroItem_ChickenCoop",
        "bundleType": "Furniture"
    },
    "Mei Panda Ears and Tail": {
        "linked_name": "Mei Panda Ears and Tail",
        "contentsString": "{{name|Mei Panda Ears}}\n{{name|Mei Panda Tail}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_MeiMeiEarsAndTail",
        "bundleType": "Clothing"
    },
    "Red Panda Onesie": {
        "linked_name": "Red Panda Onesie (Bundle)|Red Panda Onesie",
        "contentsString": "{{name|Red Panda Onesie}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Item_RedPandaOnesie",
        "bundleType": "Clothing"
    },
    "Mickey Mouse Sweater Trio": {
        "linked_name": "Mickey Mouse Sweater Trio",
        "contentsString": "{{name|Red Peeking Mickey Mouse Pocket Sweater}}\n{{name|Pink Peeking Mickey Mouse Pocket Sweater}}\n{{name|Yellow Peeking Mickey Mouse Pocket Sweater}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_MickeySweater",
        "bundleType": "Clothing"
    },
    "Mickey's 100th-Anniversary Decoration Set": {
        "linked_name": "Mickey's 100th-Anniversary Decoration Set",
        "contentsString": "{{name|Vitascope}} ({{price|250|moonstone}})\n{{name|Art Deco Mickey Poster}} ({{price|200|moonstone}})\n{{name|100th-Anniversary Rug}} ({{price|350|moonstone}})\n{{name|Mickey Mouse Platinum Ceiling Light}} ({{price|200|moonstone}})",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_Mickeys100thAnniversaryDecorationSet",
        "bundleType": "Furniture"
    },
    "Seaside Getaway Bundle": {
        "linked_name": "'''Seaside Getaway Bundle'''",
        "contentsString": "{{name|Seaside Getaway House}}\n{{name|Seaside Getaway Building — Small}}\n{{name|Seaside Getaway Building — Tall}}\n{{name|Seaside Getaway Building — Corner}}\n{{name|Seaside Getaway Lighthouse}}",
        "priceString": "{{price|5850|moonstone}} (10% off)",
        "versionAdded": "1.21",
        "protoDbName": "",
        "bundleType": "Mega Bundle"
    },
    "Seaside Getaway House": {
        "linked_name": "Seaside Getaway House (Bundle)|Seaside Getaway House",
        "contentsString": "{{name|Seaside Getaway House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HouseSkin_CapeCodHouse",
        "bundleType": "House"
    },
    "Seaside Getaway Building Kit": {
        "linked_name": "Seaside Getaway Building Kit",
        "contentsString": "{{name|Seaside Getaway Building — Small}}\n{{name|Seaside Getaway Building — Tall}}\n{{name|Seaside Getaway Building — Corner}}",
        "priceString": "{{price|2300|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_CapeCodBuildings",
        "bundleType": "Furniture"
    },
    "Seaside Formal Eric": {
        "linked_name": "Seaside Formal Eric (Bundle)|Seaside Formal Eric",
        "contentsString": "{{name|Seaside Formal Eric}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_ClassyPrinceEric",
        "bundleType": "Character Style"
    },
    "Seaside Getaway Lighthouse": {
        "linked_name": "Seaside Getaway Lighthouse (Bundle)|Seaside Getaway Lighthouse",
        "contentsString": "{{name|Seaside Getaway Lighthouse}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_CapeCodLighthouse",
        "bundleType": "Furniture"
    },
    "Centennial Motifs Bundle": {
        "linked_name": "Centennial Motifs Bundle",
        "contentsString": "{{name|Dale_Centennial_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}\n{{name|Chip_Centennial_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}\n{{name|Mickey_Mouse_Centennial_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}\n{{name|Minnie_Mouse_Centennial_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}\n{{name|Ship_Wheel_Patch_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}\n{{name|Donald_Centennial_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}\n{{name|Daisy_Duck_Centennial_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}\n{{name|Oswald_Motif|link=Motifs#Mickey_&_Friends{{!}}Design Motif}}",
        "priceString": "{{price|800|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_CentennialMotifs",
        "bundleType": "Motif"
    },
    "Victorian Manor": {
        "linked_name": "Victorian Manor (Bundle)|Victorian Manor",
        "contentsString": "{{name|Victorian Manor}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HouseSkin_VictorianHouse",
        "bundleType": "House"
    },
    "Stylish Sailor Ensemble": {
        "linked_name": "Stylish Sailor Ensemble",
        "contentsString": "{{name|Stylish Sailor Top}}\n{{name|Stylish Sailor Pants}}\n{{name|Stylish Sailor Hat}}\n{{name|Stylish Sailor Shoes}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_SailorOutfit",
        "bundleType": "Clothing"
    },
    "Rocky Coast Lighthouse": {
        "linked_name": "Rocky Coast Lighthouse (Bundle)|Rocky Coast Lighthouse",
        "contentsString": "{{name|Rocky Coast Lighthouse}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Item_RockyCoastLighthouse",
        "bundleType": "Furniture"
    },
    "Joyful Jellyfish Ensemble": {
        "linked_name": "Joyful Jellyfish Ensemble",
        "contentsString": "{{name|Joyful Jellyfish Hat}}\n{{name|Joyful Jellyfish Outfit}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_JellyfishOutfit",
        "bundleType": "Clothing"
    },
    "Mickey's Steamboat Set": {
        "linked_name": "Mickey's Steamboat Set",
        "contentsString": "{{name|Celebrating Friendship Statue}}\n{{name|Platinum Steambed}}\n{{name|Decorative Steamboat}}\n{{name|Art Deco Steamboat Sofa}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_MickeySteamboatsSet",
        "bundleType": "Furniture"
    },
    "Finding Nemo Decoration Set": {
        "linked_name": "Finding Nemo Decoration Set",
        "contentsString": "{{name|Large Aquarium}} ({{price|550|moonstone}})\n{{name|Manta Ray Mobile}} ({{price|450|moonstone}})",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_FindingNemoSet",
        "bundleType": "Furniture"
    },
    "Celestial Tulle Ensemble": {
        "linked_name": "Celestial Tulle Ensemble",
        "contentsString": "{{name|Celestial Tulle Costume}}\n{{name|Celestial Tulle Shoes}}\n{{name|Braids and Bows Hairdo}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_TuleBundle",
        "bundleType": "Clothing"
    },
    "Blue Delftware Dress": {
        "linked_name": "Blue Delftware Dress (Bundle)|Blue Delftware Dress",
        "contentsString": "{{name|Blue Delftware Dress}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_PorcelainOutfit",
        "bundleType": "Clothing"
    },
    "Rainy Day Essentials 1": {
        "linked_name": "Rainy Day Essentials 1",
        "contentsString": "{{name|Polka Dot Umbrella}}\n{{name|Cloudy Umbrella}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "Bundle_Umbrella1",
        "bundleType": "Accessory"
    },
    "Beach Vibes": {
        "linked_name": "Beach Vibes",
        "contentsString": "{{name|White Wrap Skirt}}\n{{name|Frilly White Top}}\n{{name|Pink Shepherdess Watch}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_Beach2",
        "bundleType": "Clothing"
    },
    "Bonus Furniture Reward": {
        "linked_name": "Bonus Furniture Reward",
        "contentsString": "{{name|Bonus Furniture Reward}}",
        "priceString": "Free",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Trusty's House": {
        "linked_name": "Trusty's House (Bundle)|Trusty's House",
        "contentsString": "{{name|Trusty's House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HouseSkin_TrustysHouse",
        "bundleType": "House"
    },
    "Abigail and Amelia the Geese": {
        "linked_name": "Abigail and Amelia the Geese",
        "contentsString": "{{name|Abigail the Goose}}\n{{name|Amelia the Goose}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_AmeliaAndAbigail",
        "bundleType": "Companion/Furniture"
    },
    "Edwardian Valley Bundle": {
        "linked_name": "Edwardian Valley Bundle",
        "contentsString": "{{name|Edwardian Wishing Well}}\n{{name|Edwardian Goofy Stall}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_LadyTrampStallAndWell",
        "bundleType": "Stall/Well"
    },
    "Love and Airborne Hearts": {
        "linked_name": "Love and Airborne Hearts",
        "contentsString": "{{name|Airborne Heart}}\n{{name|\"Love Is in the Air\" Hearts}}",
        "priceString": "{{price|1250|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_LadyTrampValentinesEffects",
        "bundleType": "Furniture"
    },
    "Elegant Edwardian Greenhouse": {
        "linked_name": "Elegant Edwardian Greenhouse (Bundle)|Elegant Edwardian Greenhouse",
        "contentsString": "{{name|Elegant Edwardian Greenhouse}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "HeroItem_LadyTrampGazebo",
        "bundleType": "Furniture"
    },
    "Edwardian House Fence Kit": {
        "linked_name": "Edwardian House Fence Kit",
        "contentsString": "{{name|Edwardian House Gate}}\n{{name|Closed Edwardian House Gate}}\n{{name|Edwardian Iron Barrier}}\n{{name|Edwardian Iron Corner}}\n{{name|Edwardian Iron Endpiece}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.21",
        "protoDbName": "Bundle_LadyTrampFenceKit",
        "bundleType": "Furniture"
    },
    "Lady's House": {
        "linked_name": "Lady's House (Bundle)|Lady's House",
        "contentsString": "{{name|Lady's House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HouseSkin_LadyHouse",
        "bundleType": "House"
    },
    "Dating Set": {
        "linked_name": "Dating Set",
        "contentsString": "{{name|Small Marble Fountain}}\n{{name|Floral Column Arch}}\n{{name|Italian Date Night Table}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_DatingSet",
        "bundleType": "Furniture"
    },
    "Magnolia Decoration Bundle": {
        "linked_name": "Magnolia Decoration Bundle",
        "contentsString": "{{name|Magnolia Arch}}\n{{name|Magnolia Bloom Piles}}\n{{name|Potted Magnolia}}\n{{name|Blooming Magnolia Wallpaper}}\n{{name|Patterned Wood}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_MulanMagnolia",
        "bundleType": "Furniture"
    },
    "Teapot Feature Pond": {
        "linked_name": "Teapot Feature Pond (Bundle)|Teapot Feature Pond",
        "contentsString": "{{name|Teapot Feature Pond}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HeroItem_TeapotInspiredPond",
        "bundleType": "Furniture"
    },
    "La Bouff Bedroom Set": {
        "linked_name": "La Bouff Bedroom Set",
        "contentsString": "{{name|La Bouff Bed}}\n{{name|La Bouff Dresser}}\n{{name|La Bouff Night Stand}}\n{{name|La Bouff Wardrobe}}\n{{name|La Bouff Carpet}}\n{{name|La Bouff Chandelier}}\n{{name|La Bouff Lamp}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "Bundle_CharlotteBedroomSet",
        "bundleType": "Furniture"
    },
    "Romantic Set": {
        "linked_name": "Romantic Set",
        "contentsString": "{{name|Floating Lanterns}} ({{price|500|moonstone}})\n{{name|Swan Boat}} ({{price|700|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_RomanticPond",
        "bundleType": "Furniture"
    },
    "Rapunzel Costume Dress": {
        "linked_name": "Rapunzel Costume Dress (Bundle)|Rapunzel Costume Dress",
        "contentsString": "{{name|Rapunzel Costume Dress}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_RapunzelDress",
        "bundleType": "Clothing"
    },
    "Bold Bow Ensemble": {
        "linked_name": "Bold Bow Ensemble",
        "contentsString": "{{name|Bold Bow Gown}}\n{{name|Bold Bow Heels}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.15/1.17",
        "protoDbName": "Bundle_BowDress",
        "bundleType": "Clothing"
    },
    "Valentine Clothing Set": {
        "linked_name": "Valentine Clothing Set",
        "contentsString": "{{name|Lovely Knitted Cardigan}}\n{{name|Criss-Cross Your Heart Top}}\n{{name|Braided Floral Updo}} ({{price|150|moonstone}})\n{{name|Pink Bowtie 'n' Suspenders Shirt}}\n{{name|Blush Option 4 — Hearts}} ({{price|100|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_ValentineOutfit",
        "bundleType": "Clothing"
    },
    "Wicker Sweetheart Basket": {
        "linked_name": "Wicker Sweetheart Basket (Bundle)|Wicker Sweetheart Basket",
        "contentsString": "{{name|Wicker Sweetheart Basket}}",
        "priceString": "{{price|850|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Item_ValentinesBasket",
        "bundleType": "Accessory"
    },
    "La Bouff Castle Bundle": {
        "linked_name": "La Bouff Castle Bundle",
        "contentsString": "{{name|La Bouff Mansion}}\n{{name|La Bouff Texture}}\n{{name|La Bouff Wallpaper}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "Bundle_CharlotteCastle",
        "bundleType": "House/Furniture"
    },
    "Dapper Donald": {
        "linked_name": "Dapper Donald (Bundle)|Dapper Donald",
        "contentsString": "{{name|Dapper Donald}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_DapperDonald",
        "bundleType": "Character Style"
    },
    "Cupid Fountain": {
        "linked_name": "Cupid Fountain (Bundle)|Cupid Fountain",
        "contentsString": "{{name|Cupid Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_CupidonFountain",
        "bundleType": "Furniture"
    },
    "Green Vintage Kitchen Set": {
        "linked_name": "Green Vintage Kitchen Set",
        "contentsString": "{{name|Green Art Deco Sink}}\n{{name|Green Vintage Trolley}}\n{{name|Green Vintage Counter}}\n{{name|Green Vintage Counter Corner}}\n{{name|Cafe Display Case}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_GreenVintageKichenSet",
        "bundleType": "Furniture"
    },
    "Display Bubble Machine": {
        "linked_name": "Display Bubble Machine (Bundle)|Display Bubble Machine",
        "contentsString": "{{name|Display Bubble Machine}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_BubbleDisplay",
        "bundleType": "Furniture"
    },
    "Cloud Cottage": {
        "linked_name": "Cloud Cottage (Bundle)|Cloud Cottage",
        "contentsString": "{{name|Cloud Cottage}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HouseSkin_CloudHouse",
        "bundleType": "House"
    },
    "Cactus House": {
        "linked_name": "Cactus House (Bundle)|Cactus House",
        "contentsString": "{{name|Cactus House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HouseSkin_CactusHouse",
        "bundleType": "House"
    },
    "Sandy Landmarks Set": {
        "linked_name": "Sandy Landmarks Set",
        "contentsString": "{{name|Sandy Dream Castle}}\n{{name|Sandy Skull Rock}}\n{{name|Sandy Donald's House}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_SandLandmarks",
        "bundleType": "Furniture"
    },
    "Husky Puppy": {
        "linked_name": "Husky Puppy (Bundle)|Husky Puppy",
        "contentsString": "{{name|Husky Puppy}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_BabyHusky",
        "bundleType": "Companion"
    },
    "Wishful Winter Cinderella": {
        "linked_name": "Wishful Winter Cinderella (Bundle)|Wishful Winter Cinderella",
        "contentsString": "{{name|Wishful Winter Cinderella}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_CinderellaWinterSkin",
        "bundleType": "Character Style"
    },
    "Winter Fairy Unicorn": {
        "linked_name": "Winter Fairy Unicorn (Bundle)|Winter Fairy Unicorn",
        "contentsString": "{{name|Winter Fairy Unicorn}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HeroItem_WinterUnicorn",
        "bundleType": "Companion"
    },
    "Rosy Cloud Turtle": {
        "linked_name": "Rosy Cloud Turtle (Bundle)|Rosy Cloud Turtle",
        "contentsString": "{{name|Rosy Cloud Turtle}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_RosyCloudTurtle",
        "bundleType": "Companion"
    },
    "Deluxe Winter Holiday Bundle": {
        "linked_name": "'''Deluxe Winter Holiday Bundle'''",
        "contentsString": "{{name|Winter Holiday Dream Castle}}\n{{name|Winter Holiday Plaza Square}}\n{{name|Scrooge McDuck's Holiday Shop}}\n{{name|Winter Holiday Chez Remy}}\n{{name|Goofy's Festive Stall}}\n{{name|Shining Winter Wishing Well}}\n{{name|Magical Flurry Cloud|3}}\n{{name|Winter Holiday Bush|5}}\n{{name|Winter Holiday Hedge|5}}\n{{name|Square Winter Holiday Bush|5}}\n{{name|Tall Winter Holiday Tree|5}}\n{{name|Spindly Winter Holiday Tree|5}}\n{{name|Large Winter Holiday Tree|5}}\n{{name|Winter Holiday Tree|5}}\n{{name|Small Winter Holiday Tree|5}}\n{{name|Leaning Winter Holiday Tree|5}}",
        "priceString": "{{price|8000|moonstone}} (20% off)",
        "versionAdded": "1.20.2",
        "protoDbName": "",
        "bundleType": "Mega Bundle"
    },
    "Winter Holiday Dream Castle": {
        "linked_name": "Winter Holiday Dream Castle (Bundle)|Winter Holiday Dream Castle",
        "contentsString": "{{name|Winter Holiday Dream Castle}}",
        "priceString": "{{price|3500|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "",
        "bundleType": "Building"
    },
    "Deluxe Winter Holiday Building Set": {
        "linked_name": "Deluxe Winter Holiday Building Set",
        "contentsString": "{{name|Scrooge McDuck's Holiday Shop}}\n{{name|Winter Holiday Chez Remy}}\n{{name|Winter Holiday Plaza Square}}",
        "priceString": "{{price|3500|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "",
        "bundleType": "Building"
    },
    "Deluxe Winter Holiday Decoration Set": {
        "linked_name": "Deluxe Winter Holiday Decoration Set",
        "contentsString": "{{name|Goofy's Festive Stall}}\n{{name|Shining Winter Wishing Well}}\n{{name|Magical Flurry Cloud|3}}\n{{name|Winter Holiday Bush|5}}\n{{name|Winter Holiday Hedge|5}}\n{{name|Square Winter Holiday Bush|5}}\n{{name|Tall Winter Holiday Tree|5}}\n{{name|Spindly Winter Holiday Tree|5}}\n{{name|Large Winter Holiday Tree|5}}\n{{name|Winter Holiday Tree|5}}\n{{name|Small Winter Holiday Tree|5}}\n{{name|Leaning Winter Holiday Tree|5}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "",
        "bundleType": "Furniture"
    },
    "Sunny Coastal Villa": {
        "linked_name": "Sunny Coastal Villa (Bundle)|Sunny Coastal Villa",
        "contentsString": "{{name|Sunny Coastal Villa}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HouseSkin_MiamiSunnyHouse",
        "bundleType": "House"
    },
    "Summer Spectacle Fountain": {
        "linked_name": "Summer Spectacle Fountain (Bundle)|Summer Spectacle Fountain",
        "contentsString": "{{name|Summer Spectacle Fountain}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_MiamiSunnyBundle",
        "bundleType": "Furniture"
    },
    "Beaded Art Deco Ensemble": {
        "linked_name": "Beaded Art Deco Ensemble",
        "contentsString": "{{name|Beaded Art Deco Dress}}\n{{name|Marcel Waves Hairstyle}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_BeadedArtDecoEnsemble",
        "bundleType": "Clothing"
    },
    "Dapper Crocodile": {
        "linked_name": "Dapper Crocodile (Bundle)|Dapper Crocodile",
        "contentsString": "{{name|Dapper Crocodile}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_DapperCrocodile",
        "bundleType": "Companion"
    },
    "Hercules' Landscaping Set": {
        "linked_name": "Hercules' Landscaping Set",
        "contentsString": "{{name|Philoctetes Statue}}\n{{name|Mighty Gazebo}}\n{{name|Curved Marble Bench}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_HerculesLandscapingSet",
        "bundleType": "Furniture"
    },
    "Main Street Confectionery": {
        "linked_name": "Main Street Confectionery (Bundle)|Main Street Confectionery",
        "contentsString": "{{name|Main Street Confectionery}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HouseSkin_Confectionery",
        "bundleType": "House"
    },
    "Nana": {
        "linked_name": "Nana (Bundle)|Nana",
        "contentsString": "{{name|Nana}}<br>{{name|Nana's Doghouse}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_Nana",
        "bundleType": "Companion"
    },
    "Desert Oasis Well": {
        "linked_name": "Desert Oasis Well (Bundle)|Desert Oasis Well",
        "contentsString": "{{name|Desert Oasis Well}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_AladdinWellSkin",
        "bundleType": "Well"
    },
    "Agrabah Wall Set": {
        "linked_name": "Agrabah Wall Set",
        "contentsString": "{{name|Agrabah Gate}}\n{{name|Agrabah Tower}}\n{{name|Agrabah Tower and Wall}}\n{{name|Agrabah Tower and Double Wall}}\n{{name|Agrabah Wide Wall}}\n{{name|Agrabah Narrow Wall}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_AgrabahWall",
        "bundleType": "Furniture"
    },
    "Monstrous House": {
        "linked_name": "Monstrous House (Bundle)|Monstrous House",
        "contentsString": "{{name|Monstrous House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HouseSkin_MonsterIncInspiredHouse",
        "bundleType": "House"
    },
    "Monsters, Inc. Attraction": {
        "linked_name": "Monsters, Inc. Attraction (Bundle)|Monsters, Inc. Attraction",
        "contentsString": "{{name|Monsters, Inc. Attraction}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HeroItem_MonstersIncMikeSulleyToTheRescue",
        "bundleType": "Furniture"
    },
    "Monstrous Pink Bundle": {
        "linked_name": "Monstrous Pink Bundle",
        "contentsString": "{{name|Monstrous Grand Piano}} ({{price|300|moonstone}})\n{{name|Fuchsia Claw-Foot Tub}}\n{{name|Boo's Door}}\n{{name|Playful Monsters Wallpaper}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_MonsterIncDeco",
        "bundleType": "Furniture"
    },
    "Ratatouille Fountain": {
        "linked_name": "Ratatouille Fountain (Bundle)|Ratatouille Fountain",
        "contentsString": "{{name|Ratatouille Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_RatatouillesFountain",
        "bundleType": "Furniture"
    },
    "Polka Dot Ensemble": {
        "linked_name": "Polka Dot Ensemble",
        "contentsString": "{{name|Polka Dot Dress}}\n{{name|Polka Dot Heels}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_PolkaDotEnsemble",
        "bundleType": "Clothing"
    },
    "Polka Dot Hot Air Balloon": {
        "linked_name": "Polka Dot Hot Air Balloon (Bundle)|Polka Dot Hot Air Balloon",
        "contentsString": "{{name|Polka Dot Hot Air Balloon}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_PolkaDotHotAirBallon",
        "bundleType": "Furniture"
    },
    "Magic Kingdom Circus Minnie": {
        "linked_name": "Magic Kingdom Circus Minnie (Bundle)|Magic Kingdom Circus Minnie",
        "contentsString": "{{name|Magic Kingdom Circus Minnie}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_MagicKingdomCircusMinnie",
        "bundleType": "Character Style"
    },
    "Raincoat Bundle": {
        "linked_name": "Raincoat Bundle",
        "contentsString": "{{name|Fancy Raincoat}}\n{{name|Neon Mickey Makeup}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_PatternRaincoat",
        "bundleType": "Clothing"
    },
    "A-Door-able Ensemble": {
        "linked_name": "A-Door-able Ensemble",
        "contentsString": "{{name|A-Door-able Jacket}}\n{{name|A-Door-able Skirt}}\n{{name|Monster Eyes Makeup}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.15/1.16",
        "protoDbName": "Bundle_MonstersEnsemble",
        "bundleType": "Clothing"
    },
    "Royal Jacket Set": {
        "linked_name": "Royal Jacket Set",
        "contentsString": "{{name|Long Jacket with Gilded Roses}}\n{{name|Belted Jacket with Gilded Roses}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Bundle_RoyalJackets",
        "bundleType": "Clothing"
    },
    "Finding Nemo-Inspired Outfit": {
        "linked_name": "Finding Nemo-Inspired Outfit",
        "contentsString": "{{name|\"Friend to the Divers\" Crop Jacket}}\n{{name|Octo-bomber}}\n{{name|Burning Eyes}} \n{{name|Upscale Makeup}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_FindingNemoInspiredOutfit",
        "bundleType": "Clothing"
    },
    "Bermuda Merlin": {
        "linked_name": "Bermuda Merlin (Bundle)|Bermuda Merlin",
        "contentsString": "{{name|Bermuda Merlin}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.6",
        "protoDbName": "HeroItem_VacationMerlin",
        "bundleType": "Character Style"
    },
    "Sweet House": {
        "linked_name": "Sweet House (Bundle)|Sweet House",
        "contentsString": "{{name|Sweet House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "HeroItem_CandyHouse",
        "bundleType": "House"
    },
    "Goofy's Tangled Stall": {
        "linked_name": "Goofy's Tangled Stall (Bundle)|Goofy's Tangled Stall",
        "contentsString": "{{name|Goofy's Tangled Stall}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_TangledGoofyStall",
        "bundleType": "Stall"
    },
    "Flying Butterflies Bundle": {
        "linked_name": "Flying Butterflies Bundle",
        "contentsString": "{{name|Flying Purple Butterflies}}\n{{name|Flying Blue Butterflies}}\n{{name|Flying Orange Butterflies}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_FlyingButterflies",
        "bundleType": "Furniture"
    },
    "Balloon Release Tree": {
        "linked_name": "Balloon Release Tree (Bundle)|Balloon Release Tree",
        "contentsString": "{{name|Balloon Release Tree}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Item_BalloonDisplay",
        "bundleType": "Furniture"
    },
    "\"Adventure Is Out There!\" Balloon Basket": {
        "linked_name": "\"Adventure Is Out There!\" Balloon Basket (Bundle)|\"Adventure Is Out There!\" Balloon Basket",
        "contentsString": "{{name|\"Adventure Is Out There!\" Balloon Basket}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Item_AdventureIsOutThereBalloonBasket",
        "bundleType": "Furniture"
    },
    "Bonus Clothing Reward": {
        "linked_name": "Bonus Clothing Reward",
        "contentsString": "{{name|Bonus Clothing Reward}}",
        "priceString": "Free",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Fashionable Iron Wishing Well": {
        "linked_name": "Fashionable Iron Wishing Well (Bundle)|Fashionable Iron Wishing Well",
        "contentsString": "{{name|Fashionable Iron Wishing Well}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_FashionWellSkin",
        "bundleType": "Stall/Well"
    },
    "Designer Workshop": {
        "linked_name": "Designer Workshop (Bundle)|Designer Workshop",
        "contentsString": "{{name|Designer Workshop}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HouseSkin_HauteCoutureWorkshop",
        "bundleType": "House"
    },
    "De Vil Couture Ensemble": {
        "linked_name": "De Vil Couture Ensemble",
        "contentsString": "{{name|De Vil Couture Gown}}\n{{name|De Vil Couture Hat}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Item_CruellaInspiredOutfit",
        "bundleType": "Clothing"
    },
    "De Vil Couture Wings": {
        "linked_name": "De Vil Couture Wings (Bundle)|De Vil Couture Wings",
        "contentsString": "{{name|De Vil Couture Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_HauteCoutureWings",
        "bundleType": "Clothing"
    },
    "Royal Winter Motifs Bundle": {
        "linked_name": "Royal Winter Motifs Bundle",
        "contentsString": "{{name|Rose Line Drawing Motif|link=Motifs#Beauty and the Beast{{!}}Design Motif}}\n{{name|Bow and Arrow Line Drawing Motif|link=Motifs#Brave{{!}}Design Motif}}\n{{name|Straight Sword Line Drawing Motif|link=Motifs#Mulan{{!}}Design Motif}}\n{{name|Genie Lamp Line Drawing Motif|link=Motifs#Aladdin{{!}}Design Motif}}\n{{name|Orange Leaves Line Drawing Motif|link=Motifs#Pocahontas{{!}}Design Motif}}\n{{name|Crown Line Drawing Motif|link=Motifs#Sleeping Beauty{{!}}Design Motif}}\n{{name|Glass Slipper Line Drawing Motif|link=Motifs#Cinderella{{!}}Design Motif}}\n{{name|Apple Line Drawing Motif|link=Motifs#Snow White{{!}}Design Motif}}\n{{name|Shell Line Drawing Motif|link=Motifs#The Little Mermaid{{!}}Design Motif}}\n{{name|Princess and the Frog Line Drawing Motif|link=Motifs#The Princess and the Frog{{!}}Design Motif}}\n{{name|Moana Icon Line Drawing Motif|link=Motifs#Moana{{!}}Design Motif}}\n{{name|Tangled Icon Line Drawing Motif|link=Motifs#Tangled{{!}}Design Motif}}\n{{name|Wavy Sword Line Drawing Motif|link=Motifs#Raya and the Last Dragon{{!}}Design Motif}}",
        "priceString": "{{price|1300|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_RoyalWinterMotifs",
        "bundleType": "Motif"
    },
    "Elegant Villainous Outfit": {
        "linked_name": "Elegant Villainous Outfit",
        "contentsString": "{{name|Villainous Elegance Gown}}\n{{name|Villainous Elegance Necklace}}\n{{name|Villainous Elegance Gloves}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_EvilTwistedFairyTalesOutfit",
        "bundleType": "Clothing"
    },
    "Haunted Moth Wings": {
        "linked_name": "Haunted Moth Wings (Bundle)|Haunted Moth Wings",
        "contentsString": "{{name|Haunted Moth Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HeroItem_DeathMothWings",
        "bundleType": "Clothing"
    },
    "Lucky": {
        "linked_name": "Lucky (Bundle)|Lucky",
        "contentsString": "{{name|Lucky}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_LuckyBundle",
        "bundleType": "Companion"
    },
    "Gentle Rabbit": {
        "linked_name": "Gentle Rabbit (Bundle)|Gentle Rabbit",
        "contentsString": "{{name|Gentle Rabbit}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_GentleRabbit",
        "bundleType": "Companion"
    },
    "Mulan Costume Dress": {
        "linked_name": "Mulan Costume Dress (Bundle)|Mulan Costume Dress",
        "contentsString": "{{name|Mulan Costume Dress}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_MulanClassicDress",
        "bundleType": "Clothing"
    },
    "Hatter House": {
        "linked_name": "Hatter House (Bundle)|Hatter House",
        "contentsString": "{{name|Hatter House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HouseSkin_MadHatterInspiredHouse",
        "bundleType": "House"
    },
    "Villain Stained Glasses": {
        "linked_name": "Villain Stained Glasses",
        "contentsString": "{{name|Ursula Stained Glass}}\n{{name|Madam Mim Stained Glass}}\n{{name|Evil Queen Stained Glass}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_VilainStainedGlasses",
        "bundleType": "Furniture"
    },
    "Snowy Ski Chalet": {
        "linked_name": "Snowy Ski Chalet (Bundle)|Snowy Ski Chalet",
        "contentsString": "{{name|Snowy Ski Chalet}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HouseSkin_SkiLodge",
        "bundleType": "House"
    },
    "Ski Lift": {
        "linked_name": "Ski Lift (Bundle)|Ski Lift",
        "contentsString": "{{name|Ski Lift}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Item_SkiLift",
        "bundleType": "Furniture"
    },
    "Frosty Pixie Tinker Bell": {
        "linked_name": "Frosty Pixie Tinker Bell (Bundle)|Frosty Pixie Tinker Bell",
        "contentsString": "{{name|Frosty Pixie Tinker Bell}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HeroItem_TinkerbellSnowSkin",
        "bundleType": "Character Style"
    },
    "Wintery Magic Set": {
        "linked_name": "Wintery Magic Set",
        "contentsString": "{{name|Winterful Branch Arch}}\n{{name|Giant Silver Ornaments}}\n{{name|Luxury Snowflake Rug}}\n{{name|Wintery Magic Wallpaper}}\n{{name|Snowflake Tiles}}\n{{name|Wintery Birch Wallpaper}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_WinteryMagicSet",
        "bundleType": "Furniture"
    },
    "Winter's Wonder Belle": {
        "linked_name": "Winter's Wonder Belle (Bundle)|Winter's Wonder Belle",
        "contentsString": "{{name|Winter's Wonder Belle}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_WintersWonderBelle",
        "bundleType": "Character Style"
    },
    "Footstool Bundle": {
        "linked_name": "Footstool Bundle",
        "contentsString": "{{name|The Footstool}}\n{{name|The Footstool's Enchanted House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_FootstoolBundle",
        "bundleType": "Companion/Furniture"
    },
    "Triangle House Bundle": {
        "linked_name": "Triangle House Bundle",
        "contentsString": "{{name|Camping House}}\n{{name|Rustic Wooden Chair}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_TriangleCampingHouse",
        "bundleType": "House/Furniture"
    },
    "Wild Crystal Castle": {
        "linked_name": "Wild Crystal Castle (Bundle)|Wild Crystal Castle",
        "contentsString": "{{name|Wild Crystal Castle}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HouseSkin_AuroraBorealis",
        "bundleType": "House"
    },
    "Aurora Borealis": {
        "linked_name": "Aurora Borealis (Bundle)|Aurora Borealis",
        "contentsString": "{{name|Aurora Borealis}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Item_FlyingAuroraBorealis",
        "bundleType": "Furniture"
    },
    "Aurora Borealis Glider": {
        "linked_name": "Aurora Borealis Glider (Bundle)|Aurora Borealis Glider",
        "contentsString": "{{name|Aurora Borealis Glider}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Item_AuroraBorealisGlider",
        "bundleType": "Glider"
    },
    "Aurora Costume Dresses": {
        "linked_name": "Aurora Costume Dresses",
        "contentsString": "{{name|Pink Aurora Costume Dress}}\n{{name|Blue Aurora Costume Dress}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_AuroraSleepingBeautyDresses",
        "bundleType": "Clothing"
    },
    "New Year Celebration Bundle": {
        "linked_name": "New Year Celebration Bundle",
        "contentsString": "{{name|Party Confetti Machine}}\n{{name|Party Photo Backdrop}}\n{{name|Party Disco Ball}}\n{{name|Neon Symbol Sign}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_NewYearBundle",
        "bundleType": "Furniture"
    },
    "Fireworks Display": {
        "linked_name": "Fireworks Display (Bundle)|Fireworks Display",
        "contentsString": "{{name|Fireworks Display}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Item_FireworksBundle",
        "bundleType": "Furniture"
    },
    "Platinum Mickey": {
        "linked_name": "Platinum Mickey (Bundle)|Platinum Mickey",
        "contentsString": "{{name|Platinum Mickey}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HeroItem_PlatinumMickey",
        "bundleType": "Character Style"
    },
    "Platinum Minnie": {
        "linked_name": "Platinum Minnie (Bundle)|Platinum Minnie",
        "contentsString": "{{name|Platinum Minnie}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_PlatinumMinnie",
        "bundleType": "Character Style"
    },
    "Park's Bubble Machines": {
        "linked_name": "Park's Bubble Machines",
        "contentsString": "{{name|Sorcerer's Bubble Machine}}\n{{name|Mickey's Bubble Machine}}\n{{name|Minnie's Bubble Machine}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_ParksBubbleMachines",
        "bundleType": "Accessory"
    },
    "Enchanted Forest House": {
        "linked_name": "Enchanted Forest House (Bundle)|Enchanted Forest House",
        "contentsString": "{{name|Enchanted Forest House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HouseSkin_GiselleHouse",
        "bundleType": "House"
    },
    "Platinum Techwear Bundle": {
        "linked_name": "Platinum Techwear Bundle",
        "contentsString": "{{name|Platinum Techwear Pants}}\n{{name|Melting Platinum Mickey Mouse Ears}}\n{{name|Platinum Techwear Jacket}}\n{{name|Platinum Holographic Backpack}}\n{{name|Steamboat Sneakers}}\n{{name|Vintage Mickey Bracelet}}\n{{name|Gloved Hand Makeup}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_PlatinumTechwearOutfit",
        "bundleType": "Clothing"
    },
    "Pixar Pal-A-Round": {
        "linked_name": "Pixar Pal-A-Round (Bundle)|Pixar Pal-A-Round",
        "contentsString": "{{name|Pixar Pal-A-Round}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_PixarPalAAround",
        "bundleType": "Furniture"
    },
    "it's a small world Houses Set": {
        "linked_name": "it's a small world Houses Set",
        "contentsString": "{{name|It's a Small House After All}}\n{{name|It's a Bright House After All}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_ItsASmallWorldHouses",
        "bundleType": "House"
    },
    "Holiday Lights EVE": {
        "linked_name": "Holiday Lights EVE (Bundle)|Holiday Lights EVE",
        "contentsString": "{{name|Holiday Lights EVE}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_HolidayEve",
        "bundleType": "Character Style"
    },
    "Giant Festive Winter Bear": {
        "linked_name": "Giant Festive Winter Bear (Bundle)|Giant Festive Winter Bear",
        "contentsString": "{{name|Giant Festive Winter Bear}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Item_HolidayTeddyBear",
        "bundleType": "Furniture"
    },
    "Festive Motifs Bundle": {
        "linked_name": "Festive Motifs Bundle",
        "contentsString": "{{name|Stitch Lights Motif|link=Motifs#Lilo & Stitch{{!}}Design Motif}}\n{{name|Gingerbread Mickey Motif|link=Motifs#Mickey & Friends{{!}}Design Motif}}\n{{name|Purple Wreath Motif|link=Motifs#Frozen{{!}}Design Motif}}\n{{name|Jumba Santa Motif|link=Motifs#Lilo & Stitch{{!}}Design Motif}}\n{{name|EVE Lights Motif|link=Motifs#WALL-E{{!}}Design Motif}}\n{{name|Toy Alien Santa Motif|link=Motifs#Toy Story{{!}}Design Motif}}\n{{name|Christmas Tree Motif|link=Motifs#Mickey & Friends{{!}}Design Motif}}",
        "priceString": "{{price|700|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_FestiveMotifs",
        "bundleType": "Motif"
    },
    "Cozy Festive Bundle": {
        "linked_name": "Cozy Festive Bundle",
        "contentsString": "{{name|Cozy Festive Hearth}}\n{{name|Festive Windows}}\n{{name|Round Wintery Mickey Rug}}\n{{name|Festive Dinner Table}}\n{{name|Festive Garland}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_CozyFestiveBundle",
        "bundleType": "Furniture"
    },
    "Festive Lights House": {
        "linked_name": "Festive Lights House (Bundle)|Festive Lights House",
        "contentsString": "{{name|Festive Lights House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HouseSkin_WinterIlluminatedHouse",
        "bundleType": "House"
    },
    "Festive Merlin": {
        "linked_name": "Festive Merlin (Bundle)|Festive Merlin",
        "contentsString": "{{name|Festive Merlin}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_FestiveMerlin",
        "bundleType": "Character Style"
    },
    "Gingerbread Rabbit": {
        "linked_name": "Gingerbread Rabbit (Bundle)|Gingerbread Rabbit",
        "contentsString": "{{name|Gingerbread Rabbit}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HeroItem_GingerbreadRabbit",
        "bundleType": "Companion"
    },
    "Festive Holiday Ensemble": {
        "linked_name": "Festive Holiday Ensemble",
        "contentsString": "{{name|Festive Holiday Dress}} ({{price|700|moonstone}})\n{{name|Candy Cane Staff}} ({{price|300|moonstone}})\n{{name|Ice Mask}} ({{price|200|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_FestiveHolidayOutfit",
        "bundleType": "Clothing"
    },
    "Winter Palace": {
        "linked_name": "Winter Palace (Bundle)|Winter Palace",
        "contentsString": "{{name|Winter Palace}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HouseSkin_WinterPalace",
        "bundleType": "House"
    },
    "Holiday Gift Bundle": {
        "linked_name": "Holiday Gift Bundle",
        "contentsString": "{{name|Grand Tree of Holiday Cheer}} ({{price|600|moonstone}})\n{{name|Big Pile of Gifts}} ({{price|600|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_HolidayGiftBundle",
        "bundleType": "Furniture"
    },
    "Mickey Mouse Holiday Inflatable": {
        "linked_name": "Mickey Mouse Holiday Inflatable (Bundle)|Mickey Mouse Holiday Inflatable",
        "contentsString": "{{name|Mickey Mouse Holiday Inflatable}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Item_GemmyInflatable",
        "bundleType": "Furniture"
    },
    "Illuminated Deer Decorations": {
        "linked_name": "Illuminated Deer Decorations (Bundle)|Illuminated Deer Decorations",
        "contentsString": "{{name|Illuminated Deer Decorations}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Item_DeerLightsTrio",
        "bundleType": "Furniture"
    },
    "Gift Bag Bundle": {
        "linked_name": "Gift Bag Bundle",
        "contentsString": "{{name|Fancy Snowflake Gift Bag}}\n{{name|Wintery Tree Gift Bag}}\n{{name|Winter Gala Gift Bag}}",
        "priceString": "{{price|199|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Bundle_GiftBagsBundle",
        "bundleType": "Accessory"
    },
    "Festive Ornament Set": {
        "linked_name": "Festive Ornament Set",
        "contentsString": "{{name|Illuminated Regal Fountain}}\n{{name|Festive Lights Bush}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_IlluminatedDecoSet",
        "bundleType": "Furniture"
    },
    "Festive Market Bundle": {
        "linked_name": "Festive Market Bundle",
        "contentsString": "{{name|Festive Market Stand}}\n{{name|Festive Lights Entry Arch}}\n{{name|Festive Lights Star Banner}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_IlluminatedMarket",
        "bundleType": "Furniture"
    },
    "Adventuring Anna Costume": {
        "linked_name": "Adventuring Anna Costume (Bundle)|Adventuring Anna Costume",
        "contentsString": "{{name|Adventuring Anna Costume}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_AnnaBluePinkOutfit",
        "bundleType": "Clothing"
    },
    "Arendelle Castle Winter Wall Kit": {
        "linked_name": "Arendelle Castle Winter Wall Kit",
        "contentsString": "{{name|Arendelle Castle Entrance}}\n{{name|Arendelle Castle Wall}}\n{{name|Arendelle Castle Corner Tower}}\n{{name|Arendelle Castle Tower}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_ArendelleWallKit",
        "bundleType": "Furniture"
    },
    "Mini Reindeer Bundle": {
        "linked_name": "Mini Reindeer Bundle",
        "contentsString": "{{name|Mini Reindeer}}\n{{name|Mini Reindeer House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_BabyReindeer",
        "bundleType": "Companion/Furniture"
    },
    "Frosty Fortress": {
        "linked_name": "Frosty Fortress (Bundle)|Frosty Fortress",
        "contentsString": "{{name|Frosty Fortress}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "HouseSkin_IceCastle",
        "bundleType": "House"
    },
    "Wintery Pond": {
        "linked_name": "Wintery Pond (Bundle)|Wintery Pond",
        "contentsString": "{{name|Wintery Pond}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_InteractivePond",
        "bundleType": "Furniture"
    },
    "Cinderella Bundle": {
        "linked_name": "'''Cinderella Bundle'''",
        "contentsString": "{{name|Charming Castle Arch}}\n{{name|Charming Castle Wall}}\n{{name|Charming Castle Short Wall}}\n{{name|Charming Castle Corner Tower}}\n{{name|Charming Castle Wall and Tower}}\n{{name|Wishful Winter Cinderella}}\n{{name|Magical Pumpkin Coach Topiary}}\n{{name|Frosty Fairy Godmother}}\n{{name|Midnight Garden Gazebo}}",
        "priceString": "{{price|8000|moonstone}} (20% off)",
        "versionAdded": "1.20.11",
        "protoDbName": "",
        "bundleType": "Mega Bundle"
    },
    "Charming Castle Wall Kit": {
        "linked_name": "Charming Castle Wall Kit",
        "contentsString": "{{name|Charming Castle Arch}}\n{{name|Charming Castle Wall}}\n{{name|Charming Castle Short Wall}}\n{{name|Charming Castle Corner Tower}}\n{{name|Charming Castle Wall and Tower}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "Bundle_CinderellaWallKit",
        "bundleType": "Furniture"
    },
    "Magical Pumpkin Coach Topiary": {
        "linked_name": "Magical Pumpkin Coach Topiary (Bundle)|Magical Pumpkin Coach Topiary",
        "contentsString": "{{name|Magical Pumpkin Coach Topiary}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_PumpkinEvolvingTopiary",
        "bundleType": "Furniture"
    },
    "Midnight Garden Gazebo": {
        "linked_name": "Midnight Garden Gazebo (Bundle)|Midnight Garden Gazebo",
        "contentsString": "{{name|Midnight Garden Gazebo}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_CinderellaGazebo",
        "bundleType": "Furniture"
    },
    "Frosty Fairy Godmother": {
        "linked_name": "Frosty Fairy Godmother (Bundle)|Frosty Fairy Godmother",
        "contentsString": "{{name|Frosty Fairy Godmother}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.20.11",
        "protoDbName": "HeroItem_FrostyFairyGodmother",
        "bundleType": "Character Style"
    },
    "Winter Gala Ensemble": {
        "linked_name": "Winter Gala Ensemble",
        "contentsString": "{{name|Gray Winter Gala Gown}}\n{{name|Gray Winter Gala Trousers}}\n{{name|Gray Winter Gala Coat}}\n{{name|Winter Gala Ice Antlers}}\n{{name|Gray Winter Gala Boots}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_WinterGalaOutfit",
        "bundleType": "Clothing"
    },
    "Elemental Bundle": {
        "linked_name": "Elemental Bundle",
        "contentsString": "{{name|All-Terrain Scooter}}\n{{name|Circular Embossed Metal Fireplace}}\n{{name|Drop Pillar}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_ElementalFurnitureSet",
        "bundleType": "Furniture"
    },
    "Lady Tremaine's Manor House": {
        "linked_name": "Lady Tremaine's Manor House (Bundle)|Lady Tremaine's Manor House",
        "contentsString": "{{name|Lady Tremaine's Manor House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HouseSkin_LadyTremainesHome",
        "bundleType": "House"
    },
    "Wintery Exterior Set": {
        "linked_name": "Wintery Exterior Set",
        "contentsString": "{{name|Luminous Snowflake Statue}}\n{{name|Royal Ice Skate Rack}}\n{{name|Cozy Winter Bench}}\n{{name|Winterful Iron Lamp}}\n{{name|Decorative Winter Vase}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_WinteryExteriorSet",
        "bundleType": "Furniture"
    },
    "Whimsical Blue Companion Pack 1": {
        "linked_name": "Whimsical Blue Companion Pack 1",
        "contentsString": "{{name|Blue Whimsical Squirrel}}\n{{name|Blue Whimsical Crocodile}}\n{{name|Blue Whimsical Raven}}\n{{name|Blue Whimsical Raccoon}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_DreamlightCritter3",
        "bundleType": "Companion"
    },
    "Whimsical Blue Companion Pack 2": {
        "linked_name": "Whimsical Blue Companion Pack 2",
        "contentsString": "{{name|Blue Whimsical Sunbird}}\n{{name|Blue Whimsical Turtle}}\n{{name|Blue Whimsical Rabbit}}\n{{name|Blue Whimsical Fox}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_DreamlightCritter4",
        "bundleType": "Companion"
    },
    "Splendid Ice Rink": {
        "linked_name": "Splendid Ice Rink (Bundle)|Splendid Ice Rink",
        "contentsString": "{{name|Splendid Ice Rink}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Item_SplendidIceRink",
        "bundleType": "Furniture"
    },
    "The Wings of Winter": {
        "linked_name": "The Wings of Winter (Bundle)|The Wings of Winter",
        "contentsString": "{{name|The Wings of Winter}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_TheWingsofWinter",
        "bundleType": "Clothing"
    },
    "Christmas Town Town Hall": {
        "linked_name": "Christmas Town Town Hall (Bundle)|Christmas Town Town Hall",
        "contentsString": "{{name|Christmas Town Town Hall}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "Bundle_HalloweenTown",
        "bundleType": "House"
    },
    "Ragdoll Patchwork Wings": {
        "linked_name": "Ragdoll Patchwork Wings (Bundle)|Ragdoll Patchwork Wings",
        "contentsString": "{{name|Ragdoll Patchwork Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HeroItem_NBCSallysWings",
        "bundleType": "Clothing"
    },
    "Nightmare Holiday Bundle": {
        "linked_name": "Nightmare Holiday Bundle",
        "contentsString": "{{name|Skellington's Coffin Sled}}\n{{name|Giant Snake}}\n{{name|Man-Eating Wreath}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "Bundle_NBCJackGifts",
        "bundleType": "Furniture"
    },
    "Candy Cane Set": {
        "linked_name": "Candy Cane Set",
        "contentsString": "{{name|Candy Cane Bunk Bed}}\n{{name|Gingerbread Chair}}\n{{name|Frosty Candy Cane Window}}\n{{name|Candy Cane Rail}}\n{{name|Twisty Candy Cane Light Post}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Bundle_CandyCaneSet",
        "bundleType": "Furniture"
    },
    "Christmas Town Train": {
        "linked_name": "Christmas Town Train (Bundle)|Christmas Town Train",
        "contentsString": "{{name|Christmas Town Train}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Item_WinterMiniTrain",
        "bundleType": "Furniture"
    },
    "Winter Celebration Bundle": {
        "linked_name": "Winter Celebration Bundle",
        "contentsString": "{{name|Christmas Town Mini Carousel}}\n{{name|Christmas Town Polar Bear}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Bundle_WinterCelebration",
        "bundleType": "Furniture"
    },
    "Skeletomobile": {
        "linked_name": "Skeletomobile (Bundle)|Skeletomobile",
        "contentsString": "{{name|Skeletomobile}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "HeroItem_MayorsCar",
        "bundleType": "Furniture"
    },
    "Halloween Town Bundle": {
        "linked_name": "Halloween Town Bundle",
        "contentsString": "{{name|Skellington's Hill}}\n{{name|Frightful Fountain}}\n{{name|Halloween Town Archway}}\n{{name|Haunted Tonics}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_HalloweenTownSet",
        "bundleType": "Furniture"
    },
    "Halloween Town Duo": {
        "linked_name": "Halloween Town Duo",
        "contentsString": "{{name|Scary Surprise Boxes}}\n{{name|Haunting Pedestal}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "Bundle_HalloweenTown",
        "bundleType": "Furniture"
    },
    "Ghostly \"Zero\" Fox Bundle": {
        "linked_name": "Ghostly \"Zero\" Fox Bundle",
        "contentsString": "{{name|Ghostly \"Zero\" Fox}}\n{{name|Zero's House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "Bundle_Zero",
        "bundleType": "Companion/Furniture"
    },
    "Holiday Exterior Set": {
        "linked_name": "Holiday Exterior Set",
        "contentsString": "{{name|Hot Cocoa Stand}}\n{{name|Santa's Gift-Laden Sleigh}}\n{{name|Festive Wreath Post}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "",
        "bundleType": "Furniture"
    },
    "Icy Mountain River Kit": {
        "linked_name": "Icy Mountain River Kit",
        "contentsString": "{{name|Icy Mountain River Waterfall}}\n{{name|Icy Mountain River Rolling Edge}}\n{{name|Icy Mountain River Edge}}\n{{name|Icy Mountain River Bank}}\n{{name|Icy Mountain River Debris Edge}}\n{{name|Icy Mountain River Branch}}\n{{name|Small Icy Mountain River Corner}}\n{{name|Icy Mountain River Snowy Pile}}\n{{name|Icy Mountain River Icy Tree Corner}}\n{{name|Icy Mountain River Brush Corner}}\n{{name|Icy Mountain River Snowy Square}}\n{{name|Icy Mountain River Light Rectangle}}\n{{name|Small Icy Mountain River Rectangle}}\n{{name|Icy Mountain River Rectangle}}\n{{name|Icy Mountain River Square}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "Bundle_WinterRiverKit",
        "bundleType": "Furniture"
    },
    "Winter Pixie Outfit": {
        "linked_name": "Winter Pixie Outfit (Bundle)|Winter Pixie Outfit",
        "contentsString": "{{name|Winter Pixie Outfit}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HeroItem_TinkerbellSnowOutfit",
        "bundleType": "Clothing"
    },
    "Fairy Winter Cottage": {
        "linked_name": "Fairy Winter Cottage (Bundle)|Fairy Winter Cottage",
        "contentsString": "{{name|Fairy Winter Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HouseSkin_WinterFairyCottage",
        "bundleType": "House"
    },
    "Tinker Bell's House": {
        "linked_name": "Tinker Bell's House (Bundle)|Tinker Bell's House",
        "contentsString": "{{name|Tinker Bell's House (2)|link=Tinker Bell's House (2){{!}}Tinker Bell's House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HouseSkin_TinkerbellHouse",
        "bundleType": "House"
    },
    "Tinker Fairy Wings": {
        "linked_name": "Tinker Fairy Wings (Bundle)|Tinker Fairy Wings",
        "contentsString": "{{name|Tinker Fairy Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HeroItem_TinkerbellWings",
        "bundleType": "Clothing"
    },
    "Golden Clarion Bundle": {
        "linked_name": "Golden Clarion Bundle",
        "contentsString": "{{name|Golden Clarion Dress}}\n{{name|Golden Clarion Crown}}\n{{name|Golden Clarion Wings}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_QueenClarionOutfit",
        "bundleType": "Clothing"
    },
    "Decorative Pixie Dust Mill": {
        "linked_name": "Decorative Pixie Dust Mill (Bundle)|Decorative Pixie Dust Mill",
        "contentsString": "{{name|Decorative Pixie Dust Mill}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HouseSkin_PixieDustMillHouseSkin",
        "bundleType": "House"
    },
    "Tinker Bell Capybara": {
        "linked_name": "Tinker Bell Capybara (Bundle)|Tinker Bell Capybara",
        "contentsString": "{{name|Tinker Bell Capybara}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "HeroItem_TinkerbellCritter",
        "bundleType": "Companion"
    },
    "Puff Air Balloon": {
        "linked_name": "Puff Air Balloon (Bundle)|Puff Air Balloon",
        "contentsString": "{{name|Puff Air Balloon}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_FairyHotAirBalloon",
        "bundleType": "Furniture"
    },
    "Snowy Raccoon": {
        "linked_name": "Snowy Raccoon (Bundle)|Snowy Raccoon",
        "contentsString": "{{name|Snowy Raccoon}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_SnowyRaccoon",
        "bundleType": "Companion"
    },
    "Baby Pegasus Wishblossom House": {
        "linked_name": "Baby Pegasus Wishblossom House (Bundle)|Baby Pegasus Wishblossom House",
        "contentsString": "{{name|Baby Pegasus Wishblossom House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "HouseSkin_BabyPegasusRanchHome",
        "bundleType": "House"
    },
    "Frilly Alpine Outfit": {
        "linked_name": "Frilly Alpine Outfit",
        "contentsString": "{{name|Elegant Alpine Hat}}\n{{name|Frilly Alpine Dress}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.20.2",
        "protoDbName": "Bundle_FancyRanchOutfit",
        "bundleType": "Clothing"
    },
    "Al's Toy Barn": {
        "linked_name": "Al's Toy Barn (Bundle)|Al's Toy Barn",
        "contentsString": "{{name|Al's Toy Barn}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HouseSkin_AlToyBarn",
        "bundleType": "House"
    },
    "Heihei Bundle": {
        "linked_name": "Heihei Bundle",
        "contentsString": "{{name|Heihei}}\n{{name|Heihei's House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_HeiHei",
        "bundleType": "Companion/Furniture"
    },
    "Springtime Valley Bundle": {
        "linked_name": "Springtime Valley Bundle",
        "contentsString": "{{name|Springtime Wishing Well}}\n{{name|Goofy's Springtime Stall}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_SpringStallAndWellSkins",
        "bundleType": "Stall/Well"
    },
    "Greenhouse Cottage": {
        "linked_name": "Greenhouse Cottage (Bundle)|Greenhouse Cottage",
        "contentsString": "{{name|Greenhouse Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HouseSkin_GreenHouse",
        "bundleType": "House"
    },
    "Rabbit Garden Set": {
        "linked_name": "Rabbit Garden Set",
        "contentsString": "{{name|Rabbit Scarecrow}}\n{{name|Rabbit Leaf Pile}}\n{{name|Rabbit Gardening Bag}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_RabbitGarden",
        "bundleType": "Furniture"
    },
    "Autumnal Mushroom Pond": {
        "linked_name": "Autumnal Mushroom Pond (Bundle)|Autumnal Mushroom Pond",
        "contentsString": "{{name|Autumnal Mushroom Pond}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_MushroomPond",
        "bundleType": "Furniture"
    },
    "Celebration Jasmine Ensemble": {
        "linked_name": "Celebration Jasmine Ensemble",
        "contentsString": "{{name|Celebration Jasmine Costume}}\n{{name|Celebration Jasmine Hairstyle}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_JasmineCelebration",
        "bundleType": "Clothing"
    },
    "Winter Crystal Exterior Set": {
        "linked_name": "Winter Crystal Exterior Set",
        "contentsString": "{{name|Winter Crystal Swing}}\n{{name|Winter Crystal Lamppost}}\n{{name|Winter Crystal Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_CrystalExteriorDecorations",
        "bundleType": "Furniture"
    },
    "Decorative Winter Crystals": {
        "linked_name": "Decorative Winter Crystals",
        "contentsString": "{{name|Small Winter Crystal}}\n{{name|Large Spiky Winter Crystal}}\n{{name|Large Winter Crystal}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_FairyCrystals",
        "bundleType": "Furniture"
    },
    "Un Poco Loco Valley Bundle": {
        "linked_name": "[\"Un Poco Loco\" Valley Bundle",
        "contentsString": "{{name|Un Poco Loco Wishing Well}}\n{{name|\"Un Poco Loco\" Goofy Stall}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_CocoStallAndWell",
        "bundleType": "Stall/Well"
    },
    "Handheld Plushie": {
        "linked_name": "Handheld Plushie (Bundle)|Handheld Plushie",
        "contentsString": "{{name|Handheld Plushie}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Item_PlushAccessory",
        "bundleType": "Accessory"
    },
    "Renaissance Faire Ensemble": {
        "linked_name": "Renaissance Faire Ensemble",
        "contentsString": "{{name|Renaissance Faire Dress}}\n{{name|Renaissance Faire Quiver}}\n{{name|Renaissance Faire Boots}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_MedievalEnsemble",
        "bundleType": "Clothing"
    },
    "Knightly Dragon": {
        "linked_name": "Knightly Dragon (Bundle)|Knightly Dragon",
        "contentsString": "{{name|Knightly Dragon}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_KnightDragon",
        "bundleType": "Companion"
    },
    "Night Show Special Effects": {
        "linked_name": "Night Show Special Effects",
        "contentsString": "{{name|Pyrotechnic Box}}\n{{name|Spirit Water Curtain}}\n{{name|Stage Fireworks}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_RockShowEffects",
        "bundleType": "Furniture"
    },
    "Pirate Donald": {
        "linked_name": "Pirate Donald (Bundle)|Pirate Donald",
        "contentsString": "{{name|Pirate Donald}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_PirateDonald",
        "bundleType": "Character Style"
    },
    "Twisted Thorn Ensemble": {
        "linked_name": "Twisted Thorn Ensemble",
        "contentsString": "{{name|Twisted Thorn Gown}}\n{{name|Jagged Mantle Cloak}}\n{{name|Mistress of All Evil Staff}}\n{{name|Twisted Thorn Boots}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_MaleficentInspiredOutfit",
        "bundleType": "Clothing"
    },
    "Steadfast Heart Ensemble": {
        "linked_name": "Steadfast Heart Ensemble",
        "contentsString": "{{name|Steadfast Heart Gown}}\n{{name|Steadfast Heart Cloak}}\n{{name|Briar Rose Helmet}}\n{{name|Steadfast Heart Boots}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_AuroraInspiredOutfit",
        "bundleType": "Clothing"
    },
    "Palace": {
        "linked_name": "Palace (Bundle)|Palace",
        "contentsString": "{{name|Palace}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "HouseSkin_Castle",
        "bundleType": "House"
    },
    "Haunted Mansion House": {
        "linked_name": "Haunted Mansion House (Bundle)|Haunted Mansion House",
        "contentsString": "{{name|Haunted Mansion House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HouseSkin_HauntedMansionOrlando",
        "bundleType": "House"
    },
    "Haunted Mansion Decoration Set": {
        "linked_name": "Haunted Mansion Decoration Set",
        "contentsString": "{{name|Haunted Mansion Hearse}}\n{{name|Madame Leota Tombstone}}\n{{name|Haunted Mansion Tombstone}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_HauntedMansionDecorations",
        "bundleType": "Furniture"
    },
    "Haunting Paintings Bundle": {
        "linked_name": "Haunting Paintings Bundle",
        "contentsString": "{{name|Haunting Tightrope Painting}}\n{{name|Haunting Barrel Painting}}\n\n{{name|Haunting Rose Painting}}\n\n{{name|Haunting Quicksand Painting}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_HauntedMansionPaintings",
        "bundleType": "Furniture"
    },
    "Bat Wings": {
        "linked_name": "Bat Wings (Bundle)|Bat Wings",
        "contentsString": "{{name|Bat Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_BatWings",
        "bundleType": "Clothing"
    },
    "Sanguine Evening Ensemble": {
        "linked_name": "Sanguine Evening Ensemble (Bundle)|Sanguine Evening Ensemble",
        "contentsString": "{{name|Sanguine Evening Ensemble}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_VampirianEnsemble",
        "bundleType": "Clothing"
    },
    "Haunted Mansion Bundle": {
        "linked_name": "Haunted Mansion Bundle",
        "contentsString": "{{name|Haunted Mansion}}\n{{name|Haunted \"Before Christmas\" Mansion}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "",
        "bundleType": "House"
    },
    "Haunted Gazebo": {
        "linked_name": "Haunted Gazebo (Bundle)|Haunted Gazebo",
        "contentsString": "{{name|Haunted Gazebo}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Item_HauntedGazebo",
        "bundleType": "Furniture"
    },
    "Knight Castle Wall": {
        "linked_name": "Knight Castle Wall",
        "contentsString": "{{name|Stone Castle Arch}}\n{{name|Round Castle Tower|2}}\n{{name|Round Tower Castle Corner|2}}\n{{name|Small Castle Wall — Window|2}}\n{{name|Small Castle Window Wall|2}}\n{{name|Stone Castle Corner Tower|2}}\n{{name|Stone Castle Tower|2}}\n{{name|Large Castle Wall|2}}\n{{name|Small Castle Wall|4}}\n{{name|Large Castle Corner|2}}\n{{name|Small Shattered Castle Wall (2)|link=Small Shattered Castle Wall (2){{!}}Small Shattered Castle Wall|2}}\n{{name|Crumbling Castle Corner|2}}\n{{name|Shattered Castle Corner|2}}\n{{name|Small Shattered Castle Wall|4}}\n{{name|Small Castle Wall Ruin|4}}\n{{name|Small Crumbling Castle Wall|4}}\n{{name|Small Broken Castle Wall|4}}\n{{name|Castle Wall Ruin|4}}\n{{name|Large Shattered Castle Wall|4}}\n{{name|Large Broken Castle Wall|4}}\n{{name|Tall Broken Castle Wall|4}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "Bundle_KnightCastleWall",
        "bundleType": "Furniture"
    },
    "Oogie Boogie Outfit": {
        "linked_name": "Oogie Boogie Outfit (Bundle)|Oogie Boogie Outfit",
        "contentsString": "{{name|Oogie Boogie Outfit}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Item_OogieBoogieOnesie",
        "bundleType": "Clothing"
    },
    "Golden Bloom Cottage": {
        "linked_name": "Golden Bloom Cottage (Bundle)|Golden Bloom Cottage",
        "contentsString": "{{name|Golden Bloom Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HouseSkin_MarigoldHouse",
        "bundleType": "House"
    },
    "Wind-Up Raccoon": {
        "linked_name": "Wind-Up Raccoon (Bundle)|Wind-Up Raccoon",
        "contentsString": "{{name|Wind-Up Raccoon}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_WindupRaccon",
        "bundleType": "Companion"
    },
    "Fortune Teller Tent": {
        "linked_name": "Fortune Teller Tent (Bundle)|Fortune Teller Tent",
        "contentsString": "{{name|Fortune Teller Tent}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HouseSkin_FortuneTellerTent",
        "bundleType": "House"
    },
    "Fortune Teller Dress": {
        "linked_name": "Fortune Teller Dress (Bundle)|Fortune Teller Dress",
        "contentsString": "{{name|Fortune Teller Dress}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_CircusEnsemble",
        "bundleType": "Clothing"
    },
    "Luminous Mid-Autumn Dragon Kit": {
        "linked_name": "Luminous Mid-Autumn Dragon Kit",
        "contentsString": "{{name|Luminous Mid-Autumn Dragon Head}}\n{{name|Luminous Mid-Autumn Dragon Foreleg}}\n{{name|Luminous Mid-Autumn Dragon Back Leg}}\n{{name|Luminous Mid-Autumn Dragon Straight Back}}\n{{name|Luminous Mid-Autumn Dragon Curved Back}}\n{{name|Luminous Mid-Autumn Dragon Back}}\n{{name|Luminous Mid-Autumn Dragon Tail}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_MooncakeLandmark",
        "bundleType": "Furniture"
    },
    "Butterfly Wings Set": {
        "linked_name": "Butterfly Wings Set",
        "contentsString": "{{name|Ethereal Butterfly Wings}}\n{{name|Fiery Butterfly Wings}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_ButterflysFireWings",
        "bundleType": "Clothing"
    },
    "Headless Horseman Statue": {
        "linked_name": "Headless Horseman Statue (Bundle)|Headless Horseman Statue",
        "contentsString": "{{name|Headless Horseman Statue}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_SleepyHollowStatue",
        "bundleType": "Furniture"
    },
    "Villain Motifs Bundle": {
        "linked_name": "Villain Motifs Bundle",
        "contentsString": "{{name|Cheshire_Cat_Motif|link=Motifs#Alice in Wonderland{{!}}Design Motif}}\n{{name|Magic Mirror Face Motif|link=Motifs#Snow White{{!}}Design Motif}}\n{{name|Poison Apple Color Motif|link=Motifs#Snow White{{!}}Design Motif}}\n{{name|Hades Portrait Motif|link=Motifs#Hercules{{!}}Design Motif}}\n{{name|Night on Bald Mountain Motif|link=Motifs#Fantasia{{!}}Design Motif}}",
        "priceString": "{{price|500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_VillainsSPMotifs1",
        "bundleType": "Motif"
    },
    "Tea Party Monkey": {
        "linked_name": "Tea Party Monkey (Bundle)|Tea Party Monkey",
        "contentsString": "{{name|Tea Party Monkey}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_MadHatterInspiredMonkey",
        "bundleType": "Companion"
    },
    "Magic Kingdom Circus Daisy": {
        "linked_name": "Magic Kingdom Circus Daisy (Bundle)|Magic Kingdom Circus Daisy",
        "contentsString": "{{name|Magic Kingdom Circus Daisy}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_MagicKingdomCircusDaisy",
        "bundleType": "Character Style"
    },
    "Monsters, Inc. Door Outfit": {
        "linked_name": "Monsters, Inc. Door Outfit",
        "contentsString": "{{name|Monsters, Inc. Door Ensemble}}\n{{name|Celia's Hair}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_MonstersOveralls",
        "bundleType": "Clothing"
    },
    "Witchy Kitty": {
        "linked_name": "Witchy Kitty (Bundle)|Witchy Kitty",
        "contentsString": "{{name|Witchy Kitty}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_CatWitch",
        "bundleType": "Companion"
    },
    "Yzma Costume Dress": {
        "linked_name": "Yzma Costume Dress (Bundle)|Yzma Costume Dress",
        "contentsString": "{{name|Yzma Costume Dress}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_YzmaOutfit",
        "bundleType": "Clothing"
    },
    "Potion Brewer's House": {
        "linked_name": "Potion Brewer's House (Bundle)|Potion Brewer's House",
        "contentsString": "{{name|Potion Brewer's House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HouseSkin_PotionStore",
        "bundleType": "House"
    },
    "Witchy Potion Stand": {
        "linked_name": "Witchy Potion Stand (Bundle)|Witchy Potion Stand",
        "contentsString": "{{name|Witchy Potion Stand}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Item_PotionStand",
        "bundleType": "Furniture"
    },
    "Haunted Holiday Motifs Bundle": {
        "linked_name": "Haunted Holiday Motifs Bundle",
        "contentsString": "{{name|Hocus_Pocus_Vacuum_Cleaner_Motif|link=Motifs#Hocus_Pocus{{!}}Design Motif}}\n{{name|Hocus_Pocus_Broomstick_Motif|link=Motifs#Hocus_Pocus{{!}}Design Motif}}\n{{name|Hocus_Pocus_Mop_Motif|link=Motifs#Hocus_Pocus{{!}}Design Motif}}\n{{name|Cardinal_Compass_Motif|link=Motifs#Other{{!}}Design Motif}}\n{{name|Skeleton_Key_Motif|link=Motifs#Pirates_of_the_Caribbean{{!}}Design Motif}}\n{{name|Halloween_Town_Toys_Motif|link=Motifs#Tim_Burton's_The_Nightmare_Before_Christmas{{!}}Design Motif}}\n{{name|NBC_Hill_Motif|link=Motifs#Tim_Burton's_The_Nightmare_Before_Christmas{{!}}Design Motif}}\n{{name|Madame_Leota_Motif|link=Motifs#Disney{{!}}Design Motif}}",
        "priceString": "{{price|800|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_HauntedHolidaySPMotifs1",
        "bundleType": "Motif"
    },
    "Halloween Town Hall House": {
        "linked_name": "Halloween Town Hall House (Bundle)|Halloween Town Hall House",
        "contentsString": "{{name|Halloween Town Hall House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HouseSkin_NBCTownHall",
        "bundleType": "House"
    },
    "Holiday Forest Trees": {
        "linked_name": "Holiday Forest Trees",
        "contentsString": "{{name|Holiday Forest Christmas Tree}}\n{{name|Holiday Forest Clover Tree}}\n{{name|Holiday Forest Easter Tree}}\n{{name|Holiday Forest Firecracker Tree}}\n{{name|Holiday Forest Heart Tree}}\n{{name|Holiday Forest Turkey Tree}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_NBCTrees",
        "bundleType": "Furniture"
    },
    "Halloween Castle": {
        "linked_name": "Halloween Castle (Bundle)|Halloween Castle",
        "contentsString": "{{name|Halloween Castle}}",
        "priceString": "{{price|3500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "HeroItem_ForgottenCastleSkin",
        "bundleType": "Building"
    },
    "Halloween Celebration Set": {
        "linked_name": "Halloween Celebration Set",
        "contentsString": "{{name|Haunted Pipe Organ}}\n{{name|Haunting Wallpaper}}\n{{name|Orange Trick-or-Treater's Bounty}}\n{{name|Mickey Mouse Jack-O'—Lantern}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "Bundle_HalloweenCelebrationSet",
        "bundleType": "Furniture"
    },
    "Pumpkin King Costume": {
        "linked_name": "Pumpkin King Costume (Bundle)|Pumpkin King Costume",
        "contentsString": "{{name|Pumpkin King Costume}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Item_PumpkingKingCostume",
        "bundleType": "Clothing"
    },
    "Skeletal Tool Set": {
        "linked_name": "Skeletal Tool Set",
        "contentsString": "{{name|Skeletal Shovel}}\n{{name|Skeletal Pickaxe}}\n{{name|Skeletal Fishing Rod}}\n{{name|Skeletal Watering Can}}\n{{name|Skelephone}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "Bundle_SkeletalTools",
        "bundleType": "Tool Style"
    },
    "Villain's Decoration Set": {
        "linked_name": "Villain's Decoration Set",
        "contentsString": "{{name|\"Late Riser\" Bench}}\n{{name|Maleficent's Throne}}\n{{name|Magic Mirror (On the Wall)}}\n{{name|Well of Souls}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_VillainDecorationSet",
        "bundleType": "Furniture"
    },
    "Halloween Park Gate": {
        "linked_name": "Halloween Park Gate (Bundle)|Halloween Park Gate",
        "contentsString": "{{name|Halloween Park Gate}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_HalloweenParkEntry",
        "bundleType": "Furniture"
    },
    "Autumnal Clock Tower": {
        "linked_name": "Autumnal Clock Tower (Bundle)|Autumnal Clock Tower",
        "contentsString": "{{name|Autumnal Clock Tower}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_AutumnalBindLandmark",
        "bundleType": "Furniture"
    },
    "Pixar Fest Motifs Bundle 2": {
        "linked_name": "Pixar Fest Motifs Bundle 2",
        "contentsString": "{{name|Incredibles_Emblem_Motif|link=Motifs#The Incredibles{{!}}Design Motif}}\n{{name|Edna_E_Mode_Emblem_Motif|link=Motifs#The Incredibles{{!}}Design Motif}}\n{{name|Jack_Jack_Emblem_Motif|link=Motifs#The Incredibles{{!}}Design Motif}}\n{{name|Lightning_McQueen_Decal_Motif|link=Motifs#Cars{{!}}Design Motif}}\n{{name|Piston_Cup_Emblem_Motif|link=Motifs#Cars{{!}}Design Motif}}\n{{name|Lightning_McQueen_Pose_Motif|link=Motifs#Cars{{!}}Design Motif}}",
        "priceString": "{{price|600|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_MotifPixarFest2",
        "bundleType": "Motif"
    },
    "Harvest Celebration Bundle": {
        "linked_name": "Harvest Celebration Bundle",
        "contentsString": "{{name|Autumnal Carriage}}\n{{name|Wagon of Autumn Leaves}}\n{{name|Harvest Celebration Table}}\n{{name|Harvest Celebration Centerpiece}}\n{{name|Autumnal Chair}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "Bundle_AutumnalBundle",
        "bundleType": "Furniture"
    },
    "Mickey Mouse Pumpkin Topiary": {
        "linked_name": "Mickey Mouse Pumpkin Topiary (Bundle)|Mickey Mouse Pumpkin Topiary",
        "contentsString": "{{name|Mickey Mouse Pumpkin Topiary}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Item_PumpkinMickey",
        "bundleType": "Furniture"
    },
    "Cozy Halloween Cottage": {
        "linked_name": "Cozy Halloween Cottage (Bundle)|Cozy Halloween Cottage",
        "contentsString": "{{name|Cozy Halloween Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HouseSkin_CozyHalloweenHouse",
        "bundleType": "House"
    },
    "Emotional Memory Bundle": {
        "linked_name": "Emotional Memory Bundle",
        "contentsString": "{{name|Emotional Wishing Well}}\n{{name|Red Decorative Memory}}\n{{name|Yellow Decorative Memory}}\n{{name|Green Decorative Memory}}\n{{name|Purple Decorative Memory}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_InsideOutWellSkinMemories",
        "bundleType": "Well/Furniture"
    },
    "Luminous Butterfly Gazebo": {
        "linked_name": "Luminous Butterfly Gazebo (Bundle)|Luminous Butterfly Gazebo",
        "contentsString": "{{name|Luminous Butterfly Gazebo}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_ButterflyGazebo",
        "bundleType": "Furniture"
    },
    "Gothic Halloween Set": {
        "linked_name": "Gothic Halloween Set",
        "contentsString": "{{name|Floating Candles}}\n{{name|Halloween Bench}}\n{{name|Gothic Castle Window}}\n{{name|Web-Snared Tree}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_GothicHalloweenSet",
        "bundleType": "Furniture"
    },
    "Pirate Parrot": {
        "linked_name": "Pirate Parrot (Bundle)|Pirate Parrot",
        "contentsString": "{{name|Pirate Parrot}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_PirateParrot",
        "bundleType": "Companion"
    },
    "Witching Owl": {
        "linked_name": "Witching Owl (Bundle)|Witching Owl",
        "contentsString": "{{name|Witching Owl}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_WitchyOwl",
        "bundleType": "Companion"
    },
    "Mossy Castle": {
        "linked_name": "Mossy Castle (Bundle)|Mossy Castle",
        "contentsString": "{{name|Mossy Castle}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HouseSkin_MossCastle",
        "bundleType": "House"
    },
    "Web Witch Outfit": {
        "linked_name": "Web Witch Outfit",
        "contentsString": "{{name|Web Witch Dress}}\n{{name|Web Witch Hat}}\n{{name|Web Witch Boots}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_SpiderInspiredOutfit",
        "bundleType": "Clothing"
    },
    "Raven Wings": {
        "linked_name": "Raven Wings (Bundle)|Raven Wings",
        "contentsString": "{{name|Raven Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_RavenWings",
        "bundleType": "Clothing"
    },
    "Maple Key Wings": {
        "linked_name": "Maple Key Wings (Bundle)|Maple Key Wings",
        "contentsString": "{{name|Maple Key Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_PineWings",
        "bundleType": "Clothing"
    },
    "Black Sequin Dress": {
        "linked_name": "Black Sequin Dress (Bundle)|Black Sequin Dress",
        "contentsString": "{{name|Black Sequin Dress}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_BlackDressOutfit",
        "bundleType": "Clothing"
    },
    "Corona Castle": {
        "linked_name": "Corona Castle (Bundle)|Corona Castle",
        "contentsString": "{{name|Corona Castle}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HouseSkin_CoronaCastle",
        "bundleType": "House"
    },
    "Corona Fountain": {
        "linked_name": "Corona Fountain (Bundle)|Corona Fountain",
        "contentsString": "{{name|Corona Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Item_CoronaFountain",
        "bundleType": "Furniture"
    },
    "Bright Ambition Tiana": {
        "linked_name": "Bright Ambition Tiana (Bundle)|Bright Ambition Tiana",
        "contentsString": "{{name|Bright Ambition Tiana}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_TianaRestaurantOutfit",
        "bundleType": "Character Style"
    },
    "Pixar Fest Motifs Bundle 1": {
        "linked_name": "Pixar Fest Motifs Bundle 1",
        "contentsString": "{{name|Coco_Guitar_Colors_Motif|link=Motifs#Coco{{!}}Design Motif}}\n{{name|Coco_Banner_Motif|link=Motifs#Coco{{!}}Design Motif}}\n{{name|Miguel_with_Face_Paint_Motif|link=Motifs#Coco{{!}}Design Motif}}\n{{name|Up! House Motif|link=Motifs#Up{{!}}Design Motif}}\n{{name|Grape_Soda_Pin_Motif|link=Motifs#Up{{!}}Design Motif}}\n{{name|SOX_Portrait_Motif|link=Motifs#Lighyear{{!}}Design Motif}}\n{{name|Space_Ranger_Emblem_Motif|link=Motifs#Lighyear{{!}}Design Motif}}",
        "priceString": "{{price|700|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Bundle_MotifPixarFest1",
        "bundleType": "Motif"
    },
    "Inside Out Emotional Whirlwind": {
        "linked_name": "Inside Out Emotional Whirlwind (Bundle)|Inside Out Emotional Whirlwind",
        "contentsString": "{{name|Inside Out Emotional Whirlwind}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_InsideOutEmotionalWhirlwind",
        "bundleType": "Furniture"
    },
    "Bing Bong Candy Stand": {
        "linked_name": "Bing Bong Candy Stand (Bundle)|Bing Bong Candy Stand",
        "contentsString": "{{name|Bing Bong Candy Stand}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Item_BingBongCandyStand",
        "bundleType": "Furniture"
    },
    "Cute Pine-Cone House": {
        "linked_name": "Cute Pine-Cone House (Bundle)|Cute Pine-Cone House",
        "contentsString": "{{name|Cute Pine-Cone House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HouseSkin_PineBirdHouse",
        "bundleType": "House"
    },
    "Bread and Butterfly": {
        "linked_name": "Bread and Butterfly (Bundle)|Bread and Butterfly",
        "contentsString": "{{name|Bread and Butterfly}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HeroItem_FlyingToastBird",
        "bundleType": "Companion"
    },
    "Planted Train-Car House": {
        "linked_name": "Planted Train-Car House (Bundle)|Planted Train-Car House",
        "contentsString": "{{name|Planted Train-Car House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "HouseSkin_TrainVegetationHouse",
        "bundleType": "House"
    },
    "Hopps Family Farm Stand": {
        "linked_name": "Hopps Family Farm Stand (Bundle)|Hopps Family Farm Stand",
        "contentsString": "{{name|Hopps Family Farm Stand}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.18",
        "protoDbName": "Item_HoppsFamilyFarmStand",
        "bundleType": "Furniture"
    },
    "Goofy's Moana Stall": {
        "linked_name": "Goofy's Moana Stall (Bundle)|Goofy's Moana Stall",
        "contentsString": "{{name|Goofy's Moana Stall}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_MoanaInspiredStall",
        "bundleType": "Stall"
    },
    "Toontown Fire Station": {
        "linked_name": "Toontown Fire Station (Bundle)|Toontown Fire Station",
        "contentsString": "{{name|Toontown Fire Station}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17.12/1.18",
        "protoDbName": "HeroItem_ToontownFireStation",
        "bundleType": "Furniture"
    },
    "Bayou Cottage": {
        "linked_name": "Bayou Cottage (Bundle)|Bayou Cottage",
        "contentsString": "{{name|Bayou Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HouseSkin_BayouCottageCoreHouse",
        "bundleType": "House"
    },
    "An Extremely Goofy Conductor": {
        "linked_name": "An Extremely Goofy Conductor (Bundle)|An Extremely Goofy Conductor",
        "contentsString": "{{name|An Extremely Goofy Conductor}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_GoofyConductor",
        "bundleType": "Character Style"
    },
    "Ranger Donald": {
        "linked_name": "Ranger Donald (Bundle)|Ranger Donald",
        "contentsString": "{{name|Ranger Donald}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_RangerDonald",
        "bundleType": "Character Style"
    },
    "Green Hanfu Mulan": {
        "linked_name": "Green Hanfu Mulan (Bundle)|Green Hanfu Mulan",
        "contentsString": "{{name|Green Hanfu Mulan}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HeroItem_GreenHanfuMulan",
        "bundleType": "Character Style"
    },
    "Harmony Exterior Bundle": {
        "linked_name": "Harmony Exterior Bundle",
        "contentsString": "{{name|Floating Paper Lanterns}}\n{{name|Airborne Kites}}\n{{name|Stone Lantern}}\n{{name|Sunburst Junk Boat}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_MulanExterior",
        "bundleType": "Furniture"
    },
    "Reflection of China Bundle": {
        "linked_name": "Reflection of China Bundle",
        "contentsString": "{{name|Reflection of China}}\n{{name|Reflection of China Pillar}}\n{{name|Red and Gold Pillar}}\n{{name|Reflection of China Texture}}\n{{name|Reflection of China Wallpaper}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_ReflectionofChina",
        "bundleType": "House/Furniture"
    },
    "Mulan-Inspired Chinese Garden": {
        "linked_name": "Mulan-Inspired Chinese Garden",
        "contentsString": "{{name|Magnolia Garden Gate}}\n{{name|Magnolia Garden Wall}}\n{{name|Magnolia Garden Corner}}\n{{name|Magnolia Garden End Piece}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_MulanGarden",
        "bundleType": "Furniture"
    },
    "Dancing Lion Fox": {
        "linked_name": "Dancing Lion Fox (Bundle)|Dancing Lion Fox",
        "contentsString": "{{name|Dancing Lion Fox}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_LionPet",
        "bundleType": "Companion"
    },
    "Mulan's Inspired Tools": {
        "linked_name": "Mulan's Inspired Tools",
        "contentsString": "{{name|Mulan Pickaxe}}\n{{name|Mulan Watering Can}}\n{{name|Mulan Hourglass}}\n{{name|Mulan Shovel}}\n{{name|Mulan Fishing Rod}}\n{{name|Mulan Phone}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_MulanToolSet",
        "bundleType": "Tool Style"
    },
    "Wandering Moon": {
        "linked_name": "Wandering Moon (Bundle)|Wandering Moon",
        "contentsString": "{{name|Wandering Moon}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HouseSkin_WanderingMoon",
        "bundleType": "House"
    },
    "Mulan's Kitchen Set": {
        "linked_name": "Mulan's Kitchen Set",
        "contentsString": "{{name|Red Kitchen Sink}}\n{{name|Red Kitchen Shelf}}\n{{name|Red Kitchen Counter}}\n{{name|Red Kitchen Corner}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_MulanKitchenSet",
        "bundleType": "Furniture"
    },
    "Turning Red Temple": {
        "linked_name": "Turning Red Temple (Bundle)|Turning Red Temple",
        "contentsString": "{{name|Turning Red Temple}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HouseSkin_TurningRedTemple",
        "bundleType": "House"
    },
    "Cri-Kee Costume Onesie": {
        "linked_name": "Cri-Kee Costume Onesie (Bundle)|Cri-Kee Costume Onesie",
        "contentsString": "{{name|Cri-Kee Costume Onesie}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HeroItem_CricketOnesie",
        "bundleType": "Clothing"
    },
    "Disneyland 70th Anniversary Banner": {
        "linked_name": "Disneyland 70th Anniversary Banner (Bundle)|Disneyland 70th Anniversary Banner",
        "contentsString": "{{name|Disneyland 70th Anniversary Banner}}",
        "priceString": "{{price|0|moonstone}}",
        "versionAdded": "1.17.12",
        "protoDbName": "Item_Disney70thPennant",
        "bundleType": "Furniture"
    },
    "Bayou Decoration Bundle": {
        "linked_name": "Bayou Decoration Bundle",
        "contentsString": "{{name|Tiana's Water Tower}}\n{{name|Bayou Fireflies}}\n{{name|Orange Water Lily}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_BayouDecoBundle",
        "bundleType": "Furniture"
    },
    "Coffee Shop House Bundle": {
        "linked_name": "Coffee Shop House Bundle",
        "contentsString": "{{name|Coffee Shop House}}\n{{name|Wooden-Slat Cafe Chair}}\n{{name|Wooden-Slat Cafe Table}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HouseSkin_CoffeeShopHouse",
        "bundleType": "House/Furniture"
    },
    "Blooming Flower Shop": {
        "linked_name": "Blooming Flower Shop (Bundle)|Blooming Flower Shop",
        "contentsString": "{{name|Blooming Flower Shop}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HouseSkin_FlowerShop",
        "bundleType": "House"
    },
    "Lovebird Duo": {
        "linked_name": "Lovebird Duo",
        "contentsString": "{{name|Pink Lovebird}}\n{{name|Green Lovebird}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_LovebirdDuo",
        "bundleType": "Companion"
    },
    "French Bakery House": {
        "linked_name": "French Bakery House (Bundle)|French Bakery House",
        "contentsString": "{{name|French Bakery House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HouseSkin_Bakery",
        "bundleType": "House"
    },
    "Cactus Mickey Floral Topiary": {
        "linked_name": "Cactus Mickey Floral Topiary (Bundle)|Cactus Mickey Floral Topiary",
        "contentsString": "{{name|Cactus Mickey Floral Topiary}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Item_CactusMickeyTopiary",
        "bundleType": "Furniture"
    },
    "Sleeping Beauty Bundle": {
        "linked_name": "'''Sleeping Beauty Bundle'''",
        "contentsString": "{{name|Painted Rose Cottage}}\n{{name|Dark Thorn Cottage}}\n{{name|Steadfast Heart Gown}}\n{{name|Steadfast Heart Cloak}}\n{{name|Briar Rose Helmet}}\n{{name|Steadfast Heart Boots}}\n{{name|Twisted Thorn Gown}}\n{{name|Jagged Mantle Cloak}}\n{{name|Mistress of All Evil Staff}}\n{{name|Twisted Thorn Boots}}",
        "priceString": "{{price|8000|moonstone}} (20% off)",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_AuroraAndMaleficent",
        "bundleType": "Mega Bundle"
    },
    "Painted Rose Cottage": {
        "linked_name": "Painted Rose Cottage (Bundle)|Painted Rose Cottage",
        "contentsString": "{{name|Painted Rose Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HouseSkin_BenevolentHouse",
        "bundleType": "House"
    },
    "Dark Thorn Cottage": {
        "linked_name": "Dark Thorn Cottage (Bundle)|Dark Thorn Cottage",
        "contentsString": "{{name|Dark Thorn Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HouseSkin_MaleficentHouse",
        "bundleType": "House"
    },
    "Disney Parks Entry": {
        "linked_name": "Disney Parks Entry (Bundle)|Disney Parks Entry",
        "contentsString": "{{name|Disney Parks Entry}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_ParkEntry",
        "bundleType": "Furniture"
    },
    "Dumbo the Flying Elephant": {
        "linked_name": "Dumbo the Flying Elephant (Bundle)|Dumbo the Flying Elephant",
        "contentsString": "{{name|Dumbo the Flying Elephant}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_DumboTheFlyingElephant",
        "bundleType": "Furniture"
    },
    "The Tower of Terror": {
        "linked_name": "The Tower of Terror (Bundle)|The Tower of Terror",
        "contentsString": "{{name|The Tower of Terror}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "HeroItem_TowerofTerror",
        "bundleType": "Furniture"
    },
    "Mad Tea Party": {
        "linked_name": "Mad Tea Party (Bundle)|Mad Tea Party",
        "contentsString": "{{name|Mad Tea Party}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_MadTeaParty",
        "bundleType": "Furniture"
    },
    "Ranger Set": {
        "linked_name": "Ranger Set",
        "contentsString": "{{name|XL—15 Spaceship Model}}\n{{name|Space Ranger Suit Display}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_RangerSet",
        "bundleType": "Furniture"
    },
    "Never Land Wishing Well": {
        "linked_name": "Never Land Wishing Well (Bundle)|Never Land Wishing Well",
        "contentsString": "{{name|Never Land Wishing Well}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HeroItem_NeverlandWishingWell",
        "bundleType": "Well"
    },
    "Under the Sea Music Set": {
        "linked_name": "Under the Sea Music Set",
        "contentsString": "{{name|Under the Sea Harp}}\n{{name|Under the Sea Pipe Organ}}\n{{name|Under the Sea Drums}}\n{{name|Under the Sea Tuba}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Bundle_UnderTheSeaOrchestra",
        "bundleType": "Furniture"
    },
    "Milo Costume Outfit": {
        "linked_name": "Milo Costume Outfit (Bundle)|Milo Costume Outfit",
        "contentsString": "{{name|Milo Costume Outfit}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_MiloOutfit",
        "bundleType": "Clothing"
    },
    "Vintage Camper Houses": {
        "linked_name": "Vintage Camper Houses",
        "contentsString": "{{name|Vintage Seafoam Camper House}}\n{{name|Vintage Camper House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HouseSkin_VintageCampingCars",
        "bundleType": "House"
    },
    "Electrical Parade Tools": {
        "linked_name": "Electrical Parade Tools",
        "contentsString": "{{name|Electrical Parade Pickaxe}}\n{{name|Electrical Parade Phone}}\n{{name|Electrical Parade Watering Can}}\n{{name|Electrical Parade Shovel}}\n{{name|Electrical Parade Fishing Rod}}\n{{name|Electrical Parade Hourglass}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_ElectricalParadeTools",
        "bundleType": "Tool Style"
    },
    "Enchanted Tiki Room": {
        "linked_name": "Enchanted Tiki Room (Bundle)|Enchanted Tiki Room",
        "contentsString": "{{name|Enchanted Tiki Room}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "HouseSkin_EnchantedTikiRoom",
        "bundleType": "House"
    },
    "Island Refreshment Stand": {
        "linked_name": "Island Refreshment Stand (Bundle)|Island Refreshment Stand",
        "contentsString": "{{name|Island Refreshment Stand}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "Item_IslandInspiredStand",
        "bundleType": "Furniture"
    },
    "Dinah Bundle": {
        "linked_name": "Dinah Bundle",
        "contentsString": "{{name|Dinah}}\n{{name|Dinah Companion House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_Dinah",
        "bundleType": "Companion/Furniture"
    },
    "\"it's a small world\" Pillar": {
        "linked_name": "\"it's a small world\" Pillar (Bundle)|\"it's a small world\" Pillar",
        "contentsString": "{{name|\"it's a small world\" Pillar|4}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Item_ItsASmallWorldPillar",
        "bundleType": "Furniture"
    },
    "Wonderland Wishing Well": {
        "linked_name": "Wonderland Wishing Well (Bundle)|Wonderland Wishing Well",
        "contentsString": "{{name|Wonderland Wishing Well}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_AliceWishingWellSkin",
        "bundleType": "Well"
    },
    "Alien Swirling Saucers": {
        "linked_name": "Alien Swirling Saucers (Bundle)|Alien Swirling Saucers",
        "contentsString": "{{name|Alien Swirling Saucers}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_AlienSwirlingSaucers",
        "bundleType": "Furniture"
    },
    "Spring Festival Rapunzel": {
        "linked_name": "Spring Festival Rapunzel (Bundle)|Spring Festival Rapunzel",
        "contentsString": "{{name|Spring Festival Rapunzel}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_SpringRapunzel",
        "bundleType": "Character Style"
    },
    "Carl's House": {
        "linked_name": "Carl's House (Bundle)|Carl's House",
        "contentsString": "{{name|Carl's House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HouseSkin_CarlHouse",
        "bundleType": "House"
    },
    "Megara Costume Dress": {
        "linked_name": "Megara Costume Dress (Bundle)|Megara Costume Dress",
        "contentsString": "{{name|Megara Costume Dress}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_MegaraDress",
        "bundleType": "Clothing"
    },
    "Stealthy Space Ranger": {
        "linked_name": "Stealthy Space Ranger (Bundle)|Stealthy Space Ranger",
        "contentsString": "{{name|Stealthy Space Ranger}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_StealthySpaceRanger",
        "bundleType": "Character Style"
    },
    "Padmé Amidala's Lakeside Ensemble": {
        "linked_name": "Padmé Amidala's Lakeside Ensemble",
        "contentsString": "{{name|Padmé Amidala's Lakeside Gown}}\n{{name|Padmé Amidala's Lakeside Hairstyle}}\n{{name|Padmé Amidala's Lakeside Shoes}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_PadmeAmidalaLakesideOutfit",
        "bundleType": "Clothing"
    },
    "Anakin Skywalker's Jedi Ensemble": {
        "linked_name": "Anakin Skywalker's Jedi Ensemble",
        "contentsString": "{{name|Anakin Skywalker's Jedi Robe}}\n{{name|Anakin Skywalker's Jedi Cloak}}\n{{name|Anakin Skywalker's Jedi Padawan Hairstyle}}\n{{name|Anakin Skywalker's Jedi Boots}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_AnakinLakesideOutfit",
        "bundleType": "Clothing"
    },
    "Anakin Skywalker's Lightsaber": {
        "linked_name": "Anakin Skywalker's Lightsaber (Bundle)|Anakin Skywalker's Lightsaber",
        "contentsString": "{{name|Anakin Skywalker's Lightsaber}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_AnakinsLightsaber",
        "bundleType": "Accessory"
    },
    "R2-D2": {
        "linked_name": "R2-D2 (Bundle)|R2-D2",
        "contentsString": "{{name|R2—D2}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "HeroItem_R2D2",
        "bundleType": "Companion"
    },
    "Naboo Villa Bundle": {
        "linked_name": "Naboo Villa Bundle",
        "contentsString": "{{name|Naboo Villa}}\n{{name|Naboo Villa Wallpaper}}\n{{name|Naboo Villa Texture}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_NabooHouse",
        "bundleType": "House"
    },
    "Naboo Interior Furniture Bundle": {
        "linked_name": "Naboo Interior Furniture Bundle",
        "contentsString": "{{name|Naboo Holotable}}\n{{name|Naboo Bed}}\n{{name|Naboo Fireplace}}\n{{name|Naboo Table}}\n{{name|Naboo Chair}}\n{{name|Naboo Sofa}}\n{{name|Naboo Windows}}\n{{name|Naboo Decor}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.16",
        "protoDbName": "Bundle_NabooInteriorSet",
        "bundleType": "Furniture"
    },
    "Honey Wand": {
        "linked_name": "Honey Wand (Bundle)|Honey Wand",
        "contentsString": "{{name|Honey Wand}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Item_HonneyDipper",
        "bundleType": "Accessory"
    },
    "Spring Hunny Bundle": {
        "linked_name": "Spring Hunny Bundle",
        "contentsString": "{{name|Eeyore Spring Table}}\n{{name|Spring Egg Chest}}\n{{name|Spring Celebration Tree}}\n{{name|Spring Hunny Pot}}\n{{name|Spring Ducky Bucket}}\n{{name|Spring Hunny Egg}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_RabbitEasterHunny",
        "bundleType": "Furniture"
    },
    "Hoppy Spring Topiary": {
        "linked_name": "Hoppy Spring Topiary (Bundle)|Hoppy Spring Topiary",
        "contentsString": "{{name|Hoppy Spring Topiary}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Item_EasterEggTopiary",
        "bundleType": "Furniture"
    },
    "Eeyore Bunny Ears and Tail": {
        "linked_name": "Eeyore Bunny Ears and Tail",
        "contentsString": "{{name|Eeyore Bunny Ears}}\n{{name|Eeyore Bunny Tail}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_EeyoreEarsTail",
        "bundleType": "Clothing"
    },
    "Water-Spitting Camel": {
        "linked_name": "Water-Spitting Camel (Bundle)|Water-Spitting Camel",
        "contentsString": "{{name|Water-Spitting Camel}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Item_WaterSpittingCamel",
        "bundleType": "Furniture"
    },
    "Tart Turtle": {
        "linked_name": "Tart Turtle (Bundle)|Tart Turtle",
        "contentsString": "{{name|Tart Turtle}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "HeroItem_CitrusTurtle",
        "bundleType": "Companion"
    },
    "Monsters University Varsity Sulley": {
        "linked_name": "Monsters University Varsity Sulley (Bundle)|Monsters University Varsity Sulley",
        "contentsString": "{{name|Monsters University Varsity Sulley}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_VarsitySulley",
        "bundleType": "Character Style"
    },
    "Bunny Costume Plushie": {
        "linked_name": "Bunny Costume Plushie (Bundle)|Bunny Costume Plushie",
        "contentsString": "{{name|Bunny Costume Plushie}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_EasterDisneyPlush",
        "bundleType": "Accessory"
    },
    "Magic Carpets of Aladdin": {
        "linked_name": "Magic Carpets of Aladdin (Bundle)|Magic Carpets of Aladdin",
        "contentsString": "{{name|Magic Carpets of Aladdin}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_MagicCarpetsOfAladdin",
        "bundleType": "Furniture"
    },
    "Boo Onesie": {
        "linked_name": "Boo Onesie (Bundle)|Boo Onesie",
        "contentsString": "{{name|Boo Onesie}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Item_BooOnesie",
        "bundleType": "Clothing"
    },
    "Moroccan Pavilion Fountain": {
        "linked_name": "Moroccan Pavilion Fountain (Bundle)|Moroccan Pavilion Fountain",
        "contentsString": "{{name|Moroccan Pavilion Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "HeroItem_EpcotMorrocoFountain",
        "bundleType": "Furniture"
    },
    "Trader Sam's Shop": {
        "linked_name": "Trader Sam's Shop (Bundle)|Trader Sam's Shop",
        "contentsString": "{{name|Trader Sam's Shop}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Item_TradersSamShop",
        "bundleType": "Furniture"
    },
    "Night Thorn Arcade Set": {
        "linked_name": "Night Thorn Arcade Set",
        "contentsString": "{{name|Night Thorn Bowling Lane}}\n{{name|Night Thorn Gashapon Machine}}\n{{name|Night Thorn Pinball Machine}}\n{{name|Night Thorn Pool Table}}\n{{name|Night Thorn Cue Holder}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_ArcadeBundle",
        "bundleType": "Furniture"
    },
    "Sweet Bee Bundle": {
        "linked_name": "Sweet Bee Bundle",
        "contentsString": "{{name|Beehive Box}}\n{{name|Sweet Bee Ensemble}}\n{{name|Sweet Bee Antennae}}\n{{name|Sweet Bee Shoes}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_HoneyBee",
        "bundleType": "Clothing/Furniture"
    },
    "Winnie the Pooh Honey Set": {
        "linked_name": "Winnie the Pooh Honey Set|Winnie Honey Set",
        "contentsString": "{{name|Winnie the Pooh Tree}}\n{{name|Pile o' Honey Pots}}\n{{name|Beehive Lamps}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_WinnieHoneySet",
        "bundleType": "Furniture"
    },
    "Golden Beehive House Bundle": {
        "linked_name": "Golden Beehive House Bundle",
        "contentsString": "{{name|Golden Beehive House}}\n{{name|Herringbone Honey}}\n{{name|Honeycomb Wallpaper}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.15",
        "protoDbName": "Bundle_HoneyHouse",
        "bundleType": "House/Furniture"
    },
    "Incredibles Outfit": {
        "linked_name": "Incredibles Outfit",
        "contentsString": "{{name|Low-Boot Incredibles Suit}} ({{price|600|moonstone}})\n{{name|High-Boot Incredibles Suit}} ({{price|600|moonstone}})\n{{name|Incredibles Super-Mask}} ({{price|300|moonstone}})",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_IncrediblesOutfit",
        "bundleType": "Clothing"
    },
    "Parade Lion Costume": {
        "linked_name": "Parade Lion Costume (Bundle)|Parade Lion Costume",
        "contentsString": "{{name|Parade Lion Costume}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "HeroItem_LionInspiredOutfit",
        "bundleType": "Clothing"
    },
    "CenTOONial Park Fountain": {
        "linked_name": "CenTOONial Park Fountain (Bundle)|CenTOONial Park Fountain",
        "contentsString": "{{name|CenTOONial Park Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Item_ToontownFountain",
        "bundleType": "Furniture"
    },
    "Art Deco Club Set": {
        "linked_name": "Art Deco Club Set",
        "contentsString": "{{name|Art Deco Coffee Table}} ({{price|600|moonstone}})<br>\n{{name|Art Deco Princess Armchair}} ({{price|600|moonstone}})",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12/1.14.3",
        "protoDbName": "Bundle_ArtDecoCoffeeBedroom",
        "bundleType": "Furniture"
    },
    "Art Deco Club Set (2)": {
        "linked_name": "Art Deco Club Set (2)|Art Deco Club Set",
        "contentsString": "{{name|Art Deco Holo Bedside Table}}\n{{name|Art Deco Club Chair}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_ArtDecoCoffeeLifestyle",
        "bundleType": "Furniture"
    },
    "Pirate's Treasure Set": {
        "linked_name": "Pirate's Treasure Set",
        "contentsString": "{{name|Scalawag's Dinghy}}\n{{name|Pirate's Treasure Trove}}\n{{name|Cortés Chest}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_PiratesTreasureSet",
        "bundleType": "Furniture"
    },
    "\"it's a small world\" Rainbow Pillar": {
        "linked_name": "\"it's a small world\" Rainbow Pillar (Bundle)|\"it's a small world\" Rainbow Pillar",
        "contentsString": "{{name|\"it's a small world\" Rainbow Pillar}}",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Item_SmallWorldPillar",
        "bundleType": "Furniture"
    },
    "Pink Castle": {
        "linked_name": "Pink Castle (Bundle)|Pink Castle",
        "contentsString": "{{name|Pink Castle}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HouseSkin_PinkCastle",
        "bundleType": "House"
    },
    "Winter's Wonder Ariel": {
        "linked_name": "Winter's Wonder Ariel (Bundle)|Winter's Wonder Ariel",
        "contentsString": "{{name|Winter's Wonder Ariel}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_WintersWonderAriel",
        "bundleType": "Character Style"
    },
    "Turning Red Trio": {
        "linked_name": "Turning Red Trio",
        "contentsString": "{{name|Panda Carving Wooden Partition}}\n{{name|Blossoming Cherry Tree}}\n{{name|Red Panda Paper Lantern}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "Bundle_TurningRed",
        "bundleType": "Furniture"
    },
    "Desert Palace": {
        "linked_name": "Desert Palace (Bundle)|Desert Palace",
        "contentsString": "{{name|Desert Palace}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HouseSkin_DesertPalace",
        "bundleType": "House"
    },
    "Scholarly Baby Dragon": {
        "linked_name": "Scholarly Baby Dragon (Bundle)|Scholarly Baby Dragon",
        "contentsString": "{{name|Scholarly Baby Dragon}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.14.1",
        "protoDbName": "HeroItem_ScholarDragon",
        "bundleType": "Companion"
    },
    "Raya Ensemble": {
        "linked_name": "Raya Ensemble",
        "contentsString": "{{name|Raya Costume}}\n{{name|Raya Hat}}\n{{name|Raya Hairstyle}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "Bundle_RayaOutfit",
        "bundleType": "Clothing"
    },
    "Cheshire Cat Tail": {
        "linked_name": "Cheshire Cat Tail (Bundle)|Cheshire Cat Tail",
        "contentsString": "{{name|Cheshire Cat Tail}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_CheshireCatTail",
        "bundleType": "Clothing"
    },
    "Turning Red Ski Outfit": {
        "linked_name": "Turning Red Ski Outfit",
        "contentsString": "{{name|Red Panda Ski Suit}}\n{{name|Red Panda Ski Pack}}\n{{name|Red Panda Ski Helmet}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Bundle_TurningRedSkiOutfit",
        "bundleType": "Clothing"
    },
    "Pretty Peacock Wings": {
        "linked_name": "Pretty Peacock Wings (Bundle)|Pretty Peacock Wings",
        "contentsString": "{{name|Pretty Peacock Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.14.3",
        "protoDbName": "HeroItem_PeacockWings",
        "bundleType": "Clothing"
    },
    "Pizza Planet": {
        "linked_name": "Pizza Planet (Bundle)|Pizza Planet",
        "contentsString": "{{name|Pizza Planet}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "HeroItem_PizzaPlanet",
        "bundleType": "Furniture"
    },
    "Cars Racing Set": {
        "linked_name": "Cars Racing Set",
        "contentsString": "{{name|Piston Cup}} ({{price|350|moonstone}})\n{{name|McQueen Racing Bed}} ({{price|650|moonstone}})",
        "priceString": "{{price|1000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "Bundle_CarsRacingSet",
        "bundleType": "Furniture"
    },
    "Trick-or-Treat Stitch": {
        "linked_name": "Trick-or-Treat Stitch (Bundle)|Trick-or-Treat Stitch",
        "contentsString": "{{name|Trick-or-Treat Stitch}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HeroItem_TrickorTreatStitch",
        "bundleType": "Character Style"
    },
    "Elasticycle": {
        "linked_name": "Elasticycle (Bundle)|Elasticycle",
        "contentsString": "{{name|Elasticycle}}",
        "priceString": "{{price|850|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Item_Elasticycle",
        "bundleType": "Furniture"
    },
    "Space-Time Set": {
        "linked_name": "Space-Time Set",
        "contentsString": "{{name|Green Military Jacket}}\n{{name|Space Ranger Watch}}",
        "priceString": "{{price|850|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_Colorful",
        "bundleType": "Clothing"
    },
    "Animal Kingdom Lodge": {
        "linked_name": "Animal Kingdom Lodge (Bundle)|Animal Kingdom Lodge",
        "contentsString": "{{name|Animal Kingdom Lodge}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HouseSkin_SafariLodgeHouse",
        "bundleType": "House"
    },
    "Savanna Living Room Set": {
        "linked_name": "Savanna Living Room Set",
        "contentsString": "{{name|Decorative Simba Banner}}\n{{name|Savanna Iron Fireplace}}\n{{name|Savanna Woven Rug}}\n{{name|Savanna Side Table}}\n{{name|Savanna Lounge Chair}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_SafariLodgeLivingSet",
        "bundleType": "Furniture"
    },
    "\"Lion\" Cub Fox": {
        "linked_name": "[\"Lion\" Cub Fox (Bundle)|\"Lion\" Cub Fox",
        "contentsString": "{{name|\"Lion\" Cub Fox}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HeroItem_LionInspiredFox",
        "bundleType": "Companion"
    },
    "Privateer Set": {
        "linked_name": "Privateer Set",
        "contentsString": "{{name|Privateer Coat}}\n{{name|Privateer Slops}}\n{{name|Right Privateer Eyepatch}}\n{{name|Left Privateer Eyepatch}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.7",
        "protoDbName": "Bundle_PrivateerSet",
        "bundleType": "Clothing"
    },
    "Chernabog's Changing Castle": {
        "linked_name": "Chernabog's Changing Castle (Bundle)|Chernabog's Changing Castle",
        "contentsString": "{{name|Chernabog's Changing Castle}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HeroItem_ChernabogMountain",
        "bundleType": "Furniture"
    },
    "Frozone Glider": {
        "linked_name": "Frozone Glider (Bundle)|Frozone Glider",
        "contentsString": "{{name|Frozone Glider}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Heroitem_FrozoneGliderZ",
        "bundleType": "Glider"
    },
    "Evil Queen Costume": {
        "linked_name": "Evil Queen Costume (Bundle)|Evil Queen Costume",
        "contentsString": "{{name|Evil Queen Costume}}",
        "priceString": "Free",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Villain's Royal Tools": {
        "linked_name": "Villain's Royal Tools",
        "contentsString": "{{name|Queen of Hearts Shovel}}\n{{name|Sea Witch Watering Can}}\n{{name|Maleficent Hourglass}}\n{{name|Hook Fishing Rod}}\n{{name|Evil Queen Pickaxe}}\n{{name|De Vil Phone}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_VilainToolSet",
        "bundleType": "Tool Style"
    },
    "Pooh Loungefly Backpack Bundle": {
        "linked_name": "Pooh Loungefly Backpack Bundle",
        "contentsString": "{{name|Loungefly Hunny Tummy Backpack}}\n{{name|Pooh Adorable Loungefly Harness Fox}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "Bundle_LoungeflyBundle",
        "bundleType": "Companion/Clothing"
    },
    "Witchy Cottage": {
        "linked_name": "Witchy Cottage (Bundle)|Witchy Cottage",
        "contentsString": "{{name|Witchy Cottage}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HouseSkin_WitchInspiredHouse",
        "bundleType": "House"
    },
    "Goofy's Savanna Stall": {
        "linked_name": "Goofy's Savanna Stall (Bundle)|Goofy's Savanna Stall",
        "contentsString": "{{name|Goofy's Savanna Stall}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.13",
        "protoDbName": "HeroItem_LionKingGoofyStall",
        "bundleType": "Stall"
    },
    "Jafar Costume Outfit": {
        "linked_name": "Jafar Costume Outfit (Bundle)|Jafar Costume Outfit",
        "contentsString": "{{name|Jafar Costume Outfit}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_JafarOutfit",
        "bundleType": "Clothing"
    },
    "Bonnie's Toy Set": {
        "linked_name": "Bonnie's Toy Set",
        "contentsString": "{{name|Plastic Kiddie Slide}}\n{{name|Wooden Kiddie Stove}}\n{{name|Kiddie Playroom Shelf}}\n{{name|Flower Play Table}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_BonniesToySet",
        "bundleType": "Furniture"
    },
    "Mickey the Magician": {
        "linked_name": "Mickey the Magician (Bundle)|Mickey the Magician",
        "contentsString": "{{name|Mickey the Magician}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_MagicianMickey",
        "bundleType": "Character Style"
    },
    "Jungle House": {
        "linked_name": "Jungle House (Bundle)|Jungle House",
        "contentsString": "{{name|Jungle House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HouseSkin_JungleBoatCottageCore",
        "bundleType": "House"
    },
    "Agrabah Market Set": {
        "linked_name": "Agrabah Market Set",
        "contentsString": "{{name|Agrabah Market Pottery Stand}}\n{{name|Agrabah Market Loom}}\n{{name|Agrabah Market Fruit Stand}}\n{{name|Agrabah Market Jewelry Stand}}\n{{name|Agrabah Market Carpets}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Bundle_AgrabahMarketSet",
        "bundleType": "Furniture"
    },
    "Jasmine's Courtyard Fountain": {
        "linked_name": "Jasmine's Courtyard Fountain (Bundle)|Jasmine's Courtyard Fountain",
        "contentsString": "{{name|Jasmine's Courtyard Fountain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "Item_JasmineFountain",
        "bundleType": "Furniture"
    },
    "Cozy \"Wanderer\" Bundle": {
        "linked_name": "Cozy \"Wanderer\" Bundle",
        "contentsString": "{{name|\"Wanderer\" Bunk Bed}}\n{{name|Green Rug}}\n{{name|Blue \"Wanderer\" Couch}}\n{{name|\"Wanderer\" Window}}\n{{name|\"Wanderer\" Table}}\n{{name|\"Wanderer\" Ceiling Light}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_Wanderer",
        "bundleType": "Furniture"
    },
    "Goofy's Bayou Stall": {
        "linked_name": "Goofy's Bayou Stall (Bundle)|Goofy's Bayou Stall",
        "contentsString": "{{name|Goofy's Bayou Stall}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "HeroItem_BayouGoofyStall",
        "bundleType": "Stall"
    },
    "Ursula's Transformation Dream Bundle": {
        "linked_name": "Ursula's Transformation Dream Bundle",
        "contentsString": "",
        "priceString": "{{price|3200|moonstone}} (20% off)",
        "versionAdded": "1.7",
        "protoDbName": "",
        "bundleType": "- Dream"
    },
    "Pink Ariel Costume Gown": {
        "linked_name": "Pink Ariel Costume Gown (Bundle)|Pink Ariel Costume Gown",
        "contentsString": "{{name|Pink Ariel Costume Gown}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_ArielPrincessDress",
        "bundleType": "Clothing"
    },
    "Art Deco Poster Collection": {
        "linked_name": "Art Deco Poster Collection",
        "contentsString": "{{name|Art Deco Tiana Poster}}\n{{name|Art Deco Elsa Poster}}\n{{name|Art Deco Woody Poster}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_Poster2",
        "bundleType": "Furniture"
    },
    "Summer Vacation Scrooge": {
        "linked_name": "Summer Vacation Scrooge (Bundle)|Summer Vacation Scrooge",
        "contentsString": "{{name|Summer Vacation Scrooge}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "HeroItem_ScroogeVacation",
        "bundleType": "Character Style"
    },
    "Inspired Chinese Boats": {
        "linked_name": "Inspired Chinese Boats",
        "contentsString": "{{name|Blue Junk Boat}}\n{{name|Gold Junk Boat}}\n{{name|Red Junk Boat}} {{cleanup|Verify order here}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Bundle_ChineseBoats",
        "bundleType": "Furniture"
    },
    "V8 Cafe House": {
        "linked_name": "V8 Cafe House (Bundle)|V8 Cafe House",
        "contentsString": "{{name|V8 Cafe House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HouseSkin_V8CafeHouse",
        "bundleType": "House"
    },
    "Belle's Cottage": {
        "linked_name": "Belle's Cottage (Bundle)|Belle's Cottage",
        "contentsString": "{{name|Belle's Cottage}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HouseSkin_BellesCottage",
        "bundleType": "House"
    },
    "Star Adventurer Stand": {
        "linked_name": "Star Adventurer Stand (Bundle)|Star Adventurer Stand",
        "contentsString": "{{name|Star Adventurer Stand}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Item_StarAdventureStand",
        "bundleType": "Furniture"
    },
    "Art Deco Princess Shade": {
        "linked_name": "Art Deco Princess Shade (Bundle)|Art Deco Princess Shade",
        "contentsString": "{{name|Art Deco Princess Shade}}",
        "priceString": "{{price|850|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "Item_ArtDecoPrincessShade",
        "bundleType": "Furniture"
    },
    "Beach House": {
        "linked_name": "Beach House (Bundle)|Beach House",
        "contentsString": "{{name|Beach House}}",
        "priceString": "{{price|3000|moonstone}}",
        "versionAdded": "1.6",
        "protoDbName": "HeroItem_BeachVacationHouse",
        "bundleType": "House"
    },
    "Elegant Potted Plant": {
        "linked_name": "Elegant Potted Plant (Bundle)|Elegant Potted Plant",
        "contentsString": "{{name|Elegant Potted Plant}}",
        "priceString": "{{price|850|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Item_ElegantPottedPlant",
        "bundleType": "Furniture"
    },
    "Princesses Room Divider Shelf": {
        "linked_name": "Princesses Room Divider Shelf (Bundle)|Princesses Room Divider Shelf",
        "contentsString": "{{name|Princesses Room Divider Shelf}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Item_DividerShelf",
        "bundleType": "Furniture"
    },
    "The Great Goofini": {
        "linked_name": "The Great Goofini (Bundle)|The Great Goofini",
        "contentsString": "{{name|The Great Goofini}}",
        "priceString": "{{price|2500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_StuntGreatGoofy",
        "bundleType": "Character Style"
    },
    "Snuggly Duckling Tavern House": {
        "linked_name": "Snuggly Duckling Tavern House (Bundle)|Snuggly Duckling Tavern House",
        "contentsString": "{{name|Snuggly Duckling Tavern House}}",
        "priceString": "{{price|3750|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HouseSkin_SnugglyDucklingTavern",
        "bundleType": "House"
    },
    "Elliott's Electric Dragon Wings": {
        "linked_name": "Elliott's Electric Dragon Wings (Bundle)|Pete's Electric Dragon Wings",
        "contentsString": "{{name|Elliott's Electric Dragon Wings}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "HeroItem_ElectricalParadePetesWings",
        "bundleType": "Clothing"
    },
    "Park Day Outfit": {
        "linked_name": "Park Day Outfit",
        "contentsString": "{{name|Waffle Bag}}\n{{name|Magical Varsity Jacket}}\n{{name|Mickey Mouse Bob}}\n{{name|Mickey Balloons Makeup}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Bundle_ParkDayOutfit",
        "bundleType": "Clothing"
    },
    "Kevin Costume Onesie": {
        "linked_name": "Kevin Costume Onesie (Bundle)|Kevin Costume Onesie",
        "contentsString": "{{name|Kevin Costume Onesie}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.10",
        "protoDbName": "Item_KevinOnesie",
        "bundleType": "Clothing"
    },
    "IncrediSquirrel": {
        "linked_name": "IncrediSquirrel (Bundle)|IncrediSquirrel",
        "contentsString": "{{name|IncrediSquirrel}}",
        "priceString": "{{price|2000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HeroItem_Incredisquirrel",
        "bundleType": "Companion"
    },
    "Art Deco TV and Stand": {
        "linked_name": "Art Deco TV and Stand (Bundle)|Art Deco TV and Stand",
        "contentsString": "{{name|Art Deco TV and Stand}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.8",
        "protoDbName": "Item_ArtDecoTV_Stand",
        "bundleType": "Furniture"
    },
    "Art Deco Poster Collection 2": {
        "linked_name": "Art Deco Poster Collection 2",
        "contentsString": "{{name|Art Deco Snow White Poster}}\n{{name|Art Deco Moana Poster}}\n{{name|Art Deco Simba Poster}}",
        "priceString": "{{price|1200|moonstone}}",
        "versionAdded": "1.3",
        "protoDbName": "Bundle_Poster1",
        "bundleType": "Furniture"
    },
    "Junior Wilderness Explorer Backpack": {
        "linked_name": "Junior Wilderness Explorer Backpack (Bundle)|Junior Wilderness Explorer Backpack",
        "contentsString": "{{name|Junior Wilderness Explorer Backpack}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "",
        "bundleType": "Clothing"
    },
    "Classic Fox Backpack": {
        "linked_name": "Classic Fox Backpack (Bundle)|Classic Fox Backpack",
        "contentsString": "{{name|Classic Fox Backpack}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "HeroItem_CritterBackpack",
        "bundleType": "Clothing"
    },
    "\"Wanderer\" Kitchen Set": {
        "linked_name": "[\"Wanderer\" Kitchen Set",
        "contentsString": "{{name|\"Wanderer\" Kitchen Island}}\n{{name|\"Wanderer\" Double-Door Counter}}\n{{name|\"Wanderer\" Kitchen Sink}}\n{{name|\"Wanderer\" Double Cupboard}}\n{{name|\"Wanderer\" Combination Cupboard}}\n{{name|Tall \"Wanderer\" Cupboard}}",
        "priceString": "{{price|1500|moonstone}}",
        "versionAdded": "1.4",
        "protoDbName": "Bundle_WandererKitchen",
        "bundleType": "Furniture"
    },
    "Scholarly Study Set": {
        "linked_name": "Scholarly Study Set",
        "contentsString": "{{name|Traditional Desk}}\n{{name|Mortar 'n' Pestle}}\n{{name|Golden Balance}}",
        "priceString": "{{price|1250|moonstone}}",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Celestial Book Nook": {
        "linked_name": "Celestial Book Nook",
        "contentsString": "{{name|Starry Night Window}}\n{{name|Tall Bookshelf}}\n{{name|Ornate Curtain}}",
        "priceString": "{{price|1750|moonstone}}",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Royal Deco Bedroom": {
        "linked_name": "Royal Deco Bedroom",
        "contentsString": "{{name|Art Deco Coffee Table}}\n{{name|Art Deco Princess Bed}}\n{{name|Art Deco Princess Shade}}",
        "priceString": "{{price|3365|moonstone}}",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Royal Deco Living Room": {
        "linked_name": "Royal Deco Living Room",
        "contentsString": "{{name|Art Deco Princess Armchair}}\n{{name|Art Deco TV and Stand}}\n{{name|Princesses Room Divider Shelf}}",
        "priceString": "{{price|4850|moonstone}}",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Art Deco Lifestyle": {
        "linked_name": "Art Deco Lifestyle",
        "contentsString": "{{name|Art Deco Holo Bedside Table}}\n{{name|Art Deco Club Chair}}\n{{name|Elegant Potted Plant}}",
        "priceString": "{{price|3040|moonstone}}",
        "versionAdded": "",
        "protoDbName": "",
        "bundleType": ""
    },
    "Once Upon a Dance Dream Bundle": {
        "linked_name": "Once Upon a Dance Dream Bundle",
        "contentsString": "{{name|Autumn Ball Attire}}\n{{name|Curly Ribboned Mane}}\n{{name|Enchanted Evening Beast}}\n{{name|Enchanted Evening Belle}}\n{{name|Gold Enchanted Rose Tiara}}\n{{name|Rose Blossom Ball Gown}}\n{{name|Royal Blossom Piano}}\n{{name|Royal Blossom Column}}\n{{name|Royal Blossom Gazebo}}\n{{name|Royal Bowdrop Earrings}}",
        "priceString": "{{price|4000|moonstone}}",
        "versionAdded": "1.19",
        "protoDbName": "",
        "bundleType": "- Dream"
    },
    "Seafaring Sheepdog Max Bundle": {
        "linked_name": "Seafaring Sheepdog Max Bundle",
        "contentsString": "{{name|Max}}\n{{name|Max's Houseboat}}\n{{name|Nautical Fireplace}}\n{{name|Nautical Four-Poster Bed}}\n{{name|Nautical Cabinet}}\n{{name|Nautical Floor Rug}}\n{{name|Captain's Log Window}}\n{{name|Nautical Wall Sconce}}",
        "priceString": "{{price|4500|moonstone}}",
        "versionAdded": "1.17",
        "protoDbName": "",
        "bundleType": "Companion/Furniture"
    },
    "Ariel's Royal Bundle": {
        "linked_name": "Ariel's Royal Bundle",
        "contentsString": "{{name|Ariel's Pink Gown}}\n{{name|Seaside Royal Carriage}}\n{{name|Seaside Villa}}\n{{name|Seaside Royal Bath}}\n{{name|Seaside Village Fountain}}\n{{name|Seaside Royal Outfit}}\n{{name|Seaside Royal Wavy Hairstyle}}\n{{name|Seaside Royal Outfit (2)|link=Seaside Royal Outfit (2){{!}}Seaside Royal Outfit}}\n{{name|Seaside Royal Hairstyle}}\n{{name|Seaside Royal Dresser}}\n{{name|Seaside Royal Fancy Chair}}\n{{name|Seaside Royal Chair}}\n{{name|Seaside Royal Table}}\n{{name|Seaside Royal Rug}}\n{{name|Seaside Royal Windows}}\n{{name|Royal Potted Plants}}\n{{name|Seaside Royal Bath Plant}}\n{{name|Royal Table Fruit Plate}}\n{{name|Royal Table Candleholder}}\n{{name|Seaside Royal Table Setting}}",
        "priceString": "{{price|4000|moonstone}}",
        "versionAdded": "1.12",
        "protoDbName": "",
        "bundleType": "- Signature"
    },
    "Island Getaway House Bundle": {
        "linked_name": "Island Getaway House Bundle",
        "contentsString": "{{name|Sun-and-Surf Stitch}}\n{{name|Hawaiian Home}}\n{{name|Island Surf Glider}}\n{{name|Luki's Shave Ice Cart}}\n{{name|Canoe Club Sign}}\n{{name|Island Produce Truck}}\n{{name|Shaded Island Wood Table}}\n{{name|Island Umbrella}}\n{{name|Island Wood Table}}\n{{name|Island Wood Chair}}\n{{name|Island Leaves Crop Top}}\n{{name|Denim Board Shorts}}\n{{name|Yellow Island Tank}}\n{{name|Island Swim Shorts}}\n{{name|Blue Flip Flops}}\n{{name|Puka Shell Necklace}}\n{{name|Hibiscus Arches}}\n{{name|Hibiscus Bush}}",
        "priceString": "{{price|4000|moonstone}}",
        "versionAdded": "1.11",
        "protoDbName": "",
        "bundleType": "- Signature"
    },
    "Starlight House Bundle": {
        "linked_name": "Starlight House Bundle",
        "contentsString": "{{name|Belle's Green Gown}}\n{{name|Provincial Library House}}\n{{name|Blooming Roses Air Bed}}\n{{name|Basic Lounge Chair}}\n{{name|Chipped Slippers}}\n{{name|Cucumber Eye Mask}}\n{{name|Dreamlight Lounge Chair}}\n{{name|Evening Salon Lounge Pillows}}\n{{name|Gilded Golden Popcorn Machine}}\n{{name|Vintage Starlight Projector}}\n{{name|Messy Bun}}\n{{name|Messy Bun with Sleep Mask}}\n{{name|Ruffled Silk Dressing Gown}}\n{{name|Ruffled Silk Pajama Culottes}}\n{{name|Ruffled Silk Pajama Top}}\n{{name|Starry Damask Wallpaper}}",
        "priceString": "{{price|4000|moonstone}}",
        "versionAdded": "1.9",
        "protoDbName": "",
        "bundleType": "- Signature"
    },
    "Dapper WALL-E Dream Bundle": {
        "linked_name": "Dapper WALL-E Dream Bundle",
        "contentsString": "{{quest|Your Sunday Best|friendship=WALL-E}}\n{{quest|Matchmaking Magic|friendship=WALL-E}}\n{{quest|Strut Your Stuff|friendship=WALL-E}}\n{{quest|Sprouting a Story|friendship=WALL-E}}\n{{name|Bowler Hat}}\n{{name|Dapper Suit}}\n{{name|Dapper WALL-E}}\n{{name|Sunbird-Feathered Hat}}\n{{name|Victorian Matchmaker's Dress}}\n{{name|WALL-E's Boot Bouquet}}\n{{name|WALL-E Trash Can Lid Hat}}",
        "priceString": "{{price|4000|moonstone}}",
        "versionAdded": "1.5",
        "protoDbName": "",
        "bundleType": "- Dream"
    }
};

function existsOnce(str, sub) {
  return str.indexOf(sub) !== -1 && str.indexOf(sub) === str.lastIndexOf(sub);
}

function outputBundleAvailabilityHistoryTable(bundleName) {
  
  var output = "";

  // ?. means “only continue if not null/undefined”
  var bundleObj = premiumBundles?.[bundleName];
  if (!bundleObj) {
    //console.warn(`${bundleName} is not a defined property.`);
    //output += `\n<!-- TODO: ${bundleName} -->`;
    var tempHandleOldJS = bundleName + " is not a defined property."
    console.warn(tempHandleOldJS);
    output += "\n<!-- TODO: "+bundleName+" -->";
  }
  else {  
    output += "\n|-";
    output += "\n| [[" + bundleObj.linked_name + "]]";
    output += "\n| ";

    // bundleObj.contentsString.includes(bundleName) // not a safe check, check instead if only one name template included as well
    if(bundleObj.linked_name.includes(" (Bundle)") || existsOnce(bundleObj.contentsString,"{{name|")) {
      output += ""; // no leading line break if only a single item in bundle
    }
    else {
      output += "\n";
    }
    output += bundleObj.contentsString.replaceAll("\n", "<br>\n");
    output += "\n| " + bundleObj.priceString;
    }
  
  return output;
}

  
function outputBundleTopTable(bundleName) {
  
  var output = "";

  // ?. means “only continue if not null/undefined”
  var bundleObj = premiumBundles?.[bundleName];
  if (!bundleObj) {
    //console.warn(`${bundleName} is not a defined property.`);
    //output += `\n<!-- TODO: ${bundleName} -->`;
    var tempHandleOldJS = bundleName + " is not a defined property."
    console.warn(tempHandleOldJS);
    output += "\n<!-- TODO: "+bundleName+" -->";
  }
  else {  
    output += "\n|-";

    // bundleObj.contentsString.includes(bundleName) // not a safe check, check instead if only one name template included as well
    if(bundleObj.linked_name.includes(" (Bundle)") || existsOnce(bundleObj.contentsString,"{{name|")) {
      // standalone item bundle / only a single item in bundle
      output += "\n| [[File:"+bundleName+" Store.png|450px|right|link="+bundleName+" (Bundle)]]<!--row X leftright-->";
    }
    else {
      output += "\n| [[File:"+bundleName+".png|450px|right|link="+bundleName+"]]<!--row X leftright-->";
    }
    output += "";
    }
  
  return output;
}

function outputShopWeek(shopWeekObj) {
  var outputTopTable = "";
  var outputHistoryTable = "";
  var bundleNameList;
  var bundleCount = 0;
  
  outputTopTable += '\n\n==Available This Week==\n; Item Bundles 2026.MM.DD - 2026.MM.DD\n{| class="premium-bundles-store-table"';
  outputTopTable += "\n|-\n| colspan=2 | \n; SECTIONHEADER\n|-\n| colspan=2 | [[File:xxxxxx_doublewide.png|903px|right|link=xxxxxx]]<!--row X doublewide-->";
  outputTopTable += "\n|-\n| colspan=2 | \n; Featured";
  outputHistoryTable += "\n<!--Featured-->";
  bundleNameList = shopWeekObj.Featured; // || []; // default to empty array to be safe
  for (var i=0; i<bundleNameList.length; i++) {
    outputTopTable += outputBundleTopTable(bundleNameList[i]);
    outputHistoryTable += outputBundleAvailabilityHistoryTable(bundleNameList[i]);
    bundleCount++;
  }
  
  outputTopTable += "\n|-\n| colspan=2 | \n; Spotlight";
  outputHistoryTable += "\n<!--Spotlight-->";
  bundleNameList = shopWeekObj.Spotlight;
  for (var i=0; i<bundleNameList.length; i++) {
    outputTopTable += outputBundleTopTable(bundleNameList[i]);
    outputHistoryTable += outputBundleAvailabilityHistoryTable(bundleNameList[i]);
    bundleCount++;
  }

  outputTopTable += "\n|-\n| colspan=2 | \n; Limited-Time Deals";
  outputHistoryTable += "\n<!--Limited-Time Deals-->";
  bundleNameList = shopWeekObj.LimitedTimeDeals;
  for (var i=0; i<bundleNameList.length; i++) {
    outputTopTable += outputBundleTopTable(bundleNameList[i]);
    outputHistoryTable += outputBundleAvailabilityHistoryTable(bundleNameList[i]);
    bundleCount++;
  }

  outputTopTable += '<!--Recommended (unique per player)-->\n|-\n| colspan=2 | \n; Seasonal Bundles\n|-\n| colspan=2 | \n|-\n<!--Bonus Gift (if relevant)-->\n<!--Dream Bundles, Companion Bundles, Signature Bundles-->\n<!--Star Path-->\n|}\n<div style="clear:both;"></div>';
  outputTopTable = "\n\n<!--ROWSPAN: "+bundleCount+"-->" + outputTopTable +"\n\n\n\n"+ outputHistoryTable;
  
  return outputTopTable;
}



//var Shop20260415_Spotlight = ["Fortune Teller Dress", "Fortune Teller Tent", "Linen Ensemble", "Rapunzel Costume Dress", "Handheld Plushie", "Bunny Costume Plushie", "Cloud Cottage", "Rosy Cloud Turtle", "Aurora Costume Dresses", "Celebration Jasmine Ensemble"];

var Shop_2026_05_27 = {};
Shop_2026_05_27.Featured = ["BamBee", "Dear Deer Ensemble", "Cozy Bookshop Home", "Paper Whirlwind", "Fairy Flower Set"];
Shop_2026_05_27.Spotlight = ["Tinker Bell House Bundle", "Garden Fairy Flower Bundle", "Maple Key Wings", "Tinker Bell's House", "Goofy's Bayou Stall", "Never Land Wishing Well", "Autumnal Clock Tower", "Adventurous Anna", "Enchanted Forest House"];
Shop_2026_05_27.LimitedTimeDeals = ["Leafy Cottage House", "A Bug's Life Decor Bundle"];




var Shop_2026_04_15 = {
    "Featured": ["Cozy Star Observatory", "Celestial Pond", "Celestial Stunner Ensemble", "Enchanted Floating Set"],
    "Spotlight": ["Fortune Teller Dress", "Fortune Teller Tent", "Linen Ensemble", "Rapunzel Costume Dress", "Handheld Plushie", "Bunny Costume Plushie", "Cloud Cottage", "Rosy Cloud Turtle", "Aurora Costume Dresses", "Celebration Jasmine Ensemble"],
    "LimitedTimeDeals": ["Whimsical Pink Companion Pack 1", "Whimsical Blue Companion Pack 2"]
};
Shop_2026_04_15.Title_001 = ["BB—8", "R2-D2"];  // Droid Dreams

var Shop_2026_04_22 = {
    "Featured": ["Tulip Town Bundle", "Tulip Town Buildings ", "Tulip Town Windmills", "Tulip Field Set", "Garden Party Daisy", "BB—8", "R2-D2"],
    "Spotlight": ["Blooming Flower Wings", "Blue Delftware Dress", "Hopps' Hay Maze Kit", "Alpine Wind Vane", "Hopps Family Farm Stand", "Blooming Flower Shop", "Springtime Valley Bundle", "De Vil Couture Ensemble", "Angelic Wings", "Kingdom of Corona Set", "Wind-Up Raccoon"],
    "LimitedTimeDeals": ["Milo Costume Outfit", "Kristoff Coronation Outfit", "Jafar Costume Outfit", "Peter Pan Outfit"]
};
Shop_2026_04_22.Title_000 = ["Padmé Amidala's Summer Meadow Ensemble", "Padmé Amidala's Lakeside Ensemble"] // A Queen's Closet



var Shop_2026_04_29 = {
    "Featured": ["Fennec Fox", "Cozy Wood and Wicker House", "Swirling Sandstorm Set", "Padmé Amidala's Lakeside Ensemble", "Padmé Amidala's Summer Meadow Ensemble", "BB—8", "R2-D2"],
    "Spotlight": ["Anakin Skywalker's Jedi Ensemble", "Anakin Skywalker's Lightsaber", "Savanna Living Room Set", "Agrabah Market Set", "Agrabah Wall Set", "Desert Oasis Well", "Raya Ensemble", "Cactus Mickey Floral Topiary", "Cactus House"],
    "LimitedTimeDeals": ["Summer Vacation Scrooge", "Jasmine's Courtyard Fountain"]
};
Shop_2026_04_29.Title_000 = ["Tatooine Decoration Set", "Tatooine Desert House", "Naboo Interior Furniture Bundle", "Naboo Villa Bundle"]

var Shop_2026_05_06 = {
    "Featured": ["Cozy Rainy House", "Lone Weather Clouds", "Duo-Tone Rain Ensemble", "Stormy Weather Evolving Pickaxe"],
    "Spotlight": ["Platinum Techwear Bundle", "Raincoat Bundle", "Tart Turtle", "Display Bubble Machine", "Figaro Bundle", "Rainy Day Essentials 1", "Rainy Day Essentials 2", "Toontown Fire Station", "Rocky Coast Lighthouse"],
    "LimitedTimeDeals": ["CenTOONial Park Fountain", "Elemental Bundle"]
};

var Shop_2026_05_13 = {
    "Featured": ["London Clock Tower", "Railway Station Set", "Corgi Puppy", "Shooting Star"],
    "Spotlight": ["Disney Parks Entry", "Park Clock Set", "Platinum Mickey", "Platinum Minnie", "Regal Splendor Elsa", "Beaded Art Deco Ensemble", "Black Sequin Dress", "Royal Jacket Set"],
    "LimitedTimeDeals": ["Art Deco Club Set (1)", "Art Deco Princess Bed", "Art Deco Princess Shade", "Princesses Room Divider Shelf"]
};

var Shop_2026_05_20 = {
    "Featured": ["Tournament Gown Merida", "Highland Will-o'—the-Wisps", "Garden Teapot House", "Silken Dagger Gown"],
    "Spotlight": ["Pink Ariel Costume Gown", "Inside Out Emotional Whirlwind", "Magical Squirrel", "Pixar Pal-A-Round"],
    "LimitedTimeDeals": ["Corona Castle", "Nightmare Castle"]
};

var Shop_2026_05_27 = {
    "Featured": ["BamBee", "Dear Deer Ensemble", "Cozy Bookshop Home", "Paper Whirlwind", "Fairy Flower Set"],
    "Spotlight": ["Tinker Bell House Bundle", "Garden Fairy Flower Bundle", "Maple Key Wings", "Tinker Bell's House", "Goofy's Bayou Stall", "Never Land Wishing Well", "Autumnal Clock Tower", "Adventurous Anna", "Enchanted Forest House"],
    "LimitedTimeDeals": ["Leafy Cottage House", "A Bug's Life Decor Bundle"]
};

var Shop_test = {
  "Featured": [],
  "Spotlight": ["Tulip Field Set", "Fennec Fox", "Percy", "Celestial Stunner Ensemble" ],
  "LimitedTimeDeals": ["Corona Castle", "Nightmare Castle"]
}

var premiumShopWeekArray_update22 = [ Shop_2026_04_15, Shop_2026_04_22, Shop_2026_04_29, Shop_2026_05_06, Shop_2026_05_13, Shop_2026_05_20, Shop_2026_05_27 ];

var premiumShopWeekArray_small = [ Shop_test ];


function test(shopWeekArray) {

  var output = "";
  var shopWeekObj = {};

  for (var i=0; i<shopWeekArray.length; i++) {
    shopWeekObj = shopWeekArray[i];
    output += outputShopWeek(shopWeekObj);
  }
  
  return output;
}

//console.log(test(premiumShopWeekArray_update22));
console.log(test(premiumShopWeekArray_small));