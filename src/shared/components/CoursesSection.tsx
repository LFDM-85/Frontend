import { Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import ClassItem from './CourseItem';
import { ICourse } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetClassesCurrUserEmailData from '../hooks/useGetCoursesByCurrUserEmailData';
import { makeStyles } from '@mui/styles';
import React from 'react';

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
const CoursesSection = memo(() => {
  const { courseData } = useGetClassesCurrUserEmailData();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const classesStyles = useStyles();

  const getAllClasses = () => {
    setCourses(courseData);
  };

  console.log('Course Data ', courseData);

  const getCourseList = courses ? (
    courses.map((aclass: ICourse) => {
      return (
        <div key={aclass._id}>
          <ClassItem name={aclass.nameCourse} />
        </div>
      );
    })
  ) : (
    <h3>No data found</h3>
  );

  useEffect(() => {
    getAllClasses();
  }, [getCourseList]);

  return (
    <>
      <Typography component="h5" variant="h5">
        My Classes
      </Typography>
      <Box className={classesStyles.boxItem}>{getCourseList}</Box>
    </>
  );
});

CoursesSection.displayName = 'CoursesSection';

export default CoursesSection;
