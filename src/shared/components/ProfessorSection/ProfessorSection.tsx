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
        return (
          <div key={professor.id}>
            <h3>{professor.name}</h3>
          </div>
        );
      }): <h3>No data found</h3>}
      {/* <div>
        <ProfessorItem name={professor} />
      </div> */}
      
    </>
  );
};
