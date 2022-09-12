import { Typography } from '@mui/material';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {

  axios.get('auth/all')
    .then((res) => res.data)
    .then((data) => {      
      data.map((person: any) => {
        if (person.role[0] === 'professor') console.log(person.user);
      });
    }); 
  
  


  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      {/* <div>
        <ProfessorItem name={professors.user.name} />)

      </div> */}
      
    </>
  );
};
