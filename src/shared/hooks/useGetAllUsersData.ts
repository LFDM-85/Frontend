import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { IUser } from '../interfaces/interfaces';

const useGetAllUsersData = () => {
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const { data: response } = await axios.get('auth/all');
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getUsersData();
  }, []);
  return {
    data,
  };
};
export default useGetAllUsersData;
