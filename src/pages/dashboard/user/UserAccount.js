import { capitalCase } from 'change-case';
import { Container, Tab, Box, Tabs } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';
import useTabs from '../../../hooks/useTabs';
import AccountProfile from '../../../sections/@dashboard/user/AccountProfile';

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('general');

  return (
    <Page title="User: Account Settings">
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
