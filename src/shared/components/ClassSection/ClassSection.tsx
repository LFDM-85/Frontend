import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { ClassItem } from '../ClassItem/ClassItem';
import { IClass } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';

// ================================
// pass style to diferent file
// get classes from hooks
// ================================

export const ClassSection = () => {
  const authCtx = useAuth();

  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    axios
      .get(`auth/${authCtx.user.email}`)
      .then((res) => setClasses(res.data.classes))
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return (
    <div>
      <Typography component="h5" variant="h5">
        My Classes
      </Typography>
      <Box
        sx={{
          mb: 2,
          height: '80vh',
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '15px',
          margin: '15px',
        }}
      >
        {classes ? (
          classes.map((aclass: IClass) => {
            return (
              <div key={aclass._id}>
                <ClassItem name={aclass.nameClass} />
              </div>
            );
          })
        ) : (
          <h3>No data found</h3>
        )}
      </Box>
    </div>
  );
};
