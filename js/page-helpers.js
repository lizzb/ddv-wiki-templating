// Small conveniences of the page (DDV-27). The text functions have no page code in them, so they can
// be tested on their own; the part at the bottom wires them to the page when there is one.
//   - collapseNewlinesInsideQuotedCells: a line break inside a quoted cell no longer splits the row
//   - addMissingItemType: a paste with no itemType column gets one
//   - findLeftovers: what the rendered output still holds of %%...%%, TODO_ and undefined
//   - lineNumbers: the numbers shown beside the input box
var DDVPage = (function () {

// Line breaks inside quoted cells become " // ". The parser cannot take a real line break inside a cell,
// so this runs on the raw pasted text before it, tracking whether a quote is open.
function collapseNewlinesInsideQuotedCells(text) {
  var result = '';
  var inQuotes = false;
  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      result += ch;
    } else if ((ch === '\n' || ch === '\r') && inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++; // treat \r\n as one break
      result += ' // ';
    } else {
      result += ch;
    }
  }
  return result;
}

// Cells of one tab-separated line; a tab inside quotes stays in its cell.
function splitCells(line) {
  var cells = [];
  var cell = '';
  var inQuotes = false;
  for (var i = 0; i < line.length; i++) {
    var ch = line[i];
    if (ch === '"') inQuotes = !inQuotes;
    if (ch === '\t' && !inQuotes) { cells.push(cell); cell = ''; } else cell += ch;
  }
  cells.push(cell);
  return cells;
}

// Columns that only a furniture row fills in. A row with one of them filled in is Furniture, any other
// row is Clothing. (Only decides when the paste has no itemType column of its own.)
var FURNITURE_ONLY_COLUMNS = ['size', 'placement', 'functions', 'surfacearea', 'w', 'l'];

// Clothing/furniture paste with a header row and tab-separated cells but no itemType column: put the
// column first (header "itemType", each row "Furniture" or "Clothing"). Anything else comes back as it was.
function addMissingItemType(text, templateType, headersProvided) {
  if (templateType !== 'clothingFurniture' || headersProvided === false) return text;
  var lines = text.split(/\r\n|\n|\r/);
  var first = 0;
  while (first < lines.length && !lines[first].trim()) first++;
  if (first >= lines.length || lines[first].indexOf('\t') < 0) return text;
  var header = splitCells(lines[first]).map(function (h) { return h.trim().toLowerCase(); });
  if (header.indexOf('itemtype') >= 0) return text;
  var furnitureAt = [];
  header.forEach(function (h, i) { if (FURNITURE_ONLY_COLUMNS.indexOf(h) >= 0) furnitureAt.push(i); });
  return lines.map(function (line, n) {
    if (n < first || !line.trim()) return line;
    if (n === first) return 'itemType\t' + line;
    var cells = splitCells(line);
    var isFurniture = furnitureAt.some(function (i) {
      var v = (cells[i] || '').trim();
      return v !== '' && v !== '-';
    });
    return (isFurniture ? 'Furniture' : 'Clothing') + '\t' + line;
  }).join('\n');
}

// What the output still holds that should have been filled in: [{ what, count, examples }], empty when clean.
function findLeftovers(output) {
  var kinds = [
    { what: '%%...%%', re: /%%[^%\n]{1,60}%%/g },
    { what: 'TODO_', re: /TODO_\w*/g },
    { what: 'undefined', re: /\bundefined\b/g }
  ];
  var found = [];
  kinds.forEach(function (kind) {
    var hits = String(output || '').match(kind.re) || [];
    if (!hits.length) return;
    var examples = [];
    hits.forEach(function (h) { if (examples.indexOf(h) < 0 && examples.length < 3) examples.push(h); });
    found.push({ what: kind.what, count: hits.length, examples: examples });
  });
  return found;
}

function leftoversText(found) {
  if (!found.length) return '';
  return 'Still in the output: ' + found.map(function (f) {
    return f.what + ' ' + f.count + (f.count === 1 ? ' time' : ' times') +
      (f.what === 'undefined' ? '' : ' (' + f.examples.join(', ') + ')');
  }).join('; ');
}

// "1\n2\n...\nn" for a box holding text.
function lineNumbers(text) {
  var n = String(text).split('\n').length;
  var out = [];
  for (var i = 1; i <= n; i++) out.push(i);
  return out.join('\n');
}

var api = {
  collapseNewlinesInsideQuotedCells: collapseNewlinesInsideQuotedCells,
  addMissingItemType: addMissingItemType,
  findLeftovers: findLeftovers,
  leftoversText: leftoversText,
  lineNumbers: lineNumbers,
  showLeftovers: function () {},
  updateLineNumbers: function () {}
};

if (typeof document !== 'undefined') {
  // warning above the output box
  api.showLeftovers = function (output) {
    var box = document.getElementById('output-warning');
    if (!box) return;
    var text = leftoversText(findLeftovers(output));
    box.textContent = text;
    box.style.display = text ? 'block' : 'none';
  };

  // numbers beside the input box: one per line (the box does not wrap, so a line is a row), moved with its scrolling
  var input = document.getElementById('data-input');
  var gutter = document.getElementById('data-input-lines');
  if (input && gutter) {
    var inner = gutter.firstElementChild;
    api.updateLineNumbers = function () {
      inner.textContent = lineNumbers(input.value);
      inner.style.transform = 'translateY(' + (-input.scrollTop) + 'px)';
    };
    ['input', 'keyup', 'change', 'scroll'].forEach(function (type) {
      input.addEventListener(type, api.updateLineNumbers);
    });
    api.updateLineNumbers();
  }
}

return api;
})();

// Node (tests): require('./page-helpers.js')
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DDVPage;
}
