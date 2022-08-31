import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Box from '@mui/material/Box';
import {object} from 'prop-types';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useFba, useFbaMethod} from '@shipsavvy/utility/FbaHooks';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const Actions = ({item}) => {
  const navigate = useNavigate();
  const {setShipmentLabel, getShipmentLabel, prepareShipment} = useFbaMethod();
  const {downloadLabel} = useFba();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (downloadLabel) {
      window.open(downloadLabel, '_blank');
      setShipmentLabel('');
    }
  }, [downloadLabel]);

  return (
    <Box>
      <IconButton
        aria-controls='alpha-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreHorizRoundedIcon />
      </IconButton>
      <Menu
        id='alpha-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          style={{fontSize: 6, width: 130, justifyContent: 'center'}}
          onClick={handleClose}
        >
          <Button
            endIcon={<LocalShippingOutlinedIcon />}
            sx={{width: 10, fontSize: 12, wordBreak: 'break-word'}}
            size='small'
            onClick={() => {
              prepareShipment(item);
              navigate('/fba/create');
              setAnchorEl(null);
            }}
          >
            Start Shipment
          </Button>
        </MenuItem>
        <MenuItem
          style={{fontSize: 6, width: 130, justifyContent: 'center'}}
          onClick={handleClose}
        >
          <Button
            endIcon={<FileDownloadOutlinedIcon />}
            sx={{width: 10, fontSize: 12, wordBreak: 'break-word'}}
            size='small'
            onClick={() => {
              getShipmentLabel(item);
            }}
          >
            Download Label
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

Actions.propTypes = {
  item: object,
};

export default Actions;
