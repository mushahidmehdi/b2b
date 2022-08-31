import React from 'react';
import {useAuthUser} from '@shipsavvy/utility/AuthHooks';
import {Formik} from 'formik';
import * as yup from 'yup';
import PersonalInfoForm from './PersonalInfoForm';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
// import jwtAxios from '@crema/services/auth/jwt-auth';
// import {userData} from '../../../../config';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
});
const PersonalInfo = () => {
  const {user} = useAuthUser();

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={{
          ...user,
          photoURL: user.photoURL
            ? user.photoURL
            : '/assets/images/placeholder.jpg',
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, {setSubmitting}) => {
          setSubmitting(true);
          console.log(data);
          // const resp = await jwtAxios.post(userData.PUT_ME, {
          //   FirstName: 'string',
          //   LastName: 'string',
          //   Avatar: 'string',
          // });
          // console.log(resp);

          setSubmitting(false);
        }}
      >
        {({values, setFieldValue}) => {
          return (
            <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
          );
        }}
      </Formik>
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
