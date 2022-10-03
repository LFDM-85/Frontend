import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { StudentItem } from '../StudentItem/StudentItem';
import { IUser } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import NewUserModal from '../Modals/NewUserModal/NewUserModal';
import DataTable from '../common/DataTable/DataTable';

export const StudentSection = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [open, setOpen] = useState(false);

  const getUsersList = () => {
    axios
      .get('auth/all')
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(`Error: ${error}`));
  };

  const deleteHandler = (id: string) => {
    axios
      .delete(`/auth/${id}`)
      .then(() => getUsersList())
      .catch((error) => console.log('Error', error));
  };

  const addHandler = () => {
    setOpen(true);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div>
      <Typography component="h4" variant="h4">
        Students Details
      </Typography>
      {/* <DataTable/> */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 400,
        }}
      >
        <Box
          sx={{
            mb: 2,
            // flexDirection: 'column',
            height: 400,
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '15px',
            margin: '15px',
          }}
        >
          {users ? (
            users.map((student) => {
              if (student.roles.includes('student')) {
                return (
                  <div onClick={() => deleteHandler(student._id)}>
                    <StudentItem
                      key={student._id}
                      id={student._id}
                      name={student.name}
                      icontoggle={false}
                    />
                  </div>
                );
              }
            })
          ) : (
            <h3>No data found</h3>
          )}
        </Box>
        <Box
          sx={{
            margin: 'auto',
          }}
        ></Box>
      </Box>
      <Button variant="contained" startIcon={<Add />} onClick={addHandler}>
        ADD Student
      </Button>
      <NewUserModal
        open={open}
        onClose={() => {
          setOpen(false), getUsersList();
        }}
      />
    </div>
  );
};
