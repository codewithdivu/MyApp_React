// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ResponsiveVideo from '../../../sections/@dashboard/support/ResponsiveVideo';
// sections

// ----------------------------------------------------------------------

export default function AboutQPG() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Support : About">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'About'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Support', href: PATH_DASHBOARD.support.root },
            { name: 'About', href: PATH_DASHBOARD.generatePaper.about },
          ]}
        />
        <ResponsiveVideo src="/videos/drop.mp4" type="video/mp4" />
      </Container>
    </Page>
  );
}
