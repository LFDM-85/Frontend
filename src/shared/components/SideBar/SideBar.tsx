import { Groups, Home } from '@mui/icons-material';
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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { signout } from '../../features/SignServices';

type IProps = {
  children: React.ReactNode;
};

export const SideBar = ({ children }: IProps) => {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [isAdmin, setIsAdmin] = useState(false);

  const role: string = authCtx.user.roles[0];

  useEffect(() => {
    if (role === 'admin') setIsAdmin(true);
    else setIsAdmin(false);
  }, []);

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
          height="100%"
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
              {!isAdmin && (
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText secondary="Home"></ListItemText>
                </ListItemButton>
              )}
              {!isAdmin && (
                <ListItemButton>
                  <ListItemIcon>
                    <Groups />
                  </ListItemIcon>
                  <ListItemText secondary="Classes"></ListItemText>
                </ListItemButton>
              )}
              {!isAdmin && (
                <ListItemButton>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText secondary="Assessments"></ListItemText>
                </ListItemButton>
              )}
              {isAdmin && (
                <ListItemButton>
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
