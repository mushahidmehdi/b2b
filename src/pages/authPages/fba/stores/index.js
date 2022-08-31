import React, {useState, useEffect} from 'react';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import PropTypes from 'prop-types';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
import CloseIcon from '@mui/icons-material/Close';
import Api, {ApiMethod} from '@shipsavvy/services/Api';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import {fba} from '../endPoints/index';
import {useDispatch} from 'react-redux';
import {showMessage} from 'redux/actions';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import {configStoreResponse} from './ObjectHelper';
import GridTable from 'sScomponents/utility/SsTable';
import GrildFilter from 'sScomponents/utility/SsTableFilter';
import {useFbaMethod} from '@shipsavvy/utility/FbaHooks';
import {useNavigate} from 'react-router-dom';

const countires = [
  {
    key: 'Amazon USA',
    value: 'Amazon USA',
    id: 'ATVPDKIKX0DER',
    extension: 'com',
  },
  {
    key: 'Amazon Canada',
    value: 'Amazon Canada',
    id: 'A2EUQ1WTGCTBG2',
    extension: 'ca',
  },
];

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

const DataGridTable = () => {
  const [amazonLink, setAmazonLink] = useState({
    marketplace_extension: '',
    marketplace_Id: '',
    storeName: '',
  });
  const [filterConfig, setFilterConfig] = useState({
    OpenAdSModal: false,
    OpenBtnModal: false,
    search: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {setShipmentList} = useFbaMethod();
  const {customerId} = useCustomer();
  const {OpenBtnModal} = filterConfig;
  const {marketplace_extension, storeName, marketplace_Id} = amazonLink;
  const [tableConfig, setTableConfig] = useState({
    sortModel: [{field: 'Code', sort: 'asc'}],
    isLoading: false,
    totalNoOfRows: 20,

    pageNum: 0,
    pageSize: 10,
    data: [],
  });
  const {isLoading, sortModel, pageNum, pageSize, data} = tableConfig;
  const {search} = filterConfig;
  let amazon_link = `https://sellercentral.amazon.${marketplace_extension}/apps/authorize/consent?application_id=amzn1.sp.solution.db89de70-7f9c-4f4e-9ddd-fabfba0343c2&version=beta&state=${storeName}_${marketplace_Id}`;

  const searchStore = () => {
    let sortingOrder = 'ASC';
    let sortingField = 'Code';
    if (sortModel.length !== 0) {
      sortingField = sortModel[0].field;
      sortModel[0].sort === 'asc'
        ? (sortingOrder = 'ASC')
        : (sortingOrder = 'DESC');
    }

    setTableConfig((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const params = {
      CustomerId: customerId,
      Search: search,
      PageIndex: pageNum,
      PageSize: pageSize,
      OrderBy: sortingField,
      OrderDir: sortingOrder,
    };

    Api(fba.SEARCH, ApiMethod.POST, params, (data) => {
      setTableConfig((prev) => ({
        ...prev,
        isLoading: false,
        data: configStoreResponse(data.Response),
        totalNoOfRows: data.TotalCount,
      }));
    });
  };

  useEffect(() => {
    searchStore();
  }, [search, customerId, sortModel, pageNum, pageSize]);

  const columns = [
    {field: 'storeName', headerName: 'Store Name', minWidth: 130, flex: 1},
    {field: 'sellerId', headerName: 'Seller Id', minWidth: 140, flex: 1},
    {
      field: 'marketPlaceId',
      headerName: 'Market Place Id',
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'shipmentList',
      headerName: 'Shipment List',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              setShipmentList(params.row);
              navigate('/fba/shipmentPlane');
            }}
            sx={{fontSize: 12}}
          >
            Shipment List
          </Button>
        );
      },
    },
  ];

  return (
    <AppsContainer
      fullView
      sxStyle={{
        backgroundColor: '#fff',
        borderRadius: 5,
        overflowX: 'hidden',
      }}
    >
      <GrildFilter
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
        data={data}
        buttonType='MODAL'
        url=''
        btnId='common.addNewStore'
        asId='common.storeName'
        showAdvanceSearch={false}
      />

      <GridTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        tableConfig={tableConfig}
        setTableConfig={setTableConfig}
      />

      <Dialog
        onClose={() =>
          setFilterConfig((prev) => ({
            ...prev,
            OpenBtnModal: false,
          }))
        }
        aria-labelledby='customized-dialog-title'
        open={OpenBtnModal}
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={() =>
            setFilterConfig((prev) => ({
              ...prev,
              OpenBtnModal: false,
            }))
          }
          sx={{
            textAlign: 'center',
            fontSize: 15,
          }}
        >
          Add New Store
        </BootstrapDialogTitle>
        <DialogContent>
          <Stack direction='column' spacing={3} padding='10px'>
            <Autocomplete
              onChange={(e, value) => {
                setAmazonLink((prev) => ({
                  ...prev,
                  marketplace_extension: value?.extension,
                  marketplace_Id: value?.id,
                }));
              }}
              options={countires}
              getOptionLabel={(option) => option.key}
              style={{width: '100%'}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size='small'
                  label={<IntlMessages id='common.marketPlace' />}
                  variant='outlined'
                />
              )}
            />
            <TextField
              color='primary'
              placeholder='Store Name'
              size='small'
              name='storeName'
              label={<IntlMessages id='common.storeName' />}
              onChange={(e) =>
                setAmazonLink((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          {storeName.length === 0 || marketplace_extension.length === 0 ? (
            <Button
              variant='contained'
              autoFocus
              onClick={() =>
                storeName.length === 0 || marketplace_extension.length === 0
                  ? dispatch(
                      showMessage("Store Or Market place field can't be empty"),
                    )
                  : ''
              }
            >
              {' '}
              Redirect To Amazon
            </Button>
          ) : (
            <Button variant='contained' autoFocus>
              <a
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                }}
                target='_blank'
                href={amazon_link}
                rel='noreferrer'
              >
                Redirect To Amazon
              </a>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </AppsContainer>
  );
};

DataGridTable.propTypes = {
  isLoading: PropTypes.any,
  setFiltersFormData: PropTypes.func,
  filtersFormData: PropTypes.any,
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default DataGridTable;
