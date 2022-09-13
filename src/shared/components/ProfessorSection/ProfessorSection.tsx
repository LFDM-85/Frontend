import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {
  
  const [users, setUsers] = useState <any[]>([]);
  const getUsersList = () => {
    axios.get('auth/all')
      .then((res) => setUsers(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };
  
  useEffect(() => { 
    getUsersList();
  }, []);
  
  console.log(users);  
  
  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      {users ? users.map(professor => {
        if (professor.role.includes('professor')) {
          return (
            <ProfessorItem key={professor.id} name={professor.name}/>
          );
        }
      }): <h3>No data found</h3>}
      
    </>
  );
};
