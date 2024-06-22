import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { AddQuestionForm } from '../../../../sections/@dashboard/generatePaper';
import useFirebaseData from '../../../../hooks/useFirebaseData';
import { FIREBASE_COLLECTIONS } from '../../../../constants/collections';
import { FIREBASE_OPERATORS } from '../../../../constants/operators';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id = '' } = useParams();

  const { data: currentQuestion, isFetching } = useFirebaseData(FIREBASE_COLLECTIONS.questions, [
    {
      property: 'id',
      operator: FIREBASE_OPERATORS.EQUAL_TO,
      value: id,
    },
  ]);

  const isEdit = pathname.includes('edit');

  return (
    <Page title="Generate Paper : Question Bank - Create a new question">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isEdit ? 'Edit a Question' : 'Create a new question'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Generate Paper', href: PATH_DASHBOARD.generatePaper.root },
            {
              name: isEdit ? 'Edit a Question' : 'Create a new question',
              href: isEdit
                ? PATH_DASHBOARD.generatePaper.questionBank.editQuestion(id)
                : PATH_DASHBOARD.generatePaper.questionBank.addQuestion,
            },
          ]}
        />

        <AddQuestionForm isEdit={isEdit} currentQuestion={{ ...currentQuestion?.at(0), id }} isLoading={isFetching} />
      </Container>
    </Page>
  );
}
