import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import UserViewEditForm from '../../../../sections/@dashboard/master/UserViewEditForm';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';
import Loader from '../../../../components/Loader';
// sections

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const { data: currentUser, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.users, [
    {
      property: 'id',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: id,
    },
  ]);

  const isEdit = pathname.includes('edit');
  const isView = pathname.includes('view');

  return (
    <Page title={`Master : ${!isEdit ? 'View' : 'Edit'} user`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'View user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.master.logins },
            { name: !isEdit ? 'View user' : capitalCase(id) },
          ]}
        />

        {isFetching ? (
          <Loader />
        ) : (
          <UserViewEditForm isEdit={isEdit} isView={isView} currentUser={{ ...currentUser?.at(0), id }} />
        )}
      </Container>
    </Page>
  );
}
