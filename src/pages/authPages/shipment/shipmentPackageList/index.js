import {React, useEffect, useState} from 'react';
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
import {useShipmentOrderActions} from '@shipsavvy/services/apis/ShipmentOrderProvider/ShipmentOrderProvider';
import AppGridContainer from '@shipsavvy/core/AppGridContainer';
import AppCard from '@shipsavvy/core/AppCard';
import {
  isInvalidGuid,
  replaceObjectById,
} from '@shipsavvy/utility/helper/ObjectHelper';
import {StyledTableRow} from 'sScomponents/Common/SsTable';
import {useNavigate, useParams} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {SsErrorChip} from 'sScomponents/Common/SsChip';
import AddEditShipmentOrderPackage from '../createShipment/packages/AddEditShipmentOrderPackage';
import {CONTAINS_ALCOHOL, CONTAINS_ICEDRY} from 'shared/constants/OrderConst';
import {BOOLEAN} from 'shared/constants/SettingConst';
import {showMessage} from 'redux/actions';
import {useDispatch} from 'react-redux';
import {confirm} from 'sScomponents/Common/SsConfirm';
import {ListAlt} from '@mui/icons-material';
import PackageItems from '../createShipment/packages/PackageItems';

function ShipmentPackageList({shipmentOrderId, addEditNewPackage}) {
  const navaigate = useNavigate();
  let orderId = '';
  if (isInvalidGuid(shipmentOrderId)) {
    const params = useParams();
    // eslint-disable-next-line no-const-assign
    orderId = params.id;
    if (isInvalidGuid(orderId)) {
      navaigate('/shipment/shipmentlist');
    }
  } else {
    orderId = shipmentOrderId;
  }

  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const {getShipmentOrder} = useShipmentOrderActions();

  useEffect(() => {
    getShipmentOrder(orderId, (data) => {
      setRows(data.Response.Packages || []);
    });
  }, []);

  const [isAddingEditing, setIsAddingEditing] = useState(false);
  const [isAddingEditingItems, setIsAddingEditingItems] = useState(false);

  const [orderPackage, setOrderPackage] = useState({});

  const {
    addShipmentOrderPackage,
    editShipmentOrderPackage,
    deleteShipmentOrderPackage,
  } = useShipmentOrderActions();
  const setShipmentOrderPackage = (packageData) => {
    const {ToAddressId, ToAddress, FullName, CompanyTitle, Phone, Email} =
      rows[0];

    const editedPackage = {
      Id: packageData.Id,
      ShipmentOrderId: orderId,
      ToAddressId: ToAddressId,
      ToAddress: ToAddress,
      FullName: FullName,
      CompanyTitle: CompanyTitle,
      Phone: Phone,
      Email: Email,
      ...packageData,
      Settings: [
        {
          SettingName: CONTAINS_ALCOHOL,
          SettingValue: packageData.ConrainsAlcohol,
          SettingType: BOOLEAN,
        },
        {
          SettingName: CONTAINS_ICEDRY,
          SettingValue: packageData.ConrainsIceDry,
          SettingType: BOOLEAN,
        },
      ],
      UpdateSettings: true,
    };
    if (!editedPackage.Id) {
      addShipmentOrderPackage(editedPackage, (data) => {
        setRows([...rows, data.Response]);
        setIsAddingEditing(false);
      });
    } else {
      editShipmentOrderPackage(editedPackage, (data) => {
        setRows(replaceObjectById(rows, data.Response));
        setIsAddingEditing(false);
      });
    }
  };

  const deletePackage = (row) => {
    confirm({
      title: 'Delete Package',
      type: 'delete',
      children: (
        <Typography>
          <b> Package </b> will be deleted! are you sure?
        </Typography>
      ),
      onYes: () => {
        deleteShipmentOrderPackage(
          {
            Id: row.Id,
            ShipmentOrderId: row.ShipmentOrderId,
          },
          () => {
            setRows(rows.filter((el) => el.Id != row.Id));
            dispatch(showMessage(`package was deleted!`));
          },
        );
      },
    });
  };

  return isAddingEditingItems ? (
    <PackageItems
      shipmentOrderPackage={orderPackage}
      returnToPackage={(items) => {
        orderPackage.Items = items;
        setRows(replaceObjectById(rows, orderPackage));
        setIsAddingEditingItems(false);
      }}
    />
  ) : isAddingEditing ? (
    <AddEditShipmentOrderPackage
      showStepper={false}
      setShipmentOrderPackage={setShipmentOrderPackage}
      orderPackage={orderPackage}
    />
  ) : (
    <AppCard>
      <AppGridContainer>
        <Grid item xs={12} md={12}>
          <Typography variant='h2'> Packages </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} direction='row'>
            <Button
              variant='contained'
              color='primary'
              onClick={() =>
                addEditNewPackage
                  ? addEditNewPackage()
                  : setIsAddingEditing(true)
              }
            >
              <AddIcon /> Add New Package
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{textAlign: 'right'}}>
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              navaigate(`/shipment/options/${orderId}`);
            }}
          >
            <CheckCircleIcon /> See Shipment Options
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <TableContainer sx={{marginBottom: '2rem'}}>
            <Table stickyHeader sx={{minWidth: 650}} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell> Recipient</TableCell>
                  <TableCell> Recipient Address</TableCell>
                  <TableCell>Items Count</TableCell>
                  <TableCell> Props.</TableCell>
                  <TableCell align='center'>Dimensions (L x W x H)</TableCell>
                  <TableCell align='center'>Weight</TableCell>
                  <TableCell align='center'> Actions </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  const conrainsAlcoholSetting = row.Settings?.find(
                    (x) => x.SettingName == CONTAINS_ALCOHOL,
                  );
                  const conrainsAlcohol =
                    conrainsAlcoholSetting &&
                    conrainsAlcoholSetting.SettingValue == 'true';
                  const conrainsIceDrySetting = row.Settings?.find(
                    (x) => x.SettingName == CONTAINS_ICEDRY,
                  );
                  const conrainsIceDry =
                    conrainsIceDrySetting &&
                    conrainsIceDrySetting.SettingValue == 'true';
                  return (
                    <StyledTableRow key={row.Id}>
                      <TableCell component='th' scope='row'>
                        {row.FullName}
                      </TableCell>
                      <TableCell>{row.ToAddress}</TableCell>
                      <TableCell>{row.Items.length}</TableCell>
                      <TableCell>
                        {
                          <Stack spacing={1} direction='row'>
                            {conrainsAlcohol && <SsErrorChip label='Alcohol' />}
                            {conrainsIceDry && <SsErrorChip label='Ice Dry' />}
                          </Stack>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {row.Length} x {row.Height} x {row.Width}{' '}
                        {row.DimensionUnit}
                      </TableCell>
                      <TableCell align='center'>
                        {' '}
                        {row.Weight} {row.WeightUnit}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          aria-label='edit'
                          color='primary'
                          size='small'
                          onClick={() => {
                            setOrderPackage(row);
                            setIsAddingEditing(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          color='error'
                          size='small'
                          onClick={() => deletePackage(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label='items'
                          color='success'
                          size='small'
                          onClick={() => {
                            setOrderPackage(row);
                            setIsAddingEditingItems(true);
                          }}
                        >
                          <ListAlt />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </AppGridContainer>
    </AppCard>
  );
}

ShipmentPackageList.propTypes = {
  shipmentOrder: PropTypes.object,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  shipmentOrderId: PropTypes.string,
  addEditNewPackage: PropTypes.func,
};

export default ShipmentPackageList;
