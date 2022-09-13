import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {
  
  const [professors, setProfessors] = useState <any[]>([]);
  const professorList = () => {
    axios.get('auth/all')
      .then((res) => setProfessors(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };
  
  useEffect(() => { 
    professorList();
    
  }, []);
  
  console.log(professors);
 
  
  
  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      {professors ? professors.map(professor => {
        if (professor.role[0] === 'professor') {
          return (
            <ProfessorItem key={professor.id} name={professor.name}/>
          );
        }
      }): <h3>No data found</h3>}
      {/* <div>
        <ProfessorItem name={professor} />
      </div> */}
      
    </>
  );
};
