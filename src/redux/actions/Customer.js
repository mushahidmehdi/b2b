import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {CustomerApiEndPoints} from '@shipsavvy/services/apis/CustomerProvider/endPoints';
import {
  CUSTOMER_DATA_FETCH_ERROR,
  CUSTOMER_DATA_FETCH_REQUEST,
  CUSTOMER_DATA_FETCH_SUCCESS,
} from './../actionTypes/CustomerActionTypes';

export const customerDataFetchRequest = () => {
  return {
    type: CUSTOMER_DATA_FETCH_REQUEST,
  };
};

export const customerDataFetchSuccess = (customer) => {
  return {
    type: CUSTOMER_DATA_FETCH_SUCCESS,
    payload: customer,
  };
};

export const customerDataFetchFailure = (error) => {
  return {
    type: CUSTOMER_DATA_FETCH_ERROR,
    payload: error,
  };
};

export const fetchCustomerData = () => {
  return (dispatch) => {
    dispatch(customerDataFetchRequest);
    callApi(
      CustomerApiEndPoints.ME_CUSTOMER,
      ApiMethod.GET,
      {},
      (data) => {
        dispatch(customerDataFetchSuccess(data.Response));
      },
      (data) => {
        dispatch(customerDataFetchSuccess(data.ErrorMessage));
      },
    );
  };
};
