import { Box, Typography } from '@mui/material';
import { ProfessorSection } from '../ProfessorSection/ProfessorSection';
import { StudentSection } from '../StudentSection/StudentSection';

export const PeopleManagement = () => {
  return (
    <>
      {/* <Typography variant="h4" component="h4">People Management</Typography> */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      
      
      }}>
        <ProfessorSection />
        <StudentSection/>
      </Box>
    </>
  );
};
