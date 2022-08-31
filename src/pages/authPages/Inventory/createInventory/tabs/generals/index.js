import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/system';
import Form from './Form';
import {Slide} from '@mui/material';

const Index = ({handleProductId, nextTab, tabId}) => {
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box sx={{width: 790, maxWidth: '100%'}}>
        <Form
          handleProductId={handleProductId}
          nextTab={nextTab}
          tabId={tabId}
        />
      </Box>
    </Slide>
  );
};

Index.propTypes = {
  handleProductId: PropTypes.func,
  nextTab: PropTypes.func,
  tabId: PropTypes.any,
};

export default Index;
