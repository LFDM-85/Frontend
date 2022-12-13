import Header from '../../shared/components/UI/Header';
import Hero from './Sections/Hero';
// import { makeStyles } from '@mui/styles';

import AboutUs from './Sections/AboutUs';
import Courses from './Sections/Courses';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';
import CssBaseline from '@mui/material/CssBaseline';

// const useStyles = makeStyles({
//   image: {
//     top: '0',
//     left: '0',
//     height: '100%',
//     width: '100%',
//     objectFit: 'cover',
//     position: 'fixed',
//   },
// });
export const LandingPage = () => {
  // const classesStyles = useStyles();

  return (
    <>
      <CssBaseline />
      <Header />
      <Hero />
      <Courses />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
};
