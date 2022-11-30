import { Box } from '@mui/material';
import ClassSectionManagement from './ClassSectionManagement';
import { makeStyles } from '@mui/styles';
import  { memo } from 'react';

const useStyles = makeStyles({
  boxItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
});
const ClassManagement = memo(() => {
  const classesStyles = useStyles();
  return (
    <>
      <Box className={classesStyles.boxItem}>
        <ClassSectionManagement />
      </Box>
    </>
  );
});

ClassManagement.displayName = 'ClassMangement';

export default ClassManagement;
