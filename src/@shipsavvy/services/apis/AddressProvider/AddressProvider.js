import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {
  AddressApiEndPoints,
  CountryApiEndPoints,
  AddressPostalApiEndPoints,
  ProvinceApiEndPoints,
  CityApiEndPoints,
  DeliveryPointApiEndPoints,
} from './endPoints';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {CustomerAddressApiEndPoints} from '../CustomerProvider/endPoints';
import {useDispatch} from 'react-redux';
import {fetchError} from 'redux/actions';

const AddressContext = createContext();
const AddressContextActions = createContext();

const AddressProvider = ({children}) => {
  const [appCountries, setAppCountries] = useState([]);

  useEffect(() => {
    searchCountry({PageSize: 10000}, (data) => {
      setAppCountries(data.Response);
    });
  }, []);

  const dispatch = useDispatch();
  const showError = (error) => dispatch(fetchError(error));
  function getCustomerAddresses(params, callback, setTotalCountCallback) {
    if (!params) {
      showError('Invalid Parameter');
      return;
    }
    if (!params.CustomerId) {
      showError('Invalid Customer');
      return;
    }

    callApi(
      CustomerAddressApiEndPoints.SEARCH_ADDRESS,
      ApiMethod.POST,
      params,
      (data) => {
        if (setTotalCountCallback) setTotalCountCallback(data.TotalCount);
        const addressesIds = data.Response.map((address) => address.AddressId);
        if (addressesIds.length > 0) {
          callApi(
            AddressApiEndPoints.SEARCH_ADDRESS,
            ApiMethod.POST,
            {
              Ids: addressesIds,
              IncludeRelated: true,
              PageSize: 1000,
            },
            (data2) => {
              if (data2.Result && data2.Response) {
                data2.Response.forEach((address) => {
                  const customerAddress = data.Response.find(
                    (x) => x.AddressId == address.Id,
                  );
                  address.CustomerAddressId =
                    customerAddress && customerAddress.Id
                      ? customerAddress.Id
                      : '';
                });
              }

              if (callback) callback(data2.Response);
              return data2.Response;
            },
          );
        } else {
          if (callback) callback([]);
          return [];
        }
      },
    );
  }

  const searchCountry = async (params, callback) => {
    callApi(
      CountryApiEndPoints.SEARCH_COUNTRY,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );
  };

  const getPostalAddressByCode = async (params, callback, failureCallback) => {
    if (!params) {
      showError('Invalid Parameter');
      return;
    }

    if (!params.PostalCode) {
      showError('Invalid PostalCode');
      return;
    }

    if (!params.CountryId) {
      showError('Invalid CountryId');
      return;
    }

    callApi(
      AddressPostalApiEndPoints.GET_ADDRESS_CODE_BY_CODE,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );
  };

  const searchProvince = async (params, callback) => {
    if (!params) {
      return;
    }
    callApi(
      ProvinceApiEndPoints.SEARCH_PROVINCE,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );
  };

  const searchCity = async (params, callback) => {
    if (!params) {
      return;
    }
    callApi(CityApiEndPoints.SEARCH_CITY, ApiMethod.POST, params, (data) => {
      if (callback) callback(data);
    });
  };

  const addAddress = async (params, callback) => {
    if (!params) {
      return;
    }
    callApi(
      AddressApiEndPoints.POST_ADDRESS,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );
  };

  const getAddress = async (id, callback) => {
    callApi(
      `${AddressApiEndPoints.GET_ADDRESS}?id=${id}`,
      ApiMethod.GET,
      {},
      (data) => {
        if (callback) callback(data);
      },
    );
  };

  const updateAddress = async (params, callback) => {
    if (!params) {
      return;
    }
    callApi(
      AddressApiEndPoints.UPDATE_ADDRESS,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );
  };

  const addressSummary = (address) =>
    `${address.PostalCode} ${address.AddressLine1}, ${address.City.Name}, ${address.Province.Name}, ${address.Country.Name}`;

  const getDeliveryPointOptions = async (params, callback) => {
    if (!params) {
      return;
    }
    callApi(
      DeliveryPointApiEndPoints.GET_DELIVERY_POINT_OPTIONS,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );
  };

  return (
    <AddressContext.Provider value={{appCountries}}>
      <AddressContextActions.Provider
        value={{
          searchCity,
          addAddress,
          updateAddress,
          getAddress,
          getCustomerAddresses,
          searchCountry,
          getPostalAddressByCode,
          searchProvince,
          addressSummary,
          getDeliveryPointOptions,
        }}
      >
        {children}
      </AddressContextActions.Provider>
    </AddressContext.Provider>
  );
};

export const useAddressActions = () => useContext(AddressContextActions);
export const useAddress = () => useContext(AddressContext);

export default AddressProvider;

AddressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
