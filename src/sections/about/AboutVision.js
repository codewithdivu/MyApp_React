// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import { m } from 'framer-motion';
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container component={MotionViewport} sx={{ mt: 10 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Our Vision: Providing the Best Products and Exceptional Customer Service
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                mt: 3,
                textAlign: 'center',
                color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
              }}
            >
              At E-commerceShop, our goal is to deliver top-notch products and superior customer service. We believe in
              exceeding expectations and ensuring customer satisfaction through every interaction.
            </Typography>
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
