import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProfessorItem } from './ProfessorItem';
import { IUser } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetAllUsersData from '../hooks/useGetAllUsersData';

// ================================
// pass style to diferent file
// ================================

export const ProfessorSection = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { data } = useGetAllUsersData();

  const getUsersList = () => {
    setUsers(data);
  };

  const getProfessorList = users ? (
    users.map((professor) => {
      if (professor.roles.includes('professor')) {
        return (
          <ProfessorItem
            key={professor._id}
            id={professor._id}
            name={professor.name}
            isValidated={professor.isValidated}
          />
        );
      }
    })
  ) : (
    <h3>No data found</h3>
  );

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  return (
    <>
      <Typography component="h5" variant="h5">
        Professor Management Validation
      </Typography>
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
        {getProfessorList}
      </Box>
    </>
  );
};
