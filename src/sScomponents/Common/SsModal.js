import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/client';

export const SsModal = ({
  children,
  isOpen,
  handleClose,
  title,
  hideCloseButton,
  closeText,
  buttons,
  ...rest
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      {...rest}
    >
      {title && (
        <DialogTitle
          id='alert-dialog-title'
          sx={{padding: '0px', paddingBottom: '2rem'}}
        >
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h1' sx={{flexGrow: 1}}>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
        </DialogTitle>
      )}
      <DialogContent sx={{paddingTop: '10px!important'}}>
        {children}
      </DialogContent>
      <DialogActions>
        {!hideCloseButton && (
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            {closeText ? closeText : 'Close'}
          </Button>
        )}
        {buttons}
      </DialogActions>
    </Dialog>
  );
};

SsModal.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.node,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  hideCloseButton: PropTypes.bool,
  closeText: PropTypes.string,
  buttons: PropTypes.node,
};

export default SsModal;

export function showModal(props) {
  const wrapper = document.createElement('div');
  wrapper.id = `show-modal-${Math.random()}`;
  document.body.appendChild(wrapper);
  const confirmContainer = ReactDOM.createRoot(wrapper);
  const newProps = {isOpen: true, ...props};
  confirmContainer.render(<SsModal {...newProps} />);
}
