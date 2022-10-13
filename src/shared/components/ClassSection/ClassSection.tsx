import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ClassItem } from '../ClassItem/ClassItem';
import { IClass } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetClassesCurrUserEmailData from '../../hooks/useGetClassesByCurrUserEmailData';

// ================================
// pass style to diferent file
// ================================

export const ClassSection = () => {
  // const authCtx = useAuth();
  const { classData } = useGetClassesCurrUserEmailData();

  const [classes, setClasses] = useState<IClass[]>([]);

  const getAllClasses = () => {
    setClasses(classData);
  };

  console.log(classes);

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
