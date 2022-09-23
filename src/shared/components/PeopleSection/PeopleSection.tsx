import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { StudentItem } from '../StudentItem/StudentItem';
import { IUser } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import NewUserModal from '../Modals/NewUserModal/NewUserModal';
import DataTable from '../common/DataTable/DataTable';


export const PeopleSection = () => {

  
  const [users, setUsers] = useState<IUser[]>([]);
  const [open, setOpen] = useState(false);

  
  const getUsersList = () => {
    axios.get('auth/all')
      .then((res) => setUsers(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };

  const deleteHandler = (id: string) => {
    axios.delete(`/auth/${id}`)
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
    <div style={{height: '100vh'}}>
      <Typography component="h4" variant="h4">
        Users Details
      </Typography>
      <DataTable />


      <Box sx={{
        margin: 'auto',
      }}>
        <Button variant="contained" startIcon={<Add />} onClick={addHandler}>ADD Student</Button>
      </Box><NewUserModal open={open} onClose={() => {
        setOpen(false),
        getUsersList();
      } } />
    </div>
  );
};
