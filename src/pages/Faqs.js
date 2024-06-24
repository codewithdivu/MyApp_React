// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
// components
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

const questions = {
  'Q. How do I place an order?':
    'To place an order, browse through our products, select the items you wish to purchase, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete your order.',
  'Q. What payment methods do you accept?':
    'We accept various payment methods including credit cards, debit cards, PayPal, and other secure payment gateways. You can choose your preferred payment method at checkout.',
  'Q. How can I track my order?':
    'Once your order is shipped, you will receive an email with the tracking number and a link to track your order. You can also track your order status through your account on our website.',
  'Q. What is your return policy?':
    'Our return policy allows you to return most items within 30 days of purchase. Items must be in their original condition and packaging. Please visit our Return Policy page for more details and to initiate a return.',
  'Q. How do I create an account?':
    'Creating an account is simple. Click on the "Sign Up" button on the top right corner of the homepage, fill in the required details, and click "Submit". You will receive a confirmation email to verify your account.',
  'Q. Can I change or cancel my order?':
    'You can change or cancel your order within a few hours of placing it. Please contact our customer support team as soon as possible to make any changes or cancellations.',
  'Q. What should I do if I receive a damaged item?':
    'If you receive a damaged item, please contact our customer support team immediately. Provide them with your order number and photos of the damaged item, and they will assist you with a replacement or refund.',
  'Q. How do I apply a discount code?':
    'To apply a discount code, enter the code in the "Promo Code" field during checkout and click "Apply". The discount will be applied to your order total.',
  'Q. What shipping options are available?':
    'We offer several shipping options including standard, expedited, and overnight shipping. You can select your preferred shipping method at checkout. Shipping costs and delivery times vary based on your location and the selected shipping method.',
  'Q. How can I contact customer support?':
    'You can contact our customer support team via email, phone, or live chat. Visit our Contact Us page for more details and to reach out to our support team for any assistance you need.',
};

export default function Faqs() {
  return (
    <Page title="Faqs">
      <RootStyle>
        <Container sx={{ mt: 15, mb: 10, position: 'relative' }}>
          {/* <FaqsCategory /> */}

          <Typography variant="h3" sx={{ mb: 5 }}>
            Frequently asked questions
          </Typography>

          <Grid container spacing={10}>
            <Grid item xs={12} md={12}>
              <Box sx={{ mb: 5 }} id="faqs" bgcolor={'primary'}>
                <Box sx={{ mt: 2 }}>
                  {Object.keys(questions).map((q, i) => (
                    <Accordion key={i} elevation={0} sx={{ bgcolor: 'inherit', color: 'light' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography fontWeight="bold" color={'dark'}>
                          {q}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography color={'dark'}>{questions[q]}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
