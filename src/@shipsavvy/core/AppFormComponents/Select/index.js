import React from 'react';
import {TextField, Menuitem} from '@mui/material';
import {useField, useFormikContext} from 'formik';
import PropTypes from 'prop-types';

const SelectWrapper = ({name, options, ...otherProps}) => {
  const [field, meta] = useField(name);
  const {setFieldValue} = useFormikContext();
  const handleOnChange = (e) => {
    const {value} = e.target;
    setFieldValue(name, value);
  };
  const errorText = meta.error && meta.touched ? meta.error : '';
  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    varient: 'outlined',
    fullWidth: true,
    onChange: handleOnChange,
  };
  console.log(options);
  return (
    <TextField {...configSelect} helperText={errorText} error={!!errorText}>
      {/* {options.map((items) => console.log(items.Id))} */}
      {options.map((item) => {
        return (
          <Menuitem key={item.Id} value={item.Name}>
            {item.Name}
          </Menuitem>
        );
      })}
    </TextField>
  );
};

SelectWrapper.propTypes = {
  name: PropTypes.any,
  options: PropTypes.any,
};

export default SelectWrapper;
