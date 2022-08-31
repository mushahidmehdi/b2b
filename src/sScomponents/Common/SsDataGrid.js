import {React} from 'react';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import AppsContent from '@shipsavvy/core/AppsContainer/AppsContent';
import PropTypes from 'prop-types';
import {DataGrid} from '@mui/x-data-grid';

const DataGridTable = ({
  columnsConfig,
  data,
  isLoading,
  page,
  pageSize,
  sortModel,
  totalNoOfRows,
  setFiltersFormData,
}) => {
  //   const columns = [
  //     {field: 'sku', headerName: 'Sku', flex: 1},
  //     {field: 'title', headerName: 'Title', flex: 1.3},
  //     {field: 'type', headerName: 'Type', flex: 1},
  //     {field: 'certificate', headerName: 'Certificate', flex: 1},
  //     {field: 'weight', headerName: 'Weight', flex: 1},
  //     {field: 'dimentions', headerName: 'Dimentions (lwh)', flex: 1},
  //     {
  //       field: 'status',
  //       headerName: 'Status',
  //       flex: 1,
  //       renderCell: (changedData) => {
  //         let color = 'primary';
  //         switch (changedData.row.status) {
  //           case 'Draft':
  //             color = 'success';
  //             break;
  //           case 'Deleted':
  //             color = 'error';
  //             break;
  //           case 'Passive':
  //             color = 'warning';
  //             break;
  //           default:
  //             color = 'primary';
  //             break;
  //         }
  //         return (
  //           <Chip
  //             sx={{
  //               width: 80,
  //             }}
  //             label={changedData.row.status}
  //             size='small'
  //             color={color}
  //           />
  //         );
  //       },
  //     },

  //     {
  //       field: 'actions',
  //       headerName: 'Actions',
  //       flex: 1,
  //       sortable: false,
  //       renderCell: (params) => {
  //         return <Actions order={params.row} />;
  //       },
  //     },
  //   ];

  return (
    <AppsContainer
      title={'Inventory Data List'}
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
          sortingMode='server'
          sortModel={sortModel}
          onSortModelChange={(sort) =>
            setFiltersFormData((prev) => ({
              ...prev,
              sortModel: sort,
            }))
          }
          rowCount={totalNoOfRows || 0}
          loading={isLoading}
          paginationMode='server'
          rowsPerPageOptions={[10, 25, 50, 75, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            setFiltersFormData((prevState) => ({...prevState, page: newPage}))
          }
          onPageSizeChange={(newPageSize) =>
            setFiltersFormData((prevState) => ({
              ...prevState,
              pageSize: newPageSize,
            }))
          }
          rows={data}
          columns={columnsConfig}
        />
      </AppsContent>
    </AppsContainer>
  );
};

DataGridTable.propTypes = {
  isLoading: PropTypes.any,
  setFiltersFormData: PropTypes.func,
  filtersFormData: PropTypes.any,
  data: PropTypes.any,
};

export default DataGridTable;
