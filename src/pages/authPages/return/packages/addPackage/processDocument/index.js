import React, {useState} from 'react';
import GridTable from 'sScomponents/utility/SsTable';
import AppsContainer from '@shipsavvy/core/AppsContainer';
import {Typography} from '@mui/material';
import AppCard from '@shipsavvy/core/AppCard';
import AppAnimate from '@shipsavvy/core/AppAnimate';
import {Box} from '@mui/system';

const columns = [
  {field: 'status', headerName: 'Status', flex: 0.7},
  {field: 'createdBy', headerName: 'Created By', flex: 0.6},
  {field: 'sku', headerName: 'Tracking Code', flex: 0.7},
  {field: 'asin', headerName: 'ASIN', flex: 0.5},
  {field: 'title', headerName: 'title', flex: 0.6},
  {field: 'message', headerName: 'Message', flex: 0.7},
];

const dummyData = [
  {
    id: '34456344564',
    status: 'Success',
    createdBy: '08 05 2022',
    sku: 123405345,
    asin: '234DFDff',
    title: 'Towel for baby',
    message: 'Towel or Jacob new born Baby',
  },
  {
    id: '34456344564',
    status: 'Success',
    createdBy: '12 05 2022',
    sku: 7567,
    asin: '234DFDff',
    title: 'Towel for baby',
    message: "Towel or Jacob's new born",
  },
];

const index = () => {
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
      <Box
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
                <strong>Process Count</strong>: xxx-xxxx-xxxxx-xxx{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>

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
                <strong>File Name</strong>: xxxxx.pdf{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>

        <AppAnimate
          animation='transition.slideDownIn'
          delay={200}
          sxStyle={{maxWidth: 230}}
        >
          <Box
            sx={{
              maxWidth: 780,
              paddingBlock: 4,
              paddingInline: 4,
              borderRadius: 4,
              // backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <AppCard maxWidth='200px'>
              <Typography>
                <strong>Created By</strong>: User101{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>

        <AppAnimate
          animation='transition.slideDownIn'
          delay={200}
          sxStyle={{maxWidth: 230}}
        >
          <Box
            sx={{
              maxWidth: 580,
              paddingBlock: 4,
              paddingInline: 4,
              borderRadius: 4,
              // backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <AppCard>
              <Typography>
                <strong>Package Count</strong>: 12{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>
      </Box>
      <Box
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
                <strong>Success Count</strong>: 12{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>

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
                <strong>Failed Count</strong>: 1{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>

        <AppAnimate
          animation='transition.slideDownIn'
          delay={200}
          sxStyle={{maxWidth: 230}}
        >
          <Box
            sx={{
              maxWidth: 300,
              paddingBlock: 4,
              paddingInline: 4,
              borderRadius: 4,
              // backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <AppCard maxWidth='300px'>
              <Typography>
                <strong>Status</strong>:Completed/Active{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>

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
                <strong>File Path</strong>: localhost:3000{' '}
              </Typography>
            </AppCard>
          </Box>
        </AppAnimate>
      </Box>
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
