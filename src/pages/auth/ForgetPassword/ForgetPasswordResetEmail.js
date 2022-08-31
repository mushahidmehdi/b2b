import React from 'react';
import Button from '@mui/material/Button';
import {Form, Formik} from 'formik';
import * as yup from 'yup';

import AppInfoView from '@shipsavvy/core/AppInfoView';
import Box from '@mui/material/Box';

import IntlMessages from '@shipsavvy/utility/IntlMessages';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import {Fonts} from 'shared/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';
import {useAuthMethod} from '@shipsavvy/utility/AuthHooks';

import {useDispatch} from 'react-redux';

const validationSchema = yup.object({
  pwd: yup.string().required(<IntlMessages id='validation.passwordRequired' />),
  rePwd: yup
    .string()
    .oneOf(
      [yup.ref('pwd'), null],
      <IntlMessages id='validation.matchPassword' />,
    ),
});

const token = window.location.href.substring(1).split('=')[1];
const decodedUrlToken = decodeURIComponent(token);

const ForgetPasswordResetEmail = () => {
  const {setNewPasswordthroughEmail} = useAuthMethod();
  const dispatch = useDispatch();

  return (
    <AuthWrapper>
      <Box sx={{width: '100%'}}>
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Formik
            validateOnChange={true}
            initialValues={{
              pwd: '',
              rePwd: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              dispatch(
                setNewPasswordthroughEmail({
                  token: decodedUrlToken,
                  Password: data.pwd,
                }),
              );
              setSubmitting(false);
              resetForm();
            }}
          >
            {({isSubmitting}) => (
              <Form style={{textAlign: 'left'}} autocomplete='off'>
                <Box sx={{mb: {xs: 5, lg: 8}}}>
                  <AppTextField
                    type='password'
                    placeholder='Password'
                    name='pwd'
                    label={<IntlMessages id='common.password' />}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    variant='outlined'
                  />
                </Box>
                <Box sx={{mb: {xs: 5, lg: 8}}}>
                  <AppTextField
                    type='password'
                    placeholder='Retype Password'
                    name='rePwd'
                    label={<IntlMessages id='common.confirmPassword' />}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    variant='outlined'
                  />
                </Box>

                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    sx={{
                      fontWeight: Fonts.REGULAR,
                      textTransform: 'capitalize',
                      fontSize: 16,
                      minWidth: 160,
                    }}
                    type='submit'
                  >
                    <IntlMessages id='common.resetPassword' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>

        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default ForgetPasswordResetEmail;
