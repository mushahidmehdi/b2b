import React from 'react';
import IntlMessages from '@shipsavvy/utility/IntlMessages';
export const IntlMessagesRequired = (props) => {
  return (
    <>
      <IntlMessages {...props} />*
    </>
  );
};
