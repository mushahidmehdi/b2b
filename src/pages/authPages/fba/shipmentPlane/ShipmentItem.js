import {React, useEffect} from 'react';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import AppsContent from '@shipsavvy/core/AppsContainer/AppsContent';
import PropTypes from 'prop-types';

import {DataGrid} from '@mui/x-data-grid';
import {ApiMethod} from '@shipsavvy/services/Api';
import {fba} from '../endPoints';

const columns = [
  {field: 'sellerSku', headerName: 'Seller Sku', minWidth: 130, flex: 1},
  {
    field: 'fullfillmentSku',
    headerName: 'Fullfillment Sku',
    minWidth: 130,
    flex: 1,
  },
  {field: 'quantityShip', headerName: 'Quantity Ship', minWidth: 130, flex: 1},
  {
    field: 'quantityReceived',
    headerName: 'Quantity Received',
    minWidth: 130,
    flex: 1,
  },
  {field: 'quantityCase', headerName: 'Quantity Case', minWidth: 130, flex: 1},
];
//
const dummyData = [
  {
    id: '344rtrtrt564',
    sellerSku: '22-DF42-52QR',
    fullfillmentSku: 'X0087897',
    quantityShip: '24',
    quantityReceived: '24',
    quantityCase: 'N/A',
  },
  {
    id: '4564564356',
    sellerSku: '242-52QR',
    fullfillmentSku: 'VLLKJ',
    quantityShip: '22',
    quantityReceived: '22',
    quantityCase: 'N/A',
  },
];

const DataGridTable = () => {
  useEffect(() => {
    ApiMethod(fba.GET_STORE, ApiMethod.GET, {}, () => {});
  }, []);

  return (
    <AppsContainer
      title={'Shipment Plans'}
      fullView
      sxStyle={{
        backgroundColor: '#fff',
        borderRadius: 5,
      }}
    >
      <AppsContent
        sxStyle={{
          boxShadow: 'none',
          border: '1px solid red',
        }}
      >
        <DataGrid
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          // sortingMode='server'
          // sortModel={sortModel}
          // onSortModelChange={(sort) =>
          //   setFiltersFormData((prev) => ({
          //     ...prev,
          //     sortModel: sort,
          //   }))
          // }
          // rowCount={totalNoOfRows || 0}
          // loading={isLoading}
          // paginationMode='server'
          rowsPerPageOptions={[10, 25, 50, 75, 100]}
          pagination
          // page={page}
          // pageSize={pageSize}
          // onPageChange={(newPage) =>
          //   setFiltersFormData((prevState) => ({...prevState, page: newPage}))
          // }
          // onPageSizeChange={(newPageSize) =>
          //   setFiltersFormData((prevState) => ({
          //     ...prevState,
          //     pageSize: newPageSize,
          //   }))
          // }
          rows={dummyData}
          columns={columns}
        />
      </AppsContent>
    </AppsContainer>
  );
};

DataGridTable.propTypes = {
  isLoading: PropTypes.any,
};

export default DataGridTable;
