import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from 'react';
import useGetAssessmentsUserIdData from '../../../hooks/useGetAssessmentByUserIdData';

const DataTableTest = () => {
  const { data } = useGetAssessmentsUserIdData();

  console.log('data', data);

  const rows = data.map((row: any) => ({
    classes: row.classes,
    assessment: row.assessment,
    attendance: row.attendance,
  }));

  const columns = useMemo(
    () => [
      { field: 'Classes', headerName: 'Classes', width: 250 },
      { field: 'assessment', headerName: 'Assessments', width: 250 },
      { field: 'attendance', headerName: 'Attendance', width: 250 },
    ],
    []
  );

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      pageSize={10}
      rowsPerPageOptions={[10]}
      getRowSpacing={(params) => ({
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      })}
    />
  );
};
export default DataTableTest;
