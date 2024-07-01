import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { dispatch } from '../../../../redux/store';
import { addProductToCart } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, inCart }) {
  const { enqueueSnackbar } = useSnackbar();

  const { name, cover, price, inStock: status, _id } = product;

  const linkTo = PATH_DASHBOARD.general.product(product._id);

  const handleAddCart = async (id) => {
    try {
      await dispatch(addProductToCart(id));
      enqueueSnackbar('Product added Successfully.');
    } catch (error) {
      console.log('error :>> ', error);
      enqueueSnackbar(error?.msg, { variant: 'error' });
    }
  };

  // const label = status ? (inCart <= product?.quantity ? 'InStock' : 'OutofStock') : 'OutofStock';

  console.log('product?.quantity', product?.quantity);
  console.log('inCart', inCart);

  const labelFind = () => {
    if (status) {
      if (inCart < product?.quantity) {
        return 'InStock';
      }
      return 'OutofStock';
    }
    return 'OutofStock';
  };
  const labelColorFind = () => {
    if (status) {
      if (inCart < product?.quantity) {
        return 'info';
      }
      return 'error';
    }
    return 'error';
  };

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Label
          variant="filled"
          // color={labelColorFind()}
          color={status ? 'info' : 'error'}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          {status ? 'InStock' : 'OutofStock'}
          {/* {labelFind()} */}
        </Label>

        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Image alt={name} src={product?.images[0]} ratio="1/1" />
        </Link>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button
            // variant="outlined"
            onClick={() => handleAddCart(_id)}
            disabled={!product?.inStock || inCart >= product?.quantity}
          >
            Add To Cart
          </Button>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="subtitle1">₹{fCurrency(price)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
