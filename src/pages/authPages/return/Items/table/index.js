import React, {useState} from 'react';
import GridTable from 'sScomponents/utility/SsTable';
import GrildFilter from 'sScomponents/utility/SsTableFilter';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Chip} from '@mui/material';

const columns = [
  {
    field: 'packageCode',
    headerName: 'Package Code',
    width: 106,
    hide: true,
  },

  {field: 'sku', headerName: 'Sku', width: 100},
  {field: 'title', headerName: 'Title', width: 120},
  {field: 'itemType', headerName: 'Item Type', width: 120},
  {field: 'coo', headerName: 'COO', width: 120},
  // {field: 'unitWeight', headerName: 'Unit Weight', width: 120},
  // {field: 'unitValue', headerName: 'Unit Value', width: 120},
  {field: 'quantity', headerName: 'Quantity', width: 120},
  {field: 'totalValue', headerName: 'Total Value', width: 120},
  // {field: 'createdDate', headerName: 'Created Date', width: 120},
  // {field: 'updatedDate', headerName: 'Updated Date', width: 120},

  {field: 'packageStatus', headerName: 'Package Status', width: 126},
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => {
      console.log();
      let color = 'primary';
      switch (params.row.packageStatus) {
        case 'Deliverd':
          color = 'success';
          break;
        case 'Deleted':
          color = 'error';
          break;
        case 'Working':
          color = 'warning';
          break;
        default:
          color = 'primary';
          break;
      }
      return (
        <Chip
          sx={{
            width: 70,
          }}
          label={params.row.packageStatus}
          size='small'
          color={color}
        />
      );
    },
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: () => {
      return <MoreVertIcon />;
    },
  },
];

const dummyData = [
  {
    id: '34456344564',
    packageCode: '234234234',
    packageStatus: 'Deliverd',
    sku: 12435345435,
    title: 'Jhon Doe',
    itemType: 'Towel',
    coo: '2 Ibn',
    unitWeight: 1,
    unitValue: 4,
    quantity: 1,
    totalValue: 50,
    createdDate: '12-May-2022',
    updatedDate: '29-June-2022',
  },
  {
    id: '3564',
    packageCode: '234234234',
    packageStatus: 'Working',
    sku: 12435345435,
    title: 'Jhon Doe',
    itemType: 'Towel',
    coo: '2 Ibn',
    unitWeight: 1,
    unitValue: 4,
    quantity: 1,
    totalValue: 50,
    createdDate: '12-May-2022',
    updatedDate: '29-June-2022',
  },
];

const index = () => {
  const [filterConfig, setFilterConfig] = useState({
    open: false,
  });
  const [tableConfig, setTableConfig] = useState({
    sortModel: [{field: 'Code', sort: 'asc'}],
    isLoading: false,
    totalNoOfRows: 20,
    pageNum: 0,
    pageSize: 10,
    data: [],
  });

  return (
    <AppsContainer
      fullView
      sxStyle={{
        backgroundColor: '#fff',
        borderRadius: 5,
        overflowX: 'hidden',
      }}
    >
      <GrildFilter
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
        data={dummyData}
        buttonType='LINK'
        url='/return/createaddpackage'
        btnId='common.addNewItem'
        asId='common.storeName'
        showAdvanceSearch={false}
      />
      <GridTable
        columns={columns}
        data={dummyData}
        tableConfig={tableConfig}
        setTableConfig={setTableConfig}
      />
    </AppsContainer>
  );
};

export default index;
