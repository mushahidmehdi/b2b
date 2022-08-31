import {Alert, Divider, Grid} from '@mui/material';
import AppGridContainer from '@shipsavvy/core/AppGridContainer';
import {useAddress} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import {useCommon} from '@shipsavvy/services/apis/CommonProvider/CommonProvider';
import {
  useShipmentOrder,
  useShipmentOrderActions,
} from '@shipsavvy/services/apis/ShipmentOrderProvider/ShipmentOrderProvider';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Form, Formik} from 'formik';
import React from 'react';
import {WeightUnits} from 'shared/constants/Units';
import * as yup from 'yup';
import ProtoTypes from 'prop-types';
import SsLoading from 'sScomponents/Common/SsLoading';
import {prepareObject} from '@shipsavvy/utility/helper/ObjectHelper';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import SsTextField from 'sScomponents/Form/SsTextField';
import SsDropDownWV from 'sScomponents/Form/SsDropDownWV';

const validationSchema = yup.object({
  Sku: yup.string().required(<IntlMessages id='common.requiredField' />),
  Name: yup.string().required(<IntlMessages id='common.requiredField' />),
  ItemLink: yup.string(),
  OriginCountryId: yup
    .string()
    .required(<IntlMessages id='common.requiredField' />),
  ProductTypeId: yup
    .string()
    .required(<IntlMessages id='common.requiredField' />),
  Weight: yup.number().required(<IntlMessages id='common.requiredField' />),
  WeightUnit: yup.string().required(<IntlMessages id='common.requiredField' />),
  UnitPrice: yup.number().required(<IntlMessages id='common.requiredField' />),
  CurrencyId: yup.string().required(<IntlMessages id='common.requiredField' />),
  Quantity: yup.number().required(<IntlMessages id='common.requiredField' />),
});

const AddEditShipmentOrderItem = React.forwardRef(
  ({shipmentOrderPackageId, item, afterSubmit, cleanupCallback}, ref) => {
    const {customerId} = useCustomer();
    const {currencies} = useCommon();
    const {appCountries} = useAddress();
    const {productTypes} = useShipmentOrder();

    const packageItem = item || {};
    const initialValues = prepareObject(packageItem);
    initialValues.WeightUnit = initialValues.WeightUnit || WeightUnits[0].value;

    initialValues.CurrencyId =
      initialValues.CurrencyId ||
      (appCountries.length ? appCountries[0].Id : '');

    console.log({initialValues});

    const {addShipmentOrderItem, updateShipmentOrderItem} =
      useShipmentOrderActions();

    return !shipmentOrderPackageId || shipmentOrderPackageId == '' ? (
      <Alert severity='error'> Package is not set! </Alert>
    ) : (
      <Formik
        validationSchema={validationSchema}
        innerRef={ref}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(formData, {setSubmitting}) => {
          setSubmitting(true);
          const params = {
            ...formData,
            Id: initialValues.Id,
            ShipmentOrderPackageId: shipmentOrderPackageId,
            CustomerId: customerId,
          };

          if (!params.Id) {
            addShipmentOrderItem(
              params,
              (data) => {
                if (afterSubmit) afterSubmit(data);
                setSubmitting(false);
                if (cleanupCallback) {
                  cleanupCallback();
                }
              },
              () => {
                setSubmitting(false);
                if (cleanupCallback) {
                  cleanupCallback();
                }
              },
            );
          } else {
            updateShipmentOrderItem(
              params,
              (data) => {
                if (afterSubmit) afterSubmit(data);
                setSubmitting(false);
                if (cleanupCallback) {
                  cleanupCallback();
                }
              },
              () => {
                setSubmitting(false);
                if (cleanupCallback) {
                  cleanupCallback();
                }
              },
            );
          }
        }}
      >
        {({errors, values, setFieldValue, isSubmitting}) => {
          if (Object.keys(errors).length) {
            if (cleanupCallback) {
              cleanupCallback();
            }
          }

          return (
            <Form>
              <SsLoading open={isSubmitting} />
              <AppGridContainer spacing={4}>
                <Grid item xs={12} md={12}>
                  <SsTextField
                    fullWidth
                    name='Sku'
                    variant='outlined'
                    label='SKU*'
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SsTextField
                    fullWidth
                    name='Name'
                    variant='outlined'
                    label='Title*'
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SsTextField
                    fullWidth
                    name='ItemLink'
                    variant='outlined'
                    label='Item Link'
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SsDropDownWV
                    fullWidth
                    fieldName='ProductTypeId'
                    options={productTypes.map((productType) => {
                      return {key: productType.Name, value: productType.Id};
                    })}
                    setValue={(e, value) =>
                      setFieldValue('ProductTypeId', value)
                    }
                    value={values.ProductTypeId}
                    label='Product Type*'
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SsDropDownWV
                    fullWidth
                    fieldName='OriginCountryId'
                    options={appCountries.map((country) => {
                      return {key: country.Name, value: country.Id};
                    })}
                    setValue={(e, value) =>
                      setFieldValue('OriginCountryId', value)
                    }
                    value={values.OriginCountryId}
                    label='Country of Region*'
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SsTextField
                    fullWidth
                    name='Weight'
                    variant='outlined'
                    label='Weight*'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <SsDropDownWV
                    fullWidth
                    fieldName='WeightUnit'
                    options={WeightUnits}
                    label='Unit Kg/Lbs'
                    setValue={(e, value) => setFieldValue('WeightUnit', value)}
                    value={values.WeightUnit}
                  />
                </Grid>
                <Grid item xs={12} md={3}></Grid>
                <Grid item xs={12} md={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SsTextField
                    fullWidth
                    name='UnitPrice'
                    variant='outlined'
                    label='Price*'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <SsDropDownWV
                    fullWidth
                    fieldName='CurrencyId'
                    options={currencies.map((currency) => {
                      return {key: currency.Code, value: currency.Id};
                    })}
                    label='Currency'
                    setValue={(e, value) => setFieldValue('CurrencyId', value)}
                    value={values.CurrencyId}
                    defaultValue={initialValues.CurrencyId}
                  />
                </Grid>
                <Grid item xs={12} md={3}></Grid>
                <Grid item xs={12} md={6}>
                  <SsTextField
                    fullWidth
                    name='Quantity'
                    variant='outlined'
                    label='Quantity*'
                  />
                </Grid>
              </AppGridContainer>
            </Form>
          );
        }}
      </Formik>
    );
  },
);

AddEditShipmentOrderItem.propTypes = {
  item: ProtoTypes.object,
  shipmentOrderPackageId: ProtoTypes.string.isRequired,
  afterSubmit: ProtoTypes.func,
  cleanupCallback: ProtoTypes.func,
};

export default AddEditShipmentOrderItem;
