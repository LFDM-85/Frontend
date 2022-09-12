import useAuth from '../../hooks/useAuth';
import CheckIcon from '@mui/icons-material/Check';
export const ProfessorItem = () => {
  const authCtx = useAuth();

  return (
    <>
      <div>{authCtx.user.name}      
        <CheckIcon />
      </div>
    </>
  );
};

