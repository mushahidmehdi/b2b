import {Slide} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import CollectionType from './CollectionType';

const index = ({prevTab, nextTab}) => {
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: 790,
          // maxWidth: '100%',
          backgroundColor: '#fff',
          borderRadius: 4,
        }}
      >
        <CollectionType prevTab={prevTab} nextTab={nextTab} />
      </Box>
    </Slide>
  );
};

index.propTypes = {
  prevTab: PropTypes.func,
  nextTab: PropTypes.func,
};

export default index;
