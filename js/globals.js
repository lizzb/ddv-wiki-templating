// yes, i know this is poor form


// this value is changed based on changes to radio buttons in html - not sure if this actually does anything
var templateType = "meals"; // other vals: clothingFurniture, spDuties, spRewards, questItems, meals, ingredients, companions

var updateNumber = "1.23"; //"1.20.11"; //"Expansion 3"; //"1.20.2";// Expansion 3
var newExpansionCollection = "Wishblossom Mountains";

var starPathNameShort = "Godly Glamor";
var starPathName = "Godly Glamor";
var starPathToken = "glamortoken";

// toggle to wrap in cleanup tag
var collectionConfirmed = $("#collectionConfirmedCB").prop("checked"); //true;

// toggle for wrapping in comments in infobox
//var priceConfirmed = $("#priceConfirmedCB").prop("checked"); //true;
var priceCategoriesColorsTraitsConfirmed = $("#priceConfirmedCB").prop("checked"); //true;
var tagsConfirmed = $("#tagsConfirmedCB").prop("checked"); //true;

// whether or not to include filler copy pasta for furniture functions
var functionsConfirmed = $("#functionsConfirmedCB").prop("checked"); //true;


// whether to console print out source of item as detected
var showItemDebug = false; 