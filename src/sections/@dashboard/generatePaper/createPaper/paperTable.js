// @mui
import { Box, Table, Switch, TableBody, TableContainer, FormControlLabel, Button } from '@mui/material';
import useTable from '../../../../hooks/useTable';
// Components
import Scrollbar from '../../../../components/Scrollbar';
import { TableNoData } from '../../../../components/table';
import PaperRowTable from './paperRowTable';
import PaperTableHeadCustom from './PaperTableHeadCustom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'section_type', label: 'Section Type', align: 'left' },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'no_of_questions', label: 'No. of Questions', align: 'left' },
  { id: 'marks_per_question', label: 'Marks Per Question', align: 'left' },
  { id: 'available_in_db', label: 'Available In Database', align: 'left' },
  { id: '', label: '', align: 'left' },
];

export default function PaperTable(props) {
  const { fields, handleRemove, handleInsert, rowItems, watch, update, QUESTIONS, fetchData } = props;

  const { dense, order, orderBy, selected, onChangeDense } = useTable();

  const isNotFound = '';

  const noOfPaperSections = watch('paper_sections');

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <PaperTableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />

            <TableBody>
              {fields?.map((row, index) => (
                <PaperRowTable
                  selected={selected.includes(row.id)}
                  number={index}
                  handleRemove={handleRemove}
                  rowItem={rowItems[index]}
                  key={row.id}
                  watch={watch}
                  update={update}
                  QUESTIONS={QUESTIONS}
                  fetchData={fetchData}
                />
              ))}

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
        <Button onClick={handleInsert} disabled={noOfPaperSections === 15} variant="contained" color="secondary">
          ADD NEW
        </Button>
      </Box>
    </Box>
  );
}
