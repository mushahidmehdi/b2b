import {React, useState} from 'react';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import AppsContent from '@shipsavvy/core/AppsContainer/AppsContent';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {Add, Search} from '@mui/icons-material';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import {DataGrid} from '@mui/x-data-grid';
import {handleRowData} from '../HelperFunc';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import {useInventory} from '@shipsavvy/utility/InventoryHook';
import {useLocation} from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import Actions from 'sScomponents/InventActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const DataGridTable = ({setFiltersFormData, filtersFormData}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersTriggered, setFiltersTriggered] = useState(false);
  const {
    Sku,
    SearchField,
    page,
    pageSize,
    sortModel,
    isLoading,
    data,
    totalNoOfRows,
  } = filtersFormData;

  const filterData = handleRowData(data);
  const navigate = useNavigate();
  const location = useLocation();
  const {rowData} = useInventory();

  const handleFiltersSubmit = (e) => {
    console.log(e.target.value);
    setFiltersTriggered(!filtersTriggered);
    setFiltersOpen(false);
  };

  const handleResetFilters = () => {
    setFiltersFormData((prevState) => ({
      ...prevState,
      Sku: '',
      SearchField: '',
      page: 0,
      pageSize: 10,
      sortModel: [{field: 'Code', sort: 'asc'}],
      sortingOrder: 'ASC',
    }));
  };

  const columns = [
    {field: 'sku', headerName: 'Sku', minWidth: 100, flex: 1},
    {field: 'title', headerName: 'Title', minWidth: 120, flex: 1},
    {field: 'type', headerName: 'Type', minWidth: 120, flex: 1},
    {field: 'certificate', headerName: 'Certificate', minWidth: 100, flex: 1},
    {field: 'weight', headerName: 'Weight', minWidth: 90, flex: 1},
    {
      field: 'dimentions',
      headerName: 'Dimentions (lwh)',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      flex: 1,
      renderCell: (changedData) => {
        let color = 'primary';
        switch (changedData.row.status) {
          case 'Draft':
            color = 'success';
            break;
          case 'Deleted':
            color = 'error';
            break;
          case 'Passive':
            color = 'warning';
            break;
          default:
            color = 'primary';
            break;
        }
        return (
          <Chip
            sx={{
              width: 70,
            }}
            label={changedData.row.status}
            size='small'
            color={color}
          />
        );
      },
    },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   flex: 1,
    //   renderCell: () => {
    //     return (
    //       <ButtonGroup
    //         sx={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <Button
    //           startIcon={<EditRoundedIcon />}
    //           sx={{
    //             width: 30,
    //           }}
    //           size='small'
    //         />
    //         <Button
    //           startIcon={<DeleteOutlineRoundedIcon />}
    //           sx={{
    //             width: 30,
    //           }}
    //           size='small'
    //         />
    //       </ButtonGroup>
    //     );
    //   },
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return <Actions order={params.row} />;
      },
    },
  ];

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

  return (
    <AppsContainer
      title={'Inventory Data List'}
      fullView
      sxStyle={{
        backgroundColor: '#fff',
        borderRadius: 5,
      }}
    >
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
            label={<IntlMessages id='common.addNewItem' />}
            startIcon={<Add />}
            onClick={() => {
              navigate('/inventory/createinventory');
              if (rowData.id) {
                window.location.reload(true);
              }
            }}
            state={{from: location}}
          >
            {' '}
            {<IntlMessages id='common.addNewItem' />}
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
            name='SearchField'
            value={SearchField}
            onChange={(e) =>
              setFiltersFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            InputProps={{
              endAdornment: !SearchField ? (
                <Search color='primary' />
              ) : (
                searchOptions(filterData)
              ),
            }}
          />
          <Tooltip title='Advance Search Options'>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => setFiltersOpen(true)}
              label={<IntlMessages id='common.add' />}
            >
              <TuneOutlinedIcon />
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      <AppsContent
        sxStyle={{
          boxShadow: 'none',
        }}
      >
        <DataGrid
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          sortingMode='server'
          sortModel={sortModel}
          onSortModelChange={(sort) =>
            setFiltersFormData((prev) => ({
              ...prev,
              sortModel: sort,
            }))
          }
          rowCount={totalNoOfRows || 0}
          loading={isLoading}
          paginationMode='server'
          rowsPerPageOptions={[10, 25, 50, 75, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            setFiltersFormData((prevState) => ({...prevState, page: newPage}))
          }
          onPageSizeChange={(newPageSize) =>
            setFiltersFormData((prevState) => ({
              ...prevState,
              pageSize: newPageSize,
            }))
          }
          rows={filterData}
          columns={columns}
        />

        <Dialog
          onClose={() => setFiltersOpen(false)}
          aria-labelledby='customized-dialog-title'
          open={filtersOpen}
          fullWidth={true}
        >
          <BootstrapDialogTitle
            id='customized-dialog-title'
            onClose={() => setFiltersOpen(false)}
            sx={{
              textAlign: 'center',
              fontSize: 15,
            }}
          >
            Search & Filter
          </BootstrapDialogTitle>
          <DialogContent>
            <Stack direction='column' spacing={3} padding='10px'>
              <TextField
                color='primary'
                placeholder='Search'
                size='small'
                name='Sku'
                value={Sku}
                label={<IntlMessages id='search.sku' />}
                onChange={(e) =>
                  setFiltersFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color='info'
              onClick={handleResetFilters}
            >
              Reset
            </Button>
            <Button variant='contained' onClick={handleFiltersSubmit} autoFocus>
              Search
            </Button>
          </DialogActions>
        </Dialog>
      </AppsContent>
    </AppsContainer>
  );
};

DataGridTable.propTypes = {
  isLoading: PropTypes.any,
  setFiltersFormData: PropTypes.func,
  filtersFormData: PropTypes.any,
  data: PropTypes.any,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default DataGridTable;
