import { Typography } from '@mui/material';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {
  let professors: any;

  axios.get('auth/all')
    .then((res) => res.data)
    .then((data) => {      
      data.map((person: any) => {
        if (person.role[0] === 'professor') professors = person;
        
        console.log(professors);
      });
    }); 
  
  


  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      <div>
        <ProfessorItem name={professors.name} />)

      </div>
      
    </>
  );
};
