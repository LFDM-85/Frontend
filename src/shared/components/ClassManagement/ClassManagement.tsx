import { Box, Typography } from '@mui/material';
import { ClassSectionManagement } from '../ClassSectionManagement/ClassSectionManagement';
import DataTableClasses from '../common/DataTable/DataTableClasses';

export const ClassManagement = () => {
  return (
    <>
      {/* <Typography variant="h4" component="h4">People Management</Typography> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <ClassSectionManagement />
        {/* <DataTableClasses /> */}
      </Box>
    </>
  );
};
