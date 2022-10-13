import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { IClass } from '../interfaces/interfaces';

const useGetAllClassesData = () => {
  const [classData, setClassData] = useState<IClass[]>([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const { data: response } = await axios.get('class/all');
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
