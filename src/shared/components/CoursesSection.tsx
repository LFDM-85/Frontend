import { Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import CourseItem from './CourseItem';
import { ICourse } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetCoursesCurrUserEmailData from '../hooks/useGetCoursesByCurrUserEmailData';
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
  const { courseData } = useGetCoursesCurrUserEmailData();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const classesStyles = useStyles();

  const getAllClasses = () => {
    setCourses(courseData);
  };

  const getCourseList = courses ? (
    courses.map((course: ICourse) => {
      return (
        <div key={course._id}>
          <CourseItem name={course.nameCourse} />
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
