import { Box } from '@mui/material';
import ProfessorSection from './ProfessorSection';
import StudentSection from './StudentSection';
import { makeStyles } from '@mui/styles';
import React, { memo } from 'react';

const useStyles = makeStyles({
  boxItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
});

const PeopleManagement = memo(() => {
  const classesStyles = useStyles();
  return (
    <>
      <Box className={classesStyles.boxItem}>
        <ProfessorSection />
        <StudentSection />
      </Box>
    </>
  );
});

PeopleManagement.displayName = 'PeopleManagement';

export default React.memo(PeopleManagement);
