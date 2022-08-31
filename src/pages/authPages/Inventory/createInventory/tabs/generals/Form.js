import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import PropTypes from 'prop-types';
import {Autocomplete, Button} from '@mui/material';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {inventory} from '../../../endPoints/index';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import {useInventory} from '@shipsavvy/utility/InventoryHook';

const validationSchema = yup.object({
  sku: yup.string().required(<IntlMessages id='validation.inventory.sku' />),
  title: yup
    .string()
    .required(<IntlMessages id='validation.inventory.title' />),
  itemType: yup
    .string()
    .required(<IntlMessages id='validation.inventory.itemType' />),
  status: yup.string(),
});

const inventoryStatus = [
  {key: 'Draft', value: 'Draft'},
  {key: 'Active', value: 'Active'},
  {key: 'Passive', value: 'Passive'},
  {key: 'Deleted', value: 'Deleted'},
];

const Index = ({handleProductId, nextTab}) => {
  const [openValue, setOpenValue] = useState({
    inputitemtypevalue: '',
    productType: [],
    productDefaultTypeId: '',
    productDefaultType: '',
  });
  const {customerId} = useCustomer();
  const {rowData} = useInventory();
  const {
    inputitemtypevalue,
    productType,
    productDefaultType,
    productDefaultTypeId,
  } = openValue;

  useEffect(() => {
    setOpenValue((prevState) => ({
      ...prevState,
      productDefaultType: rowData.type,
    }));
  }, [rowData, rowData.type]);

  useEffect(() => {
    const getProductTypeId = () => {
      const selecteObj = productType?.find(
        (obj) => obj.Name === productDefaultType,
      );
      if (selecteObj !== undefined) {
        setOpenValue((prev) => ({
          ...prev,
          productDefaultTypeId: selecteObj['Id'],
        }));
      }
    };
    getProductTypeId();
  }, [productType, rowData]);

  useEffect(() => {
    const getProductType = async () => {
      const params = {
        Search: inputitemtypevalue,
      };
      await callApi(inventory.PROD_TYPE, ApiMethod.POST, params, (data) => {
        if (data.Status === 'Success') {
          setOpenValue((prevState) => ({
            ...prevState,
            productType: data.Response,
          }));
        }
      });
    };
    getProductType();
  }, [inputitemtypevalue]);

  const postInventory = (data) => {
    if (customerId) {
      const params = {
        Sku: data.sku,
        Name: data.title,
        ProductTypeId: data.itemType,
        Status: data.status,
        CustomerId: customerId,
      };

      if (data.Id) {
        params['Id'] = data.Id;
        delete params['CustomerId'];
        callApi(inventory.UPDATE_PROD, ApiMethod.PUT, params, ({Response}) => {
          handleProductId(Response.Id);
        });
      } else {
        callApi(inventory.Add_PROD, ApiMethod.POST, params, ({Response}) => {
          handleProductId(Response.Id);
        });
      }
    }
  };

  const updateForm = {
    Id: rowData?.id ? rowData?.id : '',
    sku: rowData?.sku ? rowData?.sku : '',
    title: rowData?.title ? rowData?.title : '',
    itemType: rowData?.type ? productDefaultTypeId : '',
    status: rowData?.status ? rowData?.status : '',
  };

  const newForm = {
    sku: '',
    title: '',
    itemType: '',
    status: '',
  };

  return (
    <Formik
      validateOnChange={true}
      initialValues={rowData.id ? updateForm : newForm}
      validationSchema={validationSchema}
      onSubmit={(data, {setSubmitting}) => {
        setSubmitting(true);
        postInventory(data);
        nextTab();
        // setSubmitting(false);
      }}
      enableReinitialize
    >
      {({isSubmitting, setFieldValue, values}) => (
        <Form
          style={{
            textAlign: 'right',
            width: 500,
            maxWidth: '100%',
            margin: '0 auto',
            height: 'auto',
            paddingInline: 30,
            paddingBlock: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          noValidate
          autoComplete='off'
        >
          <AppTextField
            name='sku'
            label={<IntlMessages id='inventory.sku' />}
            variant='outlined'
            sx={{
              width: '100%',
              marginBlockStart: 5,
              '& .MuiInputBase-input': {
                fontSize: 14,
              },
            }}
          />

          <AppTextField
            label={<IntlMessages id='inventory.title' />}
            name='title'
            variant='outlined'
            sx={{
              width: '100%',
              '& .MuiInputBase-input': {
                fontSize: 14,
              },
            }}
          />

          <Autocomplete
            defaultValue={!rowData.id ? console.log() : {Name: rowData?.type}}
            onInputChange={(e, value) => {
              setOpenValue((prev) => ({
                ...prev,
                inputitemtypevalue: value,
              }));
            }}
            onChange={(e, value) => {
              setFieldValue('itemType', value?.Id);
            }}
            options={productType}
            getOptionLabel={(option) => option.Name}
            style={{width: '100%'}}
            renderInput={(params) => (
              <AppTextField
                {...params}
                label={<IntlMessages id='shipment.itemType' />}
                variant='outlined'
                name='itemType'
                value={values.itemType}
              />
            )}
          />

          <Autocomplete
            defaultValue={
              !rowData.id
                ? console.log()
                : {key: values.status, value: values.status}
            }
            onInputChange={(e, value) => {
              setOpenValue((prev) => ({
                ...prev,
                inputitemtypevalue: value,
              }));
            }}
            onChange={(e, value) => {
              setFieldValue('status', value?.value);
            }}
            options={inventoryStatus}
            getOptionLabel={(option) => option.key}
            style={{width: '100%'}}
            renderInput={(params) => (
              <AppTextField
                {...params}
                label={<IntlMessages id='inventory.status' />}
                variant='outlined'
                name='status'
                value={values.status}
              />
            )}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignContent: 'center',
              gap: 6,
            }}
          >
            {rowData.id ? (
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
                <IntlMessages id='common.update' />
              </Button>
            ) : (
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
                <IntlMessages id='common.save&next' />
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

Index.propTypes = {
  handleProductId: PropTypes.func,
  nextTab: PropTypes.func,
  tabId: PropTypes.any,
};
export default Index;

// defaultValue={
//   !values.status
//     ? console.log()
//     : {Name: values.itemType, value: values.itemType}
// }
// defaultValue={
//   !values.status
//     ? console.log()
//     : {key: values.status, value: values.status}
// }
// initialValues={{
//   sku: rowData?.sku ? rowData?.sku : '',
//   title: rowData?.title ? rowData?.title : '',
//   itemType: rowData?.type ? rowData?.type : '',
//   status: rowData?.status ? rowData?.status : '',
// }}
