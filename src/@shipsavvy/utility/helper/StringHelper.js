export const getStringFromHtml = (htmlContent) => {
  return htmlContent.replace(/(<([^>]+)>)/gi, '');
};

export const isNotEmpty = (value) => {
  return value != undefined && value != null && value.trim() != '';
};

export const isEmpty = (value) => {
  return (
    value == undefined ||
    value == null ||
    ((typeof value === 'string' || value instanceof String) &&
      value.trim() == '')
  );
};
