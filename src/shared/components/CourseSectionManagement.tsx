import { Button, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { ICourse } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetAllCoursesData from '../hooks/useGetAllCoursesData';
import { NewCourseModal } from './Modals/NewCourseModal';
import { Add } from '@mui/icons-material';
import EditCourseItem from './EditCourseItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  boxItem: {
    mb: 2,
    height: '80vh',

    padding: '15px',
    margin: '15px',
  },
  buttonItem: {
    margin: 15,
  },
});

const CourseSectionManagement = memo(() => {
  const { courseData } = useGetAllCoursesData();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const classesStyles = useStyles();

  const getCoursesList = () => {
    setCourses(courseData);
  };

  const addHandler = () => {
    setOpen(true);
  };

  const getTheCourse = courses ? (
    courses.map((course: ICourse) => {
      return (
        <div key={course._id}>
          <EditCourseItem name={course.nameCourse} id={course._id} />
        </div>
      );
    })
  ) : (
    <h3>No data found</h3>
  );

  useEffect(() => {
    getCoursesList();
  }, [getTheCourse]);

  return (
    <>
      <Typography component="h5" variant="h5">
        My Courses
      </Typography>
      <Box className={classesStyles.boxItem}>
        <Button
          className={classesStyles.buttonItem}
          variant="contained"
          startIcon={<Add />}
          onClick={addHandler}
        >
          ADD COURSE
        </Button>

        {getTheCourse}
        <NewCourseModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    </>
  );
});

CourseSectionManagement.displayName = 'CourseSectionManagement';

export default CourseSectionManagement;
