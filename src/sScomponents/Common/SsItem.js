import {Paper} from '@mui/material';
import {styled} from '@mui/material/styles';
const SsItem = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  width: '100%',
}));

export default SsItem;
