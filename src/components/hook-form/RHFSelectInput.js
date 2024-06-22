import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import PropTypes from 'prop-types';

import { Controller, useFormContext } from 'react-hook-form';

RHFSelectInput.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default function RHFSelectInput({ name, label, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} {...other}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} name={name} {...other}>
            {children}
          </Select>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
