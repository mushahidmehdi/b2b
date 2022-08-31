import {Grid, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import AppAnimate from '@shipsavvy/core/AppAnimate';
import AppCard from '@shipsavvy/core/AppCard';

function DropOffCard({location}) {
  const {addressSummary} = useAddressActions();
  return (
    <Box sx={{marginY: '1em', minWidth: {xs: 340, sm: 520, md: 600}}}>
      <AppAnimate animation='transition.slideDownIn' delay={200}>
        <AppCard>
          <Typography variant='h2' gutterBottom>
            Drop Off Address
          </Typography>
          <Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                <b style={{marginInlineEnd: 4}}>Name: </b>{' '}
                {location && location.DeliveryPoint
                  ? location.DeliveryPoint.Name
                  : ''}{' '}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component='div' gutterBottom>
                <b style={{marginInlineEnd: 4}}>Type:</b>

                {location && location.DeliveryPoint
                  ? location.DeliveryPoint.DeliveryPointType
                  : ''}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {' '}
                <b style={{marginInlineEnd: 4}}>Address:</b>{' '}
                {location &&
                location.DeliveryPoint &&
                location.DeliveryPoint.Address
                  ? addressSummary(location.DeliveryPoint.Address)
                  : ''}{' '}
              </Typography>
            </Grid>
          </Grid>
        </AppCard>
      </AppAnimate>
    </Box>
  );
}

DropOffCard.propTypes = {
  location: PropTypes.object.isRequired,
};

//location
export default DropOffCard;
