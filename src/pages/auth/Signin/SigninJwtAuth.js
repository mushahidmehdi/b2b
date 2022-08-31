import React from 'react';
import Button from '@mui/material/Button';
import {Checkbox} from '@mui/material';
import {Form, Formik} from 'formik';
import * as yup from 'yup';

import AppInfoView from '@shipsavvy/core/AppInfoView';
import Box from '@mui/material/Box';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {useIntl} from 'react-intl';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import {useAuthMethod} from '@shipsavvy/utility/AuthHooks';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useNavigate} from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),

  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninJwtAuth = () => {
  const navigate = useNavigate();
  const {signInUser} = useAuthMethod();
  const onGoToForgetPassword = () => {
    navigate('/forget-password', {replace: true});
  };

  const {messages} = useIntl();

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            signInUser({
              Username: data.email,
              Password: data.password,
            });
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder={messages['common.email']}
                  name='email'
                  label={<IntlMessages id='common.email' />}
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 3, xl: 4}}}>
                <AppTextField
                  type='password'
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Checkbox color='primary' sx={{ml: -3, mr: -2}} />
                    <Box
                      component='span'
                      sx={{
                        color: 'grey.600',
                        fontSize: 12,
                      }}
                    >
                      <IntlMessages id='common.rememberMe' />
                    </Box>
                  </Box>
                  <Box
                    component='span'
                    sx={{
                      color: ({savvy}) => savvy.primary.darkBlue,
                      fontSize: 10,
                      fontWeight: Fonts.MEDIUM,
                      cursor: 'pointer',
                      display: 'block',
                      textAlign: 'right',
                    }}
                    onClick={onGoToForgetPassword}
                  >
                    <IntlMessages id='common.forgetPassword' />
                  </Box>
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.BOLD,
                    fontSize: 16,
                    padding: '4px 16px 8px',
                    backgroundColor: ({savvy}) => savvy.primary.darkBlue,
                  }}
                >
                  <IntlMessages id='common.login' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.600',
        }}
      >
        <span style={{marginRight: 4, fontSize: 12}}>
          <IntlMessages id='common.dontHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: ({savvy}) => savvy.primary.darkBlue,
              textDecoration: 'none',
            },
          }}
        >
          <a href='/signup'>
            <IntlMessages id='common.signup' />
          </a>
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SigninJwtAuth;
