import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {inventory} from 'pages/authPages/Inventory/endPoints';

const InventoryContext = createContext();
const InventoryContextActions = createContext();

const InventoryProvider = ({children}) => {
  const [selectedRow, setSelectedRow] = useState({
    rowData: {},
  });

  const updateSelectedRow = (data) => {
    setSelectedRow((prev) => ({
      ...prev,
      rowData: data,
    }));
  };

  const deleteInventory = (params) => {
    params['status'] = 'Deleted';
    callApi(inventory.UPDATE_PROD, ApiMethod.PUT, params, () => {
      window.location.reload(true);
    });
  };

  return (
    <InventoryContext.Provider value={{...selectedRow}}>
      <InventoryContextActions.Provider
        value={{updateSelectedRow, deleteInventory}}
      >
        {children}
      </InventoryContextActions.Provider>
    </InventoryContext.Provider>
  );
};

export const useInventoryActions = () => useContext(InventoryContextActions);
export const useInventoryContext = () => useContext(InventoryContext);

export default InventoryProvider;

InventoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
