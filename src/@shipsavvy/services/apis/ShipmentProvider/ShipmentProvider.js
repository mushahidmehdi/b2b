import React, {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {ShipmentOrchestratorApiEndPoints} from './endPoints';
import {useDispatch} from 'react-redux';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {fetchError} from 'redux/actions';
import {isInvalidGuid} from '@shipsavvy/utility/helper/ObjectHelper';

const ShipmentContextActions = createContext();

const ShipmentProvider = ({children}) => {
  const dispatch = useDispatch();

  const showError = (error) => {
    dispatch(fetchError(error || 'Something went wrong'));
  };

  const prepareError = (error, failureCallback) => {
    showError(error);
    if (failureCallback) failureCallback(error);
    return false;
  };

  const getShipmentFee = async (id, callback, failureCallback) => {
    if (isInvalidGuid(id)) {
      const error = 'Please check shipment order item info';
      return prepareError(error, failureCallback);
    }

    // Other validations
    callApi(
      `${ShipmentOrchestratorApiEndPoints.GET}?id=${id}`,
      ApiMethod.GET,
      {},
      (data) => {
        if (callback) callback(data);
      },
      failureCallback,
    );

    return true;
  };

  return (
    <ShipmentContextActions.Provider
      value={{
        getShipmentFee,
      }}
    >
      {children}
    </ShipmentContextActions.Provider>
  );
};

export const useShipmentActions = () => useContext(ShipmentContextActions);

export default ShipmentProvider;

ShipmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
