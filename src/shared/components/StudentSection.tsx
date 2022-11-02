import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import StudentItem from './StudentItem';
import { IUser } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import NewUserModal from './Modals/NewUserModal';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import React from 'react';

// ================================
// pass style to diferent file
// ================================

const StudentSection = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [open, setOpen] = useState(false);
  const { data } = useGetAllUsersData();

  const getUsersList = () => {
    setUsers(data);
  };

  const getStudentList = users ? (
    users.map((student) => {
      if (student.roles.includes('student')) {
        return (
          <div key={student._id} onClick={() => deleteHandler(student._id)}>
            <StudentItem
              key={student._id}
              id={student._id}
              name={student.name}
              icontoggle={false}
              deleteShow={true}
            />
          </div>
        );
      }
    })
  ) : (
    <h3>No data found</h3>
  );

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
  }, [getStudentList]);

  return (
    <>
      <Typography component="h4" variant="h4">
        Students Details
      </Typography>
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
            height: 400,
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '15px',
            margin: '15px',
          }}
        >
          {getStudentList}
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
    </>
  );
};

export default React.memo(StudentSection);
