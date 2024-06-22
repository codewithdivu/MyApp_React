// @mui
import { Container, Grid, Card } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import AnswerKeyTable from '../../../sections/@dashboard/support/AnswerKeyTable';
// sections

// ----------------------------------------------------------------------

export default function AnswerKeys() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Support : Answer Keys">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Answer Keys'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Support', href: PATH_DASHBOARD.support.root },
            { name: 'Answer Keys', href: PATH_DASHBOARD.generatePaper.answerKeys },
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <AnswerKeyTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
