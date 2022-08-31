import React from 'react';
import PropTypes from 'prop-types';
import {Box, Slide} from '@mui/material';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {inventory} from 'pages/authPages/Inventory/endPoints';
import FormWeightDimension from './FormWeight&Dimensins';

const Index = ({productId, nextTab}) => {
  const handleWeightDemension = ({
    dimenUnit,
    width,
    height,
    weightValue,
    length,
    weightUnit,
  }) => {
    if (productId) {
      const params = {
        ProductId: productId || '',
        Weight: weightValue || 0,
        WeightUnit: weightUnit || 'Kg',
        DimensionUnit: dimenUnit || 'Cm',
        Length: length || 0,
        Width: width || 0,
        Height: height || 0,
      };
      callApi(inventory.PUT_WD, ApiMethod.PUT, params, (data) => {
        console.log(data.Response);
      });
    }
  };
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box style={{width: 790, maxWidth: '100%'}}>
        <FormWeightDimension
          handleWeightDemension={handleWeightDemension}
          nextTab={nextTab}
        />
      </Box>
    </Slide>
  );
};

Index.propTypes = {
  productId: PropTypes.string,
  nextTab: PropTypes.func,
};

export default Index;
