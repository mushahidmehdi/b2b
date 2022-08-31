import React from 'react';
import PropTypes from 'prop-types';
// import IntlMessages from '@crema/utility/IntlMessages';
import {FormControl, MenuItem, Select} from '@mui/material';

const SelectDropDown = ({options, setValue, fieldName, value}) => {
  return (
    <div>
      <FormControl
        sx={{
          marginInlineEnd: 80,
          backgroundColor: '#fff',
          paddingInline: 0.8,
          textAlign: 'left',
        }}
      >
        <Select
          fullWidth
          name={fieldName}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{textAlign: 'left', width: 340}}
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

SelectDropDown.propTypes = {
  options: PropTypes.array,
  label: PropTypes.node,
  inputWidth: PropTypes.node,
  setValue: PropTypes.func,
  fieldName: PropTypes.node,
  value: PropTypes.node,
};

export default SelectDropDown;
