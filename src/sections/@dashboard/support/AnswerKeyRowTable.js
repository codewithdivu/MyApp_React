import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, MenuItem } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';

// ----------------------------------------------------------------------

PaperRowTable.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
};

export default function PaperRowTable({ row, selected }) {
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell>{row?.id}</TableCell>
      <TableCell>{row?.name}</TableCell>
      <TableCell>
        <a
          style={{
            textDecoration: 'none',
          }}
          href={row?.answerKeyLink}
        >
          <Iconify icon={'carbon:download'} /> Download
        </a>
      </TableCell>

      {/* <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'carbon:delete'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell> */}
    </TableRow>
  );
}
