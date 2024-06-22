import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Container, Stack } from '@mui/material';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
import { CheckoutCart } from '../../sections/@dashboard/e-commerce/checkout';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { getCart } from '../../redux/slices/product';

const STEPS = ['Cart', 'Billing & address', 'Payment'];

const ProductCheckOut = () => {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);
  const { cart, billing, activeStep } = checkout;
  const isComplete = activeStep === STEPS.length;
  console.log('activeStep :>> ', activeStep);

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  return (
    <Page title="Products: Checkout">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Checkout" links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }]} />
        <CheckoutCart />
      </Container>
    </Page>
  );
};

export default ProductCheckOut;
