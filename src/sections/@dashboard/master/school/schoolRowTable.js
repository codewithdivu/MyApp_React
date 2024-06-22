import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, IconButton } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { PATH_DASHBOARD } from '../../../../routes/paths';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { useCopyToClipboard } from '../../../../hooks/useClipBoard';

// ----------------------------------------------------------------------

SchoolRowTable.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function SchoolRowTable({ row, selected, onChangeStatus }) {
  const theme = useTheme();
  const { copy } = useCopyToClipboard();
  const [openMenu, setOpenMenuActions] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onCopyCode = async (code) => {
    try {
      const res = await copy(code);
      if (!res) {
        return enqueueSnackbar('Copy Failed', { variant: 'warning' });
      }
      enqueueSnackbar('Text Copied');
    } catch (error) {
      enqueueSnackbar('Copy Failed', { variant: 'warning' });
    }
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row?.name} src={row?.schoolLogo} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {row?.name}
        </Typography>
      </TableCell>

      <TableCell align="left">{row?.email}</TableCell>
      <TableCell align="left">
        {row?.code}
        <IconButton onClick={() => onCopyCode(row.code)}>
          <Iconify icon="solar:copy-linear" />
        </IconButton>
      </TableCell>
      <TableCell align="left">{row?.phoneNumber}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row?.isActive === false && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {row?.isActive ? 'Active' : 'Inactive'}
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
                  navigate(PATH_DASHBOARD.master.schools.viewSchool(row?.id));
                }}
              >
                <Iconify icon={'carbon:view'} />
                View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate(PATH_DASHBOARD.master.schools.editSchool(row?.id));
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onChangeStatus(row?.isActive, row?.id);
                  handleCloseMenu();
                }}
                sx={{ color: row?.isActive ? 'error.main' : 'success.main' }}
              >
                <Iconify icon={row?.isActive ? 'ant-design:stop-outlined' : 'eva:checkmark-circle-fill'} />
                {row?.isActive ? 'Inactive' : 'Active'}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (row.phoneNumber && row.code)
                    window.open(
                      `https://web.whatsapp.com/send?phone=+91${
                        row?.phoneNumber
                      }&text=${`Hello, ${row?.name}, Welcome to TPC. Your secret code is *${row.code}*. - TPC Team`}&app_absent=0`
                    );
                  handleCloseMenu();
                }}
                sx={{ color: 'success.main' }}
              >
                <Iconify icon={'ic:baseline-whatsapp'} /> Share
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
