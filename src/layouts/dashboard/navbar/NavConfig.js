import { USER_ROLES } from '../../../constants/keywords';
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';

import SvgIconStyle from '../../../components/SvgIconStyle';

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
  {
    subheader: '',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
        roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
      },
      {
        title: 'Products',
        path: PATH_DASHBOARD.general.products,
        icon: ICONS.ecommerce,
        roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
      },
      {
        title: 'Cart',
        path: PATH_DASHBOARD.general.checkout,
        icon: ICONS.cart,
        roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
      },
      {
        title: 'Support',
        path: PATH_PAGE.about,
        icon: ICONS.master,
        roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
        children: [
          {
            title: 'About Us',
            path: PATH_PAGE.about,
            roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
          },
          {
            title: 'Contact Us',
            path: PATH_PAGE.contact,
            roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
          },
          {
            title: 'Faqs',
            path: PATH_PAGE.faqs,
            roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
          },
        ],
      },
    ],
    roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
  },
];

export default navConfig;
