import {TextField} from '@mui/material';
import {useField} from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

const SsTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error ? meta.error : '';
  const hasError = errorText != '';
  const value = field.value || props.value || '';
  return (
    <TextField
      helperText={errorText}
      error={hasError}
      onBlur={(e) => {
        if (field.onBlur) field.onBlur(e);
        if (props.onBlur) props.onBlur(e);
      }}
      onChange={(e) => {
        if (field.onChange) field.onChange(e);
        if (props.onChange) props.onChange(e);
      }}
      value={value}
      {...props}
    />
  );
};

SsTextField.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SsTextField;
