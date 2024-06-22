import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
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
  DialogTitle,
} from '@mui/material';
// routes
import { useSnackbar } from 'notistack';
import { deleteStoryItem } from '../../../services/deleteServices';
import useFirebaseData from '../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../constants/collections';
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// _mock_
import { _userList } from '../../../_mock';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import { QuestionTableToolbar, QuestionTableRow } from '../../../sections/@dashboard/master/list';
import { DialogAnimate } from '../../../components/animate';
import QuestionAttributeForm from '../../../sections/@dashboard/master/AddUpdateAttribute';

// ----------------------------------------------------------------------

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
  { id: 'name', label: 'Paper Attribute Name', align: 'left' },
  { id: 'value', label: 'Value (Backend Use)', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '', label: 'Actions', align: 'right' },
];

// ----------------------------------------------------------------------

export default function QuestionAttributes() {
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

  const { themeStretch } = useSettings();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [filterName, setFilterName] = useState('');
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [editAttributes, setEditAttributes] = useState(null);

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const { data: tableData, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.questionAttributes);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    try {
      const res = await deleteStoryItem(FIREBASE_COLLECTIONS.questionAttributes, id);
      if (res) {
        enqueueSnackbar('Question attribute deleted successfully!');
      } else {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const handleDeleteRows = (selected) => {
    try {
      if (selected?.length > 0) {
        selected.forEach(async (id) => {
          await deleteStoryItem(FIREBASE_COLLECTIONS.questionAttributes, id);
          enqueueSnackbar('Question attribute deleted successfully!');
        });
      }
      setSelected([]);
    } catch (error) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const handleEditRow = (id) => {
    if (!id) return;
    const selected = tableData.find((item) => item.id === id);
    if (selected) {
      setEditAttributes(selected);
      setIsAttributeModalOpen(true);
    }
  };

  const dataFiltered = applySortFilter({
    tableData: tableData && tableData.length > 0 ? tableData : [],
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const onCloseModal = () => {
    setIsAttributeModalOpen(false);
    if (editAttributes) setEditAttributes(null);
  };

  return (
    <Page title="Master : Question Attributes">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Question Attributes"
          links={[
            { name: 'Master', href: PATH_DASHBOARD.master.root },
            { name: 'Question Attributes', href: PATH_DASHBOARD.master.questionAttributes },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={() => setIsAttributeModalOpen(true)}
            >
              New Attribute
            </Button>
          }
        />
        <DialogAnimate open={isAttributeModalOpen} onClose={onCloseModal}>
          <DialogTitle>{`${editAttributes ? 'Edit' : 'Add'} Question Attribute`}</DialogTitle>
          <QuestionAttributeForm onCancel={onCloseModal} attribute={editAttributes} />
        </DialogAnimate>
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
                    <QuestionTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
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

function applySortFilter({ tableData, comparator, filterName, filterStatus }) {
  const stabilizedThis = tableData?.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  return tableData;
}
