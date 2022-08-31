import {React, useEffect, useRef, useState} from 'react';
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import {
  useShipmentOrder,
  useShipmentOrderActions,
} from '@shipsavvy/services/apis/ShipmentOrderProvider/ShipmentOrderProvider';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import AppGridContainer from '@shipsavvy/core/AppGridContainer';
import AppCard from '@shipsavvy/core/AppCard';

import SsFormModal from 'sScomponents/Common/SsFormModal';
import AddEditShipmentOrderItem from 'sScomponents/ShipmentOrder/AddEditShipmentOrderItem';
import {showMessage} from 'redux/actions';
import {confirm} from 'sScomponents/Common/SsConfirm';
import {useDispatch} from 'react-redux';
import {useCommon} from '@shipsavvy/services/apis/CommonProvider/CommonProvider';
import {useAddress} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import {formatNumber} from '@shipsavvy/utility/helper/NumberHelper';
import {replaceObjectById} from '@shipsavvy/utility/helper/ObjectHelper';
import {StyledTableRow} from 'sScomponents/Common/SsTable';
import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function PackageItems({shipmentOrderPackage, returnToPackage}) {
  const navaigate = useNavigate();
  const dispatch = useDispatch();

  const {customerId} = useCustomer();

  const [shipmentOrderId] = useState(
    shipmentOrderPackage && shipmentOrderPackage.ShipmentOrderId
      ? shipmentOrderPackage.ShipmentOrderId
      : '',
  );

  const [shipmentOrderPackageId] = useState(
    shipmentOrderPackage && shipmentOrderPackage.Id
      ? shipmentOrderPackage.Id
      : '',
  );

  // const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  //const [totalRowCount, setTotalRowCount] = useState(0);

  const {getShipmentOrderPackage, deleteShipmentOrderItem} =
    useShipmentOrderActions();

  useEffect(() => {
    let params = {CustomerId: customerId};
    if (shipmentOrderId) params.ShipmentOrderId = shipmentOrderId;
    if (shipmentOrderPackageId) params.Id = shipmentOrderPackageId;
    getShipmentOrderPackage(params, (data) => {
      setRows(data.Response.Items || []);
    });
  }, []);

  const formModalRef = useRef();
  const addNewItem = () => {
    setSelectedItem({});
    if (formModalRef && formModalRef.current) {
      formModalRef.current.showFormModal();
    }
  };

  const cleanupCallback = () => {
    if (formModalRef && formModalRef.current) {
      formModalRef.current.setSubmittionState(false);
    }
  };

  const submitRef = useRef();

  const afterAddEditItem = (data) => {
    if (!selectedItem.Id) {
      setRows([...rows, data.Response]);
    } else {
      setRows(replaceObjectById(rows, data.Response));
    }

    if (formModalRef && formModalRef.current) {
      formModalRef.current.hideFormModal();
    }
  };

  const {currencies} = useCommon();
  const {appCountries} = useAddress();
  const {productTypes} = useShipmentOrder();

  const currencyCode = (currencyId) => {
    const currency = !currencies
      ? undefined
      : currencies.find((x) => x.Id == currencyId);
    return currency ? currency.Code : '';
  };

  const countryName = (countryId) => {
    const country = !appCountries
      ? undefined
      : appCountries.find((x) => x.Id == countryId);
    return country ? country.Name : '';
  };

  const productTypeName = (productTypeId) => {
    const productType = !productTypes
      ? undefined
      : productTypes.find((x) => x.Id == productTypeId);
    return productType ? productType.Name : '';
  };

  const [selectedItem, setSelectedItem] = useState({});

  const editItem = (item) => {
    setSelectedItem(item);
    if (formModalRef && formModalRef.current) {
      formModalRef.current.showFormModal();
    }
  };

  return (
    <AppCard>
      <AppGridContainer>
        <Grid item xs={12} md={12}>
          <Typography variant='h2'> Package Items </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' color='primary' onClick={addNewItem}>
              <AddIcon /> Add New Item
            </Button>

            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                if (returnToPackage) returnToPackage(rows);
                else navaigate(`/shipment/packages/${shipmentOrderId}`);
              }}
            >
              <ViewInArIcon /> See Packages
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{textAlign: 'right'}}>
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              navaigate(`/shipment/options/${shipmentOrderId}`);
            }}
          >
            <CheckCircleIcon /> Finish Order
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <TableContainer sx={{marginBottom: '2rem'}}>
            <Table stickyHeader sx={{minWidth: 650}} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Sku</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell> Item Type</TableCell>
                  <TableCell align='center'>COO</TableCell>
                  <TableCell align='center'>Unit Weight</TableCell>
                  <TableCell align='center'>Unit Value</TableCell>
                  <TableCell align='center'>Quantity</TableCell>
                  <TableCell align='center'>Total Value</TableCell>
                  <TableCell align='center'> Actions </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row.Id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell omponent='th' scope='row'>
                      {row.Sku}
                    </TableCell>
                    <TableCell> {row.Name}</TableCell>
                    <TableCell>{productTypeName(row.ProductTypeId)}</TableCell>
                    <TableCell align='center'>
                      {countryName(row.OriginCountryId)}
                    </TableCell>
                    <TableCell align='center'>
                      {row.Weight ? `${row.Weight} ${row.WeightUnit}` : ''}
                    </TableCell>
                    <TableCell align='center'>
                      {' '}
                      {formatNumber(row.UnitPrice)}{' '}
                      <b>{currencyCode(row.CurrencyId)}</b>
                    </TableCell>
                    <TableCell align='center'> {row.Quantity}</TableCell>
                    <TableCell align='center'>
                      {formatNumber(row.UnitPrice * row.Quantity)}{' '}
                      <b>{currencyCode(row.CurrencyId)}</b>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        aria-label='edit'
                        color='primary'
                        size='small'
                        onClick={() => {
                          editItem(row);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label='delete'
                        color='error'
                        size='small'
                        onClick={() => {
                          confirm({
                            title: 'Delete Item - ' + row.Sku,
                            type: 'delete',
                            children: (
                              <Typography>
                                <b> {row.Name} </b> item will be deleted! are
                                you sure?
                              </Typography>
                            ),
                            onYes: () => {
                              deleteShipmentOrderItem(
                                {
                                  Id: row.Id,
                                  CustomerId: customerId,
                                  ShipmentOrderPackageId:
                                    shipmentOrderPackageId,
                                },
                                () => {
                                  setRows(rows.filter((el) => el.Id != row.Id));
                                  dispatch(
                                    showMessage(
                                      `(${row.Name}) item was deleted!`,
                                    ),
                                  );
                                },
                              );
                            },
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </AppGridContainer>
      <SsFormModal ref={formModalRef} submitRef={submitRef}>
        <AddEditShipmentOrderItem
          shipmentOrderPackageId={shipmentOrderPackageId}
          item={selectedItem}
          ref={submitRef}
          cleanupCallback={cleanupCallback}
          afterSubmit={afterAddEditItem}
        />
      </SsFormModal>
    </AppCard>
  );
}

PackageItems.propTypes = {
  shipmentOrderPackage: PropTypes.object,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  returnToPackage: PropTypes.func,
};

export default PackageItems;
