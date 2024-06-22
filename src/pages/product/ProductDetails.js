import { useTheme } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Grid,
  alpha,
  IconButton,
  Box,
  Typography,
  Stack,
  Rating,
  Divider,
  Button,
} from '@mui/material';
import styled from '@emotion/styled';
import { useParams } from 'react-router';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
import { SkeletonProduct } from '../../components/skeleton';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import Label from '../../components/Label';
import { fCurrency } from '../../utils/formatNumber';
import { ProductDetailsCarousel } from '../../sections/@dashboard/e-commerce/product-details';

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

const ProductDetails = () => {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log('product :>> ', product);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:8888/api/v1/product/${id}`);
        setProduct(res?.data?.data);
        console.log('res :>> ', res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <Page title="Products: Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Details"
          links={[
            { name: 'Products', href: PATH_DASHBOARD.general.app },
            { name: `${id}`, href: PATH_DASHBOARD.general.app },
          ]}
        />
        {isLoading && product.length <= 0 ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {product && product?.images?.length > 0 && <ProductDetailsCarousel product={product} />}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <RootStyle>
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      //   color={inventoryType === 'in_stock' ? 'success' : 'error'}
                      sx={{ textTransform: 'uppercase' }}
                    >
                      NEW
                    </Label>
                    <Typography
                      variant="overline"
                      sx={{
                        mt: 2,
                        mb: 1,
                        display: 'block',
                        color: product?.status === 'sale' ? 'error.main' : 'info.main',
                      }}
                    >
                      IN STOCK
                    </Typography>
                    <Typography variant="h5" paragraph>
                      {product?.name}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Rating value={4} precision={0.1} readOnly />
                    </Stack>

                    <Typography variant="h4" sx={{ mb: 3 }}>
                      &nbsp;{fCurrency(product?.price)}
                    </Typography>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 3, mt: 4 }}>
                      <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                        Quantity
                      </Typography>

                      <div>
                        <Incrementer
                          name="quantity"
                          quantity={25}
                          available={77}
                          //   onIncrementQuantity={() => setValue('quantity', values.quantity + 1)}
                          //   onDecrementQuantity={() => setValue('quantity', values.quantity - 1)}
                        />
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}
                        >
                          Available: {77}
                        </Typography>
                      </div>
                    </Stack>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                      <Button
                        fullWidth
                        // disabled={isMaxQuantity}
                        size="large"
                        color="warning"
                        variant="contained"
                        startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
                        // onClick={handleAddCart}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Add to Cart
                      </Button>

                      <Button fullWidth size="large" type="submit" variant="contained">
                        Buy Now
                      </Button>
                    </Stack>
                  </RootStyle>
                </Grid>
              </Grid>
            </Card>
            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <IconWrapperStyle>
                      <Iconify icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* {!product && <SkeletonProduct />} */}
        <CartWidget />
      </Container>
    </Page>
  );
};

export default ProductDetails;

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
