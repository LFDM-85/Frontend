import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ClassItem } from '../ClassItem/ClassItem';
import { IClass } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import { NewClassModal } from '../Modals/NewClassModal/NewClassModal';

export const ClassSection = () => {

  
  const [classes, setClasses] = useState<IClass[]>([]);
  const [open, setOpen] = useState(false);
  
  const getClassesList = () => {
    axios.get('class/all')
      .then((res) => setClasses(res.data))
      .catch(error => console.log(`Error: ${error}`));      
  };

  const deleteHandler = (classeName: string) => {
    axios.delete(`/class/${classeName}`)
      .then(() => getClassesList())
      .catch((error) => console.log('Error', error));
  };

  const addHandler = () => {
    setOpen(true);
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
            <div key={aclass._id } onClick={()=> deleteHandler(aclass.nameClass)} >
              <ClassItem key={aclass._id} name={aclass.nameClass} />
            </div>
          );
          
        }): <h3>No data found</h3>}
      
      </Box>
      <Box sx={{
        margin: 'auto',
      }}>
        <Button variant="contained" startIcon={<Add/>} onClick={addHandler} >ADD</Button>
      </Box>
      
      <NewClassModal open={open} onClose={() => {
        setOpen(false),
        getClassesList();
      }} />
      
      
    </div>
  );
};

