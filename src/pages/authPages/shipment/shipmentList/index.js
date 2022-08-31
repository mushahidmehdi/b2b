import {React, useEffect, useState} from 'react';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import AppsContent from '@shipsavvy/core/AppsContainer/AppsContent';
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import {Add, Filter2TwoTone, Search} from '@mui/icons-material';
import {DataGrid} from '@mui/x-data-grid';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {useNavigate} from 'react-router-dom';
import {ShipmentOrderApiEndPoints} from '@shipsavvy/services/apis/ShipmentOrderProvider/endPoints';

import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import OrderActions from './OrderActions';
import {SsModal} from 'sScomponents/Common/SsModal';

import ViewInArIcon from '@mui/icons-material/ViewInAr';

export default function ShipmentList() {
  const {customerId} = useCustomer();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersTriggered, setFiltersTriggered] = useState(false);
  const [filters, setFilters] = useState({
    Status: 'ALL',
    ReceivingDeliveryMethod: 'ALL',
  });
  const [sortModel, setSortModel] = useState([{field: 'Code', sort: 'asc'}]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const {page, pageSize} = pagination;

  const columns = [
    {field: 'Code', headerName: 'Code', flex: 1},
    {
      field: 'NumberOfPackages',
      headerName: '# of Packages',
      flex: 1,
      sortable: false,
      valueGetter: (params) =>
        params.row.Packages ? params.row.Packages.length : 0,
    },
    {field: 'FromAddress', headerName: 'Sender Address', flex: 2},
    {field: 'ReceivingDeliveryMethod', headerName: 'Delivery Method', flex: 1},
    {field: 'Carrier', headerName: 'Carrier', flex: 1},
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        let color = 'primary';
        switch (params.row.Status) {
          case 'Draft':
            color = 'warning';
            break;
          case 'New':
            color = 'success';
            break;

          default:
            color = 'primary';
            break;
        }
        return <Chip label={params.row.Status} size='small' color={color} />;
      },
    },
    {
      field: 'Id',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label='edit'
              color='primary'
              size='small'
              onClick={() => navigate(`/shipment/packages/${params.row.Id}`)}
            >
              <ViewInArIcon />
            </IconButton>
            <OrderActions order={params.row} />
          </>
        );
      },
    },
  ];

  const seachData = async () => {
    let sortingOrder = 'ASC';
    let sortingField = 'Code';
    if (sortModel.length !== 0) {
      sortingField = sortModel[0].field;
      sortModel[0].sort === 'asc'
        ? (sortingOrder = 'ASC')
        : (sortingOrder = 'DESC');
    }

    setIsLoading(true);

    const params = {
      CustomerId: customerId,
      Status: filters.Status !== 'ALL' ? filters.Status : '-1',
      ReceivingDeliveryMethod:
        filters.ReceivingDeliveryMethod !== 'ALL'
          ? filters.ReceivingDeliveryMethod
          : '-1',
      Code: filters.Code,
      Search: search,
      PageIndex: page,
      PageSize: pageSize,
      OrderBy: sortingField,
      OrderDir: sortingOrder,
    };

    callApi(
      ShipmentOrderApiEndPoints.SEARCH,
      ApiMethod.POST,
      params,
      (data) => {
        setTotalRowCount(data && data.TotalCount ? data.TotalCount : 0);
        setRows(data && data.Response ? data.Response : []);
      },
      undefined,
      () => {
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    seachData();
  }, [search, filtersTriggered, page, pageSize, sortModel]);

  const handleFiltersClose = () => {
    setFiltersOpen(false);
  };

  const handleFiltersSubmit = () => {
    setFiltersTriggered(!filtersTriggered);
    setFiltersOpen(false);
  };

  const handleStatusChange = (event) => {
    setFilters({...filters, Status: event.target.value});
  };

  const handleDeliveryMethodChange = (event) => {
    setFilters({...filters, ReceivingDeliveryMethod: event.target.value});
  };

  const handleResetFilters = () => {
    setFiltersTriggered(!filtersTriggered);
    setFilters({ReceivingDeliveryMethod: 'ALL', Status: 'ALL', Code: ''});
  };

  return (
    <AppsContainer title={'Orders'} fullView>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: 1,
          padding: '10px',
          paddingBottom: '0px',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            gap: 1,
          }}
        >
          <TextField
            sx={{
              flex: 0.3,
            }}
            placeholder='Search'
            size='small'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant='outlined'
            color='primary'
            onClick={() => setFiltersOpen(true)}
          >
            {filters.Status == 'ALL' &&
            filters.ReceivingDeliveryMethod == 'ALL' &&
            (filters.Code == '' || filters.Code == undefined) ? (
              <Search />
            ) : (
              <Filter2TwoTone />
            )}{' '}
            Filters
          </Button>
        </Stack>

        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/shipment/createshipment')}
        >
          <Add /> Create a Shipment
        </Button>
      </Box>

      <AppsContent>
        <DataGrid
          sortingMode='server'
          sortModel={sortModel}
          onSortModelChange={(sortModel) => setSortModel(sortModel)}
          rowCount={totalRowCount || 0}
          loading={isLoading}
          paginationMode='server'
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            setPagination((prevState) => ({...prevState, page: newPage}))
          }
          onPageSizeChange={(newPageSize) =>
            setPagination((prevState) => ({
              ...prevState,
              pageSize: newPageSize,
            }))
          }
          getRowId={(row) => row.Id}
          rows={rows}
          columns={columns}
        />

        <SsModal
          isOpen={filtersOpen}
          handleClose={handleFiltersClose}
          title='Filters'
          buttons={
            <>
              <Button
                variant='contained'
                color='warning'
                onClick={handleResetFilters}
              >
                Reset
              </Button>
              <Button
                variant='contained'
                onClick={handleFiltersSubmit}
                autoFocus
              >
                Submit
              </Button>
            </>
          }
        >
          <Stack direction='column' spacing={3} padding='10px'>
            <TextField
              label='Code'
              size='small'
              value={filters.Code}
              onChange={(e) => setFilters({...filters, Code: e.target.value})}
            />
            <FormControl fullWidth>
              <InputLabel id='status-select-label'>Status</InputLabel>
              <Select
                labelId='status-select-label'
                id='status-select'
                label='Status'
                size='small'
                value={filters.Status}
                onChange={handleStatusChange}
              >
                <MenuItem value='ALL'>All</MenuItem>
                <MenuItem value='Draft'>Draft</MenuItem>
                <MenuItem value='New'>New</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='delivery-method-select-label'>
                Delivery Method
              </InputLabel>
              <Select
                labelId='delivery-method-select-label'
                id='delivery-method-select'
                label='Delivery Method'
                size='small'
                value={filters.ReceivingDeliveryMethod}
                onChange={handleDeliveryMethodChange}
              >
                <MenuItem value='ALL'>All</MenuItem>
                <MenuItem value='DropOff'>DropOff</MenuItem>
                <MenuItem value='Delivery'>Delivery</MenuItem>
                <MenuItem value='Pickup'>Pickup</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </SsModal>
      </AppsContent>
    </AppsContainer>
  );
}
