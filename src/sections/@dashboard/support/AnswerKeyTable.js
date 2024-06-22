// @mui
import { Box, Table, Switch, TableBody, TableContainer, FormControlLabel } from '@mui/material';
import useTable from '../../../hooks/useTable';
// Components
import Scrollbar from '../../../components/Scrollbar';
import { TableNoData } from '../../../components/table';
import AnswerKeyTableHeadCustom from './AnswerKeyTableHeadCustom';
import AnswerKeyRowTable from './AnswerKeyRowTable';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'answerKey', label: 'Answer Key', align: 'left' },
  { id: '', label: '', align: 'left' },
];

const TABLE_CONTENT = [
  {
    id: '1',
    name: 'I.T Beans Answer Key 1 to 5',
    answerKeyLink: 'https://chat.openai.com/',
  },
  {
    id: '2',
    name: 'I.T Beans Answer Key 6 to 8',
    answerKeyLink: 'https://chat.openai.com/',
  },
  {
    id: '3',
    name: 'as',
    answerKeyLink: 'https://chat.openai.com/',
  },
];

// ----------------------------------------------------------------------

export default function AnswerKeyTable() {
  const { dense, order, orderBy, selected, onChangeDense } = useTable();

  const isNotFound = '';

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <AnswerKeyTableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />

            <TableBody>
              {TABLE_CONTENT?.map((row) => (
                <AnswerKeyRowTable key={row.id} row={row} selected={selected.includes(row.id)} />
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
    </Box>
  );
}
