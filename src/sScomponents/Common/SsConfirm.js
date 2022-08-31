import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import ProtoTypes from 'prop-types';
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
import {Delete, InfoOutlined, QuestionMark} from '@mui/icons-material';

const confirmTypes = {
  delete: {yes: 'Delete', no: 'Cancel', yesColor: 'error', icon: <Delete />},
  default: {yes: 'Yes', no: 'No', yesColor: 'error', icon: <QuestionMark />},
};
function SsConfirm({
  children,
  title,
  type,
  yes,
  no,
  yesColor,
  onYes,
  onNo,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleYes = () => {
    if (onYes) onYes();
    setIsOpen(false);
  };

  const handleNo = () => {
    if (onNo) onNo();
    setIsOpen(false);
  };

  const confirmType = confirmTypes[type] || confirmTypes['default'];

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
              <InfoOutlined />
              <Typography
                variant='h6'
                sx={{flexGrow: 1, marginLeft: '0.5rem', marginRight: '0.5rem'}}
              >
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
        <Button
          variant='outlined'
          color='primary'
          onClick={handleNo}
          sx={{textTransform: 'none'}}
        >
          {confirmType.no || no}
        </Button>
        <Button
          variant='contained'
          color={confirmType.yesColor || yesColor}
          onClick={handleYes}
          sx={{textTransform: 'none'}}
        >
          {confirmType.icon}
          {confirmType.yes || yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SsConfirm.propTypes = {
  children: ProtoTypes.node.isRequired,
  title: ProtoTypes.string,
  type: ProtoTypes.string,
  yes: ProtoTypes.string,
  no: ProtoTypes.string,
  yesColor: ProtoTypes.string,
  onYes: ProtoTypes.func,
  onNo: ProtoTypes.func,
};

export default SsConfirm;

export function confirm(props) {
  const wrapper = document.createElement('div');
  wrapper.id = `confirm-dialog-${Math.random()}`;
  document.body.appendChild(wrapper);
  const confirmContainer = ReactDOM.createRoot(wrapper);
  confirmContainer.render(<SsConfirm {...props} />);
  //render(<SsConfirm {...props} />, wrapper);
}
