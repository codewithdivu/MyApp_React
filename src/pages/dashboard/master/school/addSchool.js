import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import AddSchoolForm from '../../../../sections/@dashboard/master/school/AddSchoolForm';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';
import useAuth from '../../../../hooks/useAuth';

export default function SchoolCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const { user } = useAuth();

  const { data: currentSchool, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.schools, [
    {
      property: 'id',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: id,
    },
  ]);
  const isEdit = pathname.includes('edit');
  const isView = pathname.includes('view');

  return (
    <Page title="School :  Create a new school">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {!isView && (
          <HeaderBreadcrumbs
            heading={isEdit ? 'Edit a School' : 'Add a new School'}
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Schools', href: PATH_DASHBOARD.master.schools.root },
              {
                name: isEdit ? 'Edit a School' : 'Add a new School',
                href: isEdit ? PATH_DASHBOARD.master.schools.editSchool(id) : PATH_DASHBOARD.master.schools.addSchool,
              },
            ]}
          />
        )}

        {isView && (
          <HeaderBreadcrumbs
            heading={'View a School'}
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Schools', href: PATH_DASHBOARD.master.schools.root },
              {
                name: 'View a School',
                href: PATH_DASHBOARD.master.schools.viewSchool(id),
              },
            ]}
          />
        )}

        <AddSchoolForm
          isEdit={isEdit}
          isView={isView}
          currentSchool={{ ...currentSchool?.at(0), id }}
          isLoading={isFetching}
          role={user?.designation || ''}
        />
      </Container>
    </Page>
  );
}
