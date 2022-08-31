import React from 'react';
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Box} from '@mui/system';

import {Autocomplete, Button, Slide, TextField} from '@mui/material';
import countries from '@shipsavvy/services/db/account/countries';
import {useNavigate} from 'react-router-dom';

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

const itemType = [
  {key: 'Product 1 key', value: 'Product 1 value'},
  {key: 'Product 2 key', value: 'Product 2 value'},
  {key: 'Product 3 key', value: 'Product 3 value'},
];

const CurrencyArr = [
  {key: 'USD', value: 'usd'},
  {key: 'CAD', value: 'cad'},
];
const weightArr = [
  {key: 'Kg', value: 'kg'},
  {key: 'Ibns', value: 'ibns'},
];

const CreateAPackageItem = () => {
  const navigate = useNavigate();
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
  const {opencountry, inputcountryvalue, inputitemtypevalue, openitemtype} =
    openValue;
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
                height: 'auto',
                maxWidth: '100%',
                paddingInline: 30,
                paddingBlock: 26,
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
              <AppTextField
                name='sku'
                label={<IntlMessages id='shipment.sku' />}
                variant='outlined'
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />

              <AppTextField
                label={<IntlMessages id='common.title' />}
                name='itemTitle'
                variant='outlined'
                sx={{
                  width: '100%',
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
                options={itemType}
                getOptionLabel={(option) => option.key}
                style={{width: '100%'}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<IntlMessages id='shipment.itemType' />}
                    variant='outlined'
                  />
                )}
              />

              <Autocomplete
                opencountry={opencountry}
                onOpen={() => {
                  if (inputcountryvalue) {
                    setOpenValue({
                      ...openValue,
                      openstate: true,
                    });
                  }
                }}
                onClose={() =>
                  setOpenValue({
                    ...openValue,
                    openstate: false,
                  })
                }
                inputcountryvalue={inputcountryvalue}
                onInputChange={(e, value) => {
                  setOpenValue({
                    ...openValue,
                    inputstatevalue: value,
                  });

                  if (!value) {
                    setOpenValue({
                      ...openValue,
                      openstate: false,
                    });
                  }
                }}
                options={countries}
                getOptionLabel={(option) => option.label}
                style={{width: '100%'}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<IntlMessages id='myAddress.country' />}
                    variant='outlined'
                  />
                )}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
              >
                <AppTextField
                  label={<IntlMessages id='shipment.unitWeight' />}
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
                  label={<IntlMessages id='shipment.unitValue' />}
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
                  options={CurrencyArr}
                  getOptionLabel={(option) => option.key}
                  style={{width: '25%'}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<IntlMessages id='common.weight' />}
                      variant='outlined'
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <AppTextField
                  label={<IntlMessages id='shipment.quantity' />}
                  name='quantity'
                  variant='outlined'
                  sx={{
                    width: '75%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
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
                <Button
                  sx={{
                    fontSize: 14,
                    paddingInline: 8,
                  }}
                  variant='outlined'
                  color='primary'
                  // type='submit'
                  onClick={() => navigate('/return/createaddpackage')}
                >
                  <IntlMessages id='common.back' />
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  // type='submit'
                  // disabled={isSubmitting}
                  onClick={() => navigate('/return/addBulk')}
                  sx={{
                    fontSize: 14,
                    paddingInline: 8,
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
