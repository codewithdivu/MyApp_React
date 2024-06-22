import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { getValueFromKey } from '../../../../utils/mapper';
import { CLASSES, QUESTIONS } from '../../../../constants/attributes';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

QuesitonRowTable.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function QuesitonRowTable({ row, selected, onEditRow, onSelectRow, onDeleteRow, onChangeStatus }) {
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

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {row?.series ? getValueFromKey(row?.series, CLASSES?.find((item) => item.value === row?.class)?.series) : ''}
        </Typography>
      </TableCell>

      <TableCell align="left">{row?.class ? getValueFromKey(row?.class, CLASSES) : ''}</TableCell>
      <TableCell align="left">
        {row?.chapter
          ? getValueFromKey(
              row?.chapter,
              CLASSES?.find((item) => item.value === row?.class)?.series?.find((item) => item.value === row?.series)
                ?.chapters
            )
          : ''}
      </TableCell>
      <TableCell align="left">{QUESTIONS.filter((item) => item.name === row?.question_type)[0].label}</TableCell>
      <TableCell align="left">
        {
          QUESTIONS.filter((item) => item.name === row?.question_type)[0].category.filter(
            (it) => it.name === row?.category
          )[0].label
        }
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row?.isPublished === false && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {row?.isPublished ? 'Published' : 'UnPublished'}
        </Label>
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
                  navigate(PATH_DASHBOARD.generatePaper.questionBank.editQuestion(row?.id));
                }}
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
