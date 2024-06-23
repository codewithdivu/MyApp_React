// import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// // form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import { Box, Stack, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // _mock
// import { countries } from '../../../../_mock';
// import { FormProvider, RHFCheckbox, RHFSelect, RHFTextField, RHFRadioGroup } from '../../../../components/hook-form';

// // ----------------------------------------------------------------------

// CheckoutNewAddressForm.propTypes = {
//   open: PropTypes.bool,
//   onClose: PropTypes.func,
//   onNextStep: PropTypes.func,
//   onCreateBilling: PropTypes.func,
// };

// export default function CheckoutNewAddressForm({ open, onClose, onNextStep, onCreateBilling }) {
//   const NewAddressSchema = Yup.object().shape({
//     receiver: Yup.string().required('Fullname is required'),
//     phone: Yup.string().required('Phone is required'),
//     address: Yup.string().required('Address is required'),
//     city: Yup.string().required('City is required'),
//     state: Yup.string().required('State is required'),
//   });

//   const defaultValues = {
//     addressType: 'Home',
//     receiver: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     country: countries[0]?.label,
//     zipcode: '',
//     isDefault: true,
//   };

//   const methods = useForm({
//     resolver: yupResolver(NewAddressSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = async (data) => {
//     try {
//       onNextStep();
//       onCreateBilling({
//         receiver: data.receiver,
//         phone: data.phone,
//         fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipcode}`,
//         addressType: data.addressType,
//         isDefault: data.isDefault,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
//       <DialogTitle>Add new address</DialogTitle>

//       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <DialogContent>
//           <Stack spacing={3}>
//             <RHFRadioGroup name="addressType" options={['Home', 'Office']} />

//             <Box
//               sx={{
//                 display: 'grid',
//                 rowGap: 3,
//                 columnGap: 2,
//                 gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
//               }}
//             >
//               <RHFTextField name="receiver" label="Full Name" />
//               <RHFTextField name="phone" label="Phone Number" />
//             </Box>

//             <RHFTextField name="address" label="Address" />

//             <Box
//               sx={{
//                 display: 'grid',
//                 rowGap: 3,
//                 columnGap: 2,
//                 gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
//               }}
//             >
//               <RHFTextField name="city" label="Town / City" />
//               <RHFTextField name="state" label="State" />
//               <RHFTextField name="zipcode" label="Zip / Postal Code" />
//             </Box>

//             <RHFSelect name="country" label="Country">
//               {countries.map((option) => (
//                 <option key={option.code} value={option.label}>
//                   {option.label}
//                 </option>
//               ))}
//             </RHFSelect>

//             <RHFCheckbox name="isDefault" label="Use this address as default." sx={{ mt: 3 }} />
//           </Stack>
//         </DialogContent>

//         <Divider />

//         <DialogActions>
//           <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//             Deliver to this Address
//           </LoadingButton>
//           <Button color="inherit" variant="outlined" onClick={onClose}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </FormProvider>
//     </Dialog>
//   );
// }

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Stack,
  Dialog,
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { countries } from '../../../../_mock';

// ----------------------------------------------------------------------

CheckoutNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutNewAddressForm({ open, onClose, onNextStep, onCreateBilling }) {
  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Full name is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  });

  const defaultValues = {
    addressType: 'Home',
    receiver: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: countries[0]?.label || '',
    zipcode: '',
    isDefault: true,
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      onNextStep();
      onCreateBilling({
        receiver: data.receiver,
        phone: data.phone,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipcode}`,
        addressType: data.addressType,
        isDefault: data.isDefault,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Add new address</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              name="addressType"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel value="Home" control={<Radio />} label="Home" />
                  <FormControlLabel value="Office" control={<Radio />} label="Office" />
                </RadioGroup>
              )}
            />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Controller
                name="receiver"
                control={control}
                render={({ field }) => <TextField {...field} label="Full Name" fullWidth />}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <TextField {...field} label="Phone Number" fullWidth />}
              />
            </Box>

            <Controller
              name="address"
              control={control}
              render={({ field }) => <TextField {...field} label="Address" fullWidth />}
            />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <Controller
                name="city"
                control={control}
                render={({ field }) => <TextField {...field} label="Town / City" fullWidth />}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => <TextField {...field} label="State" fullWidth />}
              />
              <Controller
                name="zipcode"
                control={control}
                render={({ field }) => <TextField {...field} label="Zip / Postal Code" fullWidth />}
              />
            </Box>

            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Country" fullWidth>
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="isDefault"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Use this address as default."
                  sx={{ mt: 3 }}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Deliver to this Address
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
