import { useEffect, useState } from 'react';
import axios from 'axios';
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:8888/api/v1/product');
      console.log('res :>> ', res?.data?.data);
      setProducts(res?.data?.data);
    };

    fetchProducts();
  }, []);

  // const { checkout } = useSelector((state) => state.product);

  // const { cart, total, discount, subtotal } = checkout;

  // const totalItems = sum(cart.map((item) => item.quantity));
  const totalItems = products?.length || 99;

  const isEmptyCart = products.length === 0;

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Card
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({50} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={products}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <Button color="inherit" component={RouterLink} to={''} startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={77}
          discount={5}
          subtotal={23}
          // total={total}
          // discount={discount}
          // subtotal={subtotal}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={products.length === 0}
          onClick={handleNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
