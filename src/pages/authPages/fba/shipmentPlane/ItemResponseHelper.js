import {v4 as uuidv4} from 'uuid';
export const ResponseItemFormatter = (data) => {
  return data?.map((obj) => {
    return {
      id: uuidv4(),
      quantityReceived: obj.QuantityReceived,
      quantityShipped: obj.QuantityShipped,
      fullfillmentNetworkSku: obj.FulfillmentNetworkSKU,
      sellerSku: obj.SellerSKU,
      quantityInCase: obj.QuantityInCase || 'NA',
    };
  });
};
