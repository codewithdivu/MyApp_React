import { useParams, useLocation } from 'react-router-dom';
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
import CreatePaperForm from '../../../sections/@dashboard/generatePaper/createPaper/createPaperForm';
import { FIREBASE_OPERATORS } from '../../../constants/operators';
import { FIREBASE_COLLECTIONS } from '../../../constants/collections';
import useFirebaseData from '../../../hooks/useFirebaseData';
import Loader from '../../../components/Loader';

// ----------------------------------------------------------------------

export default function CreatePaper() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id = '' } = useParams();

  const { data: currentPaper, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.papers, [
    {
      property: 'id',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: id,
    },
  ]);

  const isEdit = pathname.includes('edit');

  return (
    <Page title={isEdit ? 'Generate Paper : Edit Paper' : 'Generate Paper : Create Paper'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isEdit ? 'Edit Paper' : 'Create Paper'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Generate Paper', href: PATH_DASHBOARD.generatePaper.root },
            { name: isEdit ? 'Edit Paper' : 'Create Paper', href: PATH_DASHBOARD.generatePaper.root },
          ]}
        />
        {isFetching ? (
          <Loader />
        ) : (
          <CreatePaperForm isEdit={isEdit} currentPaper={{ ...currentPaper?.at(0), id }} isLoading={isFetching} />
        )}
      </Container>
    </Page>
  );
}
