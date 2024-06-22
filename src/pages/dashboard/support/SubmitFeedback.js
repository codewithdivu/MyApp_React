// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import FeedbackForm from '../../../sections/@dashboard/support/FeedbackForm';

// ----------------------------------------------------------------------

export default function SubmitFeedback() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Support : Submit Feedback">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Submit Feedback'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Support', href: PATH_DASHBOARD.support.root },
            { name: 'Submit Feedback', href: PATH_DASHBOARD.generatePaper.submitFeedback },
          ]}
        />
        <FeedbackForm />
      </Container>
    </Page>
  );
}
