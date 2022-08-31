import React from 'react';
import PropTypes from 'prop-types';
import {Chip} from '@mui/material';
function DeliveryPointTypeChip({deliveryPointType}) {
  return (
    <>
      {deliveryPointType && deliveryPointType != '' && (
        <Chip
          label={deliveryPointType}
          size='small'
          sx={{marginX: '1em'}}
          color={deliveryPointType == 'Warehouse' ? 'primary' : 'secondary'}
        />
      )}
    </>
  );
}

DeliveryPointTypeChip.propTypes = {
  deliveryPointType: PropTypes.string.isRequired,
};

export default DeliveryPointTypeChip;
