import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Dialog, DialogActions} from '@mui/material';

const BootstrapDialogTitle = (props) => {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingInlineEnd: 10,
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[900],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

function ShipSavvyModal({
  children,
  title,
  setShipmentItem,
  openModal,
  btnTitle,
}) {
  const handleClose = () => {
    setShipmentItem(() => ({
      openModal: false,
    }));
  };

  return (
    <Dialog open={openModal} onClose={handleClose} fullScreen>
      <BootstrapDialogTitle onClose={handleClose}>{title}</BootstrapDialogTitle>
      <DialogContent
        sx={{
          p: 0,
          m: 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          {btnTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

ShipSavvyModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  setShipmentItem: PropTypes.func,
  openModal: PropTypes.bool,
  btnTitle: PropTypes.string,
};

export default ShipSavvyModal;
