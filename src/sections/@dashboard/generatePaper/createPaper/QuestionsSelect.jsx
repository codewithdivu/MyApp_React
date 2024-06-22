/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import React, { useEffect, useMemo, useCallback } from 'react';
import { Alert, Button, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import '../../../../styles/paperStyle.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { updateStoryItem } from '../../../../services/updateServices';
import { addStoryItem } from '../../../../services/addServices';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { DialogAnimate } from '../../../../components/animate';
import { FormProvider } from '../../../../components/hook-form';
import { RHFMultiCheckboxInput } from '../../../../components/hook-form/RHFCheckboxInput';

QuestionsSelect.propTypes = {
  isOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  onClose: PropTypes.func,
  formData: PropTypes.array,
  QUESTIONS: PropTypes.array,
  currentPaper: PropTypes.object,
};

export default function QuestionsSelect({ isOpen, onClose, QUESTIONS, formData, isEdit, currentPaper }) {
  const getSchema = useCallback((formData) => {
    const test = {};
    if (formData?.items && formData?.items.length > 0) {
      formData?.items.forEach((item, index) => {
        test[`section${index + 1}`] = Yup.array()
          .of(Yup.string().required(''))
          .min(+item.no_of_questions, 'Select proper question')
          .max(+item.no_of_questions, 'Select proper question');
      });
    }
    return test;
  }, []);

  const getInitValues = () => {
    const test = {};
    if (formData?.items && formData?.items.length > 0) {
      formData?.items.forEach((item, index) => {
        test[`section${index + 1}`] = isEdit ? currentPaper?.items[index]?.questions : [];
      });
    }
    return test;
  };

  // Form Config
  const NewUserSchema = useMemo(() => Yup.object().shape(getSchema(formData)), [formData, getSchema]);

  const defaultValues = useMemo(
    () => getInitValues(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, getInitValues, currentPaper, isEdit]
  );

  // Constants
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // const isMountedRef = useIsMountedRef();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
    setError,
  } = methods;

  useEffect(() => {
    if (isEdit && currentPaper) {
      if (formData?.items && formData?.items.length > 0) {
        formData?.items.forEach((item, index) => {
          setValue(`section${index + 1}`, currentPaper?.items[index]?.questions);
        });
      }
    }
  }, [isEdit, currentPaper, formData]);

  const onSubmit = async (data) => {
    try {
      const payLoad = { ...formData };

      if (
        formData.items.some(({ no_of_questions }, index) => {
          if (!data[`section${index + 1}`] || data[`section${index + 1}`]?.length !== +no_of_questions) {
            return true;
          }
          return false;
        })
      ) {
        return setError('afterSubmit', { message: 'Select proper questions' });
      }
      payLoad.items = formData.items.map((option, index) => ({
        ...option,
        order: index,
        questions: data[`section${index + 1}`],
      }));

      const response = isEdit
        ? await updateStoryItem(FIREBASE_COLLECTIONS.papers, { ...payLoad, id: currentPaper?.id })
        : await addStoryItem(FIREBASE_COLLECTIONS.papers, payLoad);
      if (response) {
        reset();
        enqueueSnackbar(isEdit ? 'Paper Updated Successfully' : 'Paper is Created successfully');
        onClose();
        navigate(PATH_DASHBOARD.generatePaper.viewEditPaper);
      } else {
        enqueueSnackbar('something went wrong', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  return (
    <DialogAnimate open={isOpen} onClose={onClose} maxWidth="lg">
      <DialogTitle>Questions Select</DialogTitle>
      {errors?.afterSubmit && <Alert severity="error">{errors?.afterSubmit?.message}</Alert>}
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {formData?.items &&
            formData?.items.length > 0 &&
            formData?.items.map((section, index) => (
              <Stack key={section?.category}>
                <Typography>
                  Section {index + 1}): {section?.category}
                </Typography>
                <RHFMultiCheckboxInput
                  name={`section${index + 1}`}
                  options={QUESTIONS?.filter(
                    ({ category, question_type }) =>
                      category === section.category && question_type === section.question_type
                  )?.map(({ id, question }) => ({ label: question, value: id }))}
                />
              </Stack>
            ))}
          <DialogActions>
            <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>
        </FormProvider>
      </DialogContent>
    </DialogAnimate>
  );
}
