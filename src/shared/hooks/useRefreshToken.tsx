import axios from '../../interceptors/axios';
import { IUser } from '../interfaces/interfaces';
import useAuth from './useAuth';

interface Props {
  token: undefined;
  isSignedIn: boolean;
  user: IUser;
  signin: (token: string, user: IUser) => void;
  signout: () => void;
}

const useRefreshToken = () => {
  const { setUser }: any = useAuth();

  const refresh = async () => {
    const response = await axios.put('/token/refresh', {
      withCredentials: true,
    });
    setUser((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken();
