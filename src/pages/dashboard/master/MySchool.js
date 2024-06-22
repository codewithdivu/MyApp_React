// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useFirebaseData from '../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../constants/collections';
import { FIREBASE_OPERATORS } from '../../../constants/operators';
import useAuth from '../../../hooks/useAuth';
import AddSchoolForm from '../../../sections/@dashboard/master/school/AddSchoolForm';
// sections

const MySchool = () => {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  const { data: currentSchool, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.schools, [
    {
      property: 'id',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: user?.schoolId,
    },
  ]);

  return (
    <Page title="Master : My School">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="My School"
          links={[
            { name: 'Master', href: PATH_DASHBOARD.master.root },
            { name: 'My School', href: PATH_DASHBOARD.master.mySchool },
          ]}
        />
        <AddSchoolForm
          isEdit
          currentSchool={{ ...currentSchool?.at(0), id: user?.schoolId }}
          isLoading={isFetching}
          role={user?.designation || ''}
        />
      </Container>
    </Page>
  );
};

export default MySchool;
