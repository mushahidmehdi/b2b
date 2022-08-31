import {Button, Divider, Grid, Typography} from '@mui/material';
import AppCard from '@shipsavvy/core/AppCard';
import AppGridContainer from '@shipsavvy/core/AppGridContainer';
import React, {useRef, useState} from 'react';
import RecipientMainInfo from './RecipientMainInfo';
import PropTypes from 'prop-types';
import AddressSummary from 'sScomponents/Address/AddressSummary';
import AddEditAddressModal from 'sScomponents/Address/AddEditAddressModal';
import {MyLocation} from '@mui/icons-material';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';

function RecipientInfo({nextStep, prevStep, setRecipientInfo}) {
  //Main info
  const initialInfo = {
    FullName: '',
    Email: '',
    CompanyTitle: '',
    Phone: '',
  };

  const [recipientMainInfo, setRecipientMainInfo] = useState(initialInfo);

  const [address, setAddress] = useState({});

  const {addressSummary} = useAddressActions();

  const addAddressRef = useRef(null);
  const showAddEditAddress = () => {
    if (addAddressRef.current) {
      addAddressRef.current.showAddressForm();
    }
  };

  const afterAddressSubmit = (data) => {
    setAddress(data.Response);
  };

  const submitInfo = () => {
    if (setRecipientInfo) {
      setRecipientInfo({
        ...recipientMainInfo,
        ToAddressId: address.Id,
        ToAddress: addressSummary(address),
      });
    }
    nextStep();
  };

  const recipientMainInfoChanged = (info) => {
    setRecipientMainInfo(info);
  };

  return (
    <AppCard>
      <AppGridContainer>
        <Grid item xs={12} md={12}>
          <RecipientMainInfo
            info={initialInfo}
            recipientMainInfoChanged={recipientMainInfoChanged}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <AppGridContainer spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant='h2'>
                {' '}
                Recipient Address{' '}
                <Button
                  variant='outlined'
                  color='primary'
                  size='small'
                  onClick={() => showAddEditAddress()}
                >
                  <MyLocation />
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}></Grid>

            {address && address.Id && (
              <>
                <Grid item xs={12} md={6}>
                  <AddressSummary address={address} />{' '}
                </Grid>
                <Grid item xs={12} md={6}>
                  {' '}
                </Grid>
              </>
            )}

            <Grid item xs={12} md={6} sx={{marginTop: '2rem'}}>
              <Button onClick={() => prevStep()} variant='contained'>
                Prev to Sender Info
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{textAlign: 'right', marginTop: '2rem'}}
            >
              <Button
                onClick={submitInfo}
                variant='contained'
                disabled={
                  !address ||
                  !address.Id ||
                  address.Id == '' ||
                  !recipientMainInfo ||
                  recipientMainInfo.FullName == '' ||
                  recipientMainInfo.Phone == '' ||
                  recipientMainInfo.Email == ''
                }
              >
                Next to Package Contents
              </Button>
            </Grid>

            <AddEditAddressModal
              addressId={address ? address.Id : ''}
              initialTitle={
                recipientMainInfo.FullName
                  ? `${recipientMainInfo.FullName} Address`
                  : ''
              }
              ref={addAddressRef}
              afterSubmit={afterAddressSubmit}
            />
          </AppGridContainer>
        </Grid>
      </AppGridContainer>
    </AppCard>
  );
}

RecipientInfo.propTypes = {
  setRecipientInfo: PropTypes.func,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
};

export default RecipientInfo;
