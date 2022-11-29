import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/Work.png';

export const LandingPage = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/sign');
  };

  return (
    <Grid
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
          <Typography ml={6} variant="h1" component="h1" fontFamily="Pacifico">
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
    </Grid>
  );
};
