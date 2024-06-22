import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, MenuItem } from '@mui/material';
// utils
import { getValueFromKey } from '../../../../utils/mapper';
import { FormProvider, RHFSelectInput } from '../../../../components/hook-form';
import { updateStoryItem } from '../../../../services/updateServices';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { USER_ROLES, USER_STATUS } from '../../../../constants/keywords';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';
import useAuth from '../../../../hooks/useAuth';
import { CLASSES, SERIES } from '../../../../constants/attributes';

export default function BookAllocationForm() {
  const NewUserSchema = Yup.object().shape({
    user: Yup.string().required('User is required'),
    selectedClass: Yup.string().required('Class is required'),
    series: Yup.string().required('Series is required'),
  });

  const defaultValues = useMemo(
    () => ({
      user: '',
      selectedClass: '',
      series: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { user } = useAuth();
  const { data } = useFirebaseData(FIREBASE_COLLECTIONS.users, [
    {
      property: 'status',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: USER_STATUS.ACTIVE,
    },
    {
      property: 'schoolId',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: user?.schoolId,
    },
    {
      property: 'designation',
      operator: FIREBASE_OPERATORS.IN,
      value: [USER_ROLES.PGT, USER_ROLES.TGT],
    },
  ]);

  // Constants
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;

  const selected = watch('selectedClass');
  const selectedUser = watch('user');

  const CLASS =
    user && user?.series?.length > 0
      ? user?.series?.map((item) => ({ label: getValueFromKey(item.class, CLASSES), value: item.class }))
      : [];

  const SERIESES =
    user && user?.series?.length > 0
      ? user?.series
          ?.filter((item) => (selected ? item.class === selected : false))
          ?.map((item) => ({ label: getValueFromKey(item.series, SERIES), value: item.series }))
      : [];

  // Effects
  useEffect(() => {
    if (selectedUser) {
      const matched = data?.find((item) => item.id === selectedUser);
      if (matched?.series && matched?.series?.length > 0) {
        setValue('selectedClass', matched?.series?.at(0)?.class);
        setValue('series', matched?.series?.at(0)?.series);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, data]);

  // Handlers
  const onSubmit = async (formData) => {
    try {
      const { user, selectedClass, series } = formData;
      const res = await updateStoryItem(FIREBASE_COLLECTIONS.users, {
        id: user,
        series: [{ class: selectedClass, series }],
      });
      if (res) {
        enqueueSnackbar('Book Allocated successfully!');
        reset();
      } else {
        enqueueSnackbar('something went wrong', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
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
              <RHFSelectInput name="user" label="Select User">
                {data &&
                  data?.length > 0 &&
                  data.map(({ displayName, id }) => (
                    <MenuItem key={id} value={id}>
                      {displayName}
                    </MenuItem>
                  ))}
              </RHFSelectInput>
              <RHFSelectInput name="selectedClass" label="Select Class">
                {CLASS &&
                  CLASS?.length > 0 &&
                  CLASS.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
              </RHFSelectInput>
              <RHFSelectInput name="series" label="Select Series">
                {SERIESES &&
                  SERIESES?.length > 0 &&
                  SERIESES.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
              </RHFSelectInput>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
