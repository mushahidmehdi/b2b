import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Drag from './drag';
import {Box, Button, Slide} from '@mui/material';
import DataGridTable from './gridTable';
import IntlMessages from '@shipsavvy/utility/IntlMessages';

const Index = ({productId, nextTab}) => {
  const [responseData, setResponseData] = useState([]);
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: 790,
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            height: 'auto',
          }}
        >
          <Drag productId={productId} setResponseData={setResponseData} />
          <DataGridTable productId={productId} responseData={responseData} />
        </Box>
        <Box sx={{marginBlockStart: 6}}>
          <Button
            sx={{
              fontSize: 14,
              paddingInline: 8,
            }}
            variant='contained'
            color='primary'
            type='submit'
            onClick={() => {
              nextTab();
            }}
          >
            <IntlMessages id='common.next' />
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

Index.propTypes = {
  productId: PropTypes.string,
  nextTab: PropTypes.func,
};

export default Index;
