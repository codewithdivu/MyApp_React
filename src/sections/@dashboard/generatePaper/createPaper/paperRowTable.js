import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { TableRow, TableCell, MenuItem } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { RHFSelectInput, RHFTextField } from '../../../../components/hook-form';
import { QUESTIONS as QUESTIONS_METADATA } from '../../../../constants/attributes';

PaperRowTable.propTypes = {
  selected: PropTypes.bool,
  rowItem: PropTypes.object,
  handleRemove: PropTypes.func,
  number: PropTypes.number,
};

export default function PaperRowTable({ selected, number, handleRemove, rowItem, watch, update, QUESTIONS }) {
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const currentRowQuestionType = watch(`items[${number}].question_type`);
  const currentRowCategory = watch(`items[${number}].category`);
  const currentRowTotalQuestion = watch(`items[${number}].no_of_questions`);
  const currentRowMarksPerQuestion = watch(`items[${number}].marks_per_question`);
  const currentRow = watch(`items[${number}]`);
  const items = watch('items');
  const maxMarks = watch('maximum_marks');

  const availableQuestion = useMemo(() => {
    if (QUESTIONS && QUESTIONS.length > 0) {
      let updatedQuestion = [...QUESTIONS];
      if (currentRowQuestionType && currentRowCategory) {
        updatedQuestion = updatedQuestion.filter(
          (item) => item.question_type === currentRowQuestionType && item.category === currentRowCategory
        );
      }

      return updatedQuestion;
    }
    return [];
  }, [QUESTIONS, currentRowQuestionType, currentRowCategory, currentRowTotalQuestion]);

  const isValidMarks = useMemo(() => {
    if (
      currentRowQuestionType &&
      currentRowCategory &&
      currentRowTotalQuestion &&
      currentRowMarksPerQuestion &&
      items &&
      maxMarks
    ) {
      const sum =
        items &&
        items.length > 0 &&
        items.reduce((ac, item) => ac + +item.no_of_questions * +item.marks_per_question, 0);
      return sum;
    }
  }, [
    maxMarks,
    items,
    currentRowQuestionType,
    currentRowCategory,
    currentRowTotalQuestion,
    currentRowMarksPerQuestion,
  ]);

  return (
    <TableRow hover selected={selected}>
      <TableCell>{number + 1}</TableCell>
      <TableCell align="left" flex={1}>
        <RHFSelectInput
          name={`items[${number}].question_type`}
          label="Question Type"
          placeholder="Question Type"
          sx={{
            width: '100%',
          }}
        >
          {QUESTIONS_METADATA?.map((option, index) => (
            <MenuItem key={index} value={option.name}>
              {option.label}
            </MenuItem>
          ))}
        </RHFSelectInput>
      </TableCell>
      <TableCell align="left">
        <RHFSelectInput
          name={`items[${number}].category`}
          label="Category"
          placeholder="Category"
          sx={{
            width: '100%',
          }}
        >
          {currentRow?.question_type &&
            QUESTIONS_METADATA?.filter((item) => item.name === rowItem.question_type)[0]?.category.map(
              (option, index) => (
                <MenuItem key={index} value={option.name}>
                  {option.label}
                </MenuItem>
              )
            )}
        </RHFSelectInput>
      </TableCell>
      <TableCell align="left">
        <RHFTextField
          name={`items[${number}].no_of_questions`}
          label=""
          type="number"
          InputProps={{
            inputProps: { min: 0, max: currentRowQuestionType && currentRowCategory ? availableQuestion?.length : 0 },
          }}
        />
      </TableCell>
      <TableCell align="left">
        <RHFTextField
          name={`items[${number}].marks_per_question`}
          label=""
          type="number"
          // inputProps={{inputProps:{
          //   min:0,max:0
          // }}}
          helperText={isValidMarks > maxMarks && 'Total marks should be less than or equal to maximum marks'}
        />
      </TableCell>
      <TableCell align="left" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {currentRowQuestionType && currentRowCategory ? availableQuestion?.length : '-'}
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  handleRemove(number);
                }}
              >
                <Iconify icon={'carbon:delete'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
