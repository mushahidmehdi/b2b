import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import Filter2OutlinedIcon from '@mui/icons-material/Filter2Outlined';
import Filter3OutlinedIcon from '@mui/icons-material/Filter3Outlined';
import Filter4OutlinedIcon from '@mui/icons-material/Filter4Outlined';
import Filter5OutlinedIcon from '@mui/icons-material/Filter5Outlined';
import Filter6OutlinedIcon from '@mui/icons-material/Filter6Outlined';
import Filter7OutlinedIcon from '@mui/icons-material/Filter7Outlined';
import Filter8OutlinedIcon from '@mui/icons-material/Filter8Outlined';
import Filter9OutlinedIcon from '@mui/icons-material/Filter9Outlined';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import {Add, Search} from '@mui/icons-material';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {Box} from '@mui/system';
import {Button, DialogTitle, Stack, TextField, Tooltip} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const BootstrapDialogTitle = (props) => {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[900],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const searchOptions = (len) => {
  const seachlen = len.length;
  if (seachlen === 0) {
    return <SearchOffOutlinedIcon color='primary' />;
  } else if (seachlen === 1) {
    return <Filter1OutlinedIcon color='primary' />;
  } else if (seachlen === 2) {
    return <Filter2OutlinedIcon color='primary' />;
  } else if (seachlen === 3) {
    return <Filter3OutlinedIcon color='primary' />;
  } else if (seachlen === 4) {
    return <Filter4OutlinedIcon color='primary' />;
  } else if (seachlen === 5) {
    return <Filter5OutlinedIcon color='primary' />;
  } else if (seachlen === 6) {
    return <Filter6OutlinedIcon color='primary' />;
  } else if (seachlen === 7) {
    return <Filter7OutlinedIcon color='primary' />;
  } else if (seachlen === 8) {
    return <Filter8OutlinedIcon color='primary' />;
  } else if (seachlen === 9) {
    return <Filter9OutlinedIcon color='primary' />;
  } else if (seachlen > 9) {
    return <Filter9PlusIcon color='primary' />;
  } else {
    return <Search />;
  }
};

const SsTableFilter = ({
  filterConfig,
  setFilterConfig,
  data,
  buttonType,
  url,
  btnId,
  showAdvanceSearch,
}) => {
  const {search, OpenAdSModal, OpenBtnModal} = filterConfig;
  const navigate = useNavigate();

  const handleAddButton = () => {
    if (buttonType === 'MODAL') {
      setFilterConfig((prev) => ({
        ...prev,
        OpenBtnModal: !OpenBtnModal,
      }));
    } else if (buttonType === 'LINK') {
      navigate(url);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 1,
          padding: '10px',
        }}
      >
        <Box sx={{flex: 1}}>
          <Button
            variant='contained'
            color='primary'
            label={<IntlMessages id={btnId} />}
            startIcon={<Add />}
            onClick={handleAddButton}
          >
            {' '}
            {<IntlMessages id={btnId} />}
          </Button>
        </Box>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 1,
            gap: 1,
          }}
        >
          <TextField
            sx={{
              flex: 0.5,
              borderColor: 'primary',
            }}
            color='primary'
            placeholder='Search'
            size='small'
            name='search'
            value={search}
            onChange={(e) =>
              setFilterConfig((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            InputProps={{
              endAdornment: !search ? (
                <Search color='primary' />
              ) : (
                searchOptions(data)
              ),
            }}
          />
          {showAdvanceSearch ? (
            <Tooltip title='Advance Search Options'>
              <Button
                variant='outlined'
                color='primary'
                onClick={() =>
                  setFilterConfig((prev) => ({
                    ...prev,
                    OpenAdSModal: !OpenAdSModal,
                  }))
                }
                label={<IntlMessages id='common.add' />}
              >
                <TuneOutlinedIcon />
              </Button>
            </Tooltip>
          ) : (
            ''
          )}
        </Stack>
      </Box>
    </div>
  );
};

SsTableFilter.propTypes = {
  filterConfig: PropTypes.any,
  setFilterConfig: PropTypes.func,
  data: PropTypes.array,
  buttonType: PropTypes.string,
  url: PropTypes.string,
  btnId: PropTypes.string,
  showAdvanceSearch: PropTypes.bool,
};
BootstrapDialogTitle.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default SsTableFilter;
