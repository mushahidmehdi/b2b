import React, {useImperativeHandle, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import AddEditAddress from './AddEditAddress';
import SsModal from 'sScomponents/Common/SsModal';
import {Button} from '@mui/material';
import {useEffect} from 'react';

const AddEditAddressModal = React.forwardRef(
  ({addressId, initialTitle, afterSubmit, isOpen}, ref) => {
    const [addEditAddressOpen, setAddEditAddressOpen] = useState(
      isOpen || false,
    );
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

    const afterSubmitAddress = (data) => {
      if (afterSubmit) {
        afterSubmit(data);
      }
      setIsSubmitting(false);
      setAddEditAddressOpen(false);
    };

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
      showAddressForm() {
        setAddEditAddressOpen(true);
      },
    }));

    const notValidCallback = () => {
      setIsSubmitting(false);
    };

    // To reactivate save button
    useEffect(() => {
      setIsSubmitting(false);
    }, [addressId]);

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
            address={{Id: addressId, Title: initialTitle}}
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

AddEditAddressModal.propTypes = {
  afterSubmit: PropTypes.func,
  addressId: PropTypes.string,
  isOpen: PropTypes.bool,
  initialTitle: PropTypes.string,
};
export default AddEditAddressModal;
