import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import useAuth from './useAuth';

const useGetClassesCurrUserEmailData = () => {
  const [classData, setClassData] = useState([]);
  const authCtx = useAuth();

  useEffect(() => {
    const getClassesCurrUserEmailData = async () => {
      try {
        const { data: response } = await axios.get(
          `auth/${authCtx.user.email}/classes`
        );
        setClassData(response.classes);
      } catch (error) {
        console.error(error);
      }
    };

    getClassesCurrUserEmailData();
  }, []);
  return {
    classData,
  };
};
export default useGetClassesCurrUserEmailData;
