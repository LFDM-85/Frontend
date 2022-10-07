import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
// import { IUser } from '../interfaces/interfaces';
import useAuth from './useAuth';

const useGetAssessmentsUserIdData = () => {
  const [data, setData] = useState([]);
  const authCtx = useAuth();

  useEffect(() => {
    const getAssessmentsUserIdData = async () => {
      try {
        const { data: response } = await axios.get(
          `auth/${authCtx.user._id}/assessments`
        );
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getAssessmentsUserIdData();
  }, []);
  return {
    data,
  };
};
export default useGetAssessmentsUserIdData;
