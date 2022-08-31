import {authRouteConfig} from './auth';
import {initialUrl} from 'shared/constants/AppConst';
import {Navigate} from 'react-router-dom';
import Error403 from './errorPages/Error403';
import React from 'react';
import {errorPagesConfigs} from './errorPages';
import {authPagesConfigs} from './authPages';
import {accountPagesConfigs} from './account';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [...authPagesConfigs, ...accountPagesConfigs],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
    {
      path: '*',
      element: <Navigate to='/error-pages/error-404' />,
    },
  ]),
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
