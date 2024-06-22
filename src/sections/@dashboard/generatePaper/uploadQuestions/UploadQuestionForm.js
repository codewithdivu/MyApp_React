/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import * as XLSX from 'xlsx';

import React, { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Loader from '../../../../components/Loader';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import {
  FormProvider,
  RHFExcelFile,
  RHFRadioGroup,
  RHFSelectInput,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../../components/hook-form';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import useAuth from '../../../../hooks/useAuth';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';
import { addStoryItem } from '../../../../services/addServices';
import { updateStoryItem } from '../../../../services/updateServices';
import { USER_ROLES, USER_STATUS } from '../../../../constants/keywords';
import Iconify from '../../../../components/Iconify';
import { CLASSES, SERIES, QUESTIONS, TRUE_FALSE, TEMPLATES } from '../../../../constants/attributes';
import { getValueFromKey } from '../../../../utils/mapper';
import { matchTheFollowingToJson, mcqToJson, subjectiveToJson } from '../../../../utils/excelToJson';

UploadQuestionForm.propTypes = {};

export default function UploadQuestionForm() {
  // Form Config
  const NewUserSchema = Yup.object()
    .shape({
      class: Yup.string().required('Class is required'),
      series: Yup.string().required('Series is required'),
      chapter: Yup.string().required('Chapter is required'),
      question_type: Yup.string().required('Question Type is required'),
      category: Yup.string().required('Question category is required'),
      file: Yup.mixed().test('required', 'Questions file is required', (value) => value !== ''),
    })
    .strict(true);

  const defaultValues = useMemo(
    () => ({
      class: '',
      series: '',
      chapter: '',
      question_type: '',
      category: '',
      file: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  // Constants
  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const questionType = watch('question_type');
  const className = watch('class');
  const selectedSeries = watch('series');

  const CLASS = [USER_ROLES.ADMIN].includes(user?.designation)
    ? CLASSES
    : user && user?.series?.length > 0
    ? user?.series?.map((item) => ({ label: getValueFromKey(item.class, CLASSES), value: item.class }))
    : [];

  const SERIESES = [USER_ROLES.ADMIN].includes(user?.designation)
    ? CLASSES?.find((item) => item.value === className)?.series
    : user && user?.series?.length > 0
    ? user?.series
        ?.filter((item) => (className ? item.class === className : false))
        ?.map((item) => ({
          label: getValueFromKey(item.series, CLASSES?.find((item) => item.value === className)?.series),
          value: item.series,
        }))
    : [];

  const CHAPTERS = [USER_ROLES.ADMIN].includes(user?.designation)
    ? CLASSES?.find((item) => item.value === className)?.series?.find((item) => item.value === selectedSeries)?.chapters
    : user && user?.series?.length > 0
    ? CLASSES?.find((item) => item.value === className)?.series?.find((item) => item.value === selectedSeries)?.chapters
    : [];

  // Effects

  // Handlers

  const getDataExtractor = async (type, excelData) => {
    switch (type) {
      case 'short_answer':
      case 'long_answer':
      case 'fill_in_the_blanks':
      case 'one_word':
      case 'abbreviations':
      case 'true_or_false':
      case 'application_based':
        return subjectiveToJson(excelData);
      case 'multiple_choice':
        return mcqToJson(excelData);
      case 'match_the_following':
        return matchTheFollowingToJson(excelData);
      default:
        return null;
    }
  };

  const onSubmit = async (formData) => {
    try {
      const reader = new FileReader();
      const { class: selectedClass, series, chapter, question_type: questionType, category, file } = formData;

      reader.onload = async (e) => {
        setIsLoading(true);
        const data = e.target.result;
        const readedData = XLSX.read(data, { type: 'binary' });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
        let extractedData = await getDataExtractor(category, dataParse);
        extractedData = extractedData.map((item) => ({
          ...item,
          ...(category === 'true_or_false'
            ? {
                answer: item.answer.toString(),
              }
            : {}),
          class: selectedClass,
          series,
          isPublished: false,
          chapter,
          question_type: questionType,
          category,
        }));
        if (extractedData?.length > 0) {
          await Promise.all(
            extractedData.map(async (item) => {
              await addStoryItem(FIREBASE_COLLECTIONS.questions, item);
            })
          );
          enqueueSnackbar('Questions Uploaded successfully', { variant: 'success' });
        }
        setIsLoading(false);
        reset();
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const onDownloadTemplate = () => {
    if (!selectedTemplate) return;
    const linkEle = document.createElement('a');
    const selected = TEMPLATES.find((item) => item.type === selectedTemplate);
    linkEle.href = selected.href;
    linkEle.download = selected.href.split('/')[2];
    linkEle.click();
    linkEle.remove();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2} my={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Template</InputLabel>
                  <Select
                    value={selectedTemplate}
                    onChange={({ target: { value } }) => setSelectedTemplate(value)}
                    fullWidth
                    label="Template"
                  >
                    {TEMPLATES.map(({ label, type }) => (
                      <MenuItem key={type} value={type}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {selectedTemplate ? (
                <Grid item xs={12} md={3}>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon={'ic:round-download'} width={24} height={24} />}
                    onClick={onDownloadTemplate}
                  >
                    Download Template
                  </Button>
                </Grid>
              ) : null}
            </Grid>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFSelectInput name="class" label="Classes">
                {CLASS &&
                  CLASS?.length > 0 &&
                  CLASS.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
              </RHFSelectInput>
              <RHFSelectInput name="series" label="Series" placeholder="Series">
                {SERIESES &&
                  SERIESES?.length > 0 &&
                  SERIESES.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
              </RHFSelectInput>

              <RHFSelectInput name="chapter" label="Chapter" placeholder="Chapter">
                {CHAPTERS &&
                  CHAPTERS?.length > 0 &&
                  CHAPTERS.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
              </RHFSelectInput>

              <RHFSelectInput name="question_type" label="Question Type" placeholder="Question Type">
                {QUESTIONS?.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelectInput>

              {questionType && (
                <RHFSelectInput name="category" label="Category" placeholder="Category">
                  {QUESTIONS?.filter((item) => item.name === questionType)[0]?.category?.map((option, index) => (
                    <MenuItem key={index} value={option.name}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelectInput>
              )}
            </Box>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplatecolumns: { sm: 'repeat(1,1fr)' },
              }}
            >
              <RHFExcelFile name="file" label="Select File" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting || isLoading}>
                Submit Questions
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
