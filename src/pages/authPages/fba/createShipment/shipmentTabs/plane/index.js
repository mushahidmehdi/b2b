import {Slide} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import PlanDetail from './PlanDetail';
import PropTypes from 'prop-types';

const Index = ({prevTab, nextTab, handleShipmentList}) => {
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: 790,
          maxWidth: '100%',
          backgroundColor: '#fff',
          borderRadius: 4,
          alignItems: 'center',
        }}
      >
        <PlanDetail
          prevTab={prevTab}
          nextTab={nextTab}
          handleShipmentList={handleShipmentList}
        />
      </Box>
    </Slide>
  );
};

Index.propTypes = {
  prevTab: PropTypes.func,
  nextTab: PropTypes.func,
  handleShipmentList: PropTypes.func,
};
export default Index;
