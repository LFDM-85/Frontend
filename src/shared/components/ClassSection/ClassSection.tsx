import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ClassItem } from '../ClassItem/ClassItem';
import { IClass } from '../../interfaces/interfaces';
import { Box } from '@mui/system';


export const ClassSection = () => {

  
  const [classes, setClasses] = useState<IClass[]>([]);
  
  const getClassesList = () => {
    axios.get('class/all')
      .then((res) => setClasses(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };
  
  useEffect(() => { 
    getClassesList();
  }, []);
  
  return (
    <div>
      <Typography component="h5" variant="h5">
        Class Management 
      </Typography>
      <Box
        sx={{
          mb:2,
          // flexDirection: 'column',
          height: 400,
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '15px',
          margin: '15px'
        }}
      >
        {classes ? classes.map(aclass => {          
          return (
            <ClassItem key={aclass._id } name={aclass.nameClass} />
          );
          
        }): <h3>No data found</h3>}
      
      </Box>
      
    </div>
  );
};
