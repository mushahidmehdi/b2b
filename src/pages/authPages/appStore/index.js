import {Box} from '@mui/system';
import React from 'react';
import Card from './Card';
import {storeLists} from './config';
import {useFba} from '@shipsavvy/utility/FbaHooks';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import Api, {ApiMethod} from '@shipsavvy/services/Api';

const Index = () => {
  const {seletedStores} = useFba();
  const {customerId} = useCustomer();

  if (seletedStores[0] === 'FulfillmentByAmazon') {
    const params = {
      ShipsavvyApp: 'FulfillmentByAmazon',
      CustomerId: customerId,
    };

    Api('/customer/AddApp', ApiMethod.POST, params, (data) => {
      console.log(data);
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 7,
        flexWrap: 'wrap',
      }}
    >
      {storeLists.map(({logo, id, modalTitle, Name}) => (
        <Card
          id={id}
          modalTitle={modalTitle}
          Name={Name}
          logo={logo}
          key={id}
        />
      ))}
    </Box>
  );
};

export default Index;
