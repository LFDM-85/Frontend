import emailjs from '@emailjs/browser';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { Theme } from '@mui/material';

const layoutSection = {
  position: 'relative',
  justifyContent: 'center',
  marginTop: '12em',
  // backgroundColor: (theme: Theme) => theme.palette.primary.dark,
} as const;

const title = {
  color: (theme: Theme) => theme.palette.secondary.main,
  fontFamily: 'Pacifico',
};

const defaultGrid = {
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

function Contact() {
  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_volqe5l',
        'template_aontufj',
        e.currentTarget,
        'FHfQDwFtJWcIVPW4C'
      )
      .then(
        (result) => {
          console.log(result.text);
          e.currentTarget.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <Grid container component="main" sx={layoutSection}>
        <Grid container sx={defaultGrid}>
          <Typography variant="h1" component="h1" sx={title}>
            Contact Us
          </Typography>
        </Grid>

        <Card style={{ maxWidth: 550, margin: '0 auto', padding: '20px 5px' }}>
          <CardContent>
            <form onSubmit={sendEmail}>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    label="Full Name"
                    placeholder="Enter your name"
                    fullWidth
                    autoComplete="none"
                    name="user_name"
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Email"
                    fullWidth
                    autoComplete="none"
                    name="user_email"
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Message"
                    fullWidth
                    multiline
                    rows={5}
                    autoComplete="none"
                    name="message"
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    type="submit"
                    value="Send"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Contact;
