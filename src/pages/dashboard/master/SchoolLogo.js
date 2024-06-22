// @mui
import { Card, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections

// ----------------------------------------------------------------------

export default function SchoolLogo() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Master : School Logo">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="School Logo"
          links={[
            { name: 'Master', href: PATH_DASHBOARD.master.root },
            { name: 'School Logo', href: PATH_DASHBOARD.master.logins },
          ]}
        />

        <Card>School Logo</Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
