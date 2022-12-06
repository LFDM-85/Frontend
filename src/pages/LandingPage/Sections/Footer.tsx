import { Container, Grid, Box, Link, Theme } from '@mui/material';

const layoutSection = {
  position: 'relative',
  direction: 'row',
  justifyContent: 'center',
  height: '10em',
  marginTop: '12em',
  padding: '3em',
  backgroundColor: (theme: Theme) => theme.palette.primary.dark,
  color: (theme: Theme) => theme.palette.secondary.main,
} as const;

const defaultGrid = {
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

function Footer() {
  return (
    <footer>
      <Box sx={layoutSection}>
        <Container maxWidth="lg">
          <Grid container sx={defaultGrid}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit">
                  Home
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  About us
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
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
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/" color="inherit">
                  Sign in
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Sign up
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Socials</Box>
              <Box>
                <Link href="/" color="inherit">
                  Linkedin
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Instagram
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
