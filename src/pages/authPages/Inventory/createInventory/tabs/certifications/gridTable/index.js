import {React, useState} from 'react';
import PropTypes from 'prop-types';
import {Chip} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {rowData} from './utillity';
import {useEffect} from 'react';

const DataGridTable = ({isLoading, responseData}) => {
  const dataRes = rowData(responseData);
  const [newRow, setNewRow] = useState([]);

  useEffect(() => {
    setNewRow((prevState) => [...prevState, dataRes]);
  }, [dataRes.id]);
  console.log(newRow);

  const columns = [
    {field: 'title', headerName: 'Title', width: 160},
    {field: 'path', headerName: 'Link', width: 200},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (changedData) => {
        let color = 'primary';
        switch (changedData.row.status) {
          case 'Draft':
            color = 'warning';
            break;
          case 'New':
            color = 'success';
            break;

          default:
            color = 'primary';
            break;
        }
        return (
          <Chip
            sx={{
              width: '50%',
            }}
            label='Edit'
            size='small'
            color={color}
          />
        );
      },
    },
  ];
  const [totalRowCount] = useState(0);
  const [sortModel, setSortModel] = useState([{field: 'Code', sort: 'asc'}]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });
  const {page, pageSize} = pagination;

  return (
    <DataGrid
      autoHeight
      sortingMode='server'
      sortModel={sortModel}
      onSortModelChange={(sortModel) => setSortModel(sortModel)}
      rowCount={totalRowCount || 0}
      loading={isLoading}
      paginationMode='server'
      rowsPerPageOptions={[10, 25, 50, 100]}
      pagination
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) =>
        setPagination((prevState) => ({...prevState, page: newPage}))
      }
      onPageSizeChange={(newPageSize) =>
        setPagination((prevState) => ({
          ...prevState,
          pageSize: newPageSize,
        }))
      }
      rows={newRow}
      columns={columns}
      sx={{
        backgroundColor: '#fff',
        maxWidth: '513px',
      }}
      checkboxSelection
    />
  );
};

DataGridTable.propTypes = {
  isLoading: PropTypes.any,
  responseData: PropTypes.any,
};

export default DataGridTable;
