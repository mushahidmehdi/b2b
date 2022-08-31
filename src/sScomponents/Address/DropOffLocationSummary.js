import {Grid, Paper, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import DeliveryPointTypeChip from './DeliveryPointTypeChip';

function DropOffLocationSummary({location}) {
  const {addressSummary} = useAddressActions();
  return (
    <Box sx={{marginY: '1em'}}>
      <Paper sx={{padding: '1em'}} elevation={3}>
        <Grid>
          <Grid item xs={12}>
            <Typography>
              <b>Name:</b>{' '}
              {location && location.DeliveryPoint
                ? location.DeliveryPoint.Name
                : ''}{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='div'>
              <b>Type:</b>
              <DeliveryPointTypeChip
                deliveryPointType={
                  location && location.DeliveryPoint
                    ? location.DeliveryPoint.DeliveryPointType
                    : ''
                }
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {' '}
              <b>Address:</b>{' '}
              {location &&
              location.DeliveryPoint &&
              location.DeliveryPoint.Address
                ? addressSummary(location.DeliveryPoint.Address)
                : ''}{' '}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

DropOffLocationSummary.propTypes = {
  location: PropTypes.object.isRequired,
};

//location
export default DropOffLocationSummary;
