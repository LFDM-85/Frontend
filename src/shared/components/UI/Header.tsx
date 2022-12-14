import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Theme } from '@mui/material';
import { Menu } from '@mui/icons-material';

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

const toolBar = {
  height: '10vh',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
  backgroundColor: 'white',
} as const;

const logoStyle = {
  height: '1.5em',
  marginLeft: '60px',
  fontWeight: 'bold',
  color: 'black',
} as const;

const button = {
  height: '3em',
  width: '7em',
  textTransform: 'none',
  borderRadius: '7%',
  margin: '1em',
  fontSize: '1em ',
} as const;

const linkStyle = {
  color: '#000',
  margin: '1em',
  textDecoration: 'none',
};

function Header() {
  const [state, setState] = useState({ right: false });
  const navigate = useNavigate();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const links = [
    { id: 1, route: 'Home', url: '#' },
    { id: 3, route: 'About', url: '#about' },
    { id: 2, route: 'Courses', url: '#courses' },
    { id: 4, route: 'Contact', url: '#contact' },
  ];

  const clickHandler = () => {
    navigate('/sign');
  };

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: any) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map((link) => (
          <ListItem button key={link.id}>
            <ListItemText sx={linkStyle} primary={link.route} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        sx={button}
        onClick={clickHandler}
      >
        Sign
      </Button>
    </Box>
  );

  return (
    <>
      <Box sx={{ marginBotton: '70px' }}>
        <ElevationScroll>
          <AppBar>
            <Toolbar sx={toolBar} disableGutters>
              <Link to="/">
                <Typography variant="h5" sx={logoStyle}>
                  Ele@ning
                </Typography>
              </Link>
              {matches ? (
                <Box>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="menu"
                    onClick={toggleDrawer('right', true)}
                  >
                    <Menu />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                  >
                    {list('right')}
                  </Drawer>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: '0.1',
                  }}
                >
                  {links.map((link) => (
                    <a
                      // to={link.url}
                      // target="_blank"
                      key={link.id}
                      style={{ textDecoration: 'none' }}
                      href={link.url}
                    >
                      <Typography component="h5" variant="h5" sx={linkStyle}>
                        {link.route}
                      </Typography>
                    </a>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={button}
                    onClick={clickHandler}
                  >
                    Sign
                  </Button>
                </Box>
              )}
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        {/* <div style={toolbarMargin} /> */}
      </Box>
    </>
  );
}

export default Header;
