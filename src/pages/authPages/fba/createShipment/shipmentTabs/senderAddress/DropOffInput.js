import React, {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import PropTypes from 'prop-types';
import {IntlMessagesRequired} from '@shipsavvy/utility/IntlMessagesRequired';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import DropOffCard from './DropOffCard';
import DeliveryPointTypeChip from 'sScomponents/Address/DeliveryPointTypeChip';
import AppCard from '@shipsavvy/core/AppCard';

const DropOffInput = ({addressId, setDropOffLocation, hideSummary}) => {
  const [dropOffLocations, setDropOffLocations] = useState([]);
  const [selectedDropOffLocation, setSelectedDropOffLocation] = useState({});
  const {getDeliveryPointOptions} = useAddressActions();

  useEffect(() => {
    addressIdChanged({DeliveryPointId: ''});
    if (!addressId || addressId == '') {
      setDropOffLocations([]);
    } else {
      getDeliveryPointOptions({AddressId: addressId}, (data) => {
        setDropOffLocations(data.Response.length ? data.Response : []);
      });
    }
  }, [addressId]);

  const handleChange = (event) => {
    const dropOffLocationId = event.target.value;
    const dropOffLocation =
      dropOffLocationId && dropOffLocationId != ''
        ? dropOffLocations.find((x) => x.DeliveryPointId == dropOffLocationId)
        : {Id: ''};
    addressIdChanged(dropOffLocation);
  };

  const addressIdChanged = (changeDropOffLocation) => {
    setSelectedDropOffLocation(changeDropOffLocation);
    if (setDropOffLocation) {
      setDropOffLocation(changeDropOffLocation);
    }
  };

  return (
    <Box sx={{minWidth: {xs: 340, sm: 520, md: 600}}}>
      <AppCard>
        <FormControl fullWidth>
          <InputLabel id='drop-off-select-label'>
            {<IntlMessagesRequired id='shipment.selectDropOffLocation' />}
          </InputLabel>
          <Select
            labelId='drop-off-select-label'
            id='drop-off-select'
            name='DropOffLocationId'
            onChange={handleChange}
            defaultValue={''}
            displayEmpty={true}
            label={<IntlMessagesRequired id='shipment.selectDropOffLocation' />}
          >
            {dropOffLocations.map((dropOffLocationOption) => (
              <MenuItem
                key={dropOffLocationOption.DeliveryPointId}
                value={dropOffLocationOption.DeliveryPointId}
              >
                {dropOffLocationOption && dropOffLocationOption.DeliveryPoint
                  ? dropOffLocationOption.DeliveryPoint.Name
                  : ''}
                {dropOffLocationOption &&
                  dropOffLocationOption.DeliveryPoint && (
                    <DeliveryPointTypeChip
                      deliveryPointType={
                        dropOffLocationOption.DeliveryPoint.DeliveryPointType
                      }
                    />
                  )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AppCard>
      {!hideSummary && selectedDropOffLocation.DeliveryPoint && (
        <DropOffCard location={selectedDropOffLocation} />
      )}
    </Box>
  );
};

DropOffInput.propTypes = {
  addressId: PropTypes.string.isRequired,
  setDropOffLocation: PropTypes.func,
  hideSummary: PropTypes.bool,
};

export default DropOffInput;
