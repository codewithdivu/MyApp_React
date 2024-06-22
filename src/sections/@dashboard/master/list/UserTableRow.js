import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { fDate } from '../../../../utils/formatTime';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onChangeStatus }) {
  const theme = useTheme();

  const { displayName, avatarUrl, email, mobileNumber, schoolId, status, designation, createdAt, id } = row;

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
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={displayName} src={avatarUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {displayName}
        </Typography>
      </TableCell>

      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{mobileNumber}</TableCell>
      <TableCell align="left">{schoolId}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {designation}
      </TableCell>

      {/* <TableCell align="center">
        <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' }),
          }}
        />
      </TableCell> */}

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'inactive' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="left"> {createdAt ? fDate(createdAt.toDate()) : ''}</TableCell>

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
                  navigate(PATH_DASHBOARD.master.view(id));
                }}
              >
                <Iconify icon={'carbon:view'} />
                View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate(PATH_DASHBOARD.master.edit(id));
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onChangeStatus(status === 'active' ? 'inactive' : 'active', id);
                  handleCloseMenu();
                }}
                sx={{ color: status === 'active' ? 'error.main' : 'success.main' }}
              >
                <Iconify icon={status === 'active' ? 'ant-design:stop-outlined' : 'eva:checkmark-circle-fill'} />
                {status === 'active' ? 'Inactive' : 'Active'}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
