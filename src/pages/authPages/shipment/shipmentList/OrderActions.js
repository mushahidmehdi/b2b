import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import {object} from 'prop-types';
import {useNavigate} from 'react-router-dom';

const OrderActions = (props) => {
  var navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    //setAnchorEl(null);
    navigate(`/shipment/packages?id=${props.order.Id}`);
  };

  return (
    <Box>
      <IconButton
        aria-controls='alpha-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
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
          style={{fontSize: 14}}
          onClick={handleClose}
          id={`view-${props.order.Id}`}
        >
          View Packages
        </MenuItem>
      </Menu>
    </Box>
  );
};

OrderActions.propTypes = {
  order: object,
};

export default OrderActions;
