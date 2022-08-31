import PropTypes from 'prop-types';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';

const DataGridTable = ({
  columns,
  data,
  isLoading,
  shipmentId,
  shipmentIdName,
}) => {
  return (
    <>
      {shipmentId ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBlockEnd: 10,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBlockEnd: 3,
              width: 500,
              maxWidth: '100%',
            }}
          >
            <Typography
              variant='h2'
              sx={{
                marginInlineEnd: 2,
              }}
            >
              Shipment Id:{' '}
            </Typography>
            <Typography variant='h3'>{shipmentIdName?.shipmentId}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: 500,
              maxWidth: '100%',
            }}
          >
            <Typography
              variant='h2'
              sx={{
                marginInlineEnd: 2,
              }}
            >
              Shipment Name:{' '}
            </Typography>
            <Typography variant='h3'>{shipmentIdName?.shipmentName}</Typography>
          </Box>
        </Box>
      ) : (
        ''
      )}
      <DataGrid
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          paddingInline: 6,
        }}
        rows={data}
        columns={columns}
        loading={isLoading}
      />
    </>
  );
};

DataGridTable.propTypes = {
  tableConfig: PropTypes.any,
  setTableConfig: PropTypes.any,
  isLoading: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  shipmentId: PropTypes.string,
  shipmentIdName: PropTypes.object,
};

export default DataGridTable;
