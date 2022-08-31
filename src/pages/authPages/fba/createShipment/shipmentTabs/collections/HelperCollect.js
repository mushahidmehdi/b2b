import {v4 as uuidv4} from 'uuid';
export const formatCollect = (data) => {
  return data?.map((obj) => {
    console.log(obj);
    return {
      id: uuidv4(),
      key: obj?.DeliveryPoint?.Address?.Title,
      Name: obj?.DeliveryPoint?.Address?.Title,
      dropOfAddressWithChange: obj?.DeliveryPoint?.Address?.AddressLine1,
      AddressLine1: `${obj?.DeliveryPoint?.Address?.AddressLine1} ${obj?.DeliveryPoint?.Address?.AddressLine2}`,
      PostalCode: obj?.DeliveryPoint?.Address?.PostalCode,
      Country: obj?.DeliveryPoint?.Address?.Country,
      City: obj?.DeliveryPoint?.Address?.City,
      Province: obj?.DeliveryPoint?.Address?.Province,
      charges: `${obj?.QueryRateResult?.Rate} ${obj?.QueryRateResult?.Currency}`,
    };
  });
};
