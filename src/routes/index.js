import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation, Outlet } from 'react-router-dom';
// layouts
import { USER_ROLES } from '../constants/keywords';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import MainLayout from '../layouts/main';
// guards
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const LANDING_ROUTE = PATH_AFTER_LOGIN;
  return useRoutes([
    // Auth Routes

    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={[USER_ROLES.ADMIN, USER_ROLES.USER]}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={LANDING_ROUTE} replace />, index: true },
        {
          path: 'app',
          element: (
            <RoleBasedGuard accessibleRoles={[USER_ROLES.ADMIN, USER_ROLES.USER]}>
              <GeneralApp />
            </RoleBasedGuard>
          ),
        },
        {
          path: 'account',
          element: <UserProfile />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'product/:id',
          element: <Product />,
        },
        {
          path: 'checkout',
          element: <Checkout />,
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'maintenance', element: <Maintenance /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    {
      path: '/',
      element: <Outlet />,
      children: [{ element: <Navigate to={LANDING_ROUTE} replace />, index: true }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const ForgotPassword = Loadable(lazy(() => import('../pages/auth/ForgotPassword')));

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/user/UserAccount')));
const Products = Loadable(lazy(() => import('../pages/product')));
const Product = Loadable(lazy(() => import('../pages/product/ProductDetails')));
const Checkout = Loadable(lazy(() => import('../pages/product/ProductCheckout')));

// OTHERS
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
