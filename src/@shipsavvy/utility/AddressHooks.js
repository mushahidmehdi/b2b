import {useAddressActions} from '../services/apis/AddressProvider/AddressProvider';

export const useAddressMethods = () => {
  const {
    searchCity,
    addAddress,
    updateAddress,
    getCountryName,
    getCityName,
    getProvinceName,
    getAddress,
    getCustomerAddresses,
    searchCountry,
    getPostalAddressByCode,
    searchProvince,
    addressSummary,
  } = useAddressActions();
  return {
    updateAddress,
    getAddress,
    searchCity,
    addAddress,
    getCityName,
    getCountryName,
    getProvinceName,
    getCustomerAddresses,
    searchCountry,
    getPostalAddressByCode,
    searchProvince,
    addressSummary,
  };
};

export const useAddress = () => {
  return {};
};
