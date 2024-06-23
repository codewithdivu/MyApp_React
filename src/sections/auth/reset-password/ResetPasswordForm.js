import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { sendPasswordResetEmail } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { AUTH } from '../../../contexts/FirebaseContext';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { getAuthErrorMessage } from '../../../utils/mics';
import axiosInstance from '../../../utils/axios';
import { apiRoutes } from '../../../constants/apiRoutes';
import { PATH_AUTH } from '../../../routes/paths';

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm() {
  // Hooks
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async ({ email }) => {
    try {
      const res = await axiosInstance.post(apiRoutes.AUTH.FORGOT_PASSWORD, { email });
      enqueueSnackbar('OTP sent successfully.');
      localStorage.setItem('forgotEmail', email);
      navigate(PATH_AUTH.resetPassword);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Some error occured.', {
        variant: 'error',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Forgot Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
