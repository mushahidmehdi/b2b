export const prepareObject = (obj) => {
  if (obj != null && obj != undefined) {
    const keys = Object.keys(obj);
    for (let i = 0, n = keys.length; i < n; i++) {
      const key = keys[i];
      if (!obj[key]) {
        obj[key] = '';
      }
    }
  }
  return obj;
};

export const replaceObjectById = (array, newItem) => {
  if (!array || !newItem) return array;
  let newArray = array.slice();
  const lastIndex = newArray.findIndex((row) => row.Id === newItem.Id);
  if (lastIndex > -1) {
    newArray[lastIndex] = newItem;
  }
  return newArray;
};

export const isValidGuid = (guid) => {
  return (
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      guid,
    ) ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      guid,
    )
  );
};

export const isInvalidGuid = (guid) => {
  return !isValidGuid(guid);
};
