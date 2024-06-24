import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

CheckoutProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutProductList({ products, onDelete, onIncreaseQuantity, onDecreaseQuantity }) {
  console.log('products :>> ', products);
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products &&
            products.length > 0 &&
            products?.map((product) => {
              const { _id, name, size, price, color, cover, quantity, available, images } = product;

              if (product?._id) {
                console.log('product :>> ', product);
                return (
                  <TableRow key={_id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                          alt="product image"
                          src={images[0]}
                          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
                        />
                        <Box>
                          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                            {name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align="left">{fCurrency(price)}</TableCell>

                    <TableCell align="left">
                      <Incrementer
                        quantity={quantity}
                        available={available}
                        onDecrease={() => onDecreaseQuantity(_id)}
                        onIncrease={() => onIncreaseQuantity(_id)}
                      />
                    </TableCell>

                    <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => onDelete(_id)}>
                        <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
              return null;
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>
        {quantity}
        <IconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Iconify icon={'eva:plus-fill'} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  );
}
