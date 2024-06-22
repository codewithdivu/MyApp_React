/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Button, MenuItem } from '@mui/material';
import Loader from '../../../../components/Loader';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { FormProvider, RHFRadioGroup, RHFSelectInput, RHFSwitch, RHFTextField } from '../../../../components/hook-form';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import useAuth from '../../../../hooks/useAuth';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';
import { addStoryItem } from '../../../../services/addServices';
import { updateStoryItem } from '../../../../services/updateServices';
import { USER_ROLES, USER_STATUS } from '../../../../constants/keywords';
import Iconify from '../../../../components/Iconify';
import { CLASSES, SERIES, QUESTIONS, TRUE_FALSE } from '../../../../constants/attributes';
import { getValueFromKey } from '../../../../utils/mapper';

QuestionForm.propTypes = {
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentQuestion: PropTypes.object,
};

export default function QuestionForm({ isEdit, currentQuestion, isLoading }) {
  // Form Config
  const NewUserSchema = Yup.object()
    .shape({
      question: Yup.string().required('Question is required'),
      class: Yup.string().required('Class is required'),
      series: Yup.string().required('Series is required'),
      chapter: Yup.string().required('Chapter is required'),
      attribute: Yup.string().required('Attributes are required'),
      question_type: Yup.string().required('Question Type is required'),
      category: Yup.string().required('Category Type is required'),
      isPublished: Yup.boolean(),
      answer: Yup.string(),
      no_of_options: Yup.number(),
      match_the_following: Yup.array().of(
        Yup.object().shape({
          left: Yup.string(),
          right: Yup.string(),
        })
      ),
      multiple_choices: Yup.array().of(
        Yup.object().shape({
          value: Yup.string(),
        })
      ),
    })
    .strict(true);

  const defaultValues = useMemo(
    () => ({
      question: currentQuestion?.question || '',
      class: currentQuestion?.class || '',
      series: currentQuestion?.series || '',
      chapter: currentQuestion?.chapter || '',
      attribute: currentQuestion?.attribute || '',
      question_type: currentQuestion?.question_type || '',
      category: currentQuestion?.category || '',
      isPublished: currentQuestion?.isPublished || false,
      answer:
        ((currentQuestion?.category === 'true_or_false' ||
          currentQuestion?.category === 'multiple_choice' ||
          currentQuestion?.category === 'one_word' ||
          currentQuestion?.category === 'abbreviations' ||
          currentQuestion?.category === 'application_based' ||
          currentQuestion?.category === 'fill_in_the_blanks' ||
          currentQuestion.category === 'long_answer' ||
          currentQuestion.category === 'short_answer') &&
          currentQuestion?.answer) ||
        '',
      no_of_options: currentQuestion?.no_of_options || 0,
      multiple_choices: currentQuestion?.multiple_choices || [
        {
          value: '',
        },
      ],
      match_the_following: currentQuestion?.match_the_following || [
        {
          left: '',
          right: '',
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQuestion, isEdit]
  );

  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.questionAttributes, [
    {
      property: 'status',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: USER_STATUS.ACTIVE,
    },
  ]);

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  // Constants
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const {
    fields: matchTheFollowingFields,
    append: matchTheFollowingAppend,
    remove: matchTheFollowingRemove,
  } = useFieldArray({
    control,
    name: 'match_the_following',
  });

  const {
    fields: multipleChoicesFields,
    append: multipleChoicesAppend,
    remove: multipleChoicesRemove,
  } = useFieldArray({
    control,
    name: 'multiple_choices',
  });

  const questionType = watch('question_type');
  const categoryType = watch('category');
  const noOfOptions = watch('no_of_options');
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

  const ATTRIBUTES = data && data?.length > 0 ? data.map((item) => ({ ...item, label: item?.name })) : [];

  // Effects
  useEffect(() => {
    if (isEdit && currentQuestion) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentQuestion]);

  // Handlers
  const onSubmit = async (formData) => {
    try {
      const response = isEdit
        ? await updateStoryItem(FIREBASE_COLLECTIONS.questions, { ...formData, id: currentQuestion?.id })
        : await addStoryItem(FIREBASE_COLLECTIONS.questions, formData);

      if (response) {
        reset();
        enqueueSnackbar(!isEdit ? 'Question Created successfully!' : 'Question Update successfully!');
        navigate(PATH_DASHBOARD.generatePaper.questionBank.viewEditQuestion);
      } else {
        enqueueSnackbar('something went wrong', { variant: 'error' });
      }
    } catch (error) {
      console.error('er', error);
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {isFetching || isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplatecolumns: { sm: 'repeat(1,1fr)' },
                  marginBottom: '25px',
                }}
              >
                <RHFTextField name="question" label="Question Text" multiline rows={3} />
              </Box>
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
                  <>
                    <RHFSelectInput name="category" label="Category" placeholder="Category">
                      {QUESTIONS?.filter((item) => item.name === questionType)[0]?.category?.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelectInput>
                  </>
                )}

                {categoryType === 'true_or_false' && (
                  <RHFSelectInput name="answer" label="Answer" placeholder="Answer">
                    {TRUE_FALSE.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </RHFSelectInput>
                )}

                {categoryType === 'multiple_choice' && (
                  <>
                    <RHFSelectInput name="no_of_options" label="No of Options" placeholder="No of Options">
                      {[...Array.from({ length: 5 }, (_, index) => index + 1)].map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </RHFSelectInput>

                    {[...Array.from({ length: noOfOptions }, (_, index) => index + 1)].map((item, index) => (
                      <React.Fragment key={index}>
                        <Typography>{String.fromCharCode('a'.charCodeAt(0) + index)}</Typography>
                        <RHFTextField name={`multiple_choices[${index}].value`} label="Value" />
                      </React.Fragment>
                    ))}

                    <RHFSelectInput name="answer" label="Answer" placeholder="Answer">
                      {[...Array.from({ length: noOfOptions }, (_, index) => index + 1)].map((item, index) => (
                        <MenuItem key={index} value={String.fromCharCode('a'.charCodeAt(0) + index)}>
                          {String.fromCharCode('a'.charCodeAt(0) + index)}
                        </MenuItem>
                      ))}
                    </RHFSelectInput>
                  </>
                )}
                {[
                  'one_word',
                  'fill_in_the_blanks',
                  'abbreviations',
                  'application_based',
                  'short_answer',
                  'long_answer',
                ].includes(categoryType) && <RHFTextField name="answer" label="Answer" multiline rows={8} />}

                {categoryType === 'match_the_following' && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ align: 'end' }}
                      onClick={() =>
                        matchTheFollowingAppend({
                          left: '',
                          right: '',
                        })
                      }
                    >
                      Add the Pair
                    </Button>
                  </>
                )}

                {categoryType === 'match_the_following' && (
                  <>
                    {matchTheFollowingFields?.map((row, index) => (
                      <React.Fragment key={index}>
                        <Stack direction="row">
                          <RHFTextField
                            name={`match_the_following[${index}].left`}
                            label="Value"
                            sx={{ width: '80%' }}
                          />
                        </Stack>
                        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <RHFTextField
                            name={`match_the_following[${index}].right`}
                            label="Matched Value"
                            sx={{ width: '80%' }}
                          />
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => matchTheFollowingRemove(index)}
                            sx={{ width: '10%' }}
                          >
                            <Iconify icon={'carbon:delete'} sx={{ fontSize: '20px' }} />
                          </Button>
                        </Stack>
                      </React.Fragment>
                    ))}
                  </>
                )}

                <Stack spacing={1}>
                  <Typography variant="subtitle1">Attributes</Typography>
                  <RHFRadioGroup name="attribute" options={ATTRIBUTES} sx={{ width: 1 }} />
                </Stack>
                <RHFSwitch
                  name="isPublished"
                  labelPlacement="Is Published"
                  label={<Typography variant="subtitle2">Is Published</Typography>}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Create Question' : 'Update Question'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      )}
    </FormProvider>
  );
}
