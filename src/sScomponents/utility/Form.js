import React from 'react';
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Box} from '@mui/system';

import {Autocomplete, Button, Grid, TextField} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import countries from '@shipsavvy/services/db/account/countries';

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
      {({isSubmitting}) => (
        <Form
          style={{
            textAlign: 'right',
            width: '70vh',
            height: '89vh',
            maxWidth: '100%',
            paddingInline: 30,
            paddingBlock: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            justifyContent: 'space-around',
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
            label={<IntlMessages id='shipment.itemTitle' />}
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

          <Grid
            sx={{
              textAlign: 'start',
              color: 'blue',
              textDecoration: 'underline',
              position: 'relative',
              marginBlock: 3,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <AddRoundedIcon
              sx={{
                color: 'rgb(11,0,128)',
                fontSize: 17,
                position: 'absolute',
              }}
            />
            <a style={{color: 'rgb(11,0,128)', paddingInlineStart: 16}} href=''>
              Add additional information
            </a>
          </Grid>

          <Box sx={{mb: {xs: 5, xl: 8}}}>
            <AppTextField
              name='moreCode'
              label={<IntlMessages id='shipment.EAN/ASIN/MoreCode' />}
              variant='outlined'
              sx={{
                width: '100%',
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
              variant='contained'
              color='primary'
              type='submit'
              disabled={isSubmitting}
            >
              <IntlMessages id='shipment.saveItem' />
            </Button>

            <Button
              variant='outlined'
              color='primary'
              type='submit'
              disabled={isSubmitting}
              sx={{
                fontSize: 14,
              }}
            >
              <IntlMessages id='shipment.nextToPackageDetail' />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAPackageItem;
