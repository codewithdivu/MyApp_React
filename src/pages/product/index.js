// react && redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Box, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// constants
import { PATH_DASHBOARD } from '../../routes/paths';
// componenet
import { fetchCart, getProducts } from '../../redux/slices/product';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
import { SkeletonProductItem } from '../../components/skeleton';
import Page from '../../components/Page';
// sections
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { ShopProductCard, ShopProductSearch, ShopProductSort } from '../../sections/@dashboard/e-commerce/shop';

const ProductList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchCart());
    };

    fetchData();
  }, [dispatch]);

  return (
    <Page title="Products: Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Shop"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.app },
            { name: 'Products', href: PATH_DASHBOARD.general.products },
          ]}
        />

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
