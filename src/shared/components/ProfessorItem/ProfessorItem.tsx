import { Icon } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import CheckIcon from '@mui/icons-material/Check';
export const ProfessorItem = () => {
  const authCtx = useAuth();

  return (
    <>
      <div>{authCtx.user.name}</div>
      <CheckIcon />
    </>
  );
};

