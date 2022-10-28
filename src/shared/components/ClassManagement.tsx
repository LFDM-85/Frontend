import { Box } from '@mui/material';
import { ClassSectionManagement } from './ClassSectionManagement';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  boxItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
});
export const ClassManagement = () => {
  const classesStyles = useStyles();
  return (
    <>
      <Box className={classesStyles.boxItem}>
        <ClassSectionManagement />
      </Box>
    </>
  );
};
