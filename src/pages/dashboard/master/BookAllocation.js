// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

import BookAllocationForm from '../../../sections/@dashboard/master/books/BookAllocationForm';

const BookAllocation = () => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Master : Book Allocation">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Book Allocation"
          links={[
            { name: 'Master', href: PATH_DASHBOARD.master.root },
            { name: 'Book Allocation', href: PATH_DASHBOARD.master.books },
          ]}
        />
        <BookAllocationForm />
      </Container>
    </Page>
  );
};

export default BookAllocation;
