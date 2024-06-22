import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation, Outlet } from 'react-router-dom';
// layouts
import { USER_ROLES } from '../constants/keywords';
import useAuth from '../hooks/useAuth';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_DASHBOARD } from './paths';
import UserAccount from '../pages/dashboard/user/UserAccount';

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
  const { user } = useAuth();

  const LANDING_ROUTE = PATH_AFTER_LOGIN;
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            // <GuestGuard>
            <Login />
            // </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            // <GuestGuard>
            <Register />
            // </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
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
          element: <UserAccount />,
        },
        // {
        //   path: 'master',
        //   children: [
        //     { element: <Navigate to="logins" replace />, index: true },
        //     {
        //       path: 'logins',
        //       element: (
        //         // <RoleBasedGuard accessibleRoles={[USER_ROLES.ADMIN]}>
        //         <Outlet />
        //         // </RoleBasedGuard>
        //       ),
        //       children: [
        //         { element: <LoginList />, index: true },
        //         { path: ':id/edit', element: <EditUser /> },
        //         { path: ':id/view', element: <ViewUser /> },
        //       ],
        //     },
        //     // {
        //     //   path: 'employeeList',
        //     //   element: (
        //     //     <RoleBasedGuard accessibleRoles={[USER_ROLES.HOD]}>
        //     //       <EmployeeAllocationList />
        //     //     </RoleBasedGuard>
        //     //   ),
        //     // },
        //     // {
        //     //   path: 'books',
        //     //   element: (
        //     //     <RoleBasedGuard accessibleRoles={[USER_ROLES.HOD]}>
        //     //       <BookAllocation />
        //     //     </RoleBasedGuard>
        //     //   ),
        //     // },

        //     // {
        //     //   path: 'questionAttributes',
        //     //   element: (
        //     //     <RoleBasedGuard accessibleRoles={[USER_ROLES.ADMIN]}>
        //     //       <QuestionAttributes />
        //     //     </RoleBasedGuard>
        //     //   ),
        //     // },
        //     // {
        //     //   path: 'schools',
        //     //   element: (
        //     //     <RoleBasedGuard accessibleRoles={[USER_ROLES.ADMIN]}>
        //     //       <Outlet />
        //     //     </RoleBasedGuard>
        //     //   ),
        //     //   children: [
        //     //     { element: <SchoolList />, index: true },
        //     //     { path: 'addSchool', element: <AddSchool /> },
        //     //     { path: 'addSchool/:id/edit', element: <AddSchool /> },
        //     //     { path: 'addSchool/:id/view', element: <AddSchool /> },
        //     //     { path: 'viewEditSchool', element: <SchoolList /> },
        //     //   ],
        //     // },
        //     // {
        //     //   path: 'mySchool',
        //     //   element: (
        //     //     <RoleBasedGuard accessibleRoles={[USER_ROLES.HOD]}>
        //     //       <MySchool />
        //     //     </RoleBasedGuard>
        //     //   ),
        //     // },
        //   ],
        // },
        // {
        //   path: 'generatePaper',
        //   children: [
        //     { element: <Navigate to="questionBank/viewEditQuestion" replace />, index: true },
        //     {
        //       path: 'questionBank',
        //       children: [
        //         { element: <Navigate to="viewEditQuestion" replace />, index: true },
        //         {
        //           path: 'addQuestion',
        //           element: (
        //             <RoleBasedGuard
        //               accessibleRoles={[USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT]}
        //             >
        //               <AddQuestion />
        //             </RoleBasedGuard>
        //           ),
        //         },
        //         {
        //           path: 'addQuestion/:id/edit',
        //           element: (
        //             <RoleBasedGuard
        //               accessibleRoles={[USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT]}
        //             >
        //               <AddQuestion />
        //             </RoleBasedGuard>
        //           ),
        //         },
        //         {
        //           path: 'viewEditQuestion',
        //           element: (
        //             <RoleBasedGuard
        //               accessibleRoles={[USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT]}
        //             >
        //               <ViewEditQuestion />
        //             </RoleBasedGuard>
        //           ),
        //         },
        //         {
        //           path: 'uploadQuestion',
        //           element: (
        //             <RoleBasedGuard
        //               accessibleRoles={[USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT]}
        //             >
        //               <UploadQuestion />
        //             </RoleBasedGuard>
        //           ),
        //         },
        //       ],
        //     },
        //     {
        //       path: 'createPaper',
        //       element: (
        //         <RoleBasedGuard accessibleRoles={[USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT]}>
        //           <CreatePaper />
        //         </RoleBasedGuard>
        //       ),
        //     },
        //     {
        //       path: 'createPaper/:id/edit',
        //       element: (
        //         <RoleBasedGuard accessibleRoles={[USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT]}>
        //           <CreatePaper />
        //         </RoleBasedGuard>
        //       ),
        //     },
        //     {
        //       path: 'viewEditPaper',
        //       element: (
        //         <RoleBasedGuard accessibleRoles={[USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT]}>
        //           <ViewEditPaper />
        //         </RoleBasedGuard>
        //       ),
        //     },
        //   ],
        // },
        // {
        //   path: 'support',
        //   children: [
        //     { element: <Navigate to="/support/userGuide" replace />, index: true },
        //     { path: 'userGuide', element: <UserGuide /> },
        //     { path: 'videoTutorial', element: <VideoTutorial /> },
        //     { path: 'submitFeedback', element: <SubmitFeedback /> },
        //     { path: 'answerKeys', element: <AnswerKeys /> },
        //     { path: 'about', element: <AboutQPG /> },
        //   ],
        // },
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

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));

