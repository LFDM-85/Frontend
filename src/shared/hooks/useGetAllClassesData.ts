import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { IClass } from '../interfaces/interfaces';

const useGetAllClassesData = () => {
  const [data, setData] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const { data: response } = await axios.get('class/all');
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getUsersData();
  }, []);
  return {
    data,
    loading,
  };
};
export default useGetAllClassesData;
