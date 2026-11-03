// yes, i know this is poor form


// this value is changed based on changes to radio buttons in html - not sure if this actually does anything
var templateType = "meals"; // other vals: clothingFurniture, spDuties, spRewards, questItems, meals, ingredients, companions

// The per-update values (update number, newest village, star path, ...) are fields on the page
// under "This update" since DDV-28; the page remembers what was typed there. The engine checks
// every setting (names, types, required) and refuses a missing or unknown one: see SETTINGS at
// the top of js/engine.js.

function fieldText(id) {
  return document.getElementById(id).value.trim();
}

// "1.24.1=Adventure Pack 1; 1.24.11=1.24" -> { "1.24.1": "Adventure Pack 1", "1.24.11": "1.24" }
function parseVersionLabels(text) {
  var labels = {};
  text.split(/[;\n]/).forEach(function (pair) {
    pair = pair.trim();
    if (!pair) return;
    var at = pair.indexOf('=');
    if (at < 1 || !pair.slice(at + 1).trim()) {
      throw new Error('Wiki version labels: "' + pair + '" is not version=label');
    }
    labels[pair.slice(0, at).trim()] = pair.slice(at + 1).trim();
  });
  return labels;
}

// Settings handed to the engine (js/engine.js) on every render: the "This update" fields plus
// the checkboxes, read fresh each time (DDV-9; the engine itself never touches the page).
function readEngineSettings() {
  var settings = {
    updateNumber: fieldText("updateNumberInput"),
    newExpansionCollection: fieldText("newExpansionCollectionInput"),
    starPathNameShort: fieldText("starPathNameShortInput"),
    starPathName: fieldText("starPathNameInput"),
    starPathToken: fieldText("starPathTokenInput"),
    mealNavbox: fieldText("mealNavboxInput"),
    wikiVersionLabels: parseVersionLabels(fieldText("wikiVersionLabelsInput")),
    renderPSbundles: true,

    // toggle to wrap in cleanup tag
    collectionConfirmed: document.getElementById("collectionConfirmedCB").checked,

    // toggle for wrapping in comments in infobox
    priceConfirmed: document.getElementById("priceConfirmedCB").checked,
    categoriesColorsTraitsConfirmed: document.getElementById("categoriesColorsTraitsConfirmedCB").checked,

    tagsConfirmed: document.getElementById("tagsConfirmedCB").checked,

    // whether or not to include filler copy pasta for furniture functions
    functionsConfirmed: document.getElementById("functionsConfirmedCB").checked,

    // size, placement, surface area and environment (own box since DDV-28)
    placementConfirmed: document.getElementById("placementConfirmedCB").checked,

    // whether to console print out source of item as detected
    showItemDebug: document.getElementById("showItemDebugCB").checked,

    // optional template typed into "Template input" (%%column%% placeholders)
    customTemplate: document.getElementById("template-input").value
  };
  // blank shop week fields: the engine's placeholder date
  if (fieldText("bundleStartDateInput")) settings.bundleStartDate = fieldText("bundleStartDateInput");
  if (fieldText("bundleEndDateInput")) settings.bundleEndDate = fieldText("bundleEndDateInput");
  return settings;
}
