// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    account: path(ROOTS_DASHBOARD, '/account'),
  },
  master: {
    root: path(ROOTS_DASHBOARD, '/master'),
    logins: path(ROOTS_DASHBOARD, '/master/logins'),
    employeeList: path(ROOTS_DASHBOARD, '/master/employeeList'),
    edit: (id) => path(ROOTS_DASHBOARD, `/master/logins/${id}/edit`),
    view: (id) => path(ROOTS_DASHBOARD, `/master/logins/${id}/view`),
    books: path(ROOTS_DASHBOARD, '/master/books'),
    questionAttributes: path(ROOTS_DASHBOARD, '/master/questionAttributes'),
    schoolLogo: path(ROOTS_DASHBOARD, '/master/schoolLogo'),
    schools: {
      root: path(ROOTS_DASHBOARD, '/master/schools'),
      addSchool: path(ROOTS_DASHBOARD, '/master/schools/addSchool'),
      editSchool: (id) => path(ROOTS_DASHBOARD, `/master/schools/addSchool/${id}/edit`),
      viewSchool: (id) => path(ROOTS_DASHBOARD, `/master/schools/addSchool/${id}/view`),
      viewEditSchool: path(ROOTS_DASHBOARD, '/master/schools/viewEditSchool'),
    },
    mySchool: path(ROOTS_DASHBOARD, '/master/mySchool'),
  },
  generatePaper: {
    root: path(ROOTS_DASHBOARD, '/generatePaper'),
    questionBank: {
      root: path(ROOTS_DASHBOARD, '/generatePaper/questionBank'),
      addQuestion: path(ROOTS_DASHBOARD, '/generatePaper/questionBank/addQuestion'),
      editQuestion: (id) => path(ROOTS_DASHBOARD, `/generatePaper/questionBank/addQuestion/${id}/edit`),
      viewEditQuestion: path(ROOTS_DASHBOARD, '/generatePaper/questionBank/viewEditQuestion'),
      uploadQuestion: path(ROOTS_DASHBOARD, '/generatePaper/questionBank/uploadQuestion'),
    },
    createPaper: path(ROOTS_DASHBOARD, '/generatePaper/createPaper'),
    editPaper: (id) => path(ROOTS_DASHBOARD, `/generatePaper/createPaper/${id}/edit`),
    viewEditPaper: path(ROOTS_DASHBOARD, '/generatePaper/viewEditPaper'),
  },
  support: {
    root: path(ROOTS_DASHBOARD, '/support'),
    userGuide: path(ROOTS_DASHBOARD, '/support/userGuide'),
    videoTutorial: path(ROOTS_DASHBOARD, '/support/videoTutorial'),
    submitFeedback: path(ROOTS_DASHBOARD, '/support/submitFeedback'),
    answerKeys: path(ROOTS_DASHBOARD, '/support/answerKeys'),
    about: path(ROOTS_DASHBOARD, '/support/about'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';

export const GENERAL_ROUTES = [
  PATH_DASHBOARD.root,
  PATH_DASHBOARD.support.root,
  PATH_DASHBOARD.support.userGuide,
  PATH_DASHBOARD.support.videoTutorial,
  PATH_DASHBOARD.support.submitFeedback,
  PATH_DASHBOARD.support.about,
];

export const ALL_APP_ROUTES = [
  ...GENERAL_ROUTES,
  PATH_DASHBOARD.general.app,
  PATH_DASHBOARD.master.root,
  PATH_DASHBOARD.master.logins,
  PATH_DASHBOARD.master.edit,
  PATH_DASHBOARD.master.view,
  PATH_DASHBOARD.master.books,
  PATH_DASHBOARD.master.questionAttributes,
  PATH_DASHBOARD.master.schoolLogo,
  PATH_DASHBOARD.master.schools.root,
  PATH_DASHBOARD.master.schools.addSchool,
  PATH_DASHBOARD.master.schools.editSchool,
  PATH_DASHBOARD.master.schools.viewSchool,
  PATH_DASHBOARD.master.schools.viewEditSchool,
  PATH_DASHBOARD.generatePaper.root,
  PATH_DASHBOARD.generatePaper.createPaper,
  PATH_DASHBOARD.generatePaper.editPaper,
  PATH_DASHBOARD.generatePaper.viewEditPaper,
  PATH_DASHBOARD.generatePaper.questionBank.root,
  PATH_DASHBOARD.generatePaper.questionBank.addQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.editQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.uploadQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.viewEditQuestion,
  PATH_DASHBOARD.support.answerKeys,
];

export const SUPER_ADMIN_ROUTES = [
  ...GENERAL_ROUTES,
  PATH_DASHBOARD.general.app,
  PATH_DASHBOARD.master.root,
  PATH_DASHBOARD.master.logins,
  PATH_DASHBOARD.master.edit,
  PATH_DASHBOARD.master.view,
  PATH_DASHBOARD.master.questionAttributes,
  PATH_DASHBOARD.master.schools.root,
  PATH_DASHBOARD.master.schools.addSchool,
  PATH_DASHBOARD.master.schools.editSchool,
  PATH_DASHBOARD.master.schools.viewSchool,
  PATH_DASHBOARD.master.schools.viewEditSchool,
  PATH_DASHBOARD.generatePaper.root,
  PATH_DASHBOARD.generatePaper.questionBank.root,
  PATH_DASHBOARD.generatePaper.questionBank.addQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.editQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.viewEditQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.uploadQuestion,
  PATH_DASHBOARD.support.answerKeys,
];

export const HOD_ROUTES = [
  ...GENERAL_ROUTES,
  PATH_DASHBOARD.general.app,
  PATH_DASHBOARD.master.root,
  PATH_DASHBOARD.master.employeeList,
  PATH_DASHBOARD.master.books,
  PATH_DASHBOARD.master.schoolLogo,
  PATH_DASHBOARD.generatePaper.root,
  PATH_DASHBOARD.generatePaper.createPaper,
  PATH_DASHBOARD.generatePaper.editPaper,
  PATH_DASHBOARD.generatePaper.viewEditPaper,
  PATH_DASHBOARD.generatePaper.questionBank.root,
  PATH_DASHBOARD.generatePaper.questionBank.addQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.editQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.uploadQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.viewEditQuestion,
  PATH_DASHBOARD.support.answerKeys,
];

export const TEACHER_ROUTES = [
  ...GENERAL_ROUTES,
  PATH_DASHBOARD.generatePaper.root,
  PATH_DASHBOARD.generatePaper.createPaper,
  PATH_DASHBOARD.generatePaper.editPaper,
  PATH_DASHBOARD.generatePaper.viewEditPaper,
  PATH_DASHBOARD.generatePaper.questionBank.root,
  PATH_DASHBOARD.generatePaper.questionBank.addQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.editQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.uploadQuestion,
  PATH_DASHBOARD.generatePaper.questionBank.viewEditQuestion,
  PATH_DASHBOARD.support.answerKeys,
];
