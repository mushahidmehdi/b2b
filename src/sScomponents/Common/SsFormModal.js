import React, {useImperativeHandle, useState} from 'react';
import ProtoTypes from 'prop-types';
import SsModal from 'sScomponents/Common/SsModal';
import {useEffect} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const SsFormModal = React.forwardRef(
  ({id, isOpen, children, submitRef}, ref) => {
    const [modalOpen, setModalOpen] = useState(isOpen || false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
      setModalOpen(false);
    };

    const handleSubmit = () => {
      if (submitRef && submitRef.current) {
        setIsSubmitting(true);
        submitRef.current.handleSubmit();
      }
    };

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
      showFormModal() {
        setModalOpen(true);
      },
      setSubmittionState(value) {
        setIsSubmitting(value);
      },
      hideFormModal() {
        setModalOpen(false);
      },
    }));

    // To reactivate save button
    useEffect(() => {
      setIsSubmitting(false);
    }, [id]);

    const title = !id || id == undefined || id == '' ? 'Add' : 'Edit';
    return (
      <SsModal
        isOpen={modalOpen}
        handleClose={handleClose}
        title={title}
        buttons={
          <>
            <LoadingButton
              loading={isSubmitting}
              variant='contained'
              autoFocus
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
          </>
        }
      >
        {children}
      </SsModal>
    );
  },
);

SsFormModal.propTypes = {
  children: ProtoTypes.node.isRequired,
  afterSubmit: ProtoTypes.func,
  id: ProtoTypes.string,
  isOpen: ProtoTypes.bool,
  submitRef: ProtoTypes.any,
};
export default SsFormModal;
