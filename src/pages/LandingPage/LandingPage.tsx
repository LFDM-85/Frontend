import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../../assets/Work.png';
import Header from '../../shared/components/UI/Header';
import HeroSection from './Sections/HeroSection';
import { makeStyles } from '@mui/styles';

import heroImage from '../../assets/black-gdd6257e2a_1920.jpg';
import AboutUs from './Sections/AboutUs';

const useStyles = makeStyles({
  image: {
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    position: 'fixed',
  },
});
export const LandingPage = () => {
  const navigate = useNavigate();
  const classesStyles = useStyles();

  const clickHandler = () => {
    navigate('/sign');
  };

  return (
    <>
      <img className={classesStyles.image} src={heroImage} alt="blackboard" />

      <Header />
      <HeroSection />
      <AboutUs />
      {/* <Grid
        container
        component="main"
        sx={{
          height: '85vh',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xl={5}
        >
          <Grid
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              ml={6}
              variant="h1"
              component="h1"
              fontFamily="Pacifico"
            >
              E-le@rn School
            </Typography>
            <Typography mt={10} variant="h4" component="h4">
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

        <Grid
          item
          alignItems="right"
          xl={6}
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            resize: 'both',
            backgroundPosition: 'center',
            height: '100%',
          }}
        ></Grid>
      </Grid> */}
    </>
  );
};
