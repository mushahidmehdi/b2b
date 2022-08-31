import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import AppCard from '@shipsavvy/core/AppCard';
import AppGridContainer from '@shipsavvy/core/AppGridContainer';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import SsDropDown from 'sScomponents/Form/SsDropDown';
import {DimensionUnits, WeightUnits} from 'shared/constants/Units';
import {CONTAINS_ALCOHOL, CONTAINS_ICEDRY} from 'shared/constants/OrderConst';

function AddEditShipmentOrderPackage({
  orderPackage,
  prevStep,
  setShipmentOrderPackage,
  showStepper,
}) {
  const paramOrderPackage = orderPackage || {};
  //Main info
  let initialInfo = {
    Id: paramOrderPackage.Id || '',
    DimensionUnit: paramOrderPackage.DimensionUnit || DimensionUnits[0].value,
    Length: paramOrderPackage.Length || '',
    Width: paramOrderPackage.Width || '',
    Height: paramOrderPackage.Height || '',
    Weight: paramOrderPackage.Weight || '',
    WeightUnit: paramOrderPackage.WeightUnit || WeightUnits[0].value,
    ConrainsAlcohol: paramOrderPackage.ConrainsAlcohol || false,
    ConrainsIceDry: paramOrderPackage.ConrainsIceDry || false,
  };

  if (!initialInfo.ConrainsAlcohol) {
    const conrainsAlcoholSetting = paramOrderPackage.Settings?.find(
      (x) => x.SettingName == CONTAINS_ALCOHOL,
    );
    initialInfo.ConrainsAlcohol =
      conrainsAlcoholSetting && conrainsAlcoholSetting.SettingValue == 'true';
  }

  if (!initialInfo.ConrainsIceDry) {
    const conrainsIceDrySetting = paramOrderPackage.Settings?.find(
      (x) => x.SettingName == CONTAINS_ICEDRY,
    );
    initialInfo.ConrainsIceDry =
      conrainsIceDrySetting && conrainsIceDrySetting.SettingValue == 'true';
  }

  const [orderPackageData, setPackageData] = useState(initialInfo);

  const {
    DimensionUnit,
    Length,
    Width,
    Height,
    Weight,
    WeightUnit,
    ConrainsAlcohol,
    ConrainsIceDry,
  } = orderPackageData;

  console.log({orderPackageData});

  const handleWeightChange = (e) => {
    setPackageData((prevState) => ({
      ...prevState,
      Weight: e.target.value,
    }));
  };

  const handleWeightUnitChange = (e, value) => {
    setPackageData((prevState) => ({
      ...prevState,
      WeightUnit: value,
    }));
  };

  const handleHeightChange = (e) => {
    setPackageData((prevState) => ({
      ...prevState,
      Height: e.target.value,
    }));
  };

  const handleWidthChange = (e) => {
    setPackageData((prevState) => ({
      ...prevState,
      Width: e.target.value,
    }));
  };

  const handleLengthChange = (e) => {
    setPackageData((prevState) => ({
      ...prevState,
      Length: e.target.value,
    }));
  };

  const handleDimensionUnitChange = (e, value) => {
    setPackageData((prevState) => ({
      ...prevState,
      DimensionUnit: value,
    }));
  };

  const handleConrainsAlcoholChange = (e) => {
    setPackageData((prevState) => ({
      ...prevState,
      ConrainsAlcohol: e.target.checked,
    }));
  };

  const handleConrainsIceDryChange = (e) => {
    setPackageData((prevState) => ({
      ...prevState,
      ConrainsIceDry: e.target.checked,
    }));
  };

  //setShipmentOrderPackage
  const submitInfo = () => {
    if (setShipmentOrderPackage) {
      setShipmentOrderPackage(orderPackageData);
    }
  };

  return (
    <AppCard>
      <AppGridContainer>
        <Grid item xs={12} md={12}>
          <Typography variant='h2'> Package Details </Typography>
          <Typography variant='subtitle1'>
            Rates are calculated base on orderPackage dimentions and weight. It
            is recommended to enter the correct weight and dimentions. If not,
            you may receive adjustment charges.
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant='h4'> Package Weight </Typography>
          <Typography variant='subtitle1'>
            Including orderPackage itself
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            type='number'
            name='Weight'
            value={Weight}
            fullWidth
            onChange={handleWeightChange}
            label={<IntlMessages id='shipmentDetail.weight' />}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <SsDropDown
            fieldName='WeightUnit'
            options={WeightUnits}
            value={WeightUnit}
            label='Unit'
            setValue={handleWeightUnitChange}
          />
        </Grid>
        <Grid item xs={12} md={7}></Grid>

        <Grid item xs={12} md={12}>
          <Typography variant='h4'> Package Dimensions </Typography>
          <Typography variant='subtitle1'>
            Including orderPackage itself
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            type='number'
            name='Length'
            value={Length}
            fullWidth
            onChange={handleLengthChange}
            label={<IntlMessages id='shipmentDetail.length' />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            type='number'
            name='Width'
            value={Width}
            fullWidth
            onChange={handleWidthChange}
            label={<IntlMessages id='shipmentDetail.width' />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            type='number'
            name='Height'
            value={Height}
            fullWidth
            onChange={handleHeightChange}
            label={<IntlMessages id='shipmentDetail.height' />}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <SsDropDown
            fieldName='DimensionUnit'
            options={DimensionUnits}
            value={DimensionUnit}
            label='Unit'
            setValue={handleDimensionUnitChange}
          />
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          {' '}
          <Typography variant='h4'> Package Contents </Typography>
          <Typography variant='subtitle1'>
            {' '}
            Please check for the related information{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormGroup>
            {' '}
            <FormControlLabel
              control={
                <Checkbox
                  checked={ConrainsAlcohol}
                  onChange={handleConrainsAlcoholChange}
                />
              }
              label='Package contains an Alcohol'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ConrainsIceDry}
                  onChange={handleConrainsIceDryChange}
                />
              }
              label='Package contains an Ice Dry'
            />
          </FormGroup>
        </Grid>
        {showStepper ? (
          <>
            <Grid item xs={12} md={6}>
              <Button onClick={() => prevStep()} variant='contained'>
                Prev to Recipient Info
              </Button>
            </Grid>

            <Grid item xs={12} md={6} sx={{textAlign: 'right'}}>
              <Button onClick={submitInfo} variant='contained'>
                Next to Package
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6} sx={{textAlign: 'right'}}>
              <Button onClick={submitInfo} variant='contained'>
                Submit
              </Button>
            </Grid>
          </>
        )}
      </AppGridContainer>
    </AppCard>
  );
}

AddEditShipmentOrderPackage.propTypes = {
  setShipmentOrderPackage: PropTypes.func,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  showStepper: PropTypes.bool,
  orderPackage: PropTypes.any,
};

export default AddEditShipmentOrderPackage;
