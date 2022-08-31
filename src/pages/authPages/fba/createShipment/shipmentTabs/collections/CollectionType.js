import React, {useEffect, useState} from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import {IntlMessagesRequired} from '@shipsavvy/utility/IntlMessagesRequired';
import AddressCard from '../senderAddress/AddressCard';
import AppCard from '@shipsavvy/core/AppCard';
import AppAnimate from '@shipsavvy/core/AppAnimate';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {formatCollect} from './HelperCollect';
// import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
// import Boxes from 'assets/upload/boxes.png';

const Index = ({
  nextTab,
  prevTab,
  // handleDropOffAdress,
  // handleWareHouseAdress,
  handleInput,
  dropOff,
  dropOffAddress,
}) => {
  const [dropOffAddressWithoutCharnge, setDropOffAddressWithoutCharnge] =
    useState({});
  const [dropOffAddressWithCharge, setDropOffAddressWithCharge] = useState({});
  const [search, setSearch] = useState({
    searchWareHouse: '',
    postalCode: '',
    data: [],
  });
  const {searchWareHouse} = search;

  const searchStore = () => {
    const params = {
      Code: 'string',
      Name: 'string',
      CountryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      CityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      ProvinceId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      PostalCode: 'string',
      IsTransitWarehouse: 'All',
      IsAbleForCourier: 'All',
      IsAbleForPickups: 'All',
      Search: searchWareHouse,
      PageIndex: 0,
      PageSize: 0,
      OrderBy: 'string',
      OrderDir: 'ASC',
    };

    callApi('/warehouse/Search', ApiMethod.POST, params, (data) => {
      console.log('warehouse response', data);
      setSearch((prev) => ({
        ...prev,
        searchWareHouse: data.Response,
      }));
    });
  };

  useEffect(() => {
    searchStore();
  }, [searchWareHouse]);

  const dropOffAddressNoCharge = formatCollect(dropOffAddress);

  const dropOffLocation = [
    {
      id: 121,
      // key: dropOffAddress?.Title,
      Name: 'British Columbia',
      dropOfAddressWithOutChange: '1300 Kamoto Road, #12 L4W 2N2',
      AddressLine1: '1300 Kamoto Road, #12 L4W 2N2',
      PostalCode: 'VOA OAO',
      Country: {Name: 'Canada'},
      Province: {Name: 'British Columbia'},
      City: {Name: 'Kaslo'},
    },
    {
      id: 122,
      key: 'Ontario',
      Name: 'Ontario',
      dropOfAddressWithOutChange: '345 K23 street, Vancouer',
      AddressLine1: '345 street Line 234',
      PostalCode: 'VOA OAO',
      Country: {Name: 'Canada'},
      City: {Name: 'Cambridge'},
      Province: {Name: 'Ontario'},
    },
    {
      id: 123,
      key: 'Alberta',
      Name: 'Alberta',
      dropOfAddressWithOutChange: '345 street Line 234, Montreal',
      AddressLine1: '345 street Line 234',
      PostalCode: 'H74',
      Country: {Name: 'Canada'},
      City: {Name: 'Hinton'},
      Province: {Name: 'Alberta'},
    },
  ];
  //  = [
  //   {
  //     id: 124,
  //     key: 'Quebec',
  //     Name: 'Quebec',
  //     dropOfAddressWithChange: '345 JH Road, #12 L4W 2N2',
  //     AddressLine1: '345 JH Road, #12 L4W 2N2',
  //     PostalCode: 'VOA OAO',
  //     Country: {Name: 'Canada'},
  //     Province: {Name: 'Kaslo'},
  //     City: {Name: 'Kaslo'},
  //   },
  //   {
  //     id: 125,
  //     key: 'Manitoba',
  //     Name: 'Manitoba',
  //     dropOfAddressWithChange: '345 K23 street, Vancouer',
  //     AddressLine1: '345 street Line 234',
  //     PostalCode: 'VOA OAO',
  //     Country: {Name: 'Canada'},
  //     City: {Name: 'StoneWall'},
  //     Province: {Name: 'Manitoba'},
  //   },
  //   {
  //     id: 126,
  //     key: 'Ontario',
  //     Name: 'Ontario',
  //     dropOfAddressWithChange: '345 street Line 234, Montreal',
  //     AddressLine1: '345 street Line 234',
  //     PostalCode: 'H74',
  //     Country: {Name: 'Canada'},
  //     City: {Name: 'Brock'},
  //     Province: {Name: 'Ontario'},
  //   },
  // ];

  return (
    <Box
      sx={{
        maxWidth: 545,
        minWidth: {xs: 340, sm: 520, md: 600},
        backgroundColor: '#fff',
        paddingBlockEnd: 4,
        paddingBlockStart: 8,
        paddingInline: 10,
        borderRadius: 4,
      }}
    >
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Box>
          <Box>
            <Typography
              sx={{
                fontSize: 17,
                // marginInlineStart: '-36px',
              }}
            >
              How would you like to sent your shipments pacakges to our
              warehouse.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBlockEnd: 2,
              marginBlockStart: 2,
            }}
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={dropOff}
                onChange={handleInput}
              >
                <FormControlLabel
                  value='warehouseInput'
                  control={<Radio />}
                  label='Deliver to nearest warehouse'
                />
                <FormControlLabel
                  value='courierInput'
                  control={<Radio />}
                  label='Sent using thired party Courier'
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Slide>
      <Box>
        {dropOff === 'warehouseInput' && (
          <AppAnimate animation='transition.slideDownIn' delay={200}>
            <AppCard>
              <Autocomplete
                fullWidth={true}
                onChange={(e, value) => {
                  setDropOffAddressWithoutCharnge(value);
                }}
                // onInputChange={(e, value) => {
                //   if (!value) setSelectedAddress({});
                // }}
                options={dropOffLocation}
                getOptionLabel={(option) => option.Name}
                style={{width: '100%'}}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label={
                      <IntlMessagesRequired id='common.dropOffwithoutCharge' />
                    }
                    variant='outlined'
                  />
                )}
              />
            </AppCard>
          </AppAnimate>
        )}

        {dropOffAddressWithoutCharnge?.id && dropOff === 'warehouseInput' ? (
          <AddressCard address={dropOffAddressWithoutCharnge} />
        ) : (
          ''
        )}

        <Box />
        {dropOff === 'courierInput' && (
          <AppAnimate animation='transition.slideDownIn' delay={200}>
            <AppCard>
              <Autocomplete
                fullWidth={true}
                onChange={(e, value) => {
                  setDropOffAddressWithCharge(value);
                }}
                options={dropOffAddressNoCharge}
                getOptionLabel={(option) => option.Name}
                style={{width: '100%'}}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label={<IntlMessagesRequired id='common.dropOffCharge' />}
                    variant='outlined'
                  />
                )}
              />
            </AppCard>
          </AppAnimate>
        )}

        {dropOffAddressWithCharge?.id && dropOff === 'courierInput' ? (
          <AddressCard address={dropOffAddressWithCharge} />
        ) : (
          ''
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            marginBlockStart: 4,
          }}
        >
          <Button
            variant='outlined'
            sx={{paddingInline: 9}}
            onClick={() => prevTab()}
          >
            Back
          </Button>{' '}
          <Button
            variant='contained'
            sx={{paddingInline: 9}}
            onClick={() => nextTab()}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Index.propTypes = {
  nextTab: PropTypes.func,
  prevTab: PropTypes.func,
  setSenderInfo: PropTypes.func,
  handleDropOffAdress: PropTypes.func,
  handleWareHouseAdress: PropTypes.func,
  handleInput: PropTypes.func,
  dropOff: PropTypes.string,
  dropOffAddress: PropTypes.any,
};
export default Index;
