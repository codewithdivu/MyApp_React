// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ResponsiveVideoTutorial from '../../../sections/@dashboard/support/ResponsiveVideoTutorial';
// sections

// ----------------------------------------------------------------------

export default function VideoTutorial() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Support : Video Tutorial">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Video Tutorial'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Support', href: PATH_DASHBOARD.support.root },
            { name: 'Video Tutorial', href: PATH_DASHBOARD.generatePaper.videoTutorial },
          ]}
        />
        <ResponsiveVideoTutorial src="/videos/drop.mp4" type="video/mp4" />
      </Container>
    </Page>
  );
}
