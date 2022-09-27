import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Avatar, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import NewUserModal from '../../Modals/NewUserModal/NewUserModal';
import { useEffect, useMemo, useState } from 'react';
import EditActions from './UsersActions/EditActions';
import DeleteActions from './UsersActions/DeleteActions';
import useGetAllClassesData from '../../../hooks/useGetAllClassesData';
import { NewClassModal } from '../../Modals/NewClassModal/NewClassModal';

const DataTableClasses = () => {
  const { data } = useGetAllClassesData();
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null);

  const addHandler = () => {
    setOpen(true);
  };
  useEffect(() => {
    data;
  }, [rowId]);
  const rows = data.map((row) => ({
    id: row._id,
    nameClass: row.nameClass,
    open: row.open,
  }));

  const columns = useMemo(
    () => [
      {
        field: 'nameClass',
        headerName: 'Class Name',
        width: 250,
        editable: true,
      },
      {
        field: 'open',
        headerName: 'Open',
        width: 250,
        type: 'boolean',
        editable: true,
      },

      { field: 'id', headerName: 'Class Id', width: 250 },
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
        ADD Class
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

      <NewClassModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};

export default DataTableClasses;
