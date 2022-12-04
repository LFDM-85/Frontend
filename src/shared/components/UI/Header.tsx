import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { Theme } from '@mui/material';

function ElevationScroll(props: any) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const toolbarMargin = {
  marginBottom: '3em',
} as const;

const tabContainer = {
  marginLeft: 'auto',
  color: (theme: Theme) => theme.palette.secondary.main,
} as const;

const tab = {
  textTransform: 'none',
  fontWeight: '700',
  fontSize: '1rem',
  minWidth: 10,
  marginLeft: '25px',
  color: (theme: Theme) => theme.palette.secondary.main,
} as const;

const logoStyle = {
  height: '5em',
  marginLeft: '60px',
  paddingTop: '5px',
  paddingBottom: '10px',
} as const;

const button = {
  height: '45px',
  textTransform: 'none',
  borderRadius: '50px',
  margin: '15px',
  fontSize: '1rem ',
} as const;

function Header(props: any) {
  const [value, setValue] = useState(0);

  const handleChange = (e: any, value: number) => {
    setValue(value);
  };

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === '/features' && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === '/about' && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === '/contact' && value !== 3) {
      setValue(3);
    }
  }, [value]);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              onClick={() => setValue(0)}
              disableRipple
            >
              <img src={logo} alt="company logo" style={logoStyle} />
            </Button>
            <Tabs value={value} onChange={handleChange} sx={tabContainer}>
              <Tab sx={tab} component={Link} to="/" label="Home" />
              <Tab sx={tab} component={Link} to="/features" label="Features" />
              <Tab sx={tab} component={Link} to="/about" label="About Us" />
              <Tab sx={tab} component={Link} to="/contact" label="Contact Us" />
            </Tabs>
            <Button variant="contained" color="secondary" sx={button}>
              Sign In
            </Button>
            <Button variant="contained" color="secondary" sx={button}>
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div style={toolbarMargin} />
    </>
  );
}

export default Header;
