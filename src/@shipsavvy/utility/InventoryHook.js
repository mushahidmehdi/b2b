import {
  useInventoryContext,
  useInventoryActions,
} from '../services/apis/InventoryProvider/InventoryProvider';

export const useInventory = () => {
  const {rowData} = useInventoryContext();
  return {rowData};
};

export const useInventoryMethod = () => {
  const {updateSelectedRow, deleteInventory} = useInventoryActions();
  return {updateSelectedRow, deleteInventory};
};
