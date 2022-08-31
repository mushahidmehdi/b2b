import React from 'react';
import Box from '@mui/material/Box';
import AuthWrapper from '../AuthWrapper';
import SigninJwtAuth from './SigninJwtAuth';
import {Typography} from '@mui/material';
import GoogleAuth from './GoogleAuth';

const Signin = () => {
  React.useEffect(() => {
    document.title = 'Login - ShipSavvy';
  }, []);
  return (
    <AuthWrapper>
      <Box sx={{width: '100%'}}>
        <Box sx={{mb: {xs: 6, xl: 8}}}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              component='h2'
              sx={{
                color: ({savvy}) => savvy.primary.darkBlue,
                fontSize: 27,
                fontWeight: 800,
                // backgroundColor: ({savvy}) => savvy.neutral.whiteGrey,
                paddingBlock: 1,
                paddingInline: 3,
                borderRadius: 2,
              }}
            >
              Sign In
            </Typography>
          </Box>
          <GoogleAuth buttonName='SigIn with Google' />
        </Box>
        <SigninJwtAuth />
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
