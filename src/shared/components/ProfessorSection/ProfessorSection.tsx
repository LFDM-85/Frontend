import { Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {
  
  let person: any;
  
  useEffect(() => { 
    axios.get('auth/all')
      .then((res) => res.data)
      .then((data) => {      
        data.map((person: any) => {
          if (person.role[0] === 'professor') {
                      
            return person;
                      
          }
        });
      });
  }, []);
  
 
  console.log(person);
  
  
  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      {/* <div>
        <ProfessorItem name={professor} />
      </div> */}
      
    </>
  );
};
