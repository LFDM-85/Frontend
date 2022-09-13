import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';
import { IUser } from '../../interfaces/interfaces';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  rootDiv: {
    display: 'flexbox',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '10px',
    marginRight: '10px',
    
  }
});

export const ProfessorSection = () => {

  const classes = useStyles();
  
  const [users, setUsers] = useState<IUser[]>([]);
  
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
    <div className={classes.rootDiv}>
      <Typography component="h5" variant="h5">
        Professor Management Validation
      </Typography>
      {users ? users.map(professor => {
        if (professor.role.includes('professor')) {
          return (
            <ProfessorItem key={professor.id} name={professor.name} isValidated={professor.isValidated}/>
          );
        }
      }): <h3>No data found</h3>}
      
    </div>
  );
};
