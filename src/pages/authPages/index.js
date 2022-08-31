import React from 'react';

const ShipmentOptions = React.lazy(() =>
  import('./shipment/createShipment/shipmentOptions'),
);
const Dashboard = React.lazy(() => import('./dashboard/index'));
const ShipmentList = React.lazy(() => import('./shipment/shipmentList/index'));
const ShipmentPackageList = React.lazy(() =>
  import('./shipment/shipmentPackageList/index'),
);
const CreateShipment = React.lazy(() =>
  import('./shipment/createShipment/index'),
);
const InventoryDataGrid = React.lazy(() => import('./Inventory/listInventory'));
const CreateInventory = React.lazy(() => import('./Inventory/createInventory'));
const AppStore = React.lazy(() => import('./appStore/index'));
const MyApp = React.lazy(() => import('./fba/stores/index'));

const ShipmentPlan = React.lazy(() => import('./fba/shipmentPlane/index'));
const ShipmentItems = React.lazy(() =>
  import('./fba/shipmentPlane/ShipmentItem'),
);
const CreateShipmentOrder = React.lazy(() =>
  import('./fba/createShipment/index'),
);
const RedirectSuccess = React.lazy(() =>
  import('./fba/stores/redirectSuccess/index'),
);
const ReturnList = React.lazy(() => import('./return/packages/tables/index'));
const AddReturnPackage = React.lazy(() =>
  import('./return/packages/addPackage/AddPackageForm'),
);
const AddReturnItem = React.lazy(() =>
  import('./return/packages/addPackage/AddItemForm/index'),
);
const AddBulk = React.lazy(() =>
  import('./return/packages/addPackage/AddBulk/index'),
);
const BulkProcess = React.lazy(() =>
  import('./return/packages/addPackage/processDocument/index'),
);
const PackageItemTable = React.lazy(() => import('./return/Items/table/index'));

export const authPagesConfigs = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/shipment/createshipment',
    element: <CreateShipment />,
  },
  {
    path: '/shipment/shipmentlist',
    element: <ShipmentList />,
  },
  {
    path: '/shipment/packages/:id',
    element: <ShipmentPackageList />,
  },
  {
    path: '/shipment/options/:id',
    element: <ShipmentOptions />,
  },

  {
    path: '/inventory/inventorydatagrid',
    element: <InventoryDataGrid />,
  },
  {
    path: '/inventory/createinventory',
    element: <CreateInventory />,
  },
  {
    path: '/appstore',
    element: <AppStore />,
  },
  {
    path: '/fba/stores',
    element: <MyApp />,
  },
  {
    path: '/fba/shipmentPlane',
    element: <ShipmentPlan />,
  },
  {
    path: '/fba/shipmentItems',
    element: <ShipmentItems />,
  },

  {
    path: '/fba/create',
    element: <CreateShipmentOrder />,
  },
  {
    path: '/amazon/authSuccess',
    element: <RedirectSuccess />,
  },
  {
    path: '/return/packagestable',
    element: <ReturnList />,
  },
  {
    path: '/return/createaddpackage',
    element: <AddReturnPackage />,
  },
  {
    path: '/return/createadditem',
    element: <AddReturnItem />,
  },
  {
    path: '/return/addBulk',
    element: <AddBulk />,
  },
  {
    path: '/return/bulkprocess',
    element: <BulkProcess />,
  },
  {
    path: '/return/packageitemtable',
    element: <PackageItemTable />,
  },
];
