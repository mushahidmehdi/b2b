import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';

import signuplogo from '../../assets/icon/signuplogo.svg';
// import {Image} from 'mui-image';

const AuthWrapper = ({children}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          minHeight: {xs: 320, sm: 450},
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: {xs: '100%', sm: '50%', lg: '60%'},
            position: 'relative',
            padding: {xs: 5, lg: 10},
            display: {xs: 'none', sm: 'flex'},
            alignItems: {sm: 'center'},
            justifyContent: {sm: 'center'},
            flexDirection: {sm: 'column'},
            backgroundColor: ({savvy}) => savvy.primary.darkBlue,
            color: ({savvy}) => savvy.neutral.white,

            fontSize: 14,
          }}
        >
          <Box
            sx={{
              maxWidth: 320,
              background: '#005AD1',
            }}
          >
            <Box
              component='img'
              sx={{
                maxHeight: {xs: 233, md: 167},
                maxWidth: {xs: 350, md: 250},
              }}
              alt='ShipSavvy White Logo'
              src={signuplogo}
            />

            <Typography>
              Become a member or SignUp to benefit from ShipSavvy privileges and
              opportunities.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: {xs: '100%', sm: '50%', lg: '40%'},
            padding: {xs: 5, lg: 10},
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </Card>
    </Box>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
