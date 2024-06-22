import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Stack,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
import { useSnackbar } from 'notistack';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// _mock_
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import useFirebaseData from '../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../constants/collections';
import QuesitonRowTable from '../../../sections/@dashboard/generatePaper/questionBank/questionRowTable';
import { deleteStoryItem } from '../../../services/deleteServices';
import { updateStoryItem } from '../../../services/updateServices';
import QuestionTableToolbar from '../../../sections/@dashboard/generatePaper/questionBank/QuestionTableToolbar';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'published', 'notPublished'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'series', label: 'Series', align: 'left' },
  { id: 'class', label: 'Class', align: 'left' },
  { id: 'question_type', label: 'QType', align: 'left' },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'status', label: 'status', align: 'left' },
  { id: '', label: '', align: 'left' },
];

// ----------------------------------------------------------------------

export default function QuestionsAllocation() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { enqueueSnackbar } = useSnackbar();

  const { data: tableData, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.questions);

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
  };

  const handleDeleteRows = (selected) => {
    try {
      selected.forEach(async (id) => {
        const response = await deleteStoryItem(FIREBASE_COLLECTIONS.questions, id);
        if (response) {
          enqueueSnackbar('Deleted Successfully');
          navigate(PATH_DASHBOARD.generatePaper.questionBank.viewEditQuestion);
        } else {
          enqueueSnackbar('something went wrong', { variant: 'error' });
        }
      });
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.generatePaper.editQuestion(paramCase(id)));
  };

  const onChangeStatus = async (isPublished, id) => {
    try {
      const response = await updateStoryItem(FIREBASE_COLLECTIONS.questions, { id, isPublished: !isPublished });
      if (response) {
        enqueueSnackbar('Update Successfully');
      } else {
        enqueueSnackbar('something went wrong', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('something error occured', { variant: 'error' });
    }
  };

  const dataFiltered = applySortFilter({
    tableData: tableData && tableData?.length > 0 ? tableData : [],
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus) ||
    '';

  // const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  // const [selectedArray, setSelectedArray] = useState([]);
  // const onCloseModal = () => {
  //   setIsAttributeModalOpen(false);
  // };

  // const handleOpenModal = (selected) => {
  //   setIsAttributeModalOpen(true);
  //   setSelectedArray(selected);
  // };

  return (
    <Page title="Questions: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Employee Books Allocation"
          links={[
            { name: 'Master', href: PATH_DASHBOARD.master.root },
            { name: 'Employee Books Allocation', href: PATH_DASHBOARD.master.books },
          ]}
        />

        {/* <DialogAnimate open={isAttributeModalOpen} onClose={onCloseModal}>
          <DialogTitle>{'Want to Delete'}</DialogTitle>
          <DialogActions>
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="outlined" color="inherit" onClick={onCloseModal}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" onClick={() => handleDeleteRows(selectedArray)}>
              Delete
            </Button>
          </DialogActions>
        </DialogAnimate> */}
        <Stack sx={{ marginBottom: '10px', display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(PATH_DASHBOARD.generatePaper.questionBank.addQuestion);
            }}
          >
            Add Question
          </Button>
        </Stack>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <QuestionTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData?.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData?.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <QuesitonRowTable
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onChangeStatus={() => onChangeStatus(row.isPublished, row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData?.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.category.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus === 'published') {
    tableData = tableData.filter((item) => item.isPublished === true);
  }
  if (filterStatus === 'notPublished') {
    tableData = tableData.filter((item) => item.isPublished === false);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }
  return tableData;
}
