// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// utils
import { capitalCase } from 'change-case';
// hooks
import useSettings from '../../../hooks/useSettings';
// constants
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
// sections
import AccountProfile from '../../../sections/@dashboard/user/AccountProfile';

export default function UserAccount() {
  const { themeStretch } = useSettings();

  return (
    <Page title="User: Account">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.app },
            { name: 'Account', href: PATH_DASHBOARD.general.account },
          ]}
        />

        <Box sx={{ mb: 5 }} />

        <AccountProfile />
      </Container>
    </Page>
  );
}
