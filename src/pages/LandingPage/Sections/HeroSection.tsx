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
    textAlign: 'center',
  },
});

function HeroSection() {
  const classesStyles = useStyles();
  return (
    <>
      <Grid container component="main" className={classesStyles.hero}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xl={5}
        >
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
            variant="h2"
            component="h2"
          >
            Best elearning tool for teachers and students
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HeroSection;
