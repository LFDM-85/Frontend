import { Box } from '@mui/material';
import { ProfessorSection } from '../ProfessorSection/ProfessorSection';
import { StudentSection } from '../StudentSection/StudentSection';

export const PeopleManagement = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      
      
    }}>
      <ProfessorSection />
      <StudentSection/>
    </Box>
  );
};
