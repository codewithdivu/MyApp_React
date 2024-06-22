import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------

PaperTableHeadCustom.propTypes = {
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  order: PropTypes.oneOf(['asc', 'desc']),
  sx: PropTypes.object,
};

export default function PaperTableHeadCustom({ order, orderBy, headLabel, sx }) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        <TableCell padding="checkbox">No.</TableCell>

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
