import { CircularProgress, Container } from '@mui/material';
import React from 'react';

const Loader = () => (
  <Container
    disableGutters
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Container>
);

export default Loader;
