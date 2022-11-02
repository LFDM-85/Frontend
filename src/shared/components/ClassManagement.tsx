import { Box } from '@mui/material';
import ClassSectionManagement from './ClassSectionManagement';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  boxItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
});
const ClassManagement = () => {
  const classesStyles = useStyles();
  return (
    <>
      <Box className={classesStyles.boxItem}>
        <ClassSectionManagement />
      </Box>
    </>
  );
};

export default React.memo(ClassManagement);
