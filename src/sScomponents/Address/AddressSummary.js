import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Paper, Typography} from '@mui/material';

function AddressSummary({address}) {
  return (
    <Box sx={{marginY: '1em'}}>
      <Paper sx={{padding: '1em'}} elevation={3}>
        <Grid>
          <Grid item xs={12}>
            <Typography>
              <b>Postal Code:</b> {address.PostalCode}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <b>Address Line 1:</b> {address.AddressLine1}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <b>City:</b> {address.City ? address.City.Name : ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
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
      </Paper>
    </Box>
  );
}

AddressSummary.propTypes = {
  address: PropTypes.object.isRequired,
};

export default AddressSummary;
