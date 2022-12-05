import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../../../assets/Work.png';

const useStyles = makeStyles({
  hero: {
    position: 'relative',
    height: '100vh',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    color: ' white',
    fontFamily: 'Pacifico',
  },
});

function AboutUs() {
  const classesStyles = useStyles();
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/sign');
  };

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
            About Us
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xl={5}
          >
            <Typography
              className={classesStyles.title}
              mt={10}
              variant="h3"
              component="h3"
            >
              Best elearning tool for teachers and students
            </Typography>
          </Grid>
          <Grid item margin={6}>
            <Button
              onClick={clickHandler}
              size="large"
              variant="contained"
              color="secondary"
            >
              Start Now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AboutUs;
