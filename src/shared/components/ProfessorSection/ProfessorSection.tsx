import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {
  
  const [professor, setProfessor] = useState();
  const professorList = () => {
    axios.get('auth/all')
      .then((res) => setProfessor(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };
  
  useEffect(() => { 
    professorList();    
  }, []);
  
  console.log(professor);
 
  
  
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
