import { Box } from '@mui/material';
import { ProfessorSection } from './ProfessorSection';
import { StudentSection } from './StudentSection';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  boxItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
});

export const PeopleManagement = () => {
  const classesStyles = useStyles();
  return (
    <>
      <Box className={classesStyles.boxItem}>
        <ProfessorSection />
        <StudentSection />
      </Box>
    </>
  );
};
