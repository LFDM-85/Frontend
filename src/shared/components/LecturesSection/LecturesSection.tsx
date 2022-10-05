import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { IClass, ILectures } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import { LectureItem } from '../LectureItem/LectureItem';
import { PlusOne } from '@mui/icons-material';
import NewLectureModal from '../Modals/NewLectureModal/NewLectureModal';

export const LecturesSection = () => {
  const authCtx = useAuth();
  const [open, setOpen] = useState(false);

  const [classes, setClasses] = useState<IClass[]>(() => []);
  const [aclass, setAclass] = useState<string>();

  const addHandler = (id: string) => {
    setOpen(true);
    setAclass(id);
  };

  const finishHandler = (lecture: ILectures) => {
    axios
      .patch(`lectures/${lecture._id}`, { ...lecture, finished: true })
      .then((res) => console.log(res.data))
      .catch((error) => console.log('Error', error));
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

  return (
    <div>
      <Typography component="h5" variant="h5">
        Lectures
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
              <>
                <div key={aclass._id}>
                  <Typography component="h5" variant="h5">
                    {aclass.nameClass}
                  </Typography>
                  {authCtx.user.roles.includes('professor') && (
                    <Button
                      key={aclass._id}
                      style={{ margin: 15 }}
                      variant="contained"
                      startIcon={<PlusOne />}
                      onClick={() => addHandler(aclass._id)}
                    >
                      Add Lecture
                    </Button>
                  )}
                  {aclass.lecture ? (
                    aclass.lecture.map((lecture: ILectures) => {
                      return (
                        <>
                          <LectureItem
                            key={lecture._id}
                            summary={lecture.summary}
                            description={lecture.description}
                          />
                          {authCtx.user.roles.includes('professor') && (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  key={lecture._id}
                                  onClick={() => finishHandler(lecture)}
                                />
                              }
                              label="Finish Lecture"
                            />
                          )}
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

      <NewLectureModal
        classId={aclass}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
