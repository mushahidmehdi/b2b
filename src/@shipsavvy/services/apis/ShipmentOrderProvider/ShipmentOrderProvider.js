import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ProductTypeApiEndPoints, ShipmentOrderApiEndPoints} from './endPoints';
import {useDispatch} from 'react-redux';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {fetchError} from 'redux/actions';
import {isInvalidGuid} from '@shipsavvy/utility/helper/ObjectHelper';
import {isEmpty} from '@shipsavvy/utility/helper/StringHelper';

const ShipmentOrderContext = createContext();
const ShipmentOrderContextActions = createContext();

const ShipmentOrderProvider = ({children}) => {
  const dispatch = useDispatch();

  const showError = (error) => {
    dispatch(fetchError(error || 'Something went wrong'));
  };

  const [productTypes, setProductTypes] = useState([]);
  useEffect(() => {
    getProductTypes((data) => {
      setProductTypes(data.Response);
    });
  }, []);

  const prepareError = (error, failureCallback) => {
    showError(error);
    if (failureCallback) failureCallback(error);
    return false;
  };

  const addShipmentOrder = async (params, callback, failureCallback) => {
    if (!params) {
      const error = 'Please check your inputs';
      return prepareError(error, failureCallback);
    }

    if (isInvalidGuid(params.CustomerId)) {
      const error = 'Please check customer info';
      return prepareError(error, failureCallback);
    }

    if (isInvalidGuid(params.FromAddressId)) {
      const error = 'Please check sender address info';
      return prepareError(error, failureCallback);
    }

    // if (isInvalidGuid(params.DeliveryPointId)) {
    //   const error = 'Please check delivery point info';
    //   return prepareError(error, failureCallback);
    // }

    if (params.Package) {
      if (isInvalidGuid(params.Package.ToAddressId)) {
        const error = 'Please check recipient address info';
        return prepareError(error, failureCallback);
      }

      if (isEmpty(params.Package.FullName)) {
        const error = 'Please check recipient fullname info';
        return prepareError(error, failureCallback);
      }

      if (isEmpty(params.Package.Email)) {
        const error = 'Please check recipient email info';
        return prepareError(error, failureCallback);
      }
      if (isEmpty(params.Package.Phone)) {
        const error = 'Please check recipient phone info';
        return prepareError(error, failureCallback);
      }

      if (isEmpty(params.Package.WeightUnit)) {
        params.Package.WeightUnit = -1;
      }

      if (isEmpty(params.Package.DimensionUnit)) {
        params.Package.DimensionUnit = -1;
      }

      if (isEmpty(params.Package.Width)) {
        params.Package.Width = 0;
      }

      if (isEmpty(params.Package.Height)) {
        params.Package.Height = 0;
      }

      if (isEmpty(params.Package.Length)) {
        params.Package.Length = 0;
      }

      if (isEmpty(params.Package.Weight)) {
        params.Package.Weight = 0;
      }
    }

    // Other validations

    callApi(
      ShipmentOrderApiEndPoints.ADD,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const getShipmentOrderPackage = async (params, callback) => {
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

    // Other validations

    callApi(
      ShipmentOrderApiEndPoints.GET_PACKAGE,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
    );

    return true;
  };

  const getProductTypes = async (callback) => {
    callApi(
      ProductTypeApiEndPoints.SEARCH,
      ApiMethod.POST,
      {PageSize: 100000},
      (data) => {
        if (callback) callback(data);
      },
    );

    return true;
  };

  const addShipmentOrderItem = async (params, callback, failureCallback) => {
    if (!params) {
      const error = 'Please check your inputs';
      return prepareError(error, failureCallback);
    }

    if (!params.ShipmentOrderPackageId) {
      const error = 'Please check shipment order package info';
      return prepareError(error, failureCallback);
    }

    if (!params.Sku) {
      const error = 'Please check item sku';
      return prepareError(error, failureCallback);
    }

    if (!params.Name) {
      const error = 'Please check item name';
      return prepareError(error, failureCallback);
    }

    if (!params.ProductTypeId) {
      const error = 'Please check item product type';
      return prepareError(error, failureCallback);
    }

    if (!params.OriginCountryId) {
      const error = 'Please check item origin country';
      return prepareError(error, failureCallback);
    }

    if (Number(params.Weight) <= 0) {
      const error = 'Please check item weight unit';
      return prepareError(error, failureCallback);
    }

    if (!params.WeightUnit) {
      const error = 'Please check item weight unit';
      return prepareError(error, failureCallback);
    }

    if (Number(params.UnitPrice) <= 0) {
      const error = 'Please check item value';
      return prepareError(error, failureCallback);
    }

    if (Number(params.Quantity) <= 0) {
      const error = 'Please check item quantity';
      return prepareError(error, failureCallback);
    }

    if (!params.CurrencyId) {
      const error = 'Please check item currency';
      return prepareError(error, failureCallback);
    }

    // Other validations

    callApi(
      ShipmentOrderApiEndPoints.ADD_ITEM,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const updateShipmentOrderItem = async (params, callback, failureCallback) => {
    if (!params) {
      const error = 'Please check your inputs';
      return prepareError(error, failureCallback);
    }

    if (!params.ShipmentOrderPackageId) {
      const error = 'Please check shipment order package info';
      return prepareError(error, failureCallback);
    }

    if (!params.CustomerId) {
      const error = 'Please check customer info';
      return prepareError(error, failureCallback);
    }

    if (!params.Id) {
      const error = 'Please check item id';
      return prepareError(error, failureCallback);
    }

    if (!params.Sku) {
      const error = 'Please check item sku';
      return prepareError(error, failureCallback);
    }

    if (!params.Name) {
      const error = 'Please check item name';
      return prepareError(error, failureCallback);
    }

    if (!params.ProductTypeId) {
      const error = 'Please check item product type';
      return prepareError(error, failureCallback);
    }

    if (!params.OriginCountryId) {
      const error = 'Please check item origin country';
      return prepareError(error, failureCallback);
    }

    if (Number(params.Weight) <= 0) {
      const error = 'Please check item weight unit';
      return prepareError(error, failureCallback);
    }

    if (!params.WeightUnit) {
      const error = 'Please check item weight unit';
      return prepareError(error, failureCallback);
    }

    if (Number(params.UnitPrice) <= 0) {
      const error = 'Please check item value';
      return prepareError(error, failureCallback);
    }

    if (Number(params.Quantity) <= 0) {
      const error = 'Please check item quantity';
      return prepareError(error, failureCallback);
    }

    if (!params.CurrencyId) {
      const error = 'Please check item currency';
      return prepareError(error, failureCallback);
    }

    // Other validations
    callApi(
      ShipmentOrderApiEndPoints.UPDATE_ITEM,
      ApiMethod.PUT,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const deleteShipmentOrderItem = async (params, callback, failureCallback) => {
    if (!params) {
      const error = 'Please check your inputs';
      return prepareError(error, failureCallback);
    }

    if (!params.Id) {
      const error = 'Please check shipment order item info';
      return prepareError(error, failureCallback);
    }

    // Other validations
    callApi(
      ShipmentOrderApiEndPoints.DELETE_ITEM,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const getShipmentOrder = async (id, callback, failureCallback) => {
    if (isInvalidGuid(id)) {
      const error = 'Please check shipment order item info';
      return prepareError(error, failureCallback);
    }

    // Other validations
    callApi(
      `${ShipmentOrderApiEndPoints.GET}?id=${id}`,
      ApiMethod.GET,
      {},
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const addShipmentOrderPackage = async (params, callback, failureCallback) => {
    if (!params) {
      const error = 'Please check your inputs';
      return prepareError(error, failureCallback);
    }

    if (isInvalidGuid(params.ShipmentOrderId)) {
      const error = 'Please check shipment order info';
      return prepareError(error, failureCallback);
    }
    if (isInvalidGuid(params.ToAddressId)) {
      const error = 'Please check recipient address info';
      return prepareError(error, failureCallback);
    }

    if (isEmpty(params.FullName)) {
      const error = 'Please check recipient fullname info';
      return prepareError(error, failureCallback);
    }

    if (isEmpty(params.Email)) {
      const error = 'Please check recipient email info';
      return prepareError(error, failureCallback);
    }
    if (isEmpty(params.Phone)) {
      const error = 'Please check recipient phone info';
      return prepareError(error, failureCallback);
    }

    if (isEmpty(params.WeightUnit)) {
      params.WeightUnit = -1;
    }

    if (isEmpty(params.DimensionUnit)) {
      params.DimensionUnit = -1;
    }

    if (isEmpty(params.Width)) {
      params.Width = 0;
    }

    if (isEmpty(params.Height)) {
      params.Height = 0;
    }

    if (isEmpty(params.Length)) {
      params.Length = 0;
    }

    if (isEmpty(params.Weight)) {
      params.Weight = 0;
    }

    // Other validations

    callApi(
      ShipmentOrderApiEndPoints.ADD_PACKAGE,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const editShipmentOrderPackage = async (
    params,
    callback,
    failureCallback,
  ) => {
    if (!params) {
      const error = 'Please check your inputs';
      return prepareError(error, failureCallback);
    }

    if (isInvalidGuid(params.Id)) {
      const error = 'Please check shipment order packge id';
      return prepareError(error, failureCallback);
    }

    if (isInvalidGuid(params.ShipmentOrderId)) {
      const error = 'Please check shipment order info';
      return prepareError(error, failureCallback);
    }
    if (isInvalidGuid(params.ToAddressId)) {
      const error = 'Please check recipient address info';
      return prepareError(error, failureCallback);
    }

    if (isEmpty(params.FullName)) {
      const error = 'Please check recipient fullname info';
      return prepareError(error, failureCallback);
    }

    if (isEmpty(params.Email)) {
      const error = 'Please check recipient email info';
      return prepareError(error, failureCallback);
    }
    if (isEmpty(params.Phone)) {
      const error = 'Please check recipient phone info';
      return prepareError(error, failureCallback);
    }

    if (isEmpty(params.WeightUnit)) {
      params.WeightUnit = -1;
    }

    if (isEmpty(params.DimensionUnit)) {
      params.DimensionUnit = -1;
    }

    if (isEmpty(params.Width)) {
      params.Width = 0;
    }

    if (isEmpty(params.Height)) {
      params.Height = 0;
    }

    if (isEmpty(params.Length)) {
      params.Length = 0;
    }

    if (isEmpty(params.Weight)) {
      params.Weight = 0;
    }

    // Other validations

    callApi(
      ShipmentOrderApiEndPoints.UPDATE_PACKAGE,
      ApiMethod.PUT,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  const deleteShipmentOrderPackage = async (
    params,
    callback,
    failureCallback,
  ) => {
    if (!params) {
      const error = 'Please check your inputs';
      return prepareError(error, failureCallback);
    }

    if (!params.Id) {
      const error = 'Please check shipment order package info';
      return prepareError(error, failureCallback);
    }

    // Other validations
    callApi(
      ShipmentOrderApiEndPoints.DELETE_PACKAGE,
      ApiMethod.POST,
      params,
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  return (
    <ShipmentOrderContext.Provider value={{productTypes}}>
      <ShipmentOrderContextActions.Provider
        value={{
          addShipmentOrder,
          getShipmentOrderPackage,
          getProductTypes,
          addShipmentOrderItem,
          deleteShipmentOrderItem,
          updateShipmentOrderItem,
          getShipmentOrder,
          addShipmentOrderPackage,
          editShipmentOrderPackage,
          deleteShipmentOrderPackage,
        }}
      >
        {children}
      </ShipmentOrderContextActions.Provider>
    </ShipmentOrderContext.Provider>
  );
};

export const useShipmentOrderActions = () =>
  useContext(ShipmentOrderContextActions);
export const useShipmentOrder = () => useContext(ShipmentOrderContext);

export default ShipmentOrderProvider;

ShipmentOrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
