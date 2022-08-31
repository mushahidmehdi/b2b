import React, {useEffect, useRef, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField} from '@mui/material';
import PropTypes from 'prop-types';
import {useCustomerActions} from '@shipsavvy/services/apis/CustomerProvider/CustomerProvider';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import AddEditCustomerAddress from 'sScomponents/Address/AddEditCustomerAddress';
import {IntlMessagesRequired} from '@shipsavvy/utility/IntlMessagesRequired';
import AddressSummary from 'sScomponents/Address/AddressSummary';
import SsItem from 'sScomponents/Common/SsItem';

const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';

const NewAddressRequestItem = {
  Id: 'NewCustomerAddress',
  AddressId: ADD_NEW_ADDRESS,
  Address: '+ Add a new sender address',
};

const CreatePackageForm = ({nextStep, setSenderInfo, fromAddressId}) => {
  // Sender Address
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(
    fromAddressId || '',
  );
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedCustomerAddress, setSelectedCustomerAddress] = useState({
    Address: 'Please choose previous address or create new one..',
  });

  // Drop Off location
  // const [dropOffLocationId, setDropOffLocationId] = useState(
  //   deliveryPointId || '',
  // );

  const {getCustomerAddresses} = useCustomerActions();
  const {customerId} = useCustomer();
  const {getAddress, addressSummary} = useAddressActions();

  useEffect(() => {
    getCustomerAddresses({CustomerId: customerId, PageSize: 10000}, (data) => {
      var addresses = data.Response;
      addresses.push(NewAddressRequestItem);
      setUserAddresses(addresses);

      if (fromAddressId && fromAddressId != '') {
        const customerAddress = addresses.find(
          (x) => x.AddressId == fromAddressId,
        );
        if (!customerAddress) {
          setSelectedCustomerAddress(customerAddress);
        }
      }
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

  // const setDropOffLocation = (dropOffLocation) => {
  //   setDropOffLocationId(dropOffLocation.DeliveryPointId);
  // };

  const senderInfoCompleted = () => {
    setSenderInfo({
      FromAddressId: selectedAddressId,
      FromAddress: addressSummary(selectedAddress),
    });
    nextStep();
  };

  return (
    <>
      <Box sx={{minWidth: '80%'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SsItem>
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

              {selectedAddress && selectedAddress.Id && (
                <AddressSummary address={selectedAddress} />
              )}
            </SsItem>
          </Grid>
          {selectedAddressId && selectedAddressId != '' && (
            <Grid item xs={12}>
              <SsItem sx={{textAlign: 'right'}}>
                <Button
                  onClick={senderInfoCompleted}
                  variant='contained'
                  disabled={!selectedAddressId || selectedAddressId == ''}
                >
                  Next to Recipient Address
                </Button>
              </SsItem>
            </Grid>
          )}
        </Grid>
      </Box>

      <AddEditCustomerAddress
        customerId={customerId}
        ref={customerAddressRef}
        afterSubmit={afterSubmit}
      />
    </>
  );
};

CreatePackageForm.propTypes = {
  nextStep: PropTypes.func,
  setSenderInfo: PropTypes.func,
  fromAddressId: PropTypes.string,
};
export default CreatePackageForm;
