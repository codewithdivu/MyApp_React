import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_AUTH } from '../../../routes/paths';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { PATH_AFTER_LOGIN } from '../../../config';

export default function LoginForm() {
  // Config
  const LoginSchema = Yup.object()
    .shape({
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required')
        .trim('Enter valid email address'),
      password: Yup.string().required('Password is required').trim('Enter valid password'),
    })
    .strict(true);

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  // Constants
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // Handlers
  const onSubmit = async (data) => {
    try {
      console.log('data :>> ', data);
      await login(data.email, data.password);
      navigate(PATH_AFTER_LOGIN);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.forgotPassword}>
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
