import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {
  
  const [professorName, setProfessorName] = useState();
  const professorList = () => {
    axios.get('auth/all')
      .then((res) => res.data)
      .then((data) => {
        data.map((person: any) => setProfessorName(person.name));
      }).catch(error => console.log(`Error: ${error}`));
      
  };
  
  useEffect(() => { 
    professorList();    
  }, []);
  
 
  
  
  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      <div>
        <ProfessorItem name={professorName} />
      </div>
      
    </>
  );
};
