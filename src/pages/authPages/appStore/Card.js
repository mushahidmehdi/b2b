import React from 'react';
import Card from '@mui/material/Card';
import {useFbaMethod, useFba} from '@shipsavvy/utility/FbaHooks';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Box} from '@mui/system';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import AppAnimate from '@shipsavvy/core/AppAnimate';
import AppCard from '@shipsavvy/core/AppCard';

const BootstrapDialogTitle = (props) => {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[900],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function RecipeReviewCard({logo, modalTitle, Name, id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {setSelectedStoreId, setSelectedStore} = useFbaMethod();
  const {seletedStoreIds, seletedStores} = useFba();
  return (
    <Card
      sx={{
        maxWidth: 305,
        paddingBlockEnd: 5,
        paddingInline: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={() => {
        if (!seletedStoreIds.includes(id)) {
          setSelectedStoreId([id, ...seletedStoreIds]);
          setSelectedStore([Name, ...seletedStores]);
        } else {
          const ids = seletedStoreIds.filter((data) => data != id);
          const names = seletedStores.filter((data) => data != Name);
          setSelectedStoreId(ids);
          setSelectedStore(names);
        }
      }}
    >
      <AppAnimate animation='transition.slideDownIn' delay={200}>
        <AppCard
          sxStyle={{
            width: 30,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {' '}
          {seletedStoreIds.includes(id) ? (
            <RemoveCircleOutlineIcon size='large' />
          ) : (
            <AddCircleOutlineIcon />
          )}
        </AppCard>
      </AppAnimate>

      <img src={logo} />
      <Typography variant='h5' textAlign='center' gutterBottom>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti at
        quas officia ducimus numquam nihil sed vel debitis.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Link
          component='button'
          variant='body2'
          onClick={handleOpen}
          sx={{alignContent: 'center', marginBlockStart: 2}}
        >
          Learn more about details
        </Link>
      </Box>
      <Box
        sx={{
          marginBlockStart: 5,
          marginInlineStart: 1,
          alignSelf: 'flex-end',
        }}
      >
        <Typography>Free app</Typography>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
          sx={{
            textAlign: 'center',
            fontSize: 15,
          }}
        >
          {modalTitle}
        </BootstrapDialogTitle>
        <DialogContent>
          <Stack direction='column' spacing={3} padding='10px'>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
              quae veritatis aliquid ut quos sunt, ab, modi pariatur quidem
              dolorem nihil, repudiandae dolor quod obcaecati tempora corrupti
              earum quasi numquam doloribus temporibus. Reprehenderit, neque
              quibusdam? Consequatur, dolore quis. Amet, libero possimus at
              perferendis provident omnis, aut voluptatibus illo consequatur
              ducimus quae quos assumenda pariatur, fugit eligendi saepe modi?
              In quis aliquid cum omnis repellendus harum velit fugiat?
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

RecipeReviewCard.propTypes = {
  title: PropTypes.any,

  logo: PropTypes.any,
  detials: PropTypes.any,
  modalTitle: PropTypes.any,
  id: PropTypes.any,
  Name: PropTypes.string,
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.any,
};
