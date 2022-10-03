import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ClassItem } from '../ClassItem/ClassItem';
import { IClass, IUser } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetAllClassesData from '../../hooks/useGetAllClassesData';
import { NewClassModal } from '../Modals/NewClassModal/NewClassModal';
import { Add } from '@mui/icons-material';
import { EditClassItem } from '../EditClassItem/EditClassItem';

export const ClassSectionManagement = () => {
  const { data } = useGetAllClassesData();
  const [open, setOpen] = useState(false);

  const addHandler = () => {
    setOpen(true);
  };

  useEffect(() => {
    data;
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

          padding: '15px',
          margin: '15px',
        }}
      >
        <Button
          style={{ margin: 15 }}
          variant="contained"
          startIcon={<Add />}
          onClick={addHandler}
        >
          ADD Class
        </Button>

        {data ? (
          data.map((aclass: IClass) => {
            return (
              <div key={aclass._id}>
                <EditClassItem name={aclass.nameClass} id={aclass._id} />
              </div>
            );
          })
        ) : (
          <h3>No data found</h3>
        )}
        <NewClassModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    </div>
  );
};
