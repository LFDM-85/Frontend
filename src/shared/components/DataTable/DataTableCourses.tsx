import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../interceptors/axios';
import { ICourse } from '../../interfaces/interfaces';

const columns = [
  { field: 'nameClass', headerName: 'Class Name', width: 250 },
  {
    field: 'open',
    headerName: 'Open',
    type: 'boolean',
    editable: true,
  },

  { field: 'id', headerName: 'Class Id', width: 250 },
  // { field: 'actions', headerName: 'Save', type: 'actions' },
  // { field: 'actions', headerName: 'Delete', type: 'actions' }
];

const DataTableCourses = () => {
  const [data, setData] = useState<ICourse[]>([]);

  const usersData = async () => {
    await axios
      .get('course/all')
      .then((res) => setData(res.data))
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    usersData();
  }, []);

  console.log(data);
  // const image = (<Avatar/>);

  const rows = data.map((row) => ({
    id: row._id,
    nameClass: row.nameCourse,
    open: row.open,
  }));

  return (
    <div style={{ height: 650, width: '100%' }}>
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
    </div>
  );
};

export default DataTableCourses;
