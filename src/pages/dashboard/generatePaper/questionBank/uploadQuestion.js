import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import UploadQuestionForm from '../../../../sections/@dashboard/generatePaper/uploadQuestions/UploadQuestionForm';

export default function UploadQuestion() {
  // Hooks
  const { themeStretch } = useSettings();

  return (
    <Page title="Generate Paper : Question Bank - Upload Questions">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Upload Questions'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Generate Paper', href: PATH_DASHBOARD.generatePaper.root },
            {
              name: 'Upload Questions',
              href: PATH_DASHBOARD.generatePaper.questionBank.uploadQuestion,
            },
          ]}
        />
        <UploadQuestionForm />
      </Container>
    </Page>
  );
}
