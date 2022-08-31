import React from 'react';
import PropTypes from 'prop-types';
// import IntlMessages from '@crema/utility/IntlMessages';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
const SsDropDown = ({options, label, setValue, fieldName, value, ...props}) => {
  const id = `ss-drop-down-${Math.random()}`;
  return (
    <div>
      <FormControl fullWidth>
        {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
        <Select
          id={id}
          labelId={`${id}-label`}
          name={fieldName}
          value={value}
          onChange={(e) => {
            if (setValue) setValue(e, e.target.value);
          }}
          label={label}
          defaultValue=''
          {...props}
        >
          {options.map((option, idx) => (
            <MenuItem key={idx} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

SsDropDown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.node,
  setValue: PropTypes.func,
  fieldName: PropTypes.node,
  value: PropTypes.node,
  disabled: PropTypes.bool,
};

export default SsDropDown;
