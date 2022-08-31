export const getAddressFromAddresses = (userAddresses) => {
  return userAddresses?.map((obj) => {
    if (obj.CountryId !== undefined) {
      return {
        id: obj.Id,
        cityName: obj.City.Name,
        cityId: obj.City.Id,
        provinceName: obj.Province.Name,
        provinceId: obj.Province.Id,
        countryName: obj.Country.Name,
        countryId: obj.Country.Id,
        postalCode: obj.PostalCode,
        title: obj.Title,
        AddressLineOne: obj.AddressLine1,
        AddressLineTwo: obj.AddressLine2,
      };
    }
  });
};
