import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Stack } from '@mui/material';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
import { CheckoutCart } from '../../sections/@dashboard/e-commerce/checkout';

const ProductCheckOut = () => {
  const { themeStretch } = useSettings();

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
