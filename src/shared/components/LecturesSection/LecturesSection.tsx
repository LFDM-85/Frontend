import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { IClass, ILectures, IWorks } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import { LectureItem } from '../LectureItem/LectureItem';
import { PlusOne } from '@mui/icons-material';
import NewLectureModal from '../Modals/NewLectureModal/NewLectureModal';
import { WorkItem } from '../WorkItem/WorkItem';
import { JustificationItem } from '../JustificationItem/JustificationItem';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';

export const LecturesSection = () => {
  const authCtx = useAuth();
  const [open, setOpen] = useState(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isProfessor, setIsProfessor] = useState<boolean>();
  const { data } = useGetAllUsersData();

  const [classes, setClasses] = useState<IClass[]>(() => []);
  const [aclassId, setAclassId] = useState<string>();

  const addHandler = (id: string) => {
    setOpen(true);
    setAclassId(id);
  };

  const finishHandler = (lecture: ILectures) => {
    axios
      .patch(`lectures/${lecture._id}`, { ...lecture, finished: true })
      .then((res) => setIsFinished(true))
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

    classes.map((aclass: IClass) => {
      const findLectureFinished = aclass.lecture.find((lecture: ILectures) => {
        lecture.finished === true;
      });
      if (findLectureFinished) setIsFinished(true);
      else setIsFinished(false);
    });

    data &&
      data.map((user) => {
        const theuser = user;

        if (
          !theuser.roles.includes('professor') &&
          authCtx.user.roles.includes('professor')
        ) {
          setIsProfessor(true);
        } else {
          setIsProfessor(false);
        }
      });
  }, [setIsProfessor]);

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
                          {authCtx.user.roles.includes('professor') && (
                            <h3>Works submitted by students</h3>
                          )}

                          {authCtx.user.roles.includes('professor') &&
                            lecture.work &&
                            lecture.work.map((work: IWorks) => {
                              return (
                                <>
                                  <WorkItem
                                    key={Math.random()}
                                    filename={work.filename}
                                    filepath={work.filepath}
                                    owner={work.owner}
                                  />
                                </>
                              );
                            })}
                          {authCtx.user.roles.includes('professor') && (
                            <h3>Justifications submitted by students</h3>
                          )}
                          {/* {authCtx.user.roles.includes('professor') && (
                            <JustificationItem
                              key={Math.random()}
                              filename={lecture.attendance.filename ?? null}
                              filepath={lecture.attendance.filepath ?? null}
                              owner={lecture.attendance.owner}
                            />
                          )} */}
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
