import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import {
  IAssessment,
  IClass,
  ILectures,
  IUser,
} from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import { LectureItem } from '../LectureItem/LectureItem';
import { ClassItem } from '../ClassItem/ClassItem';
import { Add, PlusOne } from '@mui/icons-material';
import NewUserModal from '../Modals/NewUserModal/NewUserModal';
import ListUserModal from '../Modals/ListUserModal/ListUserModal';

export const LecturesSection = () => {
  const authCtx = useAuth();
  const [open, setOpen] = useState(false);

  const [classes, setClasses] = useState<IClass[]>([]);

  const addHandler = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get(`auth/${authCtx.user.email}`)
      .then((res) => {
        const classData = res.data.classes;
        setClasses(classData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  console.log(classes);
  // console.log(lectures);

  return (
    <div>
      <Typography component="h5" variant="h5">
        Lectures
      </Typography>
      <Box
        sx={{
          mb: 2,
          // flexDirection: 'column',
          height: 400,
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '15px',
          margin: '15px',
        }}
      >
        {classes ? (
          classes.map((aclass: IClass) => {
            return (
              <>
                <div key={aclass._id}>
                  <Typography component="h5" variant="h5">
                    {aclass.nameClass}
                  </Typography>
                  {aclass.lecture ? (
                    aclass.lecture.map((lecture: ILectures) => {
                      return (
                        <>
                          <LectureItem
                            key={lecture._id}
                            summary={lecture.summary}
                            description={lecture.description}
                          />
                        </>
                      );
                    })
                  ) : (
                    <h3>No data found</h3>
                  )}
                </div>
              </>
            );
          })
        ) : (
          <h3>No data found</h3>
        )}
      </Box>
      <Button
        style={{ margin: 15 }}
        variant="contained"
        startIcon={<PlusOne />}
        onClick={addHandler}
      >
        Add Lecture
      </Button>
      <ListUserModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
