import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
//
import { dispatch } from '../store';
import axiosInstance from '../../utils/axios';
import { apiRoutes } from '../../constants/apiRoutes';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
    //
    setLoader(state, action) {
      state.isLoading = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;
      console.log('action.payload :>> ', action.payload);

      const subtotal = sum(cart.map((cartItem) => cartItem.price * cartItem.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = state.checkout.cart.map((_product) => {
          const isExisted = _product._id === product._id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], '_id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((item) => item._id !== action.payload);

      const subtotal = sum(updateCart.map((cartItem) => cartItem.price * cartItem.quantity));
      const discount = updateCart.length === 0 ? 0 : state.checkout.discount;
      const shipping = updateCart.length === 0 ? 0 : state.checkout.shipping;
      const billing = updateCart.length === 0 ? null : state.checkout.billing;

      state.checkout.updateCart = updateCart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      const subtotal = sum(updateCart.map((cartItem) => cartItem.price * cartItem.quantity));
      const discount = updateCart.length === 0 ? 0 : state.checkout.discount;
      const shipping = updateCart.length === 0 ? 0 : state.checkout.shipping;
      const billing = updateCart.length === 0 ? null : state.checkout.billing;

      state.checkout.updateCart = updateCart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      const subtotal = sum(updateCart.map((cartItem) => cartItem.price * cartItem.quantity));
      const discount = updateCart.length === 0 ? 0 : state.checkout.discount;
      const shipping = updateCart.length === 0 ? 0 : state.checkout.shipping;
      const billing = updateCart.length === 0 ? null : state.checkout.billing;

      state.checkout.updateCart = updateCart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts,
} = slice.actions;

// get Products

export function getProducts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get(apiRoutes.PRODUCT.GET_ALL_PRODUCT);
      dispatch(slice.actions.getProductsSuccess(response?.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// get Product by id

export function getProduct(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get(apiRoutes.PRODUCT.GET_PRODUCT.replace(':id', id));

      dispatch(slice.actions.getProductSuccess(response?.data?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// add to cart

export function addProductToCart(productId, quantity = 1) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post(apiRoutes.CART.ADD_CART, {
        productId,
        quantity,
      });
      dispatch(slice.actions.addCart(response.data.data));
      dispatch(slice.actions.setLoader(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// remove cart

export function removeProductFromCart(productId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.delete(apiRoutes.CART.REMOVE_CART, {
        data: {
          productId,
        },
      });
      dispatch(slice.actions.deleteCart(productId));
      dispatch(slice.actions.setLoader(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// fetch cart

export function fetchCart() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get(apiRoutes.CART.GET_CART);
      console.log('response :>> ', response);
      dispatch(slice.actions.getCart(response.data.data.items));
      dispatch(slice.actions.setLoader(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// increment quantity

export function incrementProductQuantity(productId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post(apiRoutes.CART.CART_INCREMENT, { productId });
      dispatch(slice.actions.increaseQuantity(productId));
      dispatch(slice.actions.setLoader(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// decrement quantity

export function decrementProductQuantity(productId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post(apiRoutes.CART.CART_DECREMENT, { productId });
      dispatch(slice.actions.decreaseQuantity(productId));
      dispatch(slice.actions.setLoader(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
