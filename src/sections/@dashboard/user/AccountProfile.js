import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fData } from '../../../utils/formatNumber';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
  RHFSelectInput,
} from '../../../components/hook-form';
// constants
import { PATH_DASHBOARD } from '../../../routes/paths';
import { apiRoutes } from '../../../constants/apiRoutes';
import axiosInstance from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function AccountProfile() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name is too short - should be 2 chars minimum.')
      .max(50, 'Name is too long - should be 50 chars maximum.'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required.'),
    photoURL: Yup.mixed(),
  });

  const defaultValues = {
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
    photoURL: user?.photoURL || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      let profilePic;
      if (data?.photoURL != null) {
        const formData = new FormData();
        formData.append('profilePic', data?.photoURL);
        const res = await axiosInstance.post(apiRoutes.USER.UPLOAD_PROFILE_PIC, formData, 'multipart/form-data');
        profilePic = res?.data?.data;
      }

      const { name, username } = data;

      const response = await axiosInstance.patch(apiRoutes.USER.UPDATE_PROFILE.replace(':id', user?._id), {
        name,
        username,
        photoURL: profilePic,
      });

      enqueueSnackbar('Updated success!');
    } catch (error) {
      enqueueSnackbar('Some Error Occured', { variant: 'error' });
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              setValue={setValue}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="username" label="Username" />
              <RHFTextField name="email" disabled label="Email Address" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Update Profile
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
