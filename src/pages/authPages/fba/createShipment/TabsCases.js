import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Charges from './shipmentTabs/charge/Charges';
import CollectionType from './shipmentTabs/collections/CollectionType';
import PlanDetail from './shipmentTabs/plane/PlanDetail';
import SenderAddress from './shipmentTabs/senderAddress/index';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {unitConverter} from 'sScomponents/utility/UnitConverter';

const TabsCases = ({fbaDetail, setFbaDetail}) => {
  const [startShipment, setStartShipment] = useState({
    senderAddress: {},
    wareHouseAddress: {},
    dropOffAddress: {},
    dropOff: '',
    shipmentPackagesList: [],
  });

  const {senderAddress, dropOff, shipmentPackagesList, dropOffAddress} =
    startShipment;
  const {activeTabId} = fbaDetail;

  const handleSenderAdress = (senderAddress) => {
    setStartShipment((prev) => ({...prev, senderAddress: senderAddress}));
  };

  const handleWareHouseAdress = (senderAddress) => {
    setStartShipment((prev) => ({...prev, wareHouseAddress: senderAddress}));
  };
  const handleDropOffAdress = (senderAddress) => {
    setStartShipment((prev) => ({...prev, dropOffAddress: senderAddress}));
  };
  const handleShipmentList = (packagesList) => {
    setStartShipment((prev) => ({...prev, shipmentPackagesList: packagesList}));
  };
  const handleInput = (event) => {
    setStartShipment((prev) => ({
      ...prev,
      dropOff: event.target.value,
    }));
  };

  const packageList =
    shipmentPackagesList?.TransportDetails?.PartneredSmallParcelData?.PackageList?.map(
      (obj) => {
        return {
          WeightUnit: unitConverter(obj?.Weight?.Unit),
          DimensionUnit: unitConverter(obj?.Dimensions?.Unit),
          Height: obj?.Dimensions.Height,
          Length: obj?.Dimensions.Length,
          Width: obj?.Dimensions.Width,
          Weight: obj?.Weight?.Value,
        };
      },
    );

  let changed = null;
  if (packageList?.length > 0) {
    changed = 'changed';
  }

  const searchForNearestDeliveryPoint = () => {
    const params = {
      // SenderInfo: {
      //   Name: senderAddress?.Title || ,
      //   Email: senderAddress?.Email || 'string',
      //   Phone: senderAddress?.senderAddress || 'string',
      //   PostalCode: senderAddress?.senderAddress,
      //   Country: senderAddress?.Country,
      //   City: senderAddress?.City,
      //   District: senderAddress?.District || 'string',
      //   Address: senderAddress?.AddressLine1,
      // },
      SenderInfo: {
        Name: 'Basil',
        Email: 'string',
        Phone: 'string',
        PostalCode: 'N7T2G6',
        Country: 'CA',
        City: 'Sarnia',
        District: 'ON',
        Address: 'string',
      },
      PackagesInfo: packageList,
    };

    callApi(
      '/shipping-orchestrator/Shipment/GetRateFBATool',
      ApiMethod.POST,
      params,
      ({Response}) => {
        // console.log(Response);
        handleDropOffAdress(Response);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    searchForNearestDeliveryPoint();
  }, [senderAddress, changed]);

  const nextTab = () => {
    if (activeTabId < 105) {
      setFbaDetail((prevState) => ({
        ...prevState,
        activeTabId: activeTabId + 1,
      }));
    }
  };

  const prevTab = () => {
    if (activeTabId > 101) {
      setFbaDetail((prevState) => ({
        ...prevState,
        activeTabId: activeTabId - 1,
      }));
    }
  };

  switch (activeTabId) {
    case 101:
      return (
        <PlanDetail
          nextTab={nextTab}
          prevTab={prevTab}
          handleShipmentList={handleShipmentList}
        />
      );
    case 102:
      return (
        <SenderAddress
          nextTab={nextTab}
          prevTab={prevTab}
          senderAddress={senderAddress}
          handleSenderAdress={handleSenderAdress}
        />
      );
    case 103:
      return (
        <CollectionType
          nextTab={nextTab}
          prevTab={prevTab}
          handleDropOffAdress={handleDropOffAdress}
          handleWareHouseAdress={handleWareHouseAdress}
          handleInput={handleInput}
          dropOff={dropOff}
          dropOffAddress={dropOffAddress}
        />
      );
    case 104:
      return (
        <Charges nextTab={nextTab} tabId={activeTabId} prevTab={prevTab} />
      );
    default:
      return <PlanDetail nextTab={nextTab} prevTab={prevTab} />;
  }
};
TabsCases.propTypes = {
  fbaDetail: PropTypes.object,
  setFbaDetail: PropTypes.func,
};

export default TabsCases;
