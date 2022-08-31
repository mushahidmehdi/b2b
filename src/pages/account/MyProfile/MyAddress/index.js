import {Delete, Edit} from '@mui/icons-material';
import {Box, Button, IconButton, Stack} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import {useCustomerActions} from '@shipsavvy/services/apis/CustomerProvider/CustomerProvider';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import AddEditCustomerAddress from 'sScomponents/Address/AddEditCustomerAddress';
import {confirm} from 'sScomponents/Common/SsConfirm';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {showMessage} from 'redux/actions';

function Index() {
  const dispatch = useDispatch();
  const {customerId} = useCustomer();
  const {getCustomerAddresses} = useAddressActions();
  const {deleteCustomerAddress} = useCustomerActions();

  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedCustomerAddressId, setSelectedCustomerAddressId] =
    useState('');

  // Address Table
  const columns = [
    {
      field: 'Title',
      headerName: 'Title',
      flex: 1,
      sortable: false,
      renderCell: (params) => <b>{params.row.Title}</b>,
    },
    {field: 'PostalCode', headerName: 'Postal Code', flex: 1, sortable: false},
    {field: 'Country', headerName: 'Country', flex: 1, sortable: false},
    {field: 'Province', headerName: 'Province', flex: 1, sortable: false},
    {field: 'City', headerName: 'City', flex: 1, sortable: false},
    {
      field: 'AddressLine1',
      headerName: 'Address Line',
      flex: 2,
      sortable: false,
    },
    {
      field: 'Id',
      headerName: 'Actions',
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label='edit'
              color='primary'
              size='small'
              onClick={() => {
                setSelectedAddressId(params.row.Id);
                setSelectedCustomerAddressId(params.row.CustomerAddressId);
                showAddEditAddress();
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label='delete'
              color='error'
              size='small'
              onClick={() => {
                confirm({
                  title: 'Delete Address',
                  type: 'delete',
                  children: 'The address will be deleted! are you sure?',
                  onYes: () => {
                    deleteCustomerAddress(
                      {
                        Id: params.row.CustomerAddressId,
                        CustomerId: customerId,
                      },
                      () => {
                        dispatch(showMessage('Address has been deleted!'));
                        loadData();
                      },
                    );
                  },
                });
              }}
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const {page, pageSize} = pagination;

  const loadData = () => {
    setIsLoading(true);
    getCustomerAddresses(
      {CustomerId: customerId, PageSize: pageSize, PageIndex: page},
      (addresses) => {
        setIsLoading(false);

        var addressesToShow = addresses.map((address) => {
          return {
            Id: address.Id,
            Title: address.Title,
            PostalCode: address.PostalCode,
            CountryId: address.CountryId,
            Country: address.Country.Name,
            ProvinceId: address.ProvinceId,
            Province: address.Province.Name,
            CityId: address.CityId,
            City: address.City.Name,
            AddressLine1: address.AddressLine1,
            CustomerAddressId: address.CustomerAddressId,
          };
        });
        setRows(addressesToShow ? addressesToShow : []);
      },
      (totalCount) => {
        setTotalRowCount(totalCount ? totalCount : 0);
      },
    );
  };

  useEffect(() => {
    loadData();
  }, [page, pageSize]);

  //Add-Edit Address methods

  const customerAddressRef = useRef(null);
  const showAddEditAddress = () => {
    if (customerAddressRef.current) {
      customerAddressRef.current.showAddressForm();
    }
  };

  const afterSubmit = (customerAddress) => {
    const address = customerAddress.AddressEntity;
    if (!selectedCustomerAddressId || selectedCustomerAddressId === '') {
      const newRow = {
        Id: address.Id,
        Title: address.Title,
        PostalCode: address.PostalCode,
        CountryId: address.CountryId,
        Country: address.Country.Name,
        ProvinceId: address.ProvinceId,
        Province: address.Province.Name,
        CityId: address.CityId,
        City: address.City.Name,
        AddressLine1: address.AddressLine1,
        CustomerAddressId: customerAddress.Id,
      };
      setRows([...rows, newRow]);
    } else {
      var data = rows;
      let updatedAddress = data.find(
        (x) => x.CustomerAddressId == selectedCustomerAddressId,
      );
      updatedAddress.Title = address.Title;
      updatedAddress.PostalCode = address.PostalCode;
      updatedAddress.CountryId = address.CountryId;
      updatedAddress.Country = address.Country.Name;
      updatedAddress.ProvinceId = address.ProvinceId;
      updatedAddress.Province = address.Province.Name;
      updatedAddress.CityId = address.CityId;
      updatedAddress.City = address.City.Name;
      updatedAddress.AddressLine1 = address.AddressLine1;
      setRows(data);
    }

    setSelectedAddressId('');
    setSelectedCustomerAddressId('');
  };

  return (
    <>
      <Stack sx={{marginBottom: '1em'}}>
        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
          <Button
            variant='contained'
            onClick={() => {
              setSelectedAddressId('');
              showAddEditAddress();
            }}
          >
            Add New Address
          </Button>
        </Box>
      </Stack>
      <DataGrid
        sortingMode='server'
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
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        autoHeight
      />
      <AddEditCustomerAddress
        id={selectedCustomerAddressId}
        customerId={customerId}
        addressId={selectedAddressId}
        ref={customerAddressRef}
        afterSubmit={afterSubmit}
      />
    </>
  );
}

export default Index;
