export const apiRoutes = {
  // auth
  AUTH: {
    REGISTRATION: '/auth/register',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // user
  USER: {
    GET_ALL_USER: '/user',
    GET_USER: '/user/:id',
    UPDATE_PROFILE: '/user/:id/updateProfile',
    UPLOAD_PROFILE_PIC: '/user/profilePic',
  },

  // product

  PRODUCT: {
    GET_ALL_PRODUCT: '/product',
    CREATE_PRODUCT: '/product/create',
    GET_PRODUCT: '/product/:id',
    UPDATE_PRODUCT: '/product/:id',
    DELETE_PRODUCT: '/product/:id',
  },

  // cart

  CART: {
    GET_CART: '/cart',
    ADD_CART: '/cart',
    REMOVE_CART: '/cart',
    CART_INCREMENT: '/cart/increment',
    CART_DECREMENT: '/cart/decrement',
    CART_EMPTY: '/cart/empty',
  },
};
