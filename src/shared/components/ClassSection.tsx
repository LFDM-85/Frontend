import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ClassItem } from './ClassItem';
import { IClass } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetClassesCurrUserEmailData from '../hooks/useGetClassesByCurrUserEmailData';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  boxItem: {
    mb: 2,
    height: '80vh',
    overflow: 'hidden',
    overflowY: 'scroll',
    padding: '15px',
    margin: '15px',
  },
});
export const ClassSection = () => {
  const { classData } = useGetClassesCurrUserEmailData();
  const [classes, setClasses] = useState<IClass[]>([]);
  const classesStyles = useStyles();

  const getAllClasses = () => {
    setClasses(classData);
  };

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
    <>
      <Typography component="h5" variant="h5">
        My Classes
      </Typography>
      <Box className={classesStyles.boxItem}>{getClassList}</Box>
    </>
  );
};
