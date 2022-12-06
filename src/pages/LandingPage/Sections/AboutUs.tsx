import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Theme } from '@mui/material';
import HeroImage from '../../../assets/annie-spratt-dWYU3i-mqEo-unsplash.jpg';
// import video from '../../../assets/videoBg.mp4';

const layoutSection = {
  position: 'relative',
  height: '85vh',
  justifyContent: 'center',
  marginTop: '8em',
} as const;

const title = {
  color: (theme: Theme) => theme.palette.secondary.main,
  fontFamily: 'Pacifico',
};

const description = {
  color: (theme: Theme) => theme.palette.secondary.main,
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
    <>
      <Grid container component="main" sx={layoutSection}>
        <Grid container sx={defaultGrid}>
          <Typography variant="h1" component="h1" sx={title}>
            About Us
          </Typography>
          <Grid container sx={defaultGrid}>
            <Grid item sx={descriptionGrid}>
              <Typography sx={description} variant="h5" component="h5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
                illum aperiam, dolorum rerum et fuga doloremque earum a expedita
                tenetur, alias, aliquid deserunt perferendis eligendi
                dignissimos deleniti consequatur exercitationem ad. Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Quidem suscipit
                deleniti velit, quo blanditiis culpa autem repudiandae adipisci
                nulla cum ipsam error saepe voluptate amet veritatis harum
                libero facilis? Quam! Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Odit cum repellendus quasi! Exercitationem
                excepturi rem numquam, mollitia facilis eveniet quisquam aliquam
                dolor voluptatem officiis unde. Consequatur voluptatibus nulla
                unde minima?
              </Typography>
            </Grid>
            <Grid item sx={descriptionImageGrid} alignItems="right">
              <img src={HeroImage} alt="work" width="100%" />
              {/* <video src={video} width="100%" autoPlay loop muted></video> */}
            </Grid>
          </Grid>
          {/* <Grid item>
            <Button
              onClick={clickHandler}
              size="large"
              variant="contained"
              color="secondary"
            >
              Start Now
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
}

export default AboutUs;
