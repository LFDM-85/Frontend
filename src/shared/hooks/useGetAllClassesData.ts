import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { IClass } from '../interfaces/interfaces';
import useAuth from './useAuth';

const useGetAllClassesData = () => {
  const [classData, setClassData] = useState<IClass[]>([]);
  const authCtx = useAuth();

  useEffect(() => {
    const config = { headers: { Authorization: 'Bearer ' + authCtx.token } };
    const getUsersData = async () => {
      try {
        const { data: response } = await axios.get('class/all', config);
        setClassData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getUsersData();
  }, []);
  return { classData };
};
export default useGetAllClassesData;
