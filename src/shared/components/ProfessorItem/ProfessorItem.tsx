import useAuth from '../../hooks/useAuth';
export const ProfessorItem = () => {
  const authCtx = useAuth();

  return (
    <div>{authCtx.user.name}</div>
  );
};

