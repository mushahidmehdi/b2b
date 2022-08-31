// import AppsContainer from '@shipsavvy/core/AppsContainer';
// import AppsContent from '@shipsavvy/core/AppsContainer/AppsContent';
import PropTypes from 'prop-types';
import {DataGrid} from '@mui/x-data-grid';

const DataGridTable = ({columns, data, tableConfig, setTableConfig}) => {
  const {sortModel, isLoading, totalNoOfRows, pageNum, pageSize} = tableConfig;

  return (
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
        setTableConfig((prev) => ({
          ...prev,
          sortModel: sort,
        }))
      }
      rowCount={totalNoOfRows || 0}
      loading={isLoading}
      paginationMode='server'
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      pagination
      page={pageNum}
      pageSize={pageSize}
      onPageChange={(newPage) =>
        setTableConfig((prevState) => ({...prevState, pageNum: newPage}))
      }
      onPageSizeChange={(newPageSize) =>
        setTableConfig((prevState) => ({
          ...prevState,
          pageSize: newPageSize,
        }))
      }
      rows={data}
      columns={columns}
      scrollbarSize
    />
    // </AppsContainer>
  );
};

DataGridTable.propTypes = {
  tableConfig: PropTypes.any,
  setTableConfig: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  props: PropTypes.any,
  GrildFilter: PropTypes.any,
};

export default DataGridTable;
