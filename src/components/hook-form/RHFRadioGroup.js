import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui

// ----------------------------------------------------------------------

RHFRadioGroup.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  getOptionLabel: PropTypes.arrayOf(PropTypes.string),
  row: PropTypes.bool,
};

export default function RHFRadioGroup({ name, options, row = true, label = '', size = 'medium', ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <RadioGroup {...field} onChange={(e) => field.onChange(e.target.value)} row={row} {...other}>
              {options &&
                options.length > 0 &&
                options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.value}
                    control={<Radio size={size} />}
                    label={option.label}
                  />
                ))}
            </RadioGroup>
          </FormControl>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
