import React, {useEffect, useRef, useState} from 'react';
import {Autocomplete, Box, Button, Slide, TextField} from '@mui/material';
import PropTypes from 'prop-types';
import {useCustomerActions} from '@shipsavvy/services/apis/CustomerProvider/CustomerProvider';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import {IntlMessagesRequired} from '@shipsavvy/utility/IntlMessagesRequired';
import AddressCard from './AddressCard';
import AppCard from '@shipsavvy/core/AppCard';
import AddEditCustomerAddress from './AddAddress';

const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';

const NewAddressRequestItem = {
  Id: 'NewCustomerAddress',
  AddressId: ADD_NEW_ADDRESS,
  Address: '+ Add a new sender address',
};

const Index = ({prevTab, nextTab, senderAddress, handleSenderAdress}) => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedCustomerAddress, setSelectedCustomerAddress] = useState({
    Address: 'Choose a Sender Address',
  });

  const {getCustomerAddresses} = useCustomerActions();
  const {customerId} = useCustomer();
  const {getAddress} = useAddressActions();

  useEffect(() => {
    getCustomerAddresses({CustomerId: customerId, PageSize: 10000}, (data) => {
      var addresses = data.Response;
      addresses.push(NewAddressRequestItem);
      setUserAddresses(addresses);
    });
  }, []);

  const customerAddressRef = useRef();

  useEffect(() => {
    if (selectedAddressId === ADD_NEW_ADDRESS) {
      setSelectedAddress({});
      if (customerAddressRef.current) {
        customerAddressRef.current.showAddressForm();
      }
    } else if (selectedAddressId != undefined && selectedAddressId != '') {
      getAddress(selectedAddressId, (data) => {
        setSelectedAddress(data.Response);
      });
    }
  }, [selectedAddressId]);

  const afterSubmit = (data) => {
    setUserAddresses([
      ...userAddresses.slice(0, userAddresses.length - 1),
      data,
      NewAddressRequestItem,
    ]);
    setSelectedAddressId(data.AddressId);
    setSelectedCustomerAddress(data);
  };

  function isObjectEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }
  useEffect(() => {
    isObjectEmpty(selectedAddress) && handleSenderAdress(selectedAddress);
  }, [selectedAddress]);

  console.log(selectedAddress);

  return (
    <>
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Box
          sx={{
            minWidth: {xs: 340, sm: 520, md: 600},
            backgroundColor: '#fff',
            paddingBlock: 4,
            paddingInline: 4,
            borderRadius: 4,
          }}
        >
          {/* <Slide direction='right' in mountOnEnter unmountOnExit>
          {' '}
        </Slide> */}
          <AppCard>
            <Autocomplete
              value={selectedCustomerAddress}
              fullWidth={true}
              onChange={(e, value) => {
                setSelectedCustomerAddress(value);
                if (value != null) {
                  setSelectedAddressId(value.AddressId);
                } else {
                  setSelectedAddressId('');
                }
              }}
              onInputChange={(e, value) => {
                if (!value) setSelectedAddress({});
              }}
              options={userAddresses}
              getOptionLabel={(option) =>
                option.Address == null ? option.AddressId : option.Address
              }
              style={{width: '100%'}}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label={
                    <IntlMessagesRequired id='shipment.selectSenderAddress' />
                  }
                  variant='outlined'
                />
              )}
            />
          </AppCard>

          {senderAddress && senderAddress.Id ? (
            <AddressCard address={senderAddress} />
          ) : selectedAddress && selectedAddress.Id ? (
            <AddressCard address={selectedAddress} />
          ) : (
            ''
          )}
          <Box
            sx={{
              marginBlockStart: 6,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button
              variant='outlined'
              sx={{paddingInline: 9}}
              onClick={() => prevTab()}
            >
              Back
            </Button>{' '}
            <Button
              variant='contained'
              sx={{paddingInline: 9}}
              onClick={() => nextTab()}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Slide>

      <AddEditCustomerAddress
        customerId={customerId}
        ref={customerAddressRef}
        afterSubmit={afterSubmit}
      />
    </>
  );
};

Index.propTypes = {
  nextStep: PropTypes.func,
  setSenderInfo: PropTypes.func,
  prevTab: PropTypes.func,
  nextTab: PropTypes.func,
  senderAddress: PropTypes.object,
  handleSenderAdress: PropTypes.func,
};
export default Index;
