import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Stack } from '@mui/material';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { ShopProductCard, ShopProductSearch, ShopProductSort } from '../../sections/@dashboard/e-commerce/shop';
import { FormProvider } from '../../components/hook-form';
import { SkeletonProductItem } from '../../components/skeleton';
import { getProducts } from '../../redux/slices/product';

const ProductList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const product = {
    name: 'Sample Product',
    cover: 'https://via.placeholder.com/150', // Placeholder image URL
    price: 99.99,
    colors: ['Red', 'Blue', 'Green'],
    status: 'in stock', // Other possible values: "out of stock", "pre-order"
    priceSale: 79.99,
  };

  return (
    <Page title="Products: Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Shop" links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }]} />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ShopProductSort />
          </Stack>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {isLoading ? <SkeletonProductItem /> : products?.map((product) => <ShopProductCard product={product} />)}
        </Box>
        <CartWidget />
      </Container>
    </Page>
  );
};

export default ProductList;
