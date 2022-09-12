import { Typography } from '@mui/material';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () =>{
  let professor: any;
  
  const professorList = async() => {
    await axios.get('auth/all')
      .then((res) => res.data)
      .then((data) => {      
        data.map((person: any) => {
          if (person.role[0] === 'professor') {
          
            return person.name;
                      
          }
        });
      });};
 
  console.log(professorList());
  
  
  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      <div>
        <ProfessorItem name={professorList()} />
      </div>
      
    </>
  );
};
