import { Box, Button } from '@mui/material';
import { useState } from 'react';
import CourseManagement from '../shared/components/CourseManagement';
import PeopleManagement from '../shared/components/PeopleManagement';
export const ManagementPage = () => {
  const [isClassM, setIsClassM] = useState(true);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            padding: '15px',
            margin: '15px',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsClassM(true)}
          >
            Class Management
          </Button>
        </Box>
        <Box
          sx={{
            padding: '15px',
            margin: '15px',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsClassM(false)}
          >
            People Management
          </Button>
        </Box>
      </Box>

      {isClassM && <CourseManagement />}
      {!isClassM && <PeopleManagement />}
    </>
  );
};
