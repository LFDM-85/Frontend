import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { ManagementPage } from '../../pages/ManagementPage/ManagementPage';
import AssessmentsPage from '../../pages/AssessmentsPage/AssessmentsPage';
import ClassesPage from '../../pages/ClassesPage/ClassesPage';

export const MyLayout = (): ReactElement => {
  const authCtx = useAuth();

  return (
    <>
      <Typography ml={6} variant="h4" component="h4">
        Welcome back {authCtx.user?.name}
      </Typography>
      {!authCtx.user.roles.includes('admin') && <ClassesPage />}
      {authCtx.user.roles.includes('admin') && <ManagementPage />}
      {/* {authCtx.user.roles.includes('student') && <AssessmentsPage />} */}
    </>
  );
};
