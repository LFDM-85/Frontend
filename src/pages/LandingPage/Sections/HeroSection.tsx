import { Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material';

const layoutSection = {
  position: 'relative',
  height: '100vh',
  justifyContent: 'center',
} as const;

const title = {
  color: (theme: Theme) => theme.palette.secondary.main,
  fontFamily: 'Pacifico',
  textAlign: 'center',
};
const subtitle = {
  color: (theme: Theme) => theme.palette.secondary.main,
  fontFamily: 'Pacifico',
  // textAlign: 'center',
};

const defaultGrid = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // xl: '5',
};

function HeroSection() {
  return (
    <>
      <Grid container component="main" sx={layoutSection}>
        <Grid container sx={defaultGrid}>
          <Typography sx={title} variant="h1" component="h1">
            E-le@rn School
          </Typography>
          <Grid container sx={defaultGrid}>
            <Grid item sx={defaultGrid}>
              <Typography sx={subtitle} variant="h2" component="h2">
                Best elearning tool for teachers and students
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HeroSection;
