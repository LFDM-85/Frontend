import { Groups, Home, LocalLibrary, Work } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { signout } from '../features/SignServices';
import React from 'react';

type IProps = {
  children: React.ReactNode;
};

const SideBar = ({ children }: IProps) => {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const path = location.pathname;

  const signOutHandler = async () => {
    await signout();
    authCtx.isSignedIn = false;
    navigate('/', { replace: true });
  };
  return (
    <>
      <Drawer open={true} variant={smDown ? 'temporary' : 'permanent'}>
        <Box
          width={theme.spacing(28)}
          height="85vh"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop={theme.spacing(3)}
            marginBottom={theme.spacing(-3)}
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
            />
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5" component="h5">
              {authCtx.user.name}
            </Typography>
          </Box>

          <Divider />
          <Box flex={1}>
            <List component="nav">
              {/*{!authCtx.user.roles.includes('admin') && (*/}
              {/*  <ListItemButton*/}
              {/*    component={Link}*/}
              {/*    to={'/my'}*/}
              {/*    selected={'/my' === path}*/}
              {/*  >*/}
              {/*    <ListItemIcon>*/}
              {/*      <Home />*/}
              {/*    </ListItemIcon>*/}
              {/*    <ListItemText secondary="Home"></ListItemText>*/}
              {/*  </ListItemButton>*/}
              {/*)}*/}
              {!authCtx.user.roles.includes('admin') && (
                <ListItemButton
                  component={Link}
                  to={'/my/classes'}
                  selected={'/my/classes' === path}
                >
                  <ListItemIcon>
                    <Groups />
                  </ListItemIcon>
                  <ListItemText secondary="Classes"></ListItemText>
                </ListItemButton>
              )}
              {!authCtx.user.roles.includes('admin') && (
                <ListItemButton
                  component={Link}
                  to={'/my/lecture'}
                  selected={'/my/lecture' === path}
                >
                  <ListItemIcon>
                    <LocalLibrary />
                  </ListItemIcon>
                  <ListItemText secondary="Lectures"></ListItemText>
                </ListItemButton>
              )}
              {!authCtx.user.roles.includes('admin') && (
                <ListItemButton
                  component={Link}
                  to={'/my/work'}
                  selected={'/my/work' === path}
                >
                  <ListItemIcon>
                    <Work />
                  </ListItemIcon>
                  <ListItemText secondary="Works"></ListItemText>
                </ListItemButton>
              )}
              {authCtx.user.roles.includes('student') && (
                <ListItemButton
                  component={Link}
                  to={'/my/assessment'}
                  selected={'/my/assessment' === path}
                >
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText secondary="Assessments"></ListItemText>
                </ListItemButton>
              )}
              {authCtx.user.roles.includes('admin') && (
                <ListItemButton
                  component={Link}
                  to={'/my/management'}
                  selected={'/my/management' === path}
                >
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText secondary="Management"></ListItemText>
                </ListItemButton>
              )}
              <ListItemButton onClick={signOutHandler}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText secondary="Log out"></ListItemText>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
export default React.memo(SideBar);
