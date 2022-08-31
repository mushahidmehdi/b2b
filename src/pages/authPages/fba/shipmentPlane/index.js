import {React, useEffect, useState} from 'react';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import PropTypes from 'prop-types';

import GridTable from 'sScomponents/utility/SsGridTable';
import {Button, Chip} from '@mui/material';
import {useFba, useFbaMethod} from '@shipsavvy/utility/FbaHooks';
import {ResponseFormatter} from './ShipmentListObjectHelper';
import ShipSavvyModal from 'sScomponents/utility/Modal';
import {ResponseItemFormatter} from './ItemResponseHelper';
import Actions from 'sScomponents/FbaActions';

const DataGridTable = () => {
  // const [filterConfig, setFilterConfig] = useState({
  //   OpenAdSModal: false,
  //   OpenBtnModal: false,
  //   search: '',
  // });
  const [isLoading, setLoading] = useState(true);
  const [shipmentIdName, setShipmentIdName] = useState({});
  const {shipmentList, shipmentItems, downloadLabel} = useFba();
  const {setShipmentItems} = useFbaMethod();
  const Listdata = ResponseFormatter(shipmentList);
  const ItemData = ResponseItemFormatter(shipmentItems);
  const [shipmentItem, setShipmentItem] = useState({
    openModal: false,
  });
  const {openModal} = shipmentItem;

  useEffect(() => {
    if (Listdata.length > 0) {
      setLoading(false);
    }
  }, [Listdata]);
  console.log(downloadLabel);

  const shipmentItemCol = [
    {field: 'sellerSku', headerName: 'Seller Sku', minWidth: 120, flex: 0.9},
    {
      field: 'fullfillmentNetworkSku',
      headerName: 'Fullfillment Network Sku',
      minWidth: 120,
      flex: 0.8,
    },
    {
      field: 'quantityShipped',
      headerName: 'Quantity Shipped',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'quantityReceived',
      headerName: 'Quantity Received',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'quantityInCase',
      headerName: 'Quantity In Case',
      minWidth: 100,
      flex: 1,
    },
  ];

  const columns = [
    {
      field: 'shipmentName',
      headerName: 'Shipment Name',
      minWidth: 180,
      flex: 1,
    },
    {field: 'shipmentId', headerName: 'Shipment Id', minWidth: 120, flex: 1},
    {
      field: 'labalType',
      headerName: 'Label Type',
      minWidth: 100,
      flex: 1,
    },
    {field: 'fromAddress', headerName: 'from Address', minWidth: 180, flex: 1},
    {field: 'destination', headerName: 'Destination', minWidth: 60, flex: 1},
    {field: 'fee', headerName: 'Fee', minWidth: 30, flex: 0.6},

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      flex: 1,
      renderCell: (changedData) => {
        let color = 'primary';
        switch (changedData.row.status) {
          case 'CLOSED':
            color = 'success';
            break;
          case 'DELETED':
            color = 'error';
            break;
          case 'CANCELLED':
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

    {
      field: 'items',
      headerName: 'Shipment Items',
      minWidth: 140,
      flex: 1.3,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              setShipmentItems(params.row);
              setShipmentIdName(params.row);
              setShipmentItem(() => ({
                openModal: true,
              }));
            }}
            sx={{fontSize: 12}}
          >
            Shipment item list
          </Button>
        );
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 130,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return <Actions item={params.row} />;
      },
    },
  ];

  return (
    <AppsContainer
      fullView
      sxStyle={{
        backgroundColor: '#fff',
        borderRadius: 5,
      }}
    >
      {/* <GrildFilter
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
        data={Listdata}
        buttonType='None'
        url=''
        btnId='common.addNewStore'
        asId='common.storeName'
      /> */}

      <GridTable
        columns={columns}
        data={Listdata}
        isLoading={isLoading}
        // tableConfig={tableConfig}
      />
      <ShipSavvyModal setShipmentItem={setShipmentItem} openModal={openModal}>
        <GridTable
          columns={shipmentItemCol}
          data={ItemData}
          isLoading={isLoading}
          shipmentId={true}
          shipmentIdName={shipmentIdName}
        />
      </ShipSavvyModal>
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
