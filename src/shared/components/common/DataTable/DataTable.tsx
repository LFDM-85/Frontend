import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../../interceptors/axios';
import { IUser } from '../../../interfaces/interfaces';
import { Avatar } from '@mui/material';

const columns = [
  {
    field: 'image',
    headerName: 'Avatar',
    width: 70,
    sortable: false,
    renderCell: () => <Avatar />,
    filterable: false,
  },
  { field: 'id', headerName: 'User Id', width: 250 },
  { field: 'name', headerName: 'User Name', width: 250 },
  { field: 'email', headerName: 'User Email', width: 250 },
  { field: 'roles', headerName: 'User Roles', width: 250 },
  {
    field: 'isValidated',
    headerName: 'Validation',
    type: 'boolean',
    editable: true,
  },
  // { field: 'actions', headerName: 'Save', type: 'actions' },
  // { field: 'actions', headerName: 'Delete', type: 'actions' }
];

const DataTable = () => {
  const [data, setData] = useState<IUser[]>([]);

  const usersData = async () => {
    await axios
      .get('auth/all')
      .then((res) => setData(res.data))
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    usersData();
  }, []);

  console.log(data);
  // const image = (<Avatar/>);

  const rows = data.map((row) => ({
    image: row.image,
    id: row._id,
    name: row.name,
    email: row.email,
    roles: row.roles,
    isValidated: row.isValidated,
  }));

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={10}
        // rowsPerPageOptions={[10]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
      />
    </div>
  );
};

export default DataTable;
