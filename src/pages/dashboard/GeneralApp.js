// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import useFirebaseData from '../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../constants/collections';
import { FIREBASE_OPERATORS } from '../../constants/operators';
import { USER_ROLES } from '../../constants/keywords';

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  // const { data: tableData } = useFirebaseData(FIREBASE_COLLECTIONS.users, [
  //   {
  //     property: 'status',
  //     operator: FIREBASE_OPERATORS.EQUAL_TO,
  //     value: 'active',
  //   },
  // ]);

  // const { data: schools } = useFirebaseData(FIREBASE_COLLECTIONS.schools, [
  //   {
  //     property: 'isActive',
  //     operator: FIREBASE_OPERATORS.EQUAL_TO,
  //     value: true,
  //   },
  // ]);

  // const { data: papers } = useFirebaseData(FIREBASE_COLLECTIONS.papers, [
  //   {
  //     property: 'isPublished',
  //     operator: FIREBASE_OPERATORS.EQUAL_TO,
  //     value: true,
  //   },
  // ]);

  // const { data: questions } = useFirebaseData(FIREBASE_COLLECTIONS.questions, [
  //   {
  //     property: 'isPublished',
  //     operator: FIREBASE_OPERATORS.EQUAL_TO,
  //     value: true,
  //   },
  // ]);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome displayName={user?.username} />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid> */}
          {/* {[USER_ROLES.ADMIN].includes(user?.designation) && (
            <>
              <Grid item xs={12} md={4}>
                <AppWidgetSummary
                  title="Total Active Users"
                  percent={2.6}
                  total={tableData?.length || 0}
                  chartColor={theme.palette.primary.main}
                  chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AppWidgetSummary
                  title="Total Published Questions"
                  percent={2.6}
                  total={questions?.length || 0}
                  chartColor={theme.palette.primary.main}
                  chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AppWidgetSummary
                  title="Total Active Schools"
                  percent={0.2}
                  total={schools?.length || 0}
                  chartColor={theme.palette.chart.blue[0]}
                  chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Papers"
              percent={-0.1}
              total={papers?.length || 0}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
