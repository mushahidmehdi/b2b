export const configStoreResponse = (rowsData) => {
  return rowsData?.map((row) => {
    return {
      id: row.Id,
      storeName: row.StoreName,
      storeId: row.Id,
      sellerId: row.SellerId,
      marketPlaceId: row.MarketplaceId,
      shipmentList: 'Shipment List',
    };
  });
};