// MASTER
const LoginList = Loadable(lazy(() => import('../pages/dashboard/master/logins')));
const EmployeeAllocationList = Loadable(lazy(() => import('../pages/dashboard/master/logins/EmployeeAllocationList')));

const EditUser = Loadable(lazy(() => import('../pages/dashboard/master/logins/UserProfile')));
const ViewUser = Loadable(lazy(() => import('../pages/dashboard/master/logins/UserProfile')));
const QuestionAttributes = Loadable(lazy(() => import('../pages/dashboard/master/QuestionAttributes')));
const SchoolLogo = Loadable(lazy(() => import('../pages/dashboard/master/SchoolLogo')));
const BookAllocation = Loadable(lazy(() => import('../pages/dashboard/master/BookAllocation')));
const SchoolList = Loadable(lazy(() => import('../pages/dashboard/master/school/schoolList')));
const AddSchool = Loadable(lazy(() => import('../pages/dashboard/master/school/addSchool')));
const MySchool = Loadable(lazy(() => import('../pages/dashboard/master/MySchool')));

// GENERATE PAPER
const AddQuestion = Loadable(lazy(() => import('../pages/dashboard/generatePaper/questionBank/AddQuestion')));
const ViewEditQuestion = Loadable(lazy(() => import('../pages/dashboard/generatePaper/questionBank/viewEditQuestion')));
const UploadQuestion = Loadable(lazy(() => import('../pages/dashboard/generatePaper/questionBank/uploadQuestion')));

// SUPPORT
const UserGuide = Loadable(lazy(() => import('../pages/dashboard/support/UserGuide')));
const VideoTutorial = Loadable(lazy(() => import('../pages/dashboard/support/VideoTutorial')));
const SubmitFeedback = Loadable(lazy(() => import('../pages/dashboard/support/SubmitFeedback')));
const AnswerKeys = Loadable(lazy(() => import('../pages/dashboard/support/AnswerKeys')));
const AboutQPG = Loadable(lazy(() => import('../pages/dashboard/support/AboutQPG')));

const CreatePaper = Loadable(lazy(() => import('../pages/dashboard/generatePaper/createPaper')));
const ViewEditPaper = Loadable(lazy(() => import('../pages/dashboard/generatePaper/viewEditPaper')));

// OTHERS
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
