import React, {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {CustomerAddressApiEndPoints} from './endPoints';
import {useDispatch} from 'react-redux';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {fetchError} from 'redux/actions';

const CustomerContextActions = createContext();

const CustomerProvider = ({children}) => {
  const dispatch = useDispatch();

  const showError = (error) => {
    dispatch(fetchError(error || 'Something went wrong'));
  };

  const addCustomerAddress = async (params, callback, failureCallback) => {
    if (!params) {
      const error = 'Please check your inputs';
      showError(error);
      if (failureCallback) failureCallback();
      return false;
    }

    if (!params.AddressId) {
      const error = 'Please check address info';
      showError(error);
      if (failureCallback) failureCallback();
      return false;
    }

    if (!params.CustomerId) {
      const error = 'Please check customer info';
      showError(error);
      if (failureCallback) failureCallback();
      return false;
    }

    callApi(
      CustomerAddressApiEndPoints.ADD_ADDRESS,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const updateCustomerAddress = async (params, callback, failureCallback) => {
    if (!params) {
      const error = 'Please check your inputs';
      showError(error);
      if (failureCallback) failureCallback();
      return false;
    }

    if (!params.AddressId) {
      const error = 'Please check address info';
      showError(error);
      if (failureCallback) failureCallback();
      return false;
    }

    if (!params.CustomerId) {
      const error = 'Please check customer info';
      showError(error);
      if (failureCallback) failureCallback();
      return false;
    }

    callApi(
      CustomerAddressApiEndPoints.UPDATE_ADDRESS,
      ApiMethod.PUT,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  function getCustomerAddresses(params, callback) {
    if (!params) {
      const error = 'Please check your inputs';
      showError(error);
      return false;
    }

    if (!params.CustomerId) {
      const error = 'Please check customer info';
      showError(error);
      return false;
    }

    callApi(
      CustomerAddressApiEndPoints.SEARCH_ADDRESS,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );
  }

  function deleteCustomerAddress(params, callback) {
    if (!params) {
      const error = 'Please check your inputs';
      showError(error);
      return false;
    }

    if (!params.CustomerId) {
      const error = 'Please check customer info';
      showError(error);
      return false;
    }

    if (!params.Id) {
      const error = 'Please check customer address info';
      showError(error);
      return false;
    }

    callApi(
      CustomerAddressApiEndPoints.DELETE_ADDRESS,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );
  }

  return (
    <CustomerContextActions.Provider
      value={{
        addCustomerAddress,
        getCustomerAddresses,
        deleteCustomerAddress,
        updateCustomerAddress,
      }}
    >
      {children}
    </CustomerContextActions.Provider>
  );
};

export const useCustomerActions = () => useContext(CustomerContextActions);
//export const useCustomerContext = () => useContext(CustomerContext);

export default CustomerProvider;

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
