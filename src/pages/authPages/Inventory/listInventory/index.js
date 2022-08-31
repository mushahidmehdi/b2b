import React, {useEffect, useState} from 'react';
import callApi, {ApiMethod} from '@shipsavvy/services/Api';
import {inventory} from '../endPoints';
import {useCustomer} from '@shipsavvy/utility/CustomerHooks';
import DataGridTable from './table';
import {fetchStart, fetchSuccess} from 'redux/actions';

const Index = () => {
  const {customerId} = useCustomer();

  useEffect(() => {
    document.title = 'Inventory - ShipSavvy';
  }, []);

  const [filtersFormData, setFiltersFormData] = useState({
    isLoading: false,
    totalNoOfRows: 0,
    Sku: '',
    SearchField: '',
    page: 0,
    pageSize: 10,
    sortModel: [{field: 'Code', sort: 'asc'}],
    sortingOrder: '',
    data: [],
  });

  const {Sku, SearchField, sortModel, page, pageSize} = filtersFormData;

  const searchInventory = () => {
    let sortingOrder = 'ASC';
    let sortingField = 'Code';
    if (sortModel.length !== 0) {
      sortingField = sortModel[0].field;
      sortModel[0].sort === 'asc'
        ? (sortingOrder = 'ASC')
        : (sortingOrder = 'DESC');
    }

    fetchStart();

    setFiltersFormData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const params = {
      CustomerId: customerId,
      Sku: Sku,
      Search: SearchField,
      PageIndex: page,
      PageSize: pageSize,
      OrderBy: sortingField,
      OrderDir: sortingOrder,
    };

    callApi(inventory.SEARCH_PROD, ApiMethod.POST, params, (data) => {
      setFiltersFormData((prev) => ({
        ...prev,
        isLoading: false,
        data: data.Response,
        totalNoOfRows: data.TotalCount,
      }));
    });
    fetchSuccess();
  };

  useEffect(() => {
    searchInventory();
  }, [SearchField, Sku, customerId, sortModel, page, pageSize]);

  return (
    <div>
      <DataGridTable
        filtersFormData={filtersFormData}
        setFiltersFormData={setFiltersFormData}
      />
    </div>
  );
};

export default Index;
