import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from '@mui/material';
import AppAnimate from '@shipsavvy/core/AppAnimate';
import AppCard from '@shipsavvy/core/AppCard';

function Address({address}) {
  return (
    <Box sx={{marginY: '1em'}}>
      <AppAnimate animation='transition.slideDownIn' delay={200}>
        <AppCard>
          {address.dropOfAddressWithOutChange ? (
            <Typography variant='h2' gutterBottom>
              Drop-Off Address (Free of Charge)
            </Typography>
          ) : address.dropOfAddressWithChange ? (
            <Typography variant='h2' gutterBottom>
              Sent Via Courier {address?.charges}
            </Typography>
          ) : (
            <Typography variant='h2' gutterBottom>
              Sender Address Details
            </Typography>
          )}

          <Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                <b>Postal Code:</b> {address?.PostalCode}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                <b>Address:</b> {address?.AddressLine1}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                <b>City:</b> {address.City ? address.City.Name : ''}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                <b>Province/State:</b>{' '}
                {address.Province ? address.Province.Name : ''}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <b>Country:</b> {address.Country ? address.Country.Name : ''}
              </Typography>
            </Grid>
          </Grid>
        </AppCard>
      </AppAnimate>
    </Box>
  );
}

Address.propTypes = {
  address: PropTypes.object.isRequired,
};

export default Address;
