import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Slide} from '@mui/material';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {inventory} from 'pages/authPages/Inventory/endPoints';
import FileUploader from './FileUploader';
import IntlMessages from '@shipsavvy/utility/IntlMessages';

const Index = ({productId, nextTab}) => {
  const handleFileChange = (files) => {
    console.log(files);
    if (productId) {
      const params = {
        Path: 'string',
        Status: 'Draft',
        Order: 0,
        ProductId: productId,
      };
      callApi(inventory.POST_IMG, ApiMethod.POST, params, ({Response}) => {
        console.log(Response);
      });
    }
  };
  return (
    <Box
      sx={{
        width: 790,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: 790,
            maxWidth: '100%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box>
            <FileUploader handleFileChange={handleFileChange} />
          </Box>
          <Box
            sx={{
              marginBlockStart: 8,
            }}
          >
            <Button
              sx={{
                fontSize: 14,
                paddingInline: 8,
              }}
              variant='outlined'
              color='primary'
              type='submit'
              onClick={() => nextTab()}
            >
              <IntlMessages id='common.next' />
            </Button>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

Index.propTypes = {
  productId: PropTypes.string,
  nextTab: PropTypes.func,
};

export default Index;
