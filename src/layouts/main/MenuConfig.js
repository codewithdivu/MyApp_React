// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Products',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_DASHBOARD.general.products,
  },
  {
    title: 'Cart',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_DASHBOARD.general.checkout,
  },
  {
    title: 'Contact',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  },
  {
    title: 'About',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.about,
  },
];

export default menuConfig;
