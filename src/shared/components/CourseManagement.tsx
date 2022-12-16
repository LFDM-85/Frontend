import { Box } from '@mui/material';
import CourseSectionManagement from './CourseSectionManagement';
import { makeStyles } from '@mui/styles';
import { memo } from 'react';
import DataTableCourses from './DataTable/DataTableCourses';

const useStyles = makeStyles({
  boxItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
});
const CourseManagement = memo(() => {
  const classesStyles = useStyles();
  return (
    <>
      <Box className={classesStyles.boxItem}>
        <DataTableCourses />
        <CourseSectionManagement />
      </Box>
    </>
  );
});

CourseManagement.displayName = 'CourseManagement';

export default CourseManagement;
