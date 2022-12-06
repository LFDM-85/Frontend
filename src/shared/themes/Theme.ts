import { createTheme } from '@mui/material';

const elearnBlack = '#212529';
const elearnWhite = '#e0dbd1';

export const Theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.54)',
      disabled: 'rgba(0,0,0,0.38)',
    },
    primary: {
      main: `${elearnBlack}`,
      dark: 'rgba(23,25,28,0.70)',
      light: 'rgb(77,80,83)',
      contrastText: '#fff',
    },
    secondary: {
      main: `${elearnWhite}`,
      light: 'rgb(230,226,218)',
      dark: 'rgb(156,153,146)',
      contrastText: 'rgba(0,0,0,0.87)',
    },
  },
});
