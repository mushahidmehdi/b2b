import React from 'react';
import Box from '@mui/material/Box';
import AuthWrapper from '../AuthWrapper';
import SignupJwtAuth from './SignupJwtAuth';
import {Typography} from '@mui/material';
import GoogleAuth from '../Signin/GoogleAuth';

const Signup = () => {
  React.useEffect(() => {
    document.title = 'SignUp - ShipSavvy';
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
            {/* <AppLogo /> */}
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
              Sign Up
            </Typography>
          </Box>
          <GoogleAuth buttonName='SingUp with Google' />
        </Box>
        <SignupJwtAuth />
      </Box>
    </AuthWrapper>
  );
};

export default Signup;
