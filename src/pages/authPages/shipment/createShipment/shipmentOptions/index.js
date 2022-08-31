import {Grid, Typography} from '@mui/material';
import AppCard from '@shipsavvy/core/AppCard';
import AppGridContainer from '@shipsavvy/core/AppGridContainer';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useParams} from 'react-router-dom';
import {isInvalidGuid} from '@shipsavvy/utility/helper/ObjectHelper';
import {useShipmentActions} from '@shipsavvy/services/apis/ShipmentProvider/ShipmentProvider';

function ShipmentOptions({shipmentOrderId}) {
  const navaigate = useNavigate();
  let orderId = '';
  if (isInvalidGuid(shipmentOrderId)) {
    const params = useParams();
    // eslint-disable-next-line no-const-assign
    orderId = params.id;
    if (isInvalidGuid(orderId)) {
      navaigate('/shipment/shipmentlist');
    }
  } else {
    orderId = shipmentOrderId;
  }

  const {getShipmentFee} = useShipmentActions();

  useEffect(() => {
    getShipmentFee(orderId, (data) => {
      console.log({data});
    });
  }, []);

  return (
    <AppCard>
      <AppGridContainer>
        <Grid item xs={12} md={12}>
          <Typography variant='h2'> Shipment Options </Typography>
          <Typography variant='subtitle1'>
            Please choose which way you want to use
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}></Grid>
      </AppGridContainer>
    </AppCard>
  );
}

ShipmentOptions.propTypes = {
  shipmentOrderId: PropTypes.string,
};

export default ShipmentOptions;
