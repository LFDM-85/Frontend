import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { StudentItem } from '../StudentItem/StudentItem';
import { IUser } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import { Add} from '@mui/icons-material';


export const StudentSection = () => {

  
  const [users, setUsers] = useState<IUser[]>([]);

  
  const getUsersList = () => {
    axios.get('auth/all')
      .then((res) => setUsers(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };
  
  // const deleteStudentHandler = () => {
             
  //       axios.delete(`/auth/${student._id}`)
  //         .catch((error) => console.log('Error', error));
  //     }
  //   });
  // };

  const deleteHandler = (id: string) => {
    axios.delete(`/auth/${id}`)
      .catch((error) => console.log('Error', error));
  };
  

  useEffect(() => { 
    getUsersList();
    
  }, [deleteHandler]);
  
  
  return (
    <div>
      <Typography component="h5" variant="h5">
        Student Management Validation
      </Typography>
      <Box sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 400,
        
        
      }}>      
        <Box sx={{
          mb:2,
          // flexDirection: 'column',
          height: 400,
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '15px',
          margin: '15px'
        }}>
        
        
          {users ? users.map(student => {
            if (student.role.includes('student')) {
              return (
                <div onClick={()=> deleteHandler(student._id)} >
                  <StudentItem key={student._id} id={student._id} name={student.name} />
                  
                </div>
              );
            }
          }): <h3>No data found</h3>}
      
        </Box>
        <Box sx={{
          margin: 'auto',
       
        
        }}>
          <Button variant="contained" startIcon={<Add/>} >ADD</Button>
        </Box>
      </Box>
    </div>
  );
};
