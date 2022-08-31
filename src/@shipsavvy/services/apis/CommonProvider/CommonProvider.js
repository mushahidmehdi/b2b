import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {CurrencyApiEndPoints} from './endPoints';
import {useDispatch} from 'react-redux';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {fetchError} from 'redux/actions';

const CommonContext = createContext();
const CommonContextActions = createContext();

const CommonProvider = ({children}) => {
  const dispatch = useDispatch();

  const showError = (error) => {
    dispatch(fetchError(error || 'Something went wrong'));
  };

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    getCurrencies({}, (data) => {
      setCurrencies(data.Response);
    });
  }, []);

  const getCurrencies = async (params, callback) => {
    if (!params) {
      params = {PageSize: 10000};
    }

    // Other validations

    callApi(CurrencyApiEndPoints.SEARCH, ApiMethod.POST, params, (data) => {
      if (callback) callback(data);
    });

    return true;
  };

  return (
    <CommonContext.Provider
      value={{
        currencies,
      }}
    >
      <CommonContextActions.Provider
        value={{
          showError,
          getCurrencies,
        }}
      >
        {children}
      </CommonContextActions.Provider>
    </CommonContext.Provider>
  );
};

export const useCommonActions = () => useContext(CommonContextActions);
export const useCommon = () => useContext(CommonContext);

export default CommonProvider;

CommonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
