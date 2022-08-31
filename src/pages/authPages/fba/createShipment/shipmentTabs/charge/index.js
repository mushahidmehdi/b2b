import {Slide} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import Charges from './Charges';
import PropTypes from 'prop-types';

const index = ({prevTab, nextTab}) => {
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: 790,
          maxWidth: '100%',
          backgroundColor: '#fff',
          borderRadius: 4,
        }}
      >
        <Charges prevTab={prevTab} nextTab={nextTab} />
      </Box>
    </Slide>
  );
};

index.propTypes = {
  prevTab: PropTypes.func,
  nextTab: PropTypes.func,
};

export default index;
