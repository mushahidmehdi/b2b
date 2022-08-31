import React, {useImperativeHandle, useRef, useState} from 'react';
import ProtoTypes from 'prop-types';
import AddEditAddress from './AddEditAddress';
import SsModal from 'sScomponents/Common/SsModal';
import {Button} from '@mui/material';
import {useCustomerActions} from '@shipsavvy/services/apis/CustomerProvider/CustomerProvider';
import {useDispatch} from 'react-redux';
import {showMessage} from 'redux/actions';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import {useEffect} from 'react';

const AddEditCustomerAddress = React.forwardRef(
  ({id, customerId, addressId, afterSubmit}, ref) => {
    const dispatch = useDispatch();

    const [addEditAddressOpen, setAddEditAddressOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddEditAddressClose = () => {
      setAddEditAddressOpen(false);
    };

    const submitRef = useRef(null);
    const handleSubmitAddress = () => {
      if (submitRef.current) {
        setIsSubmitting(true);
        // setAddressError('');
        submitRef.current.handleSubmit();
      }
    };

    const {addCustomerAddress, updateCustomerAddress} = useCustomerActions();
    const {addressSummary} = useAddressActions();

    const afterSubmitAddress = (data) => {
      const addressSummaryText = addressSummary(data.Response);
      if (!addressId || addressId == undefined || addressId == '') {
        addCustomerAddress(
          {
            AddressId: data.Response.Id,
            CustomerId: customerId,
            Address: addressSummaryText,
          },
          (customerAddressData) => {
            dispatch(showMessage('Address was saved successfully!'));
            setAddEditAddressOpen(false);
            setIsSubmitting(false);
            if (afterSubmit)
              afterSubmit({
                Id: customerAddressData.Response.Id,
                CustomerId: customerId,
                AddressId: data.Response.Id,
                AddressEntity: data.Response,
                Address: addressSummaryText,
              });
          },
          () => {
            setIsSubmitting(false);
          },
        );
      } else {
        updateCustomerAddress(
          {
            Id: id,
            AddressId: data.Response.Id,
            CustomerId: customerId,
            Address: addressSummaryText,
          },
          () => {
            dispatch(showMessage('Address was updated successfully!'));
            setAddEditAddressOpen(false);
            setIsSubmitting(false);
            if (afterSubmit)
              afterSubmit({
                Id: id,
                CustomerId: customerId,
                AddressId: data.Response.Id,
                AddressEntity: data.Response,
                Address: addressSummaryText,
              });
          },
          () => {
            setIsSubmitting(false);
          },
        );

        // dispatch(showMessage('Address was updated successfully!'));
        // setAddEditAddressOpen(false);
        // setIsSubmitting(false);
        // if (afterSubmit)
        //   afterSubmit({
        //     Id: id,
        //     CustomerId: customerId,
        //     AddressId: addressId,
        //     AddressEntity: data,
        //     Address: addressSummaryText,
        //   });
      }
    };

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
      showAddressForm() {
        setAddEditAddressOpen(true);
      },
    }));

    // To reactivate save button
    useEffect(() => {
      setIsSubmitting(false);
    }, [id, customerId, addressId]);

    const notValidCallback = () => {
      setIsSubmitting(false);
    };

    const title =
      !addressId || addressId == undefined || addressId == ''
        ? 'Add Address'
        : 'Edit Address';
    return (
      <SsModal
        isOpen={addEditAddressOpen}
        handleClose={handleAddEditAddressClose}
        title={title}
        buttons={
          <>
            <Button
              variant='contained'
              autoFocus
              disabled={isSubmitting}
              onClick={handleSubmitAddress}
            >
              Submit
            </Button>
          </>
        }
      >
        <>
          <AddEditAddress
            address={{Id: addressId}}
            ref={submitRef}
            showSubmitButton={false}
            afterSubmit={afterSubmitAddress}
            notValidCallback={notValidCallback}
          />
        </>
      </SsModal>
    );
  },
);

AddEditCustomerAddress.propTypes = {
  afterSubmit: ProtoTypes.func,
  id: ProtoTypes.string,
  addressId: ProtoTypes.string,
  customerId: ProtoTypes.string.isRequired,
  isShowing: ProtoTypes.bool,
};
export default AddEditCustomerAddress;
