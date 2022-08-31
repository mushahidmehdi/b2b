import AppsContainer from '@shipsavvy/core/AppsContainer';
import AppsContent from '@shipsavvy/core/AppsContainer/AppsContent';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import {Button, Chip, TextField} from '@mui/material';
import {useFba} from '@shipsavvy/utility/FbaHooks';
import {shipFormatter} from './ResponseHelper';

const DataGridTable = ({nextTab, handleShipmentList}) => {
  const [isLoading, setLoading] = useState(true);
  const {prepShipment} = useFba();
  const formatedRes = shipFormatter(prepShipment);

  useEffect(() => {
    handleShipmentList(prepShipment);
  }, [prepShipment]);

  setTimeout(() => {
    setLoading(false);
  }, 1600);

  const columns = [
    {
      field: 'trackingId',
      headerName: 'Tracking Id',
      minWidth: 100,
      flex: 1,
    },

    {
      field: 'dimension',
      headerName: 'Dimensions [lwh]',
      minWidth: 140,
      flex: 1,
    },
    {field: 'weight', headerName: 'Weight', minWidth: 100, flex: 1},
    {
      field: 'carrerName',
      headerName: 'Courier Name',
      minWidth: 200,
      flex: 2,
    },

    {
      field: 'boxNo',
      headerName: 'Box Amount',
      minWidth: 100,
      flex: 1,
      renderCell: () => {
        return (
          <TextField
            id='outlined-basic'
            label='Amount'
            variant='outlined'
            onChange={(e) => console.log(e)}
            size='small'
          />
        );
      },
    },
    {
      field: 'shipmentGroup',
      headerName: 'Shipment Group',
      minWidth: 140,
      flex: 1,
      renderCell: () => {
        return (
          <TextField
            id='outlined-basic'
            label='Group'
            variant='outlined'
            onChange={(e) => console.log(e)}
            size='small'
          />
        );
      },
    },
    {
      field: 'packageStatus',
      headerName: 'Status',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        let color = 'primary';
        switch (params.row.packageStatus) {
          case 'DELIVERED':
            color = 'success';
            break;
          case 'CANCELLED':
            color = 'success';
            break;
          case 'DELETED':
            color = 'error';
            break;
          case 'SHIPPED':
            color = 'warning';
            break;
          case 'RECEIVING':
            color = 'warning';
            break;
          default:
            color = 'primary';
            break;
        }
        return (
          <Chip
            label={params.row.packageStatus || 'No Label'}
            size='small'
            color={color}
          />
        );
      },
    },
  ];

  return (
    <>
      <AppsContainer
        fullView
        sxStyle={{
          backgroundColor: '#fff',
          borderRadius: 5,
        }}
      >
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <AppAnimate
            animation='transition.slideDownIn'
            delay={200}
            sxStyle={{maxWidth: 230}}
          >
            <Box
              sx={{
                maxWidth: 600,
                paddingBlock: 4,
                paddingInline: 4,
                borderRadius: 4,
                // backgroundColor: (theme) => theme.palette.background.default,
              }}
            >
              <AppCard maxWidth='200px'>
                <Typography>
                  <strong>Estimated Amount</strong>:{' '}
                  {`  ${
                    prepShipment?.TransportDetails?.PartneredSmallParcelData
                      ?.PartneredEstimate?.Amount?.Value || 'NA'
                  } ${
                    prepShipment?.TransportDetails?.PartneredSmallParcelData
                      ?.PartneredEstimate?.Amount?.CurrencyCode || 'NA'
                  }`}
                </Typography>
              </AppCard>
            </Box>
          </AppAnimate>
        </Box> */}

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
            rows={formatedRes || []}
            columns={columns}
            loading={isLoading}
          />
        </AppsContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginInlineEnd: 3,
            gap: 5,
          }}
        >
          <Button
            sx={{paddingInline: 12}}
            variant='contained'
            onClick={() => nextTab()}
          >
            Next
          </Button>
        </Box>
      </AppsContainer>
    </>
  );
};

DataGridTable.propTypes = {
  isLoading: PropTypes.any,
  setFiltersFormData: PropTypes.func,
  filtersFormData: PropTypes.any,
  data: PropTypes.any,
  children: PropTypes.node,
  onClose: PropTypes.func,
  nextTab: PropTypes.func,
  handleShipmentList: PropTypes.func,
};

export default DataGridTable;
