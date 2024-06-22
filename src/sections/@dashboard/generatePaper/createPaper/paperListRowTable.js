import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, MenuItem, IconButton } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { getValueFromKey } from '../../../../utils/mapper';
import { CLASSES, SERIES } from '../../../../constants/attributes';
import { fDate } from '../../../../utils/formatTime';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

PaperListRowTable.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  handleDownloadPaperForStudent: PropTypes.func,
  handleDownloadPaperForTeacher: PropTypes.func,
};

export default function PaperListRowTable({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onChangeStatus,
  handleDownloadPaperForStudent,
  handleDownloadPaperForTeacher,
}) {
  const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">{row?.paper_name}</TableCell>

      <TableCell align="left">{row?.class ? getValueFromKey(row?.class, CLASSES) : ''}</TableCell>
      <TableCell align="left">
        {row?.series ? getValueFromKey(row?.series, CLASSES?.find((item) => item.value === row?.class)?.series) : ''}
      </TableCell>
      <TableCell align="left">
        {row?.chapter
          ? getValueFromKey(
              row?.chapter,
              CLASSES?.find((item) => item.value === row?.class)?.series?.find((item) => item.value === row?.series)
                ?.chapters
            )
          : ''}
      </TableCell>
      <TableCell align="left">{row?.paper_sections}</TableCell>
      <TableCell align="left">
        {row?.hours} Hours {row?.minutes} Minutes
      </TableCell>
      <TableCell align="left">{row?.createdBy}</TableCell>
      <TableCell align="left">{row?.createdAt ? fDate(row?.createdAt.toDate()) : ''}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row?.isPublished === false && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {row?.isPublished ? 'Published' : 'UnPublished'}
        </Label>
      </TableCell>
      <TableCell align="left">
        <IconButton onClick={handleDownloadPaperForStudent} disabled={!row?.isPublished}>
          <Iconify icon={'carbon:download'} />
        </IconButton>
      </TableCell>
      <TableCell align="left">
        <IconButton onClick={handleDownloadPaperForTeacher} disabled={!row?.isPublished}>
          <Iconify icon={'carbon:download'} />
        </IconButton>
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
                  onDeleteRow();
                }}
                disabled={row?.isPublished}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  onEditRow();
                }}
                disabled={row?.isPublished}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onChangeStatus(row?.isPublished, row?.id);
                  handleCloseMenu();
                }}
                sx={{ color: row?.isPublished === true ? 'error.main' : 'success.main' }}
              >
                <Iconify icon={row?.isPublished === true ? 'ant-design:stop-outlined' : 'eva:checkmark-circle-fill'} />
                {row?.isPublished === true ? 'UnPublished' : 'Published'}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
