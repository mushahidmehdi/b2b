import {Grid, TextField, Typography} from '@mui/material';
import AppGridContainer from '@shipsavvy/core/AppGridContainer';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import ProtoTypes from 'prop-types';
import * as yup from 'yup';

const mainInfoValidationSchema = yup.object({
  FullName: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.fullName' />),
  CompanyTitle: yup.string(),
  Email: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.email' />),
  Phone: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.phone' />),
});

function RecipientMainInfo({info, recipientMainInfoChanged}) {
  const [mainInfo, setMainInfo] = useState(info || {});
  const {FullName, CompanyTitle, Email, Phone} = mainInfo;

  useEffect(() => {
    recipientMainInfoChanged(mainInfo);
  }, [FullName, CompanyTitle, Email, Phone]);

  const handleFullnameChange = (e) => {
    setMainInfo((prevState) => ({
      ...prevState,
      FullName: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setMainInfo((prevState) => ({
      ...prevState,
      Email: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    setMainInfo((prevState) => ({
      ...prevState,
      Phone: e.target.value,
    }));
  };

  const handleCompanyTitleChange = (e) => {
    setMainInfo((prevState) => ({
      ...prevState,
      CompanyTitle: e.target.value,
    }));
  };

  return (
    <Grid item xs={12} md={12}>
      <Formik
        validateOnChange={true}
        enableReinitialize={true}
        validateOnBlur={true}
        validationSchema={mainInfoValidationSchema}
        initialValues={mainInfo}
        onSubmit={(data, {setSubmitting}) => {
          setSubmitting(true);
          setMainInfo(data);
          recipientMainInfoChanged(data);
          setSubmitting(false);
        }}
      >
        {(form) => {
          return (
            <Form autoComplete='off'>
              <AppGridContainer spacing={4}>
                <Grid item xs={12} md={12}>
                  <Typography variant='h2'> Main Info</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name='FullName'
                    value={FullName}
                    fullWidth
                    onChange={handleFullnameChange}
                    label={<IntlMessages id='common.fullName' />}
                    helperText={
                      form.touched && form.errors.FullName
                        ? form.errors.FullName
                        : ''
                    }
                    error={
                      form.touched &&
                      form.errors.FullName != undefined &&
                      form.errors.FullName != ''
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='CompanyTitle'
                    value={CompanyTitle}
                    fullWidth
                    onChange={handleCompanyTitleChange}
                    label={<IntlMessages id='common.companyTitle' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='Email'
                    value={Email}
                    fullWidth
                    onChange={handleEmailChange}
                    label={<IntlMessages id='common.email' />}
                    helperText={
                      form.touched && form.errors.Email ? form.errors.Email : ''
                    }
                    error={
                      form.touched &&
                      form.errors.Email != undefined &&
                      form.errors.Email != ''
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='Phone'
                    value={Phone}
                    fullWidth
                    onChange={handlePhoneChange}
                    label={<IntlMessages id='common.phone' />}
                    helperText={
                      form.touched && form.errors.phone ? form.errors.phone : ''
                    }
                    error={
                      form.touched &&
                      form.errors.phone != undefined &&
                      form.errors.phone != ''
                    }
                  />
                </Grid>
              </AppGridContainer>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
}

RecipientMainInfo.propTypes = {
  info: ProtoTypes.object,
  recipientMainInfoChanged: ProtoTypes.func,
};

export default RecipientMainInfo;
