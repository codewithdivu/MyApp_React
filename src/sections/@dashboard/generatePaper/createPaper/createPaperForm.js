/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';

// forms
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { FormProvider, RHFSelectInput, RHFSwitch, RHFTextField } from '../../../../components/hook-form';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import useAuth from '../../../../hooks/useAuth';
import PaperTable from './paperTable';
import { getValueFromKey } from '../../../../utils/mapper';
import { CLASSES, LOGO_POSITIONS, OUTPUT_TEMPLATES } from '../../../../constants/attributes';
import { USER_ROLES } from '../../../../constants/keywords';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';
import PaperStyle from './paperStyle';
import { QuestionsSelect } from '..';

CreatePaperForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPaper: PropTypes.object,
};

export default function CreatePaperForm({ isEdit, currentPaper }) {
  const { user } = useAuth();

  // States
  const [questionQuery, setQuestionQuery] = useState([
    {
      property: 'isPublished',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: true,
    },
  ]);
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [isQuestionSelect, setIsQuestionSelect] = useState(false);
  const [formData, setFormData] = useState(null);

  // Form Config
  const NewUserSchema = Yup.object().shape({
    paper_name: Yup.string().required('Paper Name is required'),
    school: Yup.string().required('School Name is required'),
    output_template: Yup.string().required('Output Template is required'),
    class: Yup.string().required('Class is required'),
    series: Yup.string().required('Series is required'),
    chapter: Yup.string().required('Chapter is required'),
    hours: Yup.string().required('Hours is required.'),
    minutes: Yup.string().required('Minutes is required.'),
    maximum_marks: Yup.string().required('Maximum Marks is required'),
    paper_sections: Yup.string().required('Paper Sections is required'),
    isDisplayLogo: Yup.boolean().required('Display Logo is required'),
    position: Yup.string(),
    isPublished: Yup.boolean(),

    items: Yup.array().of(
      Yup.object().shape({
        question_type: Yup.string().required('Question type is required.'),
        category: Yup.string().required('Category is required.'),
        no_of_questions: Yup.string().required('No of questions is required.'),
        marks_per_question: Yup.string().required('Marks per question is required.'),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      paper_name: currentPaper?.paper_name || '',
      school: user?.designation === USER_ROLES.ADMIN ? '' : user?.schoolId,
      output_template: currentPaper?.output_template || '',
      class: currentPaper?.class || '',
      series: currentPaper?.series || '',
      chapter: currentPaper?.chapter || '',
      hours: currentPaper?.hours || '',
      minutes: currentPaper?.minutes || '',
      maximum_marks: currentPaper?.maximum_marks || '',
      paper_sections: currentPaper?.paper_sections || 1,
      isDisplayLogo: currentPaper?.isDisplayLogo || false,
      position: currentPaper?.position || '',
      isPublished: currentPaper?.isPublished || false,

      items: currentPaper?.items || [
        {
          question_type: '',
          category: '',
          no_of_questions: '',
          marks_per_question: '',
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPaper, isEdit, user]
  );

  // Hooks
  const { data: SCHOOLS } = useFirebaseData(
    FIREBASE_COLLECTIONS.schools,
    user?.designation === USER_ROLES.ADMIN
      ? []
      : [
          {
            property: 'id',
            operator: FIREBASE_OPERATORS.EQUAL_TO,
            value: user?.schoolId,
          },
        ]
  );
  const { data: QUESTIONS, fetchData } = useFirebaseData(FIREBASE_COLLECTIONS.questions, questionQuery);

  // Constants
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'items',
  });

  // watchers
  const rowItems = watch('items');
  const noOfPaperSections = watch('paper_sections');
  const selectedStyle = watch('output_template');
  const className = watch('class');
  const selectedSeries = watch('series');
  const selectedChapter = watch('chapter');
  const isLogoDisplay = watch('isDisplayLogo');

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
  useEffect(() => {
    if (noOfPaperSections >= 1) {
      if (rowItems.length >= noOfPaperSections) {
        let clonedItems = [...rowItems];
        clonedItems = clonedItems.slice(0, noOfPaperSections);
        setValue('items', clonedItems);
      } else {
        for (let index = 1; index <= noOfPaperSections - rowItems.length; index += 1) {
          append({
            question_type: '',
            category: '',
            no_of_questions: '',
            marks_per_question: '',
          });
        }
      }
    }
  }, [noOfPaperSections]);

  useEffect(() => {
    if (className) {
      setQuestionQuery((prev) => [
        ...prev,
        { property: 'class', operator: FIREBASE_OPERATORS.EQUAL_TO, value: className },
      ]);
      fetchData([...questionQuery, { property: 'class', operator: FIREBASE_OPERATORS.EQUAL_TO, value: className }]);
    }
    setValue('series', isEdit ? currentPaper?.series : '');
  }, [className]);

  useEffect(() => {
    if (selectedSeries) {
      setQuestionQuery((prev) => [
        ...prev,
        { property: 'series', operator: FIREBASE_OPERATORS.EQUAL_TO, value: selectedSeries },
      ]);
      fetchData([
        ...questionQuery,
        { property: 'series', operator: FIREBASE_OPERATORS.EQUAL_TO, value: selectedSeries },
      ]);
    }
  }, [selectedSeries]);

  useEffect(() => {
    if (selectedChapter) {
      setQuestionQuery((prev) => [
        ...prev,
        { property: 'chapter', operator: FIREBASE_OPERATORS.EQUAL_TO, value: selectedChapter },
      ]);
      fetchData([
        ...questionQuery,
        { property: 'chapter', operator: FIREBASE_OPERATORS.EQUAL_TO, value: selectedChapter },
      ]);
    }
  }, [selectedChapter]);

  // Handlers

  const handleFetchData = (queries) => {
    setQuestionQuery((prev) => [...prev, ...queries]);
    fetchData([...questionQuery, ...queries]);
  };

  const handleInsert = () => {
    append({
      question_type: '',
      category: '',
      no_of_questions: '',
      marks_per_question: '',
    });
    setValue('paper_sections', noOfPaperSections + 1);
  };

  const handleRemove = (index) => {
    remove(index);
    setValue('paper_sections', noOfPaperSections - 1);
  };

  const onSubmit = async (formdata) => {
    try {
      setFormData(formdata);
      setIsQuestionSelect(true);
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  const onCloseQuestionModal = () => {
    setIsQuestionSelect(false);
    setFormData(null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFSelectInput
                name="school"
                label="School"
                placeholder="School"
                disabled={USER_ROLES.ADMIN !== user?.designation}
              >
                {SCHOOLS &&
                  SCHOOLS?.length > 0 &&
                  SCHOOLS?.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </RHFSelectInput>
              <RHFTextField name="paper_name" label="Paper Name" />
              <Stack direction="row" spacing={2} alignItems={'center'}>
                <RHFSelectInput name="output_template" label="Output Template" placeholder="Template">
                  {OUTPUT_TEMPLATES?.map((option, index) => (
                    <MenuItem key={index} value={option.name}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelectInput>
                {selectedStyle ? (
                  <Button variant="contained" onClick={() => setIsStyleOpen(true)}>
                    View
                  </Button>
                ) : (
                  ''
                )}
                <PaperStyle
                  isOpen={isStyleOpen}
                  onClose={() => setIsStyleOpen(false)}
                  paperStyle={selectedStyle}
                  isStyle
                />
              </Stack>

              <RHFSelectInput name="class" label="Classes" placeholder="Class">
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
              <Stack direction={'row'} spacing={1}>
                <RHFSelectInput name="hours" label="Hours" placeholder="Hours">
                  {Array.from({ length: 6 }, (value, index) => (
                    <MenuItem key={index} value={index}>
                      {index}
                    </MenuItem>
                  ))}
                </RHFSelectInput>
                <RHFSelectInput name="minutes" label="Minutes" placeholder="Minutes">
                  {Array.from({ length: 61 }, (value, index) => (
                    <MenuItem key={index} value={index}>
                      {index}
                    </MenuItem>
                  ))}
                </RHFSelectInput>
              </Stack>
              <RHFTextField
                name="maximum_marks"
                label="Maximum Marks"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 150 } }}
              />
              <RHFSelectInput name="paper_sections" label="Paper Sections" placeholder="Paper Sections">
                {Array.from({ length: 15 }, (value, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </RHFSelectInput>

              <RHFSwitch
                name="isDisplayLogo"
                labelPlacement="Is Display Logo"
                label={<Typography variant="subtitle2">Want to Display Logo</Typography>}
              />
              {isLogoDisplay ? (
                <RHFSelectInput name="position" label="Logo Position" placeholder="Logo Position">
                  {LOGO_POSITIONS.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </RHFSelectInput>
              ) : (
                ''
              )}

              <RHFSwitch
                name="isPublished"
                labelPlacement="Is Published"
                label={<Typography variant="subtitle2">Is Published</Typography>}
              />
            </Box>

            <PaperTable
              fields={fields}
              handleRemove={handleRemove}
              handleInsert={handleInsert}
              rowItems={rowItems}
              watch={watch}
              update={update}
              QUESTIONS={QUESTIONS}
              fetchData={handleFetchData}
            />
            <QuestionsSelect
              isOpen={isQuestionSelect}
              onClose={onCloseQuestionModal}
              QUESTIONS={QUESTIONS}
              formData={formData}
              currentPaper={currentPaper}
              isEdit={isEdit}
            />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {isEdit ? 'Edit Paper' : 'Create Paper'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
