import React from 'react';
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Box} from '@mui/system';

import {
  Autocomplete,
  Button,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
// import countries from '@shipsavvy/services/db/account/countries';

const validationSchema = yup.object({
  sku: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.sku' />),
  title: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.productTitle' />),
  itemType: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.itemType' />),
  country: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.originCountry' />),
  unitWeight: yup.string(),
  unitValue: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.unitValue' />),
  quantity: yup
    .string()
    .required(<IntlMessages id='validation.createPackage.quantity' />),
  moreCode: yup.string(),
});

const clientTitle = [
  {key: 'Mr.', value: 'Mr.'},
  {key: 'Mrs', value: 'Mrs'},
  {key: 'Miss', value: 'Miss'},
];

const CurrencyArr = [
  {key: 'cm', value: 'cm'},
  {key: 'mm', value: 'mm'},
];
const weightArr = [
  {key: 'Kg', value: 'kg'},
  {key: 'Ibns', value: 'ibns'},
];

const CreateAPackageItem = () => {
  const [openValue, setOpenValue] = React.useState({
    opencountry: 'false',
    inputcountryvalue: '',
    openitemtype: 'false',
    inputitemtypevalue: '',
    openweight: 'false',
    inputweightvalue: '',
    opencurrencytype: 'false',
    inputcurrencyvalue: '',
  });
  const navigate = useNavigate();
  const {inputcountryvalue, inputitemtypevalue, openitemtype} = openValue;
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Formik
          validateOnChange={true}
          initialValues={{
            sku: '',
            itemTitle: '',
            itemType: '',
            country: '',
            unitWeight: '',
            unitVlue: '',
            quantity: '',
            moreCode: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            // submit api
            setSubmitting(false);
          }}
        >
          {() => (
            <Form
              style={{
                textAlign: 'right',
                width: '70vh',
                height: '89vh',
                maxWidth: '100%',
                paddingInline: 20,
                paddingBlock: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                justifyContent: 'space-around',
                backgroundColor: '#fff',
                borderRadius: 7,
              }}
              noValidate
              autoComplete='off'
            >
              <Typography
                gutterBottom
                variant='h4'
                sx={{
                  textAlign: 'center',
                }}
              >
                Add Return Package
              </Typography>
              <AppTextField
                name='trackingId'
                label={<IntlMessages id='return.packageCode' />}
                variant='outlined'
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
              <AppTextField
                label={<IntlMessages id='return.trackingId' />}
                name='trackingId'
                variant='outlined'
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
              <AppTextField
                label={<IntlMessages id='return.trackingCode' />}
                name='trackingCode'
                variant='outlined'
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
              <Autocomplete
                onInputChange={(e, value) => {
                  setOpenValue({
                    ...openValue,
                    inputitemtypevalue: value,
                  });

                  if (!value) {
                    setOpenValue({
                      ...openValue,
                      openitemtype: false,
                    });
                  }
                }}
                options={clientTitle}
                getOptionLabel={(option) => option.key}
                style={{width: '100%'}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<IntlMessages id='return.clientTitle' />}
                    variant='outlined'
                  />
                )}
              />
              <AppTextField
                label={<IntlMessages id='return.clientCode' />}
                name='trackingCode'
                variant='outlined'
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
              <AppTextField
                label={<IntlMessages id='return.importedRecord' />}
                name='trackingCode'
                variant='outlined'
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
              >
                <AppTextField
                  label={<IntlMessages id='return.weight' />}
                  name='Unit Value'
                  variant='outlined'
                  sx={{
                    width: '75%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />

                <Autocomplete
                  openitemtype={openitemtype}
                  onOpen={() => {
                    if (inputcountryvalue) {
                      setOpenValue({
                        ...openValue,
                        openitemtype: true,
                      });
                    }
                  }}
                  onClose={() =>
                    setOpenValue({
                      ...openValue,
                      openitemtype: false,
                    })
                  }
                  inputitemtypevalue={inputitemtypevalue}
                  onInputChange={(e, value) => {
                    setOpenValue({
                      ...openValue,
                      inputitemtypevalue: value,
                    });

                    if (!value) {
                      setOpenValue({
                        ...openValue,
                        openitemtype: false,
                      });
                    }
                  }}
                  options={weightArr}
                  getOptionLabel={(option) => option.key}
                  style={{width: '25%'}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<IntlMessages id='shipment.kg/Ibns' />}
                      variant='outlined'
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
              >
                <AppTextField
                  label={<IntlMessages id='return.length' />}
                  name='unitValue'
                  variant='outlined'
                  sx={{
                    width: '75%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />

                <Autocomplete
                  inputitemtypevalue={inputitemtypevalue}
                  onInputChange={(e, value) => {
                    setOpenValue({
                      ...openValue,
                      inputitemtypevalue: value,
                    });

                    if (!value) {
                      setOpenValue({
                        ...openValue,
                        openitemtype: false,
                      });
                    }
                  }}
                  options={CurrencyArr}
                  getOptionLabel={(option) => option.key}
                  style={{width: '25%'}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<IntlMessages id='return.icmCm' />}
                      variant='outlined'
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
              >
                <AppTextField
                  label={<IntlMessages id='return.width' />}
                  name='unitValue'
                  variant='outlined'
                  sx={{
                    width: '75%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />

                <Autocomplete
                  inputitemtypevalue={inputitemtypevalue}
                  onInputChange={(e, value) => {
                    setOpenValue({
                      ...openValue,
                      inputitemtypevalue: value,
                    });

                    if (!value) {
                      setOpenValue({
                        ...openValue,
                        openitemtype: false,
                      });
                    }
                  }}
                  options={CurrencyArr}
                  getOptionLabel={(option) => option.key}
                  style={{width: '25%'}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<IntlMessages id='return.icmCm' />}
                      variant='outlined'
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
              >
                <AppTextField
                  label={<IntlMessages id='return.height' />}
                  name='unitValue'
                  variant='outlined'
                  sx={{
                    width: '75%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />

                <Autocomplete
                  inputitemtypevalue={inputitemtypevalue}
                  onInputChange={(e, value) => {
                    setOpenValue({
                      ...openValue,
                      inputitemtypevalue: value,
                    });

                    if (!value) {
                      setOpenValue({
                        ...openValue,
                        openitemtype: false,
                      });
                    }
                  }}
                  options={CurrencyArr}
                  getOptionLabel={(option) => option.key}
                  style={{width: '25%'}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<IntlMessages id='return.icmCm' />}
                      variant='outlined'
                    />
                  )}
                />
              </Box>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: 6,
                }}
              >
                {/* <Button
              sx={{
                fontSize: 14,
                paddingInline: 8,
              }}
              variant='contained'
              color='primary'
              type='submit'
              disabled={isSubmitting}
            >
              <IntlMessages id='common.back' />
            </Button> */}

                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  // disabled={isSubmitting}
                  onClick={() => navigate('/return/createadditem')}
                  sx={{
                    fontSize: 14,
                    paddingInline: 14,
                  }}
                >
                  <IntlMessages id='common.next' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Slide>
  );
};

export default CreateAPackageItem;
