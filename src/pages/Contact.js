// @mui
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Checkbox, Grid, FormControlLabel, Container } from '@mui/material';

// components
import Page from '../components/Page';
import AboutHero from '../sections/about/AboutHero';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Contact() {
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isNotRobot, setIsNotRobot] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      subject,
      name,
      email,
      message,
      isNotRobot,
    });
  };

  return (
    <Page title="Contact us">
      <RootStyle>
        {/* <ContactHero /> */}
        <AboutHero />

        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              {/* <ContactForm /> */}
              <h1>Contact Us</h1>
              <img src="/images/contact.gif" alt="contact" />
            </Grid>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Subject"
                  margin="normal"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Enter your message here..."
                  margin="normal"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox checked={isNotRobot} onChange={(e) => setIsNotRobot(e.target.checked)} />}
                  label="I'm not a robot"
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
