import { yupResolver } from '@hookform/resolvers/yup';
import {
  styled,
  Box,
  Typography,
  Container,
  Stack,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PATH_AUTH } from '../../routes/paths';
import axiosInstance from '../../utils/axios';
import { apiRoutes } from '../../constants/apiRoutes';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('email must be a valid email address')
      .required('email is required')
      .trim('enter valid email address'),
    password: yup.string().required('Password is required').trim('Enter valid password'),
    confirmPassword: yup.string().required('Password is required').trim('Enter valid password'),
    digit1: yup.string().required('This field is required').matches(/^\d$/, 'Must be a digit'),
    digit2: yup.string().required('This field is required').matches(/^\d$/, 'Must be a digit'),
    digit3: yup.string().required('This field is required').matches(/^\d$/, 'Must be a digit'),
    digit4: yup.string().required('This field is required').matches(/^\d$/, 'Must be a digit'),
    digit5: yup.string().required('This field is required').matches(/^\d$/, 'Must be a digit'),
    digit6: yup.string().required('This field is required').matches(/^\d$/, 'Must be a digit'),
  });

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  };

  const {
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    const forgotEmail = localStorage.getItem('forgotEmail');
    if (forgotEmail) {
      setValue('email', forgotEmail);
    } else {
      navigate(PATH_AUTH.forgotPassword);
    }
  }, []);

  const onSubmit = async (data) => {
    let res = '';
    try {
      const { password, confirmPassword, digit1, digit2, digit3, digit4, digit5, digit6 } = data;
      const otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
      const newOtp = +otp;

      const resetData = {
        email: data?.email,
        newPassword: password,
        otp: newOtp,
      };

      res = await axiosInstance.post(apiRoutes.AUTH.RESET_PASSWORD, { ...resetData });
      localStorage.removeItem('forgotEmail');
      enqueueSnackbar('Password reset successfully.');
      navigate(PATH_AUTH.login);
      console.log('res :>> ', res.data.msg);
    } catch (error) {
      console.log('error :>> ', error);
      enqueueSnackbar(error?.msg, {
        variant: 'error',
      });
    }
  };

  return (
    <RootStyle>
      <HeaderStyle>
        <Box sx={{ width: 18, height: 8 }}>
          <img
            src="/logo/normalLogo.png"
            alt="LOGO"
            style={{
              height: '4rem',
              width: '15rem',
            }}
          />
        </Box>
      </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto', my: '6rem' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} paragraph>
            Request sent successfully!
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            We've sent a 6-digit confirmation OTP to your email. Please enter the code in below box to verify your
            email.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="text"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
              <TextField
                label="Password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {[1, 2, 3, 4, 5, 6].map((digit) => (
                  <Controller
                    key={digit}
                    name={`digit${digit}`}
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="number"
                        variant="outlined"
                        inputProps={{
                          maxLength: 1,
                        }}
                        error={Boolean(fieldState?.error)}
                        helperText={fieldState?.error?.message}
                        sx={{ width: '3.5rem' }}
                        placeholder="-"
                      />
                    )}
                  />
                ))}
              </Stack>
            </Stack>

            <LoadingButton
              fullWidth
              sx={{ my: 2 }}
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Reset Password
            </LoadingButton>
          </form>

          <Button fullWidth size="large" onClick={() => navigate('/auth/forgot-password')} sx={{ mt: 1 }}>
            Back
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default ResetPassword;
