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
      displayName: Yup.string().required('Name  required').trim('Enter valid  name'),
      code: Yup.string().required('Code is required').min(8).max(8),
      mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[6-9]\d{9}$/, 'Enter valid mobile number')
        .trim('Enter valid mobile number'),
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required')
        .trim('Enter valid email address'),
      password: Yup.string().required('Password is required').trim('Enter valid password'),
      designation: Yup.string().required('Designation is required'),
      city: Yup.string().required('City is required').trim('Enter valid city'),
      street: Yup.string().required('Street is required').trim('Enter valid street'),
      state: Yup.string().required('State is required'),
      pinCode: Yup.string()
        .required('Pin Code is required')
        .length(6, 'Enter valid pin code')
        .matches(/^[0-9]{6}/, 'Enter valid pin code'),
      board: Yup.string().required('Board is required'),
      selectedSeries: Yup.array()
        .of(
          Yup.object().shape({
            class: Yup.string(),
            series: Yup.string(),
          })
        )
        .min(1, 'Series is required'),
    })
    .strict(true);

  const defaultValues = {
    displayName: '',
    code: '',
    mobileNumber: '',
    designation: '',
    city: '',
    street: '',
    state: '',
    pinCode: '',
    email: '',
    password: '',
    board: '',
    selectedSeries: [
      { class: 'class1', series: '' },
      { class: 'class2', series: '' },
      { class: 'class3', series: '' },
      { class: 'class4', series: '' },
      { class: 'class5', series: '' },
      { class: 'class6', series: '' },
      { class: 'class7', series: '' },
      { class: 'class8', series: '' },
      { class: 'class9', series: '' },
      { class: 'class10', series: '' },
    ],
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
          <RHFTextField name="displayName" label="Name" placeholder="Enter name" />
        </Stack>
        <RHFTextField name="code" label="Secret Code" placeholder="Enter secret code" />
        <RHFTextField name="email" label="Email address" placeholder="Enter your email address" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="mobileNumber" label="Mobile Number" placeholder="Enter your mobile number" />
          <RHFSelectInput fullWidth name="designation" label="Designation">
            {DESIGNATIONS.filter(({ isVisible }) => isVisible).map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </RHFSelectInput>
        </Stack>
        <RHFRadioInput name="board" label="Board" options={BOARDS} row />
        <RHFTextField name="street" label="Street" placeholder="Enter street" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="city" label="City" placeholder="Enter your city" />
          <RHFSelectInput fullWidth name="state" label="State">
            {STATES.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </RHFSelectInput>
        </Stack>
        <RHFTextField name="pinCode" label="Pin Code" placeholder="Enter pin code" />
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
        {[ROLES.HOD].includes(selectedRole) ? (
          <>
            {fields.map((item, index) => (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} key={item.id}>
                <RHFSelectInput fullWidth name={`selectedSeries[${index}].class`} label={`Class ${index + 1}`} disabled>
                  {CLASSES.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </RHFSelectInput>
                <RHFSelectInput fullWidth name={`selectedSeries[${index}].series`} label="Series">
                  {CLASSES.find(({ value }) => item.class === value)?.series?.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </RHFSelectInput>
              </Stack>
            ))}
            {errors?.selectedSeries ? (
              <FormHelperText error sx={{ px: 2 }}>
                {errors?.selectedSeries?.message}
              </FormHelperText>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
