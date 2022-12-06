import Header from '../../shared/components/UI/Header';
import HeroSection from './Sections/HeroSection';
import { makeStyles } from '@mui/styles';

import heroImage from '../../assets/black-gdd6257e2a_1920.jpg';
import AboutUs from './Sections/AboutUs';
import Courses from './Sections/Courses';
import Contact from './Sections/Contact';

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
  const classesStyles = useStyles();

  return (
    <>
      <img className={classesStyles.image} src={heroImage} alt="blackboard" />

      <Header />
      <HeroSection />
      <AboutUs />
      <Courses />
      <Contact />
    </>
  );
};
