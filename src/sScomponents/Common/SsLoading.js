import {Backdrop, CircularProgress} from '@mui/material';
import React from 'react';
import ProtoTypes from 'prop-types';

const SsLoading = ({children, open}) => {
  return (
    <Backdrop
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={open}
    >
      {children ? children : <CircularProgress color='inherit' />}
    </Backdrop>
  );
};

SsLoading.propTypes = {
  children: ProtoTypes.any,
  open: ProtoTypes.bool,
};

export default SsLoading;
