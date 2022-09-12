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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { signout } from '../../features/SignServices';

export const SideBar: React.FC<any> = (props) => {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [roleUser, setRoleUser] = useState({
    isProfessor: false,
    isStudent: false,
    isAdmin: false,
  });

  const role: string = authCtx.user.role[0];

  switch (role) {
  case 'professor':
    setRoleUser({
      ...roleUser,
      isProfessor: true
    });      
    break;
  case 'admin':
    setRoleUser({
      ...roleUser,
      isAdmin: true
    });
    break;
  case 'student':
    setRoleUser({
      ...roleUser,
      isStudent: true
    });
    break;
  
  default:
    setRoleUser({ ...roleUser });
    break;
  }

  console.log(role);

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
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText secondary="Home"></ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Groups />
                </ListItemIcon>
                <ListItemText secondary="Classes"></ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText secondary="Assessments"></ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText secondary="Management"></ListItemText>
              </ListItemButton>
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
        {props.children}
      </Box>
    </>
  );
};
