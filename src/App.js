import React from 'react';
import {Provider} from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AuthRoutes from '@shipsavvy/utility/AuthRoutes';
import AppContextProvider from '@shipsavvy/utility/AppContextProvider';
import AppThemeProvider from '@shipsavvy/utility/AppThemeProvider';
import AppStyleProvider from '@shipsavvy/utility/AppStyleProvider';
import AppLocaleProvider from '@shipsavvy/utility/AppLocaleProvider';
import AppLayout from '@shipsavvy/core/AppLayout';
import configureStore, {history} from 'redux/store';
import JWTAuthProvider from '@shipsavvy/services/auth/jwt-auth/JWTAuthProvider';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {SCTheme} from './@shipsavvy/utility/AppContextProvider/defaultConfig';
import AppAPIProvider from '@shipsavvy/services/apis';
import AppInfoView from '@shipsavvy/core/AppInfoView';

const store = configureStore();
const App = () => (
  <AppContextProvider>
    <Provider store={store}>
      <AppThemeProvider>
        <ThemeProvider theme={SCTheme}>
          <AppStyleProvider>
            <AppLocaleProvider>
              <BrowserRouter history={history}>
                <AppAPIProvider>
                  <JWTAuthProvider>
                    <AuthRoutes>
                      <AppInfoView />
                      <CssBaseline />
                      <AppLayout />
                    </AuthRoutes>
                  </JWTAuthProvider>
                </AppAPIProvider>
              </BrowserRouter>
            </AppLocaleProvider>
          </AppStyleProvider>
        </ThemeProvider>
      </AppThemeProvider>
    </Provider>
  </AppContextProvider>
);

export default App;
