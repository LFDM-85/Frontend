import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { IClass, ILectures, IWorks } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../hooks/useAuth';
import LectureItem from './LectureItem';
import { PlusOne } from '@mui/icons-material';
import NewLectureModal from './Modals/NewLectureModal';
import WorkItem from './WorkItem';
import JustificationItem from './JustificationItem';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  boxItem: {
    mb: 2,
    height: '80vh',
    overflow: 'hidden',
    overflowY: 'scroll',
    padding: '15px',
    margin: '15px',
  },
  buttonItem: {
    margin: 15,
  },
});

const LecturesSection = memo(() => {
  const classesStyles = useStyles();
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

  const onchangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.currentTarget;
    // const name = target.name;
    const id = target.id;
    // const checked = target.checked;

    axios
      .patch(`lectures/${id}`, { finished: true })
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
    <>
      <Typography component="h5" variant="h5">
        Lectures
      </Typography>
      <Box className={classesStyles.boxItem}>
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
                      className={classesStyles.buttonItem}
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
                                  name={lecture.summary}
                                  id={lecture._id}
                                  onChange={onchangeHandler}
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
                              if (work.owner.includes('student')) {
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
                              }
                            })}
                          {authCtx.user.roles.includes('professor') && (
                            <h3>Justifications submitted by students</h3>
                          )}
                          {authCtx.user.roles.includes('professor') &&
                            (lecture.attendance ? (
                              <JustificationItem
                                key={Math.random()}
                                attendance={lecture.attendance ?? null}
                              />
                            ) : (
                              <p>
                                No justifications here found for this lecture
                              </p>
                            ))}
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
    </>
  );
});

LecturesSection.displayName = 'LectureSection';

export default LecturesSection;
