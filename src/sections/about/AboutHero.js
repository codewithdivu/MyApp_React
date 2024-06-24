// @mui
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(https://as2.ftcdn.net/v2/jpg/06/89/80/39/1000_F_689803949_zKV562QxMrzWRO3wL4VTqrgwPZw6XNw9.jpg), url(https://as2.ftcdn.net/v2/jpg/06/89/80/39/1000_F_689803949_zKV562QxMrzWRO3wL4VTqrgwPZw6XNw9.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Discover" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.black' }}>
            <TextAnimate text="our" sx={{ mr: 2 }} />
            <TextAnimate text="story" />
          </Box>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.black',
                fontWeight: 'fontWeightMedium',
              }}
            >
              Crafting exceptional shopping experiences
              <br /> for every customer
            </Typography>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
