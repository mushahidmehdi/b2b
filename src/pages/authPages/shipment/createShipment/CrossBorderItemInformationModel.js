import React from 'react';

import {Box} from '@mui/system';
import {Button, Typography} from '@mui/material';

const CrossBorderItemInformationModel = () => {
  return (
    <Box>
      <Box
        sx={{
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        <Typography>
          When we check the countries included in the sender and recipient
          addresses, we understand that your package will be at the
          <strong>border crossing</strong>
        </Typography>
        <Typography>
          You must enter product information on your package for border crossing
          option
        </Typography>
      </Box>
      <Box>
        <Button>Go to Shipment</Button>
        <Button>Next to Package Item</Button>
      </Box>
    </Box>
  );
};

export default CrossBorderItemInformationModel;
