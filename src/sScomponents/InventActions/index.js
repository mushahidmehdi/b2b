import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import {object} from 'prop-types';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useInventoryMethod} from '@shipsavvy/utility/InventoryHook';

import {confirm} from 'sScomponents/Common/SsConfirm';

const Actions = (props) => {
  const navigate = useNavigate();
  const {updateSelectedRow, deleteInventory} = useInventoryMethod();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem style={{fontSize: 12}} onClick={handleClose}>
          <Button
            startIcon={<DeleteOutlineRoundedIcon />}
            sx={{width: 20}}
            size='small'
            onClick={() => {
              confirm({
                title: 'Delete Inventory',
                type: 'delete',
                children: 'Inventory Will be Deleted! are you sure?',
                onYes: () => {
                  deleteInventory(props.order);
                },
              });
            }}
            // onClick={() => {
            //   setShowModal(!showModal);
            //   SsModal(showModal);
            //   // deleteInventory(props.order);
            //   // setAnchorEl(null);
            // }}
          >
            Delete
          </Button>
        </MenuItem>
        <MenuItem style={{fontSize: 12}} onClick={handleClose}>
          <Button
            startIcon={<EditRoundedIcon />}
            sx={{width: 10}}
            size='small'
            onClick={() => {
              updateSelectedRow(props.order);
              navigate('/inventory/createinventory');
              setAnchorEl(null);
            }}
          >
            Edit
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

Actions.propTypes = {
  order: object,
};

export default Actions;
