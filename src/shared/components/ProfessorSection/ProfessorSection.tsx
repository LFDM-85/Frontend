import { Typography } from '@mui/material';
import axios from '../../../interceptors/axios';
import { ProfessorItem } from '../ProfessorItem/ProfessorItem';

export const ProfessorSection = () => {

  axios.get('auth/all').then((res) => res.data).then((data) => console.log(data)); 


  return (
    <>
      <Typography>
        Professor Management
      </Typography>
      <ProfessorItem/>
      <ProfessorItem/>
      <ProfessorItem/>
      <ProfessorItem/>
      
    </>
  );
};
