import {Button, Card, Typography} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, {useEffect, useState} from 'react';
import {Box} from '@mui/system';
import {useNavigate} from 'react-router-dom';
import Api, {ApiMethod} from '@shipsavvy/services/Api';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';

const index = () => {
  const [storeName, setStoreName] = useState('');
  const navigate = useNavigate();
  const {customerId} = useCustomer();

  useEffect(() => {
    const params = {};
    const url = decodeURIComponent(window.location.href);
    const decodeUrl = url?.split('?')[1]?.split('&');
    params['customerId'] = customerId;
    decodeUrl?.map((parms) => {
      let par = parms.split('=');
      if (par[0] === 'spapi_oauth_code') {
        params['OAuthCode'] = par[1];
      } else if (par[0] === 'selling_partner_id') {
        params['SellerId'] = par[1];
      } else if (par[0] === 'state') {
        const IdAndStore = par[1].split('_');
        let store = IdAndStore[0].replaceAll('+', ' ', true);
        params['StoreName'] = store;
        params['MarketplaceId'] = IdAndStore[1];
      }
    });
    console.log(params.StoreName);

    Api('fbaca2us/Mws/Add', ApiMethod.POST, params, ({Response}) => {
      console.log(Response);
      setStoreName(Response.StoreName.replace('+', ' '));
    });
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {!storeName ? (
        ''
      ) : (
        <Card
          sx={{
            position: 'absolute',
            maxWidth: 305,
            paddingBlockEnd: 5,
            paddingInline: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBlock: 10,
          }}
        >
          <CheckCircleIcon
            sx={{color: 'green', fontSize: 78, marginBlockEnd: 5}}
          />
          <Typography variant='h3' textAlign='center' gutterBottom>
            Authorize Success
          </Typography>
          <Typography variant='caption' textAlign='center'>
            You have successfully authorized your FBA store{' '}
            <strong>{storeName.replace('+', ' ')}</strong> to shipsavvy
          </Typography>
          <Button
            variant='outlined'
            sx={{
              marginBlockStart: 4,
            }}
            onClick={() => navigate('/fba/stores')}
          >
            Take me back to Store
          </Button>
        </Card>
      )}
    </Box>
  );
};

export default index;
