import React from 'react';
import PropTypes from 'prop-types';
import DragDropInput from './DragDropInput.js';
import {Box} from '@mui/material';
import callApi, {ApiMethod} from '@shipsavvy/services/Api.js';
import {inventory} from '../../../../endPoints';

const Index = ({productId, setResponseData}) => {
  const handleFileChange = (files) => {
    if (productId) {
      const params = {
        DocumentType: 'Certification',
        Title: files[0].name,
        Code: 'string',
        Path: 'https://google.com',
        ProductId: productId,
      };
      callApi(inventory.POST_DOC, ApiMethod.POST, params, ({Response}) => {
        setResponseData(Response);
      });
    }
  };
  return (
    <Box>
      <DragDropInput handleFileChange={(files) => handleFileChange(files)} />
    </Box>
  );
};

Index.propTypes = {
  productId: PropTypes.string,
  setResponseData: PropTypes.func,
};

export default Index;
