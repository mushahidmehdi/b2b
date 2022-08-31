export const handleRowData = (rowsData) => {
  return rowsData?.map((row) => {
    return {
      id: row.Id,
      sku: row.Sku,
      status: row.Status,
      title: row.Name,
      type: row.ProductType.Name,
      certificate: row.Documents.length,
      weight: ` ${row.ShippingDetail.Weight} ${row.ShippingDetail.WeightUnit}`,
      dimentions: `${row.ShippingDetail.Length} x ${row.ShippingDetail.Width} x ${row.ShippingDetail.Height} ${row.ShippingDetail.DimensionUnit}`,
    };
  });
};
