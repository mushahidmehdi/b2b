import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';
import {useNavigate} from 'react-router-dom';

import {registration, user} from '../../../../config';

import jwtAxios, {setAuthToken} from './index';
import {fetchCustomerData} from 'redux/actions/Customer';

const JWTAuthContext = createContext();

const JWTAuthActionsContext = createContext();

const JWTAuthAuthProvider = ({children}) => {
  const [jwtAuthData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      setAuthToken(token);

      //TODO: check token and check if it is valid, if it is not go to login and get user and customer data from redux and check if they are valid

      jwtAxios
        .get(user.ME)
        .then(({data}) =>
          setJWTAuthData({
            user: data.Response,
            isLoading: false,
            isAuthenticated: true,
          }),
        )
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          }),
        );
      if (token) {
        dispatch(fetchCustomerData());
      }
    };

    getAuthUser();
  }, []);

  const signInUser = async (userFormData) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post(registration.SIGNIN, userFormData);
      if (data.Status !== 'Failure') {
        localStorage.setItem('token', data.Response.AccessToken);
        setAuthToken(data.Response.AccessToken);
        getUserMe();
        dispatch({type: FETCH_SUCCESS});
        dispatch(fetchCustomerData());
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data.ErrorMessage || 'Something went wrong',
        });
      }
    } catch (error) {
      setJWTAuthData({
        ...jwtAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: 'Something went wrong',
      });
    }
  };

  const googleLogin = async (tokenId) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post(
        '/identity/Registration/google',
        tokenId,
      );

      if (data.Status !== 'Failure') {
        localStorage.setItem('token', data.Response.AccessToken);
        setAuthToken(data.Response.AccessToken);
        getUserMe();
        dispatch(fetchCustomerData());
      } else {
        console.log('Google Login Status Fail');

        dispatch({
          type: FETCH_ERROR,
          payload: data.ErrorMessage || 'Something went wrong',
        });
      }
    } catch (error) {
      console.error(error);
      setJWTAuthData({
        ...jwtAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: 'Something went wrong',
      });
    }
    dispatch({type: FETCH_SUCCESS});
  };

  const getUserMe = async () => {
    try {
      const {data} = await jwtAxios.get(user.ME);
      setJWTAuthData({
        user: data.Response,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.eror(error);
    }
  };

  const signUpUser = async (userInfo) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post(registration.SIGNUP, userInfo);

      if (data.Status !== 'Failure') {
        localStorage.setItem('token', data.Response.AccessToken);

        setAuthToken(data.Response.AccessToken);
        const res = await jwtAxios.get(user.ME);
        setJWTAuthData({
          user: res.data.Response,
          isAuthenticated: true,
          isLoading: false,
        });
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data.ErrorMessage || 'Something went wrong',
        });
      }
    } catch (error) {
      setJWTAuthData({
        ...jwtAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.error('error:', error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const getResstPasswordToken = async (userEmail) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post(
        registration.GET_RESET_PWD_TOKEN,
        userEmail,
      );
      if (data.Status !== 'Failure') {
        dispatch({
          type: SHOW_MESSAGE,
          payload: `Password reset link has sent on ${userEmail.email}`,
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data.ErrorMessage,
        });
      }
    } catch (error) {
      console.error('error:', error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const setNewPasswordthroughEmail = async (newPassData) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post(registration.RESET_PWD, newPassData);
      if (data.Status !== 'Failure') {
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Your password has been changed successfully.',
        });
        navigate('/sigin');
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data.ErrorMessage,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: 'Something went wrong',
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider value={{...jwtAuthData}}>
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
          googleLogin,
          getResstPasswordToken,
          setNewPasswordthroughEmail,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
