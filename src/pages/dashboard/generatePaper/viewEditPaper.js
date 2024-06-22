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
import { deleteStoryItem } from '../../../services/deleteServices';
import { updateStoryItem } from '../../../services/updateServices';
import QuestionTableToolbar from '../../../sections/@dashboard/generatePaper/questionBank/QuestionTableToolbar';
import { FIREBASE_OPERATORS } from '../../../constants/operators';
import useAuth from '../../../hooks/useAuth';
import PaperListRowTable from '../../../sections/@dashboard/generatePaper/createPaper/paperListRowTable';
import PaperStyle from '../../../sections/@dashboard/generatePaper/createPaper/paperStyle';
import { getStoryItem } from '../../../services/getServices';

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
  { id: 'name', label: 'Paper Name', align: 'left' },
  { id: 'class', label: 'Class', align: 'left' },
  { id: 'series', label: 'Series', align: 'left' },
  { id: 'chapter', label: 'Chapter', align: 'left' },
  { id: 'no_of_sections', label: 'No of Sections', align: 'left' },
  { id: 'time', label: 'Paper Time', align: 'left' },
  { id: 'created_by', label: 'Created By', align: 'left' },
  { id: 'on_date', label: 'On Date', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'd_student', label: 'Download Student Copy', align: 'left' },
  { id: 'd_teacher', label: 'Download Teacher Copy', align: 'left' },
  { id: '', label: '', align: 'left' },
];

// ----------------------------------------------------------------------

export default function ViewEditPaper() {
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
  const { user } = useAuth();

  const { data: tableData, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.papers, [
    { property: 'createdBy', operator: FIREBASE_OPERATORS.EQUAL_TO, value: user?.id },
  ]);

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [modalData, setModalData] = useState();

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

  const handleDeleteRow = async (id) => {
    try {
      const response = await deleteStoryItem(FIREBASE_COLLECTIONS.papers, id);
      if (response) {
        enqueueSnackbar('Paper Deleted Successfully');
        navigate(PATH_DASHBOARD.generatePaper.viewEditPaper);
      } else {
        enqueueSnackbar('something went wrong', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  const handleDeleteRows = (selected) => {
    try {
      selected.forEach(async (id) => {
        const response = await deleteStoryItem(FIREBASE_COLLECTIONS.papers, id);
        if (response) {
          enqueueSnackbar('Papers Deleted Successfully');
          navigate(PATH_DASHBOARD.generatePaper.viewEditPaper);
        } else {
          enqueueSnackbar('something went wrong', { variant: 'error' });
        }
      });
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.generatePaper.editPaper(id));
  };

  const onChangeStatus = async (isPublished, id) => {
    try {
      const response = await updateStoryItem(FIREBASE_COLLECTIONS.papers, { id, isPublished: !isPublished });
      if (response) {
        enqueueSnackbar('Question status update Successfully');
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('something error occured', { variant: 'error' });
    }
  };

  const handleDownloadPaper = async (id, isTeacherCopy) => {
    try {
      const response = await getStoryItem(FIREBASE_COLLECTIONS.papers, [
        { property: 'id', operator: FIREBASE_OPERATORS.EQUAL_TO, value: id },
      ]);
      const response2 = await getStoryItem(FIREBASE_COLLECTIONS.schools, [
        { property: 'id', operator: FIREBASE_OPERATORS.EQUAL_TO, value: response.at(0).school },
      ]);

      const tt = await Promise.all(
        response?.at(0)?.items?.map(async (it) => {
          const qq = await Promise.all(
            it?.questions.map(async (question) => {
              const que = await getStoryItem(FIREBASE_COLLECTIONS.questions, [
                {
                  property: 'id',
                  operator: FIREBASE_OPERATORS.EQUAL_TO,
                  value: question,
                },
              ]);
              return { ...que.at(0) };
            })
          );
          return { ...it, questions: qq };
        })
      );

      if (response && response2) {
        setModalData({
          ...response?.at(0),
          items: tt,
          schoolName: response2.at(0).name,
          schoolLogo: response2.at(0).schoolLogo,
          isTeacherCopy,
        });
        setIsStyleOpen(true);
      }
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
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

  return (
    <Page title="Paper: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Paper list"
          links={[
            { name: 'Master', href: PATH_DASHBOARD.master.root },
            { name: 'Paper', href: PATH_DASHBOARD.generatePaper.viewEditPaper },
          ]}
        />

        <PaperStyle
          isOpen={isStyleOpen}
          onClose={() => setIsStyleOpen(false)}
          paperStyle={modalData?.output_template}
          data={modalData}
        />

        <Stack sx={{ marginBottom: '10px', display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(PATH_DASHBOARD.generatePaper.createPaper);
            }}
          >
            Create Paper
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
            placeHoldername="Name"
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
                    <PaperListRowTable
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onChangeStatus={() => onChangeStatus(row.isPublished, row.id)}
                      handleDownloadPaperForStudent={() => handleDownloadPaper(row.id, false)}
                      handleDownloadPaperForTeacher={() => handleDownloadPaper(row.id, true)}
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
    tableData = tableData.filter((item) => item.paper_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
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
