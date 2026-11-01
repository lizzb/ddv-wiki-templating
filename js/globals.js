// yes, i know this is poor form


// this value is changed based on changes to radio buttons in html - not sure if this actually does anything
var templateType = "meals"; // other vals: clothingFurniture, spDuties, spRewards, questItems, meals, ingredients, companions

var updateNumber = "1.25"; //"1.20.11"; //"Expansion 3"; //"1.20.2";// Expansion 3 1.24 user facing is 1.24.11 in my sheet
var newExpansionCollection = "Honeyglow Woods"; //"Wishblossom Mountains";

var starPathNameShort = "Haunting Elegance";
var starPathName = "Haunting Elegance";
var starPathToken = "pumpkintoken";

var renderPSbundles = true;

// Settings handed to the engine (js/engine.js) on every render: the per-update values above plus
// the checkboxes, read fresh each time (DDV-9; the engine itself never touches the page).
function readEngineSettings() {
  return {
    updateNumber: updateNumber,
    newExpansionCollection: newExpansionCollection,
    starPathNameShort: starPathNameShort,
    starPathName: starPathName,
    starPathToken: starPathToken,
    renderPSbundles: renderPSbundles,

    // toggle to wrap in cleanup tag
    collectionConfirmed: $("#collectionConfirmedCB").prop("checked"),

    // toggle for wrapping in comments in infobox
    priceConfirmed: $("#priceConfirmedCB").prop("checked"),
    categoriesColorsTraitsConfirmed: $("#categoriesColorsTraitsConfirmedCB").prop("checked"),

    tagsConfirmed: $("#tagsConfirmedCB").prop("checked"),

    // whether or not to include filler copy pasta for furniture functions
    functionsConfirmed: $("#functionsConfirmedCB").prop("checked"),

    // whether to console print out source of item as detected
    showItemDebug: $("#showItemDebugCB").prop("checked"),

    // optional template typed into "Template input" (%%column%% placeholders)
    customTemplate: document.getElementById("template-input").value
  };
}
