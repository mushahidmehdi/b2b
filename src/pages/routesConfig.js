import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import NextWeekOutlinedIcon from '@mui/icons-material/NextWeekOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AmazonImg from 'assets/upload/a.png';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

const routesConfig = [
  {
    id: 'Dashboard',
    title: 'Dahboard',
    messageId: 'Dashboard',
    type: 'item',
    icon: <AutoAwesomeMosaicRoundedIcon />,
    url: '/dashboard',
  },

  {
    id: 'Shipment',
    title: 'Shipment',
    messageId: 'shipment',
    type: 'collapse',
    icon: <LocalShippingRoundedIcon fontSize='small' />,
    children: [
      {
        id: 'createShipment',
        title: 'Create Shipment',
        messageId: 'shipment.createShipment',
        type: 'item',
        icon: <AddRoundedIcon style={{fontSize: 21}} />,
        url: '/shipment/createshipment',
      },
      {
        id: 'shipmentPackages',
        title: 'Shipment Packages',
        messageId: 'shipment.shipmentlist',
        type: 'item',
        icon: <NextWeekOutlinedIcon style={{fontSize: 21}} />,
        url: '/shipment/shipmentlist',
      },
    ],
  },
  {
    id: 'Inventory',
    title: 'Inventory',
    messageId: 'inventory',
    type: 'collapse',
    icon: <Inventory2RoundedIcon fontSize='small' />,
    children: [
      {
        id: 'inventoryInventorydatagrid',
        title: 'Inventory List',
        messageId: 'inventory.inventorydatagrid',
        type: 'item',
        icon: <ListRoundedIcon />,
        url: '/inventory/inventorydatagrid',
      },
      {
        id: 'createInventory',
        title: 'create Inventory',
        messageId: 'inventory.createInventory',
        type: 'item',
        icon: <AddRoundedIcon />,
        url: '/inventory/createinventory',
      },
    ],
  },
  {
    id: 'App Store',
    title: 'AppStore',
    messageId: 'appStore',
    type: 'item',
    icon: <StorefrontIcon fontSize='small' />,
    url: '/appstore',
  },

  {
    id: 'My App',
    title: 'MyApp',
    messageId: 'common.fbaCaToUsa',
    type: 'item',
    icon: <img src={AmazonImg} width={180} />,
    url: '/fba/stores',
    // children: [
    //   {
    //     id: 'createInventory',
    //     title: 'create Inventory',
    //     messageId: 'fba.yourStores',
    //     type: 'item',
    //     icon: <img src={AmazonStore} width={180} />,
    //     url: '/fba/stores',
    //   },
    // {
    //   id: 'shipmentList',
    //   title: 'Shipment List',
    //   messageId: 'shipment.createShipment',
    //   type: 'item',
    //   icon: <AddRoundedIcon />,
    //   url: '/fba/create',
    // },
    // ],
  },

  {
    id: 'return',
    title: 'return',
    messageId: 'return.management',
    type: 'collapse',
    icon: <AssignmentReturnIcon fontSize='small' />,
    children: [
      {
        id: 'createReturn',
        title: 'Create Return',
        messageId: 'return.packageList',
        type: 'item',
        icon: <AddRoundedIcon />,
        url: '/return/createaddpackage',
      },
      {
        id: 'returnList',
        title: 'Return List',
        messageId: 'return.returnPackage',
        type: 'item',
        icon: <ListRoundedIcon />,
        url: '/return/packagestable',
      },
      {
        id: 'returnList',
        title: 'Return List',
        messageId: 'return.itemPackgeList',
        type: 'item',
        icon: <ListRoundedIcon />,
        url: '/return/packageitemtable',
      },
    ],
  },
];
export default routesConfig;
