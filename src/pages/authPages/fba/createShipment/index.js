import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FbaDesignAPI} from './shipmentConfig';
import TabsCases from './TabsCases';
import {Box, List, ListItem, Typography} from '@mui/material';

const Index = () => {
  const [fbaDetail, setFbaDetail] = useState({
    activeTabId: 101,
  });
  const {activeTabId} = fbaDetail;

  return (
    <Box>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          width: 960,
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            position: 'absolute',
            width: {xs: 0, sm: 555, md: 750, lg: 750, xl: 750},
            background: '#fff',
            color: '#fff',
            height: '3px',
            top: '49%',
          }}
        />
        {FbaDesignAPI.map(({title, Icon, id}) => (
          <ListItem
            sx={{
              height: 90,
              width: 90,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              backgroundColor: (theme) => theme.palette.background.default,

              border: '3px solid #fff',

              cursor: 'pointer',
              borderRadius: 200,
              margin: 2,
              textAlign: 'center',
            }}
            key={id}
            onClick={() => {
              setFbaDetail((prevState) => ({
                ...prevState,
                activeTabId: id,
              }));
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                transition: '0.8s',
                opacity: activeTabId === id ? 1 : 0.4,
              }}
            >
              <Icon color='primary' />
              {id === 102 ? (
                <Typography variant='h6' color='primary' sx={{minWidth: 40}}>
                  {title}
                </Typography>
              ) : (
                <Typography
                  color='primary'
                  sx={{marginInlineStart: 2}}
                  variant='h6'
                >
                  {title}
                </Typography>
              )}
            </Box>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          margin: '0 auto',
          alignSelf: 'center',
          marginBlockStart: 12,
          width: 960,
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TabsCases fbaDetail={fbaDetail} setFbaDetail={setFbaDetail} />
      </Box>
    </Box>
  );
};

Index.propTypes = {
  color: PropTypes.string,
};

export default Index;
