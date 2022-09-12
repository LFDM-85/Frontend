import useAuth from '../../hooks/useAuth';
export const TeacherItem = () => {
  const authCtx = useAuth();

  return (
    <div>{authCtx.user.name}</div>
  );
};

