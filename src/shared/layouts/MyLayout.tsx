import React, {ReactElement} from 'react';
import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

export const MyLayout: React.FC = (): ReactElement => {
  const authCtx = useAuth();
  const Greating = `Welcome back ${authCtx.user?.name}`;

  return <Typography ml={6} variant="h4" component="h4">
    {Greating}
  </Typography>;
};
