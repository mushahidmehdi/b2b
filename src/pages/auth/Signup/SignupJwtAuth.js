import React from 'react';
import Button from '@mui/material/Button';
import {Checkbox} from '@mui/material';
import {Form, Formik} from 'formik';
import * as yup from 'yup';

import AppInfoView from '@shipsavvy/core/AppInfoView';
import Box from '@mui/material/Box';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import {useAuthMethod} from '@shipsavvy/utility/AuthHooks';
import {Fonts} from '../../../shared/constants/AppEnums';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required(<IntlMessages id='validation.firstNameRequired' />),
  lastName: yup
    .string()
    .required(<IntlMessages id='validation.lastNameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SignupJwtAuth = () => {
  const {signUpUser} = useAuthMethod();

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            firstName: '',
            lastName: '',
            password: '',
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            // console.log({
            //   Email: data.email,
            //   Password: data.password,
            //   FirstName: data.firstName,
            //   LastName: data.lastName,
            // });
            signUpUser({
              Email: data.email,
              Password: data.password,
              FirstName: data.firstName,
              LastName: data.lastName,
            });
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <Box sx={{mb: {xs: 4, xl: 5}}}>
                  {/* <AppTextField
                    label={<IntlMessages id='common.userName' />}
                    name='userName'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  /> */}
                </Box>
                <AppTextField
                  label={<IntlMessages id='common.firstName' />}
                  name='firstName'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label={<IntlMessages id='common.lastName' />}
                  name='lastName'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label={<IntlMessages id='common.email' />}
                  name='email'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  type='password'
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
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    sx={{
                      ml: -3,
                    }}
                  />
                  <Box
                    component='span'
                    sx={{
                      mr: 1,
                    }}
                  >
                    <IntlMessages id='common.iAgreeTo' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: ({savvy}) => savvy.primary.darkBlue,
                    fontWeight: Fonts.BOLD,

                    cursor: 'pointer',
                  }}
                >
                  <IntlMessages id='common.termConditions' />
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.BOLD,
                    fontSize: 16,
                    padding: '4px 16px 8px',
                    background: ({savvy}) => savvy.primary.darkBlue,
                  }}
                  type='submit'
                >
                  <IntlMessages id='common.signup' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='common.alreadyHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.BOLD,
            '& a': {
              color: ({savvy}) => savvy.primary.darkBlue,
              textDecoration: 'none',
            },
          }}
        >
          <a href='/signin'>
            <IntlMessages id='common.signIn' />
          </a>
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SignupJwtAuth;
