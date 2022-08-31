import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import PropTypes from 'prop-types';
import {IntlMessagesRequired} from '@shipsavvy/utility/IntlMessagesRequired';
import {useAddressActions} from '@shipsavvy/services/apis/AddressProvider/AddressProvider';
import DropOffLocationSummary from 'sScomponents/Address/DropOffLocationSummary';
import DeliveryPointTypeChip from 'sScomponents/Address/DeliveryPointTypeChip';

const DropOffLocation = ({addressId, setDropOffLocation, hideSummary, id}) => {
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
        if (id && id != '') {
          const dropOffLocation = data.Response.find(
            (x) => x.DeliveryPointId == id,
          );
          if (dropOffLocation) {
            setSelectedDropOffLocation(dropOffLocation);
          }
        }
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
    <>
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
          value={id || ''}
        >
          {dropOffLocations.map((dropOffLocationOption, idx) => (
            <MenuItem key={idx} value={dropOffLocationOption.DeliveryPointId}>
              {dropOffLocationOption && dropOffLocationOption.DeliveryPoint
                ? dropOffLocationOption.DeliveryPoint.Name
                : ''}
              {dropOffLocationOption && dropOffLocationOption.DeliveryPoint && (
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
      {!hideSummary && selectedDropOffLocation.DeliveryPoint && (
        <DropOffLocationSummary location={selectedDropOffLocation} />
      )}
    </>
  );
};

DropOffLocation.propTypes = {
  addressId: PropTypes.string.isRequired,
  setDropOffLocation: PropTypes.func,
  hideSummary: PropTypes.bool,
  id: PropTypes.string,
};

export default DropOffLocation;
