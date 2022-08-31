export const unitConverter = (unit) => {
  if (unit === 'centimeters') {
    return 'Cm';
  } else if (unit === 'kilograms') {
    return 'Kg';
  } else if (unit === 'cm') {
    return 'Cm';
  } else if (unit === 'kg') {
    return 'Kg';
  } else {
    return unit;
  }
};
