// @mui
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Checkbox, Grid, FormControlLabel, Container } from '@mui/material';

// components

// react-hook-form and yup
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import Page from '../components/Page';
import { AboutHero } from '../sections/about';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// Validation schema
const schema = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});

// ----------------------------------------------------------------------

export default function Contact() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    enqueueSnackbar('Detail sent successfully.');
    reset();
  };

  return (
    <Page title="Contact us">
      <RootStyle>
        <AboutHero />

        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <h1>Contact Us</h1>
              <img src="/images/contact.gif" alt="contact" />
            </Grid>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="subject"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Subject"
                      margin="normal"
                      error={!!errors.subject}
                      helperText={errors.subject ? errors.subject.message : ''}
                    />
                  )}
                />
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Name"
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  )}
                />
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Enter your message here..."
                      margin="normal"
                      multiline
                      rows={4}
                      error={!!errors.message}
                      helperText={errors.message ? errors.message.message : ''}
                    />
                  )}
                />

                <LoadingButton
                  sx={{ marginTop: '2rem' }}
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Submit
                </LoadingButton>
              </form>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
