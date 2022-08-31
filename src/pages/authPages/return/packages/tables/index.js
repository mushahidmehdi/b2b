import React, {useState} from 'react';
import GridTable from 'sScomponents/utility/SsTable';
import GrildFilter from 'sScomponents/utility/SsTableFilter';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const columns = [
  {field: 'packageCode', headerName: 'Package Code', width: 120},
  {field: 'trackingId', headerName: 'Tracking Id', width: 110},
  {field: 'trackingCode', headerName: 'Tracking Code', width: 110},
  {field: 'status', headerName: 'Status', width: 90},
  {field: 'packageItem', headerName: 'Package Item', width: 100},
  {field: 'packageWeight', headerName: 'Package Weight', width: 130},
  {field: 'vendorId', headerName: 'Vendor Id', width: 100},
  {field: 'clientCode', headerName: 'Client Code', width: 100},
  {field: 'clientTitle', headerName: 'Client Title', width: 100},
  {field: 'ior', headerName: 'IOR', width: 60},
  // {field: 'createdDate', headerName: 'Created Date', width: 100},
  // {field: 'updatedDate', headerName: 'Updated Date', width: 100},
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
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
    trackingId: '234324',
    trackingCode: 12,
    status: 'Active',
    packageItem: 'Towel',
    packageWeight: '2 Ibn',
    vendorId: 1121,
    clientCode: 234,
    clientTitle: 'Jhon Doe',
    ior: '-',
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
