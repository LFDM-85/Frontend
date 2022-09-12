import { Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () =>{
  let professor: any;
  
  useEffect(() => { 
    axios.get('auth/all')
      .then((res) => res.data)
      .then((data) => {      
        data.map((person: any) => {
          if (person.role[0] === 'professor') {
            professor = person.name;
          
            return professor;
                      
          }
        });
      });
  }, []);
  
 
  console.log(professor);
  
  
  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      <div>
        <ProfessorItem name={professor} />
      </div>
      
    </>
  );
};
