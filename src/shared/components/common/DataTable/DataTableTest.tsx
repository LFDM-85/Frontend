import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import useGetAllUsersData from '../../../hooks/useGetAllUsersData';
import { Avatar, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import NewUserModal from '../../Modals/NewUserModal/NewUserModal';
import { useEffect, useMemo, useState } from 'react';
import EditActions from './UsersActions/EditActions';
import DeleteActions from './UsersActions/DeleteActions';

const DataTableTest = () => {
  const { data } = useGetAllUsersData();
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null);

  const addHandler = () => {
    setOpen(true);
  };
  useEffect(() => {
    data;
  }, [rowId]);
  const rows = data.map((row) => ({
    image: row.image,
    id: row._id,
    name: row.name,
    email: row.email,
    roles: row.roles,
    isValidated: row.isValidated,
  }));

  const columns = useMemo(
    () => [
      {
        field: 'image',
        headerName: 'Avatar',
        width: 70,
        sortable: false,
        renderCell: () => <Avatar />,
        filterable: false,
      },
      { field: 'name', headerName: 'User Name', width: 250, editable: true },
      { field: 'email', headerName: 'User Email', width: 250 },
      { field: 'roles', headerName: 'User Roles', width: 250, editable: true },
      {
        field: 'isValidated',
        headerName: 'Validation',
        type: 'boolean',
        editable: true,
      },
      { field: 'id', headerName: 'User Id', width: 250 },
      {
        field: 'actions',
        headerName: 'Edit',
        type: 'actions',
        renderCell: (params: any) => (
          <EditActions {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: 'actionsDelete',
        headerName: 'Delete',
        type: 'actions',
        renderCell: (params: any) => (
          <DeleteActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box height={700} width={'100%'}>
      <Button
        style={{ margin: 15 }}
        variant="contained"
        startIcon={<Add />}
        onClick={addHandler}
      >
        ADD Student
      </Button>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        editMode="row"
        // onCellEditCommit={(params: any) => setRowId(params.row.id)}
        onCellClick={(params: any) => setRowId(params.row.id)}
      />

      <NewUserModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};

export default DataTableTest;
