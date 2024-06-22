import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function CreatePaperForm() {
  const NewUserSchema = Yup.object().shape({
    feedback: Yup.string().required('Paper Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      feedback: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    // defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formdata) => {};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box>
              <RHFTextField multiline rows={10} name="feedback" label="Please Provide Your Feedback" />
            </Box>

            <Stack
              sx={{
                mt: 3,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit Feedback
              </LoadingButton>

              <LoadingButton onClick={() => reset()} variant="contained" loading={isSubmitting}>
                Reset
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
