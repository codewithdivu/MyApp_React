/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormGroup, FormControlLabel, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
};

export function RHFCheckbox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

RHFMultiCheckboxInput.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export function RHFMultiCheckboxInput({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onSelected = (option) =>
          field?.value?.includes(option.value)
            ? field?.value?.filter((value) => value !== option?.value)
            : field?.value && field?.value.length > 0
            ? [...field?.value, option?.value]
            : [option?.value];

        return (
          <>
            <FormGroup>
              {options?.map((option) => (
                <FormControlLabel
                  key={option?.value}
                  control={
                    <Checkbox
                      key={option?.value}
                      checked={field?.value?.includes(option?.value)}
                      onChange={() => field.onChange(onSelected(option))}
                    />
                  }
                  label={option?.label}
                  {...other}
                />
              ))}
            </FormGroup>
            {error?.message ? <FormHelperText error>{error?.message}</FormHelperText> : ''}
          </>
        );
      }}
    />
  );
}
