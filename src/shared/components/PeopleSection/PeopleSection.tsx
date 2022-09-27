import { Typography } from '@mui/material';
import DataTableTest from '../common/DataTable/DataTableTest';

export const PeopleSection = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Typography component="h4" variant="h4">
        Users Details
      </Typography>
      <DataTableTest />
    </div>
  );
};
