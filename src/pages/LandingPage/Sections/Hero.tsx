import { Box, Button, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import myteam from '../../../assets/hero.jpg';

const heroBox = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  minHeight: '600px',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

const title = {
  paddingBottom: '15px',
} as const;
const subtitle = {
  opacity: '0.7',
  paddingBottom: '30px',
  fontSize: '18px',
} as const;

const gridContainer = {
  display: 'flex',
  alignItems: 'center',
  maxWidth: '1300px',
  padding: '50px',
} as const;

function Hero() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/sign');
  };
  return (
    <>
      <Box sx={heroBox}>
        <Grid container spacing={6} sx={gridContainer}>
          <Grid item xs={12} md={5}>
            <Typography variant="h1" sx={title} fontWeight={700}>
              E-le@rn
            </Typography>
            <Typography sx={subtitle}>
              Best elearning tool for teachers and students
              <br />
              <span style={{ fontWeight: 'bold' }}> Anytime anywhere!</span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '200px', fontSize: '16px' }}
              onClick={clickHandler}
            >
              SIGN
            </Button>
          </Grid>
          <Grid item xs={12} md={7}>
            <img src={myteam} alt="My Team" width="100%" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Hero;
