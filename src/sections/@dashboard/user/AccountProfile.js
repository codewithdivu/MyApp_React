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
import axios from 'axios';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fData } from '../../../utils/formatNumber';
// _mock
import { countries } from '../../../_mock';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
  RHFSelectInput,
} from '../../../components/hook-form';
import { updateStoryItem } from '../../../services/updateServices';
import { FIREBASE_COLLECTIONS } from '../../../constants/collections';
import { PATH_DASHBOARD } from '../../../routes/paths';
import uuidv4 from '../../../utils/uuidv4';
import { uploadFile } from '../../../services/storage';
import { USER_STATUS } from '../../../constants/keywords';
import { addStoryItem } from '../../../services/addServices';

// ----------------------------------------------------------------------

export default function AccountProfile({ isModelOpen, setIsOpenModel }) {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  console.log('user :>> ', user);

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
        const token = uuidv4();
        // profilePic = await uploadFile(data.photoURL, `ProfilePics/${token}`);
        const formData = new FormData();
        formData.append('profilePic', data?.photoURL);
        const res = await axios.post('http://localhost:8888/api/v1/user/profilePic', formData, 'multipart/form-data');
        console.log('profilePic :>> ', res?.data?.data);
        profilePic = res?.data?.data;
      }

      const { name, username } = data;

      const response = await axios.patch(
        `http://localhost:8888/api/v1/user/${user?._id}/updateProfile`,
        {
          id: user?._id,
          name,
          username,
          photoURL: profilePic,
        },
        {
          id: user?._id,
        }
      );
      console.log('response :>> ', response);
      enqueueSnackbar('Updated success!');
    } catch (error) {
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
