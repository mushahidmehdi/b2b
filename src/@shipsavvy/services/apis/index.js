import React from 'react';
import PropTypes from 'prop-types';
import AddressProvider from './AddressProvider/AddressProvider';
import CustomerProvider from './CustomerProvider/CustomerProvider';
import InventoryProvider from './InventoryProvider/InventoryProvider';
import ShipmentOrderProvider from './ShipmentOrderProvider/ShipmentOrderProvider';
import CommonProvider from './CommonProvider/CommonProvider';
import FbaProvider from './FBAProvider/FbaProvider';
import ShipmentProvider from './ShipmentProvider/ShipmentProvider';

const AppAPIProvider = ({children}) => {
  return (
    <CommonProvider>
      <AddressProvider>
        <InventoryProvider>
          <CustomerProvider>
            <FbaProvider>
              <ShipmentOrderProvider>
                <ShipmentProvider>{children}</ShipmentProvider>
              </ShipmentOrderProvider>
            </FbaProvider>
          </CustomerProvider>
        </InventoryProvider>
      </AddressProvider>
    </CommonProvider>
  );
};

export default AppAPIProvider;

AppAPIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
