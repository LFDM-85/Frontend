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
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [classes, setClasses] = useState<IClass[]>(() => []);
  const [aclassId, setAclassId] = useState<string>();

  const addHandler = (id: string) => {
    setOpen(true);
    setAclassId(id);
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

    function checkIsFinished() {
      classes.map((aclass: IClass) => {
        const findLectureFinished = aclass.lecture.find(
          (lecture: ILectures) => {
            lecture.finished === true;
          }
        );
        if (findLectureFinished) setIsFinished(true);
        else setIsFinished(false);
      });
    }
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
          classes.map((aclassId: IClass) => {
            return (
              <>
                <div key={aclassId._id}>
                  <Typography key={Math.random()} component="h5" variant="h5">
                    {aclassId.nameClass}
                  </Typography>
                  {authCtx.user.roles.includes('professor') && (
                    <Button
                      key={aclassId._id}
                      style={{ margin: 15 }}
                      variant="contained"
                      startIcon={<PlusOne />}
                      onClick={() => addHandler(aclassId._id)}
                    >
                      Add Lecture
                    </Button>
                  )}
                  {aclassId.lecture ? (
                    aclassId.lecture.map((lecture: ILectures) => {
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
                                  key={Math.random()}
                                  onClick={() => finishHandler(lecture)}
                                  checked={isFinished ? true : false}
                                  disabled={isFinished ? true : false}
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
        classId={aclassId}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
