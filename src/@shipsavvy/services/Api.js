import {fetchError, showMessage} from 'redux/actions';
import configureStore from 'redux/store';
import jwtAxios from './auth/jwt-auth';

const store = configureStore();

const callApi = async (
  apiUrl,
  method,
  params,
  successCallback,
  failureCallback,
  responseCallBack,
) => {
  const response =
    method === ApiMethod.GET
      ? await jwtAxios.get(apiUrl)
      : method === ApiMethod.DELETE
      ? await jwtAxios.delete(apiUrl)
      : method === ApiMethod.PUT
      ? await jwtAxios.put(apiUrl, params)
      : await jwtAxios.post(apiUrl, params);

  if (responseCallBack) {
    responseCallBack();
  }

  if (response.status === 200) {
    if (response.data.Result) {
      if (successCallback) {
        successCallback(response.data);
      } else {
        store.dispatch(showMessage('Operation succeeded!'));
      }
    } else {
      console.log(response);
      if (failureCallback) {
        failureCallback(response.data);
      } else {
        store.dispatch(fetchError(response.data.ErrorMessage || ''));
      }
    }
  } else {
    console.log(response);
    //unauthorized
    if (response.status === 401) {
      document.location.href = '/signin';
      store.dispatch(
        fetchError('You session was timed out! please try to login again'),
      );
      //dispatch(fetchError(<IntlMessages id='common.sessionTimedOut' />));
    } else {
      // Show notification
      if (failureCallback) {
        failureCallback(response.data);
      }
    }
  }

  return response;
};

export const ApiMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

export default callApi;
