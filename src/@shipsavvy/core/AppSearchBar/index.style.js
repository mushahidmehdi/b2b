import {Box, inputBaseClasses, lighten} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import PropTypes from 'prop-types';

export const SearchWrapper = ({iconPosition, children}) => {
  return (
    <Box
      sx={{
        borderRadius: (theme) => theme.cardRadius,
        display: 'block',
        cursor: 'pointer',
        width: '100%',
        '& .searchRoot .MuiInputBase-input': {
          paddingLeft: iconPosition === 'right' ? 6 : 12,
          paddingRight: iconPosition === 'left' ? 12 : 6,
        },
      }}
    >
      {children}
    </Box>
  );
};
SearchWrapper.propTypes = {
  iconPosition: PropTypes.string,
  children: PropTypes.node,
};

export const SearchInputBase = styled(InputBase)(({theme}) => ({
  fontWeight: Fonts.MEDIUM,
  width: '100%',

  [`& .${inputBaseClasses.root}`]: {
    color: 'inherit',
    width: '100%',
  },
  [`& .${inputBaseClasses.input}`]: {
    border: '0 none',
    backgroundColor: lighten(theme.palette.background.default, 0.25),
    color: theme.palette.text.primary,
    borderRadius: 30,
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: 40,
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    '&:focus': {
      backgroundColor: lighten(theme.palette.background.default, 0.25),
      width: '100%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    '&:hover': {
      backgroundColor: lighten(theme.palette.background.default, 0.2),
    },
  },
}));

export const SearchIconBox = styled('div')((props) => ({
  position: 'relative',
  marginLeft: props.align === 'right' ? 'auto' : 0,
  '& .searchIconBox': {
    position: 'relative',
    '& $inputInput': {
      width: 220,
      borderRadius: 50,
      paddingLeft: 27,
      '&:focus': {
        width: 235,
        borderRadius: 50,
        paddingLeft: `calc(1em + ${props.theme.spacing(4)})`,
      },
    },
  },
  '&.hs-disableFocus': {
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 12,
  zIndex: 1,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.right': {
    left: 'auto',
    right: 12,
    '& + $inputRoot $inputInput': {
      paddingLeft: theme.spacing(5),
      paddingRight: `calc(1em + ${theme.spacing(7)})`,
    },
  },
}));
