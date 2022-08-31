import React from 'react';
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import AppTextField from '@shipsavvy/core/AppFormComponents/AppTextField';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Box} from '@mui/system';
import PropTypes from 'prop-types';
import {useInventory} from '@shipsavvy/utility/InventoryHook';

import {Autocomplete, Button, Typography} from '@mui/material';
import {DimensionUnits, WeightUnits} from 'shared/constants/Units';

const validationSchema = yup.object({
  weightValue: yup.number(),
  weightUnit: yup.string(),
  length: yup.number(),
  width: yup.number(),
  height: yup.number(),
  dimenUnit: yup.string(),
});

const FormWeightDimensions = ({handleWeightDemension, nextTab}) => {
  const {rowData} = useInventory();
  let dimentionsAndUnit;
  let weightAndUnit;
  let updateForm;

  if (rowData?.id) {
    dimentionsAndUnit = rowData?.dimentions?.split(' ');
    weightAndUnit = rowData?.weight?.split(' ');
    updateForm = {
      weightValue: weightAndUnit[1] ? parseFloat(weightAndUnit[1]) : '' || '',
      weightUnit: weightAndUnit[3] || '',
      length: dimentionsAndUnit[0]
        ? parseFloat(dimentionsAndUnit[0])
        : '' || '',
      width: dimentionsAndUnit[2] ? parseFloat(dimentionsAndUnit[2]) : '' || '',
      height: dimentionsAndUnit[4]
        ? parseFloat(dimentionsAndUnit[4])
        : '' || '',
      dimenUnit: dimentionsAndUnit[5] || '',
    };
  }

  const newForm = {
    weightValue: '',
    weightUnit: '',
    length: '',
    width: '',
    height: '',
    dimenUnit: '',
  };

  return (
    <Formik
      validateOnChange={true}
      initialValues={rowData?.id ? updateForm : newForm}
      validationSchema={validationSchema}
      onSubmit={(data, {setSubmitting}) => {
        setSubmitting(true);
        handleWeightDemension(data);
        nextTab();
      }}
    >
      {({values, setFieldValue, isSubmitting}) => (
        <Form
          style={{
            textAlign: 'right',
            width: 500,
            maxWidth: '100%',
            margin: '0 auto',
            paddingInline: 30,
            paddingBlock: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            justifyContent: 'flex-strart',
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          noValidate
          autoComplete='off'
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBlockEnd: -3,
            }}
          >
            <Typography variant='h4' sx={{paddingBlock: 1}} gutterBottom>
              Item Weight
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 1,
              width: '100%',
            }}
          >
            <AppTextField
              label={<IntlMessages id='shipmentDetail.weight' />}
              name='weightValue'
              sx={{
                width: '70%',
                '& .MuiInputBase-input': {
                  fontSize: 14,
                },
              }}
            />
            <Autocomplete
              defaultValue={
                !rowData.id ? console.log() : {key: values?.weightUnit}
              }
              onChange={(e, value) => {
                setFieldValue('weightUnit', value?.value);
              }}
              options={WeightUnits}
              getOptionLabel={(option) => option.key}
              style={{width: '22%'}}
              renderInput={(params) => (
                <AppTextField
                  {...params}
                  label={<IntlMessages id='common.weight' />}
                  variant='outlined'
                  name='weightUnit'
                  value={values?.weightUnit}
                />
              )}
            />
          </Box>
          <Typography
            variant='h4'
            sx={{paddingBlockStart: 3, textAlign: 'start'}}
            gutterBottom
          >
            Item Dimensions
          </Typography>

          <Autocomplete
            defaultValue={
              !rowData.id ? console.log() : {key: values?.dimenUnit}
            }
            onChange={(e, value) => {
              setFieldValue('dimenUnit', value?.value);
            }}
            options={DimensionUnits}
            getOptionLabel={(option) => option.key}
            style={{width: '40%'}}
            renderInput={(params) => (
              <AppTextField
                {...params}
                label={<IntlMessages id='common.unit' />}
                variant='outlined'
                name='dimenUnit'
                value={values?.dimenUnit}
              />
            )}
          />

          <AppTextField
            name='length'
            label={<IntlMessages id='shipmentDetail.length' />}
            value={values?.length}
            sx={{
              width: '95%',
              '& .MuiInputBase-input': {
                fontSize: 14,
              },
            }}
          />

          <AppTextField
            label={<IntlMessages id='shipmentDetail.width' />}
            name='width'
            value={values?.width}
            sx={{
              width: '95%',
              '& .MuiInputBase-input': {
                fontSize: 14,
              },
            }}
          />

          <AppTextField
            label={<IntlMessages id='shipmentDetail.height' />}
            name='height'
            value={values?.height}
            sx={{
              width: '95%',
              '& .MuiInputBase-input': {
                fontSize: 14,
              },
            }}
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

FormWeightDimensions.propTypes = {
  handleWeightDemension: PropTypes.func,
  nextTab: PropTypes.func,
};

export default FormWeightDimensions;
