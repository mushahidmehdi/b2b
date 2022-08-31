import {v4 as uuidv4} from 'uuid';
export const ResponseFormatter = (data) => {
  return data?.map((obj) => {
    return {
      id: uuidv4(),
      shipmentId: obj.ShipmentId,
      shipmentName: obj.ShipmentName,
      status: obj.ShipmentStatus,
      labalType: obj.LabelPrepType,
      fromAddress: obj?.ShipFromAddress?.AddressLine1,
      destination: obj.DestinationFulfillmentCenterId,
      fee: `${obj?.EstimatedBoxContentsFee?.TotalFee?.Value || 'NA'}  ${
        obj?.EstimatedBoxContentsFee?.TotalFee?.CurrencyCode || ''
      }`,
      items: obj.BoxContentsSource,
      amazonLabel: 'download',
    };
  });
};
