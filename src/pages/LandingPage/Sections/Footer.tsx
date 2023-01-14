import { Container, Grid, Box, Link, Theme, Typography } from '@mui/material';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const layoutSection = {
  flexGrow: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  miHeight: '10vh',
  padding: '20px',
  flexDirection: 'column',
  backgroundColor: (theme: Theme) => theme.palette.primary.dark,
  color: (theme: Theme) => theme.palette.secondary.main,
} as const;

const defaultGrid = {
  direction: 'row',
};

function Footer() {
  return (
    <footer>
      <Box sx={layoutSection}>
        <Container maxWidth="lg">
          <Grid container sx={defaultGrid}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4">Help</Typography>
              <Box>
                <Link href="#" color="inherit">
                  Home
                </Link>
              </Box>
              <Box>
                <Link href="#about" color="inherit">
                  About us
                </Link>
              </Box>
              <Box>
                <Link href="#contact" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Suport
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4">Account</Typography>
              <Box>
                <Link href="/sign" color="inherit">
                  Sign
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4">Socials</Typography>
              <Box>
                <Link
                  href="https://www.linkedin.com/in/luisfdmelo/"
                  color="inherit"
                >
                  <FaLinkedin size={35} />
                </Link>
              </Box>
              <Box>
                <Link href="https://github.com/LFDM-85" color="inherit">
                  <FaGithub size={35} />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Grid>By Luís Melo</Grid>
      </Box>
    </footer>
  );
}

export default Footer;
