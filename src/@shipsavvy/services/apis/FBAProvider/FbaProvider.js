import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Api, {ApiMethod} from '@shipsavvy/services/Api';
import {useDispatch} from 'react-redux';
import {fetchError} from 'redux/actions';

const FbaContext = createContext();
const FbaContextActions = createContext();

const FbaProvider = ({children}) => {
  const [fab, setFab] = useState({
    seletedStoreIds: [],
    seletedStores: [],
    shipmentList: [],
    customerMwsId: localStorage.getItem('customerMwsId'),
    shipmentItems: [],
    downloadLabel: '',
    prepShipment: [],
    lastShipmentSummary: localStorage.getItem('lastShipSummary'),
    senderAddress: {},
  });

  const {customerMwsId, lastShipmentSummary} = fab;
  const dispatch = useDispatch();

  const setSelectedStoreId = (id) => {
    setFab((currState) => ({
      ...currState,
      seletedStoreIds: id,
    }));
  };

  const setSelectedStore = (storeName) => {
    setFab((currState) => ({
      ...currState,
      seletedStores: storeName,
    }));
  };

  const setShipmentLabel = (labelData) => {
    setFab((prev) => ({
      ...prev,
      downloadLabel: labelData,
    }));
  };

  const setPrepShipment = (shipData) => {
    setFab((prev) => ({
      ...prev,
      prepShipment: shipData,
    }));
  };

  useEffect(() => {
    const getShipmentList = () => {
      const params = {
        CustomerMwsId: customerMwsId,
        LastUpdatedAfter: '2018-06-27T07:34:20.023Z',
        LastUpdatedBefore: '2022-06-30T07:34:20.023Z',
        ShipmentStatusList: [
          'WORKING',
          'SHIPPED',
          'RECEIVING',
          'CANCELLED',
          'DELETED',
          'CLOSED',
          'ERROR',
          'IN_TRANSIT',
          'CHECKED_IN',
          'DELIVERED',
        ],
      };
      Api(
        '/fbaca2us/Shipment/ListByShipmentStatus',
        ApiMethod.POST,
        params,
        ({Response}) => {
          setFab((prev) => ({
            ...prev,
            shipmentList: Response.ShipmentData,
          }));
        },
      );
    };

    const getLastShipmentSummary = () => {
      const params = {
        CustomerMwsId: customerMwsId,
        ShipmentId: lastShipmentSummary,
      };
      Api(
        '/fbaca2us/Shipment/GetTransportDetails',
        ApiMethod.POST,
        params,
        ({Response}) => {
          setPrepShipment(Response.TransportContent);
        },
        ({Status}) => {
          if (Status === 'Failure') {
            dispatch(
              fetchError('Something went wrong while fetching your data'),
            );
          }
          setFab((prev) => ({
            ...prev,
            prepShipment: '',
          }));
        },
      );
    };
    getLastShipmentSummary();
    getShipmentList();
  }, []);

  const setShipmentList = (shipment) => {
    localStorage.removeItem('customerMwsId');
    localStorage.setItem('customerMwsId', shipment.id);
    const params = {
      CustomerMwsId: shipment.id || customerMwsId,
      LastUpdatedAfter: '2018-06-27T07:34:20.023Z',
      LastUpdatedBefore: '2022-06-30T07:34:20.023Z',
      ShipmentStatusList: [
        'WORKING',
        'SHIPPED',
        'RECEIVING',
        'CANCELLED',
        'DELETED',
        'CLOSED',
        'ERROR',
        'IN_TRANSIT',
        'CHECKED_IN',
        'DELIVERED',
      ],
    };
    Api(
      '/fbaca2us/Shipment/ListByShipmentStatus',
      ApiMethod.POST,
      params,
      ({Response}) => {
        setFab((prev) => ({
          ...prev,
          shipmentList: Response.ShipmentData,
        }));
      },
    );
  };

  const setShipmentItems = (shipmentList) => {
    const params = {
      CustomerMwsId: customerMwsId,
      ShipmentId: shipmentList.shipmentId,
    };

    Api(
      '/fbaca2us/Shipment/GetShipmentItems',
      ApiMethod.POST,
      params,
      ({Response}) => {
        setFab((prev) => ({
          ...prev,
          shipmentItems: Response.ItemData,
        }));
      },
      ({Status}) => {
        if (Status === 'Failure') {
          dispatch(fetchError('Something went wrong while fetching your data'));
        }
        setFab((prev) => ({
          ...prev,
          shipmentItems: [],
        }));
      },
    );
  };

  const getShipmentLabel = async (shipmentList) => {
    const params = {
      CustomerMwsId: customerMwsId,
      ShipmentId: shipmentList.shipmentId,
    };

    await Api(
      '/fbaca2us/Shipment/GetLabel',
      ApiMethod.POST,
      params,
      ({Response}) => {
        setShipmentLabel(Response.DownloadURL);
      },
      ({Status}) => {
        if (Status === 'Failure') {
          dispatch(fetchError('Something went wrong while accessing Label'));
        }
      },
    );
  };

  const prepareShipment = (order) => {
    localStorage.removeItem('lastShipSummary');
    localStorage.setItem('lastShipSummary', order.shipmentId);
    const params = {
      CustomerMwsId: customerMwsId,
      ShipmentId: order.shipmentId,
    };
    Api(
      '/fbaca2us/Shipment/GetTransportDetails',
      ApiMethod.POST,
      params,
      ({Response}) => {
        console.log(Response);
        setPrepShipment(Response.TransportContent);
      },
      ({Status}) => {
        if (Status === 'Failure') {
          dispatch(fetchError('Something went wrong while fetching your data'));
        }
        setFab((prev) => ({
          ...prev,
          prepShipment: '',
        }));
      },
    );
  };

  const chosenSenderAddress = (address) => {
    setFab((prev) => ({...prev, senderAddress: address}));
  };

  return (
    <FbaContext.Provider value={{...fab}}>
      <FbaContextActions.Provider
        value={{
          setSelectedStoreId,
          setSelectedStore,
          setShipmentList,
          setShipmentItems,
          getShipmentLabel,
          prepareShipment,
          setShipmentLabel,
          chosenSenderAddress,
        }}
      >
        {children}
      </FbaContextActions.Provider>
    </FbaContext.Provider>
  );
};

export const useFbaActions = () => useContext(FbaContextActions);
export const useFbaContext = () => useContext(FbaContext);

export default FbaProvider;

FbaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
