import React, {useState} from 'react';
import SenderInfo from './sender/SenderInfo';
import RecipientInfo from './recepient/RecipientInfo';
import CrossBorderItemInformationModel from './CrossBorderItemInformationModel';
import AddEditShipmentOrderPackage from './packages/AddEditShipmentOrderPackage';
import PackageItems from './packages/PackageItems';
import {useShipmentOrderActions} from '@shipsavvy/services/apis/ShipmentOrderProvider/ShipmentOrderProvider';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import ShipmentPackageList from '../shipmentPackageList';
import ShipmentOptions from './shipmentOptions';

const CreateShipmentSteps = {
  Test: 0,
  SenderInfo: 1,
  RecipientInfo: 2,
  AddEditPackage: 3,
  Packages: 4,
  ShipmentOptions: 5,
  DropOffPoint: 6,
  Payment: 7,
};

const index = () => {
  const {customerId} = useCustomer();

  const [createShipment, setCreateShipment] = useState({
    step: CreateShipmentSteps.SenderInfo,
    Id: '',
    FromAddressId: '',
    FromAddress: '',
    ToAddressId: '',
    ToAddress: '',
    DeliveryPointId: '',
    FullName: '',
    CompanyTitle: '',
    Phone: '',
    Email: '',
    Packages: [],
  });
  const {
    step,
    FromAddressId,
    FromAddress,
    DeliveryPointId,
    ToAddressId,
    ToAddress,
    FullName,
    CompanyTitle,
    Phone,
    Email,
  } = createShipment;

  const nextStep = () => {
    setCreateShipment((prevState) => ({
      ...prevState,
      step: step + 1,
    }));
  };

  const prevStep = () => {
    setCreateShipment((prevState) => ({
      ...prevState,
      step: step - 1,
    }));

    console.log({createShipment});
  };
  // const handleFieldChange = () => {};

  const setSenderInfo = (senderData) => {
    console.log(senderData);
    setCreateShipment((prevState) => ({
      ...prevState,
      ...senderData,
    }));

    console.log({createShipment});
  };

  const setRecipientInfo = (recipientData) => {
    console.log({recipientData});
    setCreateShipment((prevState) => ({
      ...prevState,
      ...recipientData,
    }));
    console.log({createShipment});
  };

  const {addShipmentOrder, addShipmentOrderPackage} = useShipmentOrderActions();
  const setShipmentOrderPackage = (packageData) => {
    console.log(packageData);

    if (createShipment.Id) {
      const newPackage = {
        ShipmentOrderId: createShipment.Id,
        ToAddressId: ToAddressId,
        ToAddress: ToAddress,
        FullName: FullName,
        CompanyTitle: CompanyTitle,
        Phone: Phone,
        Email: Email,
        ...packageData,
        Settings: [
          {
            SettingName: 'ConrainsAlcohol',
            SettingValue: packageData.ConrainsAlcohol,
            SettingType: 'Boolean',
          },
          {
            SettingName: 'ConrainsIceDry',
            SettingValue: packageData.ConrainsIceDry,
            SettingType: 'Boolean',
          },
        ],
      };
      addShipmentOrderPackage(newPackage, (data) => {
        setCreateShipment((prevState) => ({
          ...prevState,
          Packages: [...createShipment.Packages, data.Response],
          step: CreateShipmentSteps.Packages,
        }));
      });
    } else {
      setCreateShipment((prevState) => ({
        ...prevState,
        Package: packageData,
      }));

      addShipmentOrder(
        {
          CustomerId: customerId,
          FromAddressId: FromAddressId,
          FromAddress: FromAddress,
          DeliveryPointId: DeliveryPointId,
          Package: {
            ToAddressId: ToAddressId,
            ToAddress: ToAddress,
            FullName: FullName,
            CompanyTitle: CompanyTitle,
            Phone: Phone,
            Email: Email,
            ...packageData,
            Settings: [
              {
                SettingName: 'ConrainsAlcohol',
                SettingValue: packageData.ConrainsAlcohol,
                SettingType: 'Boolean',
              },
              {
                SettingName: 'ConrainsIceDry',
                SettingValue: packageData.ConrainsIceDry,
                SettingType: 'Boolean',
              },
            ],
          },
        },
        (data) => {
          setCreateShipment((prevState) => ({
            ...prevState,
            Id: data.Response.Id,
            Packages: data.Response.Packages,
            step: CreateShipmentSteps.Packages,
          }));
        },
      );
    }
  };

  const addEditNewPackage = () => {
    setCreateShipment((prevState) => ({
      ...prevState,
      step: CreateShipmentSteps.AddEditPackage,
    }));
  };

  switch (step) {
    case 0:
      return (
        <PackageItems
          nextStep={nextStep}
          prevState={prevStep}
          shipmentOrderPackage={{
            Id: 'A724B101-B5AE-4ADD-E6C1-08DA54412F6D',
            ShipmentOrderId: 'DCD5C156-3855-46C1-B4B3-08DA54412F57',
          }}
        />
      );
    case CreateShipmentSteps.SenderInfo:
      return (
        <div>
          <h1
            style={{
              marginBlockEnd: 50,
            }}
          >
            Sender Info
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <SenderInfo
              nextStep={nextStep}
              setSenderInfo={setSenderInfo}
              fromAddressId={createShipment.FromAddressId}
            />
          </div>
        </div>
      );
    case CreateShipmentSteps.RecipientInfo:
      return (
        <div>
          <h1
            style={{
              marginBlockEnd: 50,
            }}
          >
            Recipient Info
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <RecipientInfo
              nextStep={nextStep}
              prevStep={prevStep}
              setRecipientInfo={setRecipientInfo}
            />
          </div>
        </div>
      );
    case CreateShipmentSteps.AddEditPackage:
      return (
        <AddEditShipmentOrderPackage
          nextStep={nextStep}
          prevState={prevStep}
          showStepper={true}
          setShipmentOrderPackage={setShipmentOrderPackage}
        />
      );
    case CreateShipmentSteps.Packages:
      return (
        <ShipmentPackageList
          nextStep={nextStep}
          prevState={prevStep}
          shipmentOrderId={createShipment.Id || ''}
          addEditNewPackage={addEditNewPackage}
        />
      );
    case CreateShipmentSteps.ShipmentOptions:
      return (
        <ShipmentOptions
          nextStep={nextStep}
          prevState={prevStep}
          shipmentOrder={createShipment}
        />
      );
    case 5:
      return (
        <CrossBorderItemInformationModel
          nextStep={nextStep}
          prevState={prevStep}
        />
      );
  }
};

export default index;
