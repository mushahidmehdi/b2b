import {
  CUSTOMER_DATA_FETCH_ERROR,
  CUSTOMER_DATA_FETCH_REQUEST,
  CUSTOMER_DATA_FETCH_SUCCESS,
} from './../actionTypes/CustomerActionTypes';

const initialSettings = {};

const customerReducer = (state = initialSettings, action) => {
  const {type, payload} = action;
  switch (type) {
    case CUSTOMER_DATA_FETCH_REQUEST:
      return {};
    case CUSTOMER_DATA_FETCH_SUCCESS:
      return {
        CustomerId: payload.Id,
        FirstName: payload.FirstName,
        LastName: payload.LastName,
        Avatar: payload.Avatar,
        Apps: payload.Apps,
      };
    case CUSTOMER_DATA_FETCH_ERROR:
      return {};
    default:
      return state;
  }
};

export default customerReducer;
