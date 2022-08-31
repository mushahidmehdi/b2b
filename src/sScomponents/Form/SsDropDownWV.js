import React from 'react';
import PropTypes from 'prop-types';
// import IntlMessages from '@crema/utility/IntlMessages';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {useField} from 'formik';
const SsDropDownWV = ({
  options,
  label,
  setValue,
  fieldName,
  defaultValue,
  ...props
}) => {
  const id = `ss-drop-down-${Math.random()}`;
  const [field, meta] = useField(props);
  let errorText =
    meta.error && meta.error[fieldName] ? meta.error[fieldName] : '';
  if (Object.keys(meta.error).length < 1) {
    errorText = '';
  }

  const hasError = errorText != '';
  const value = field.value || props.value || '';
  console.log({
    field,
    meta,
    fieldName: meta.error && meta.error[fieldName] ? meta.error[fieldName] : '',
  });
  return (
    <div>
      <FormControl fullWidth>
        {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
        <Select
          id={id}
          labelId={`${id}-label`}
          name={fieldName}
          value={value || ''}
          onChange={(e) => {
            if (field.onChange) field.onChange(e);
            if (props.onChange) props.onChange(e);
            if (setValue) setValue(e, e.target.value);
          }}
          onBlur={(e) => {
            if (field.onBlur) field.onBlur(e);
            if (props.onBlur) props.onBlur(e);
          }}
          label={label}
          defaultValue={defaultValue || ''}
          error={hasError}
          {...props}
        >
          {options.map((option, idx) => (
            <MenuItem key={idx} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        </Select>
        {!props.disabled && errorText != '' && (
          <FormHelperText style={{color: '#f44336'}}>
            {errorText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

SsDropDownWV.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.node,
  setValue: PropTypes.func,
  fieldName: PropTypes.node,
  value: PropTypes.node,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default SsDropDownWV;
