/* eslint-disable consistent-return */
import * as Yup from 'yup';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, IconButton, InputAdornment, Alert, MenuItem, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { ROLES, USER_STATUS } from '../../../constants/keywords';
import useFirebaseData from '../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../constants/collections';
import { FIREBASE_OPERATORS } from '../../../constants/operators';
import { BOARDS, STATES, CLASSES, DESIGNATIONS } from '../../../constants/attributes';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFRadioInput, RHFSelectInput } from '../../../components/hook-form';

export default function RegisterForm() {
  // Config
  const RegisterSchema = Yup.object()
    .shape({
      name: Yup.string().required('Name  required').trim('Enter valid  name'),
      username: Yup.string().required('Username  required').trim('Enter valid  Username'),
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required')
        .trim('Enter valid email address'),
      password: Yup.string().required('Password is required').trim('Enter valid password'),
    })
    .strict(true);

  const defaultValues = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Hooks
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useFirebaseData(FIREBASE_COLLECTIONS.schools, [
    { property: 'isActive', operator: FIREBASE_OPERATORS.EQUAL_TO, value: true },
  ]);

  // Constants
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'selectedSeries',
  });

  // Constants
  const selectedRole = watch('designation');

  // Handlers
  const onSubmit = async ({ selectedSeries, ...formData }) => {
    try {
      const isMatched = data?.some(({ code }) => formData.code === code);
      if (!isMatched) {
        return setError('secretCode', { message: 'Secret code is invalid or expired' });
      }
      const matched = data?.find(({ code }) => formData.code === code);
      const res = await register({
        ...formData,
        series: selectedSeries && selectedSeries?.length > 0 ? selectedSeries?.filter(({ series }) => !!series) : [],
        status: USER_STATUS.INACTIVE,
        schoolId: matched?.id,
      });
      if (res) {
        enqueueSnackbar(`Thank you for registering with us! We'll verify your account and let you know`, {
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        });
        reset();
      } else {
        enqueueSnackbar(`Something went wrong!`);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {!!errors.secretCode && <Alert severity="error">{errors.secretCode.message}</Alert>}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Name" placeholder="Enter name" />
        </Stack>
        <RHFTextField name="username" label="Username" placeholder="Enter a Username" />
        <RHFTextField name="email" label="Email address" placeholder="Enter your email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
