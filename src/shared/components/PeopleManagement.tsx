import { Box } from '@mui/material';
import { ProfessorSection } from './ProfessorSection';
import { StudentSection } from './StudentSection';

export const PeopleManagement = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <ProfessorSection />
        <StudentSection />
      </Box>
    </>
  );
};
