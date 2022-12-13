import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Theme } from '@mui/material';
import Everywhere from '../../../assets/learn.jpg';

const layoutSection = {
  width: '100%',
  display: 'flex',
  minHeight: '400px',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '30px 0px 50px 0px',
} as const;

const gridContainer = {
  display: 'flex',
  alignItems: 'center',
  maxWidth: '1300px',
  padding: '50px',
};

const title = {
  // color: (theme: Theme) => theme.palette.secondary.main,
  // fontFamily: 'Pacifico',
  paddingBottom: '15px',
};

const description = {
  opacity: '0.7',
  paddingBottom: '30px',
  fontSize: '18px',
};

const descriptionGrid = {
  width: '56rem',
};
const descriptionImageGrid = {
  margin: '2em',
  width: '36rem',
};

const defaultGrid = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

function AboutUs() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/sign');
  };

  return (
    <Box sx={layoutSection}>
      <Grid container spacing={6} sx={gridContainer}>
        <Grid item xs={12} md={5}>
          <img src={Everywhere} alt="Work everywhere" width="100%" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} sx={title}>
            Learn Quickly, Anywhere
          </Typography>
          <Typography sx={description}>
            We aim to show a different way of teaching and learning. You can
            study anywhere as if you were in the classroom. Study at your own
            pace and you will always have support from teachers and classmates.
            <br />
            <span> Anytime anywhere!</span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            CONTACT US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutUs;
