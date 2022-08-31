import {
  useFbaContext,
  useFbaActions,
} from '../services/apis/FBAProvider/FbaProvider';

export const useFba = () => {
  const {
    seletedStoreIds,
    seletedStores,
    shipmentList,
    customerMwsId,
    shipmentItems,
    downloadLabel,
    prepShipment,
    senderAddress,
  } = useFbaContext();
  return {
    seletedStoreIds,
    seletedStores,
    shipmentList,
    customerMwsId,
    shipmentItems,
    downloadLabel,
    prepShipment,
    senderAddress,
  };
};

export const useFbaMethod = () => {
  const {
    setSelectedStoreId,
    setSelectedStore,
    setShipmentList,
    setShipmentItems,
    getShipmentLabel,
    prepareShipment,
    setShipmentLabel,
    chosenSenderAddress,
  } = useFbaActions();
  return {
    setSelectedStoreId,
    setSelectedStore,
    setShipmentList,
    setShipmentItems,
    getShipmentLabel,
    prepareShipment,
    setShipmentLabel,
    chosenSenderAddress,
  };
};
