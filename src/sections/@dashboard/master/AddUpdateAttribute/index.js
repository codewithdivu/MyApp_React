import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
// components
import { useEffect } from 'react';
import { updateStoryItem } from '../../../../services/updateServices';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { addStoryItem } from '../../../../services/addServices';
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const getInitialValues = (attribute) => {
  const _attribute = {
    name: attribute?.name || '',
    value: attribute?.value || '',
    status: attribute ? attribute.status === 'active' : true,
  };

  return _attribute;
};

// ----------------------------------------------------------------------

QuestionAttributeForm.propTypes = {
  attribute: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function QuestionAttributeForm({ attribute, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();

  const AttributeSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    value: Yup.string().max(255).required('Value is required'),
    status: Yup.bool().required('Status is required'),
  });

  const methods = useForm({
    resolver: yupResolver(AttributeSchema),
    defaultValues: getInitialValues(attribute),
  });

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const selectedStatus = watch('status');
  const selectedName = watch('name');

  useEffect(() => {
    setValue('value', selectedName ? selectedName.toLowerCase() : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedName]);

  const onCloseModal = () => {
    reset();
    onCancel();
  };

  const onSubmit = async (data) => {
    try {
      const res = attribute
        ? await updateStoryItem(FIREBASE_COLLECTIONS.questionAttributes, {
            id: attribute.id,
            ...data,
            status: data.status ? 'active' : 'inactive',
          })
        : await addStoryItem(FIREBASE_COLLECTIONS.questionAttributes, {
            ...data,
            status: data.status ? 'active' : 'inactive',
          });
      if (res) {
        enqueueSnackbar(`Question attribute ${attribute ? 'updated' : 'added'} successfully!`);
        onCloseModal();
        reset();
      } else {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!attribute.id) return;
    try {
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="name" label="Name" />
        <RHFTextField name="value" label="Value (For Backend)" />
        <RHFSwitch name="status" label={selectedStatus ? 'Active' : 'Inactive'} />
      </Stack>

      <DialogActions>
        {attribute && (
          <Tooltip title="Delete Attribute">
            <IconButton onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCloseModal}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {attribute ? 'Update' : 'Add'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
