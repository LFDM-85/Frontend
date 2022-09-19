import { Box, Typography } from '@mui/material';
import { ClassSection } from '../ClassSection/ClassSection';

export const ClassManagement = () => {
  return (
    <>
      <Typography variant="h4" component="h4">People Management</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      
      
      }}>
        <ClassSection />
        
      </Box>
    </>
  );
};
