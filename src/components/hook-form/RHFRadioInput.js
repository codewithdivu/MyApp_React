import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Radio, RadioGroup, FormHelperText, FormControlLabel, FormControl, FormLabel } from '@mui/material';

// ----------------------------------------------------------------------

RHFRadioInput.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  getOptionLabel: PropTypes.arrayOf(PropTypes.string),
  row: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
};

export default function RHFRadioInput({ name, options, row = true, label = '', size = 'medium', ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControl error={!!error}>
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
