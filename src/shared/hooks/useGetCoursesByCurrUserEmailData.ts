import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import useAuth from './useAuth';

const useGetCoursesCurrUserEmailData = () => {
  const [courseData, setCourseData] = useState([]);
  const authCtx = useAuth();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${authCtx.token}` },
    };

    console.log('User email: ', authCtx.user.email);

    const getCoursesCurrUserEmailData = async () => {
      try {
        const { data: response } = await axios.get(
          `users/${authCtx.user.email}/courses`,
          config
        );
        setCourseData(response.courses);
      } catch (error) {
        console.error(error);
      }
    };

    getCoursesCurrUserEmailData();
  }, []);

  console.log(courseData);
  return {
    courseData,
  };
};
export default useGetCoursesCurrUserEmailData;
