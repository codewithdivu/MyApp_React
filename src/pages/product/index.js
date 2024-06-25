// react && redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Box,
  Container,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material'; // Import components from Material-UI
// hooks
import useSettings from '../../hooks/useSettings';
// constants
import { PATH_DASHBOARD } from '../../routes/paths';
// componenet
import { fetchCart, getProducts } from '../../redux/slices/product';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonProductItem } from '../../components/skeleton';
import Page from '../../components/Page';
// sections
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { ShopProductCard } from '../../sections/@dashboard/e-commerce/shop';

const ProductList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { products: allProducts, isLoading } = useSelector((state) => state.product);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState(''); // State for sorting option
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [inStockOnly, setInStockOnly] = useState(false); // State for in stock filter

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchCart());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...allProducts];

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== '') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    if (sortOption === 'name_asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name_desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'rating_asc') {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === 'rating_desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [allProducts, searchQuery, sortOption, categoryFilter, inStockOnly]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleInStockChange = (event) => {
    setInStockOnly(event.target.checked);
  };

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
          <TextField label="Search by name" variant="outlined" value={searchQuery} onChange={handleSearchChange} />
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSortChange} label="Sort By">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="name_asc">Name (A to Z)</MenuItem>
              <MenuItem value="name_desc">Name (Z to A)</MenuItem>
              <MenuItem value="rating_asc">Rating (Low to High)</MenuItem>
              <MenuItem value="rating_desc">Rating (High to Low)</MenuItem>
              <MenuItem value="price_asc">Price (Low to High)</MenuItem>
              <MenuItem value="price_desc">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} onChange={handleCategoryChange} label="Category">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Sportswear">Sportswear</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={inStockOnly} onChange={handleInStockChange} color="primary" />}
            label="In Stock Only"
          />
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            marginTop: '2rem',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {isLoading ? (
            <SkeletonProductItem />
          ) : (
            filteredProducts.map((product) => <ShopProductCard key={product.id} product={product} />)
          )}
        </Box>
        <CartWidget />
      </Container>
    </Page>
  );
};

export default ProductList;
