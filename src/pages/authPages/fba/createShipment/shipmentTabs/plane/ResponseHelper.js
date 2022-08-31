import {v4 as uuidv4} from 'uuid';

export const shipFormatter = (data) => {
  const packageList =
    data?.TransportDetails?.PartneredSmallParcelData?.PackageList;
  return packageList?.map((obj) => {
    return {
      id: uuidv4(),
      packageStatus: obj?.PackageStatus,
      dimension: `${obj?.Dimensions.Length}x${obj?.Dimensions.Width}x${obj?.Dimensions.Height} ${obj?.Dimensions?.Unit}`,
      weight: `${obj?.Weight?.Value} ${obj?.Weight?.Unit}`,
      carrerName: obj?.CarrierName,
      trackingId: obj?.TrackingId,
    };
  });
};
