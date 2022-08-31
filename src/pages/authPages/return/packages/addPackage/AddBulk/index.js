import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import FileUploader from './FileUploader';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';

const Index = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const handleFileChange = (files) => {
    console.log(files);
    // const params = {
    //   Path: 'string',
    //   Status: 'Draft',
    //   Order: 0,
    //   ProductId: productId,
    // };
    // callApi(inventory.POST_IMG, ApiMethod.POST, params, ({Response}) => {
    //   console.log(Response);
    // });
  };

  const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
      <DialogTitle sx={{m: 0, p: 2}} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[900],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
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

          <div
            style={{
              marginBlockStart: 8,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignContent: 'center',
              gap: 6,
            }}
          >
            <Button
              sx={{
                fontSize: 14,
                paddingInline: 8,
              }}
              variant='contained'
              color='primary'
              type='submit'
              onClick={() => navigate('/return/createadditem')}
              // disabled={isSubmitting}
            >
              <IntlMessages id='common.back' />
            </Button>

            <Button
              variant='outlined'
              color='primary'
              type='submit'
              sx={{
                fontSize: 14,
                paddingInline: 8,
              }}
              onClick={() => setFiltersOpen(true)}
            >
              <IntlMessages id='common.next' />
            </Button>
          </div>
        </Box>
      </Slide>
      <Dialog
        onClose={() => setFiltersOpen(false)}
        aria-labelledby='customized-dialog-title'
        open={filtersOpen}
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={() => setFiltersOpen(false)}
          sx={{
            textAlign: 'center',
            fontSize: 15,
          }}
        >
          The Documents has been successfully sent.
        </BootstrapDialogTitle>
        <DialogContent>
          <Stack direction='column' spacing={3} padding='10px'>
            <Typography variant='caption' textAlign={'center'}>
              Please follow the following link to see the results
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <a href='/return/bulkprocess'>link to process documents</a>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Box>
  );
};

Index.propTypes = {
  productId: PropTypes.string,
  nextTab: PropTypes.func,
  children: PropTypes.any,
  onClose: PropTypes.any,
};

export default Index;
