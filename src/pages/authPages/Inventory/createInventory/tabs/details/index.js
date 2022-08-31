import React from 'react';

import {Box, Slide} from '@mui/material';
import TextEditor from './Editor';

const Index = () => {
  return (
    <Slide direction='right' in mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: 790,
          maxWidth: '100%',
          backgroundColor: '#fff',
          borderRadius: 4,
        }}
      >
        <TextEditor />
      </Box>
    </Slide>
  );
};

export default Index;
