import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';
import { IUser } from '../../interfaces/interfaces';
import { Box } from '@mui/system';


export const ProfessorSection = () => {

  
  const [users, setUsers] = useState<IUser[]>([]);
  
  const getUsersList = () => {
    axios.get('auth/all')
      .then((res) => setUsers(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };
  
  useEffect(() => { 
    getUsersList();
  }, []);
  
  return (
    <div>
      <Typography component="h5" variant="h5">
        Professor Management Validation
      </Typography>
      <Box
        sx={{
          mb:2,
          // flexDirection: 'column',
          height: 400,
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '15px',
          margin: '15px'
        }}
      >
        {users ? users.map(professor => {
          if (professor.roles.includes('professor')) {
            return (
              <ProfessorItem key={professor._id} id={professor._id} name={professor.name} isValidated={professor.isValidated}/>
            );
          }
        }): <h3>No data found</h3>}
      
      </Box>
      
    </div>
  );
};
