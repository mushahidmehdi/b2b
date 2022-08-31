import React from 'react';
import {Box, Typography} from '@mui/material';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Fonts} from 'shared/constants/AppEnums';
import ChangePasswordForm from './ChangePasswordForm';
import {Formik} from 'formik';
import * as yup from 'yup';
import {registration} from '../../../../config';
import Api, {ApiMethod} from '@shipsavvy/services/Api';
import {useDispatch} from 'react-redux';
import {showMessage} from 'redux/actions';

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  newPassword: yup
    .string()
    .required('New password required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  retypeNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 890,
      }}
    >
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: {xs: 3, lg: 5},
        }}
      >
        <IntlMessages id='common.changePassword' />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          retypeNewPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          const body = {
            OldPassword: data.oldPassword,
            NewPassword: data.newPassword,
          };
          resetForm();

          Api(registration.CHANGE_PWD, ApiMethod.POST, body, (data) => {
            if (data.Status === 'Success') {
              dispatch(showMessage('Password Change Successfully'));
            }
          });

          setSubmitting(false);
        }}
      >
        {() => <ChangePasswordForm />}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
