import { Box } from '@mui/material';
import { ClassSectionManagement } from '../ClassSectionManagement/ClassSectionManagement';

export const ClassManagement = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <ClassSectionManagement />
      </Box>
    </>
  );
};
