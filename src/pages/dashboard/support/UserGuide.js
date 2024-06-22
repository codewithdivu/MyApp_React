// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ResponsivePDFViewer from '../../../sections/@dashboard/support/ResponsivePDFViewer';

// ----------------------------------------------------------------------

export default function UserGuide() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Support : User Guide">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'User Guide'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Support', href: PATH_DASHBOARD.support.root },
            { name: 'User Guide', href: PATH_DASHBOARD.generatePaper.userGuide },
          ]}
        />
        <ResponsivePDFViewer pdfUrl="/pdf/java.pdf" />
      </Container>
    </Page>
  );
}
