import {useSelector} from 'react-redux';

export function useCustomer() {
  const customer = useSelector((data) => {
    return data.customer;
  });

  return {
    customerId: customer.CustomerId,
    app: customer.Apps,
  };
}
