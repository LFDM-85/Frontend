import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hero: {
    position: 'relative',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: ' white',
    fontFamily: 'Pacifico',
  },
});

function HeroSection() {
  const classesStyles = useStyles();
  return (
    <>
      <Grid container component="main" className={classesStyles.hero}>
        <Grid item>
          <Typography
            className={classesStyles.title}
            ml={6}
            variant="h1"
            component="h1"
            fontFamily="Pacifico"
          >
            E-le@rn School
          </Typography>
          <Typography
            className={classesStyles.title}
            mt={10}
            variant="h3"
            component="h3"
          >
            Best elearning tool for teachers and students
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HeroSection;
