import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import HeroImage from '../../assets/Work.png';

export const LandingPage = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/sign');
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xl={5}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography ml={6} variant="h2" component="h2">
            E-le@rn School
          </Typography>
          <Typography mt={10} variant="h4" component="h4">
            Best elearning tool for teachers and students
          </Typography>
        </Grid>
        <Grid margin={6}>
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
        container
        direction="column"
        justifyContent="center"
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
