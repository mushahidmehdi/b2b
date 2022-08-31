import {Chip} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function SsChip({label, color, outlined}) {
  const shipColor = color ? color : 'primary';

  return (
    <Chip
      label={label}
      color={shipColor}
      size='small'
      variant={outlined ? 'outlined' : 'contained'}
    />
  );
}

SsChip.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  outlined: PropTypes.any,
};

SsChip.defaultProps = {
  color: 'primary',
};

export default SsChip;

export const SsSuccessChip = ({label, outlined}) => (
  <SsChip label={label} outlined={outlined} color='success' />
);

SsSuccessChip.propTypes = {
  label: PropTypes.string,
  outlined: PropTypes.any,
};

export const SsPrimaryChip = ({label, outlined}) => (
  <SsChip label={label} outlined={outlined} color='primary' />
);

SsPrimaryChip.propTypes = {
  label: PropTypes.string,
  outlined: PropTypes.any,
};

export const SsSecondaryChip = ({label, outlined}) => (
  <SsChip label={label} outlined={outlined} color='secondary' />
);

SsSecondaryChip.propTypes = {
  label: PropTypes.string,
  outlined: PropTypes.any,
};

export const SsErrorChip = ({label, outlined}) => (
  <SsChip label={label} outlined={outlined} color='error' />
);

SsErrorChip.propTypes = {
  label: PropTypes.string,
  outlined: PropTypes.any,
};

export const SsWarningChip = ({label, outlined}) => (
  <SsChip label={label} outlined={outlined} color='warning' />
);

SsWarningChip.propTypes = {
  label: PropTypes.string,
  outlined: PropTypes.any,
};
