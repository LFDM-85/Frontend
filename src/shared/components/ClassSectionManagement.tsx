import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IClass } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetAllClassesData from '../hooks/useGetAllClassesData';
import { NewClassModal } from './Modals/NewClassModal';
import { Add } from '@mui/icons-material';
import EditClassItem from './EditClassItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  boxItem: {
    mb: 2,
    height: '80vh',

    padding: '15px',
    margin: '15px',
  },
  buttonItem: {
    margin: 15,
  },
});

export const ClassSectionManagement = () => {
  const { classData } = useGetAllClassesData();
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState<IClass[]>([]);
  const classesStyles = useStyles();

  const getClassesList = () => {
    setClasses(classData);
  };

  const addHandler = () => {
    setOpen(true);
  };

  const getTheClass = classes ? (
    classes.map((aclass: IClass) => {
      return (
        <div key={aclass._id}>
          <EditClassItem name={aclass.nameClass} id={aclass._id} />
        </div>
      );
    })
  ) : (
    <h3>No data found</h3>
  );

  useEffect(() => {
    getClassesList();
  }, [getTheClass]);

  return (
    <>
      <Typography component="h5" variant="h5">
        My Classes
      </Typography>
      <Box className={classesStyles.boxItem}>
        <Button
          className={classesStyles.buttonItem}
          variant="contained"
          startIcon={<Add />}
          onClick={addHandler}
        >
          ADD Class
        </Button>

        {getTheClass}
        <NewClassModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    </>
  );
};
