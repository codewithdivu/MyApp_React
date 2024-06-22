// routes
import { USER_ROLES } from '../../../constants/keywords';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components

import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  master: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
        roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
      },
      // {
      //   title: 'master',
      //   path: PATH_DASHBOARD.master.root,
      //   icon: ICONS.master,
      //   roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
      //   children: [
      //     {
      //       title: 'manage employee logins',
      //       path: PATH_DASHBOARD.master.logins,
      //       roles: [USER_ROLES.USER],
      //     },
      //     {
      //       title: 'employee book allocation',
      //       path: PATH_DASHBOARD.master.books,
      //       roles: [USER_ROLES.USER],
      //     },
      //     {
      //       title: 'employee book allocation List',
      //       path: PATH_DASHBOARD.master.employeeList,
      //       roles: [USER_ROLES.USER],
      //     },
      //     {
      //       title: 'question attributes',
      //       path: PATH_DASHBOARD.master.questionAttributes,
      //       roles: [USER_ROLES.USER],
      //     },
      //     {
      //       title: 'My School',
      //       path: PATH_DASHBOARD.master.mySchool,
      //       roles: [USER_ROLES.HOD],
      //     },
      //     {
      //       title: 'schools',
      //       path: PATH_DASHBOARD.master.schools.root,
      //       roles: [USER_ROLES.ADMIN],
      //       children: [
      //         {
      //           title: 'school list',
      //           path: PATH_DASHBOARD.master.schools.viewEditSchool,
      //           roles: [USER_ROLES.ADMIN],
      //         },
      //         {
      //           title: 'add school',
      //           path: PATH_DASHBOARD.master.schools.addSchool,
      //           roles: [USER_ROLES.ADMIN],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   title: 'Generate Paper',
      //   path: PATH_DASHBOARD.generatePaper.root,
      //   icon: ICONS.invoice,
      //   roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //   children: [
      //     {
      //       title: 'question bank',
      //       path: PATH_DASHBOARD.generatePaper.questionBank.root,
      //       roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //       children: [
      //         {
      //           title: 'add questions',
      //           path: PATH_DASHBOARD.generatePaper.questionBank.addQuestion,
      //           roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //         },
      //         {
      //           title: 'view/edit questions',
      //           path: PATH_DASHBOARD.generatePaper.questionBank.viewEditQuestion,
      //           roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //         },
      //         {
      //           title: 'upload excel questions',
      //           path: PATH_DASHBOARD.generatePaper.questionBank.uploadQuestion,
      //           roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //         },
      //       ],
      //     },
      //     {
      //       title: 'create paper',
      //       path: PATH_DASHBOARD.generatePaper.createPaper,
      //       roles: [USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //     },
      //     {
      //       title: 'view/edit paper',
      //       path: PATH_DASHBOARD.generatePaper.viewEditPaper,
      //       roles: [USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //     },
      //   ],
      // },
      // {
      //   title: 'Support',
      //   path: PATH_DASHBOARD.support.root,
      //   icon: ICONS.mail,
      //   roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //   children: [
      //     {
      //       title: 'user guide',
      //       path: PATH_DASHBOARD.support.userGuide,
      //       roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //     },
      //     {
      //       title: 'video tutorial',
      //       path: PATH_DASHBOARD.support.videoTutorial,
      //       roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //     },
      //     {
      //       title: 'submit feedback',
      //       path: PATH_DASHBOARD.support.submitFeedback,
      //       roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //     },
      //     // {
      //     //   title: 'answer keys',
      //     //   path: PATH_DASHBOARD.support.answerKeys,
      //     //   roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //     // },
      //     {
      //       title: 'About QPC',
      //       path: PATH_DASHBOARD.support.about,
      //       roles: [USER_ROLES.ADMIN, USER_ROLES.HOD, USER_ROLES.PGT, USER_ROLES.TGT],
      //     },
      //   ],
      // },
    ],
    roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
  },
];

export default navConfig;
