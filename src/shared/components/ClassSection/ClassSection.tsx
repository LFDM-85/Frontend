import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ClassItem } from '../ClassItem/ClassItem';
import { IClass } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetClassesCurrUserEmailData from '../../hooks/useGetClassesByCurrUserEmailData';
import useAuth from '../../hooks/useAuth';
import axios from '../../../interceptors/axios';

// ================================
// pass style to diferent file
// ================================

export const ClassSection = () => {
  // const authCtx = useAuth();
  const { classData } = useGetClassesCurrUserEmailData();
  const [classes, setClasses] = useState<IClass[]>([]);

  // const currUserEmail = authCtx.user.email;

  // const getAllCurrUserClasses = () => {
  //   axios.get(`auth/${currUserEmail}`).then((res) => {
  //     console.log('USER ====>>', res.data.classes);
  //   });
  // };

  const getAllClasses = () => {
    setClasses(classData);
  };

  // console.log(classes);

  const getClassList = classes ? (
    classes.map((aclass: IClass) => {
      return (
        <div key={aclass._id}>
          <ClassItem name={aclass.nameClass} />
        </div>
      );
    })
  ) : (
    <h3>No data found</h3>
  );

  useEffect(() => {
    getAllClasses();
    // getAllCurrUserClasses();
  }, [getClassList]);

  return (
    <div>
      <Typography component="h5" variant="h5">
        My Classes
      </Typography>
      <Box
        sx={{
          mb: 2,
          height: '80vh',
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '15px',
          margin: '15px',
        }}
      >
        {getClassList}
      </Box>
    </div>
  );
};
