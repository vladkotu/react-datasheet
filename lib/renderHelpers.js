export function renderValue(cell, row, col, valueRenderer) {
  var value = valueRenderer(cell, row, col);
  return value === null || typeof value === 'undefined' ? '' : value;
}

export function renderData(cell, row, col, valueRenderer, dataRenderer) {
  var value = dataRenderer ? dataRenderer(cell, row, col) : null;
  return value === null || typeof value === 'undefined' ? renderValue(cell, row, col, valueRenderer) : value;
}