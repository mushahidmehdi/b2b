export const formatNumber = (value, digits = 2, showEmpty = false) => {
  let valueToformat = 0;
  if (value && value != '') valueToformat = value;
  if (valueToformat == 0 && showEmpty) return '';
  return parseFloat(valueToformat).toFixed(digits);
};
