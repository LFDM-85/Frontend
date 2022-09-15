import React, {ReactElement} from 'react';
// import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { ManagementPage } from '../../pages/ManagementPage/ManagementPage';

export const MyLayout = (): ReactElement => {
  const authCtx = useAuth();  

  return (
    <>
      {/* <Typography ml={6} variant="h4" component="h4">
        Welcome back {authCtx.user?.name}
      </Typography> */}
      {authCtx.user.roles.includes('admin') && <ManagementPage/>}
    </>
  );
 
};
