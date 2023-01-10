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
  flexGrow: 1,
  padding: '10px',
  maxWidth: '700px',
  margin: '30px auto',
} as const;

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
    <section id="contact">
      <Grid container component="main" sx={layoutSection}>
        <Card style={{ maxWidth: 550, margin: '0 auto', padding: '20px 5px' }}>
          <CardContent>
            <form onSubmit={sendEmail}>
              <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                <Typography variant="h3" component="h3">
                  Contact Us
                </Typography>
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
                    color="primary"
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
    </section>
  );
}

export default Contact;
