import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, IconButton, InputAdornment, Alert, MenuItem, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { ROLES, USER_STATUS } from '../../../constants/keywords';
import useFirebaseData from '../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../constants/collections';
import { FIREBASE_OPERATORS } from '../../../constants/operators';
import { BOARDS, SERIES, STATES, CLASSES, DESIGNATIONS } from '../../../constants/attributes';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFRadioInput, RHFSelectInput } from '../../../components/hook-form';
import { updateStoryItem } from '../../../services/updateServices';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function UserViewEditForm({ isEdit, isView, currentUser }) {
  const navigate = useNavigate();
  // Config
  const RegisterSchema = Yup.object()
    .shape({
      displayName: Yup.string().required('First name required').trim('Enter valid first name'),
      code: Yup.string()
        .required('Code is required')
        .matches(/^[0-9]+$/, 'Code must be only in digits')
        .min(8, 'Code must be exactly 8 digits')
        .max(8, 'Code must be exactly 8 digits'),
      mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[6-9]\d{9}$/, 'Enter valid mobile number')
        .trim('Enter valid mobile number'),
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required')
        .trim('Enter valid email address'),
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
    displayName: currentUser?.displayName || '',
    code: currentUser?.code || '',
    mobileNumber: currentUser?.mobileNumber || '',
    designation: currentUser?.designation || '',
    city: currentUser?.city || '',
    street: currentUser?.street || '',
    state: currentUser?.state || '',
    pinCode: currentUser?.pinCode || '',
    email: currentUser?.email || '',
    board: currentUser?.board || '',
    selectedSeries: currentUser?.selectedSeries || [
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
      // const isMatched = data?.some(({ code }) => formData.code === code);
      // if (!isMatched) {
      //   return setError('secretCode', { message: 'Secret code is invalid or expired' });
      // }
      // const matched = data?.find(({ code }) => formData.code === code);
      const response = await updateStoryItem(FIREBASE_COLLECTIONS.users, {
        ...formData,
        id: currentUser?.id,
      });
      if (response) {
        enqueueSnackbar(`Thank you for registering with us! We'll verify your account and let you know`, {
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        });
        navigate(PATH_DASHBOARD.master.logins);
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
          <RHFTextField name="displayName" label="Display Name" placeholder="Enter name" disabled={isView} />
        </Stack>
        <RHFTextField name="code" label="Secret Code" placeholder="Enter secret code" disabled={isView || isEdit} />
        <RHFTextField name="email" label="Email address" placeholder="Enter your email address" disabled={isView} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            name="mobileNumber"
            label="Mobile Number"
            placeholder="Enter your mobile number"
            disabled={isView}
          />
          <RHFSelectInput fullWidth name="designation" label="Designation" disabled={isView}>
            {DESIGNATIONS.filter(({ isVisible }) => isVisible).map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </RHFSelectInput>
        </Stack>
        <RHFRadioInput name="board" label="Board" options={BOARDS} row disabled={isView} />
        <RHFTextField name="street" label="Street" placeholder="Enter street" disabled={isView} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="city" label="City" placeholder="Enter your city" disabled={isView} />
          <RHFSelectInput fullWidth name="state" label="State" disabled={isView}>
            {STATES.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </RHFSelectInput>
        </Stack>
        <RHFTextField name="pinCode" label="Pin Code" placeholder="Enter pin code" disabled={isView} />

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
                <RHFSelectInput fullWidth name={`selectedSeries[${index}].series`} label="Series" disabled={isView}>
                  {SERIES.filter(({ value }) => (index >= 8 ? ['ai', 'it402'].includes(value) : true)).map(
                    ({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    )
                  )}
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
        {!isView && (
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Update User
          </LoadingButton>
        )}
      </Stack>
    </FormProvider>
  );
}
