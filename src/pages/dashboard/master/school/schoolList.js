import { paramCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useTabs from '../../../../hooks/useTabs';
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../components/table';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { deleteStoryItem } from '../../../../services/deleteServices';
import { updateStoryItem } from '../../../../services/updateServices';
import QuestionTableToolbar from '../../../../sections/@dashboard/generatePaper/questionBank/QuestionTableToolbar';
import SchoolRowTable from '../../../../sections/@dashboard/master/school/schoolRowTable';
import { deleteFile } from '../../../../services/storage';
import { getStoryItem } from '../../../../services/getServices';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';
import { USER_STATUS } from '../../../../constants/keywords';

const STATUS_OPTIONS = ['all', 'active', 'inactive'];

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
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'code', label: 'Code', align: 'left' },
  { id: 'phoneNumber', label: 'Phone Number', align: 'left' },
  { id: 'status', label: 'status', align: 'left' },
  { id: '', label: '', align: 'left' },
];

export default function SchoolList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { enqueueSnackbar } = useSnackbar();

  const { data: tableData } = useFirebaseData(FIREBASE_COLLECTIONS.schools);

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

  const handleDeleteRow = (id, token) => {
    deleteFile(`schoolLogos/${token}`);
  };

  const handleDeleteRows = (selected) => {
    try {
      selected.forEach(async (id) => {
        const { token } = tableData.find((item) => item?.id === id);
        const response = await deleteStoryItem(FIREBASE_COLLECTIONS.schools, id);
        if (response) {
          deleteFile(`schoolLogos/${token}`);
          enqueueSnackbar('Deleted Successfully');
        } else {
          enqueueSnackbar('something went wrong', { variant: 'error' });
        }
      });
    } catch (error) {
      enqueueSnackbar('something went wrong', { variant: 'error' });
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.master.schools.editSchool(paramCase(id)));
  };

  const onChangeStatus = async (isActive, id) => {
    try {
      const response = await updateStoryItem(FIREBASE_COLLECTIONS.schools, { id, isActive: !isActive });
      if (response) {
        const staff = await getStoryItem(FIREBASE_COLLECTIONS.users, [
          { property: 'schoolId', operator: FIREBASE_OPERATORS.EQUAL_TO, value: id },
        ]);
        if (staff && staff?.length > 0) {
          staff.forEach(async ({ id }) => {
            await updateStoryItem(FIREBASE_COLLECTIONS.users, {
              id,
              status: isActive ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE,
            });
          });
        }
        enqueueSnackbar('School Updated Successfully');
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

  return (
    <Page title="School: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="School List"
          links={[
            { name: 'School', href: PATH_DASHBOARD.master.schools.root },
            { name: 'School List', href: PATH_DASHBOARD.master.schools.viewEditSchool },
          ]}
        />

        <Stack sx={{ marginBottom: '10px', display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(PATH_DASHBOARD.master.schools.addSchool);
            }}
          >
            Add School
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
                  isCheckBox={false}
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <SchoolRowTable
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id, row?.token)}
                      onEditRow={() => handleEditRow(row.id)}
                      onChangeStatus={() => onChangeStatus(row.isActive, row.id)}
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

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus === 'active') {
    tableData = tableData.filter((item) => item.isActive);
  }
  if (filterStatus === 'inactive') {
    tableData = tableData.filter((item) => item.isActive === false);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }
  return tableData;
}
