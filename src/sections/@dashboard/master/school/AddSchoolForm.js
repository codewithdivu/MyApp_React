import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Button } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
// components
import { FormProvider, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { updateStoryItem } from '../../../../services/updateServices';
import { addStoryItem } from '../../../../services/addServices';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { updateFile, uploadFile } from '../../../../services/storage';
import uuidv4 from '../../../../utils/uuidv4';
import generateNumericString from '../../../../utils/generateNumericString';
import { USER_ROLES } from '../../../../constants/keywords';

AddSchoolForm.propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentSchool: PropTypes.object,
  role: PropTypes.string,
};

export default function AddSchoolForm({ isEdit, isView, currentSchool, role = '' }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string(),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    code: Yup.string().required('Code is required').min(8).max(8),
    schoolLogo: Yup.mixed().test('required', 'School logo is required', (value) => value !== ''),
    isActive: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentSchool?.name || '',
      email: currentSchool?.email || '',
      phoneNumber: currentSchool?.phoneNumber || '',
      address: currentSchool?.address || '',
      city: currentSchool?.city || '',
      code: currentSchool?.code || '',
      schoolLogo: currentSchool?.schoolLogo || '',
      isActive: currentSchool?.isActive || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSchool]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const status = watch('isActive');

  useEffect(() => {
    if (isEdit && currentSchool) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSchool]);

  const onSubmit = async (formData) => {
    try {
      if (isEdit) {
        let imageUrl = currentSchool?.schoolLogo;
        if (currentSchool?.schoolLogo !== formData.schoolLogo) {
          const { token } = currentSchool;
          const res = await updateFile(formData.schoolLogo, `schoolLogos/${token}`);
          imageUrl = res;
        }
        const response = await updateStoryItem(FIREBASE_COLLECTIONS.schools, {
          ...formData,
          id: currentSchool?.id,
          schoolLogo: imageUrl,
        });
        if (response) {
          enqueueSnackbar('School Updated successfully!');
          reset();
          navigate(PATH_DASHBOARD.master.schools.viewEditSchool);
        } else {
          enqueueSnackbar('something went wrong', { variant: 'error' });
        }
      } else {
        const token = uuidv4();
        const schoolLogoResponse = await uploadFile(formData.schoolLogo, `schoolLogos/${token}`);

        const response = await addStoryItem(FIREBASE_COLLECTIONS.schools, {
          ...formData,
          schoolLogo: schoolLogoResponse,
          token,
        });

        if (response) {
          reset();
          enqueueSnackbar('School Created successfully!');
          navigate(PATH_DASHBOARD.master.schools.viewEditSchool);
        } else {
          enqueueSnackbar('something went wrong', { variant: 'error' });
        }
      }
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  const handleGenerateCode = () => {
    const generatedCode = generateNumericString();
    setValue('code', generatedCode);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'schoolLogo',
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
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="schoolLogo"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                disabled={isView}
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
                    Allowed only .png file
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="School Name" disabled={isView} />
              <RHFTextField name="email" label="Email Address" disabled={isView || isEdit} />
              <RHFTextField name="phoneNumber" label="Phone Number" disabled={isView} />
              <RHFTextField name="address" label="Address" disabled={isView} />
              <RHFTextField name="city" label="City" disabled={isView} />
              {[USER_ROLES.ADMIN].includes(role) ? (
                <>
                  <Stack direction={'row'} spacing={2}>
                    <RHFTextField name="code" label="Code" disabled />
                    {!isEdit && (
                      <Button variant="contained" color="primary" onClick={handleGenerateCode} disabled={isView}>
                        Generate Code
                      </Button>
                    )}
                  </Stack>
                  <RHFSwitch
                    name="isActive"
                    disabled={isView}
                    label={<Typography variant="subtitle2">{status ? 'Active' : 'Inactive'}</Typography>}
                  />
                </>
              ) : (
                ''
              )}
            </Box>

            {!isView && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {isEdit ? 'Edit School' : 'Add School'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
