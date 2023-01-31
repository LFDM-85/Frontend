import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { ICourse, ILectures, IWorks } from '../interfaces/interfaces';
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
import useGetCoursesCurrUserEmailData from '../hooks/useGetCoursesByCurrUserEmailData';

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

  const { courseData } = useGetCoursesCurrUserEmailData();

  const [courses, setCourses] = useState<ICourse[]>(() => []);
  const [courseId, setCourseId] = useState<string>();

  const addHandler = (id: string) => {
    setOpen(true);
    setCourseId(id);
  };

  const getAllCourses = () => {
    setCourses(() => courseData);
  };

  const onchangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = event.currentTarget;
      const id = target.id;

      axios
        .patch(`lectures/${id}`, { finished: true })
        .then((res) => setIsFinished(() => true))
        .catch((error) => console.log('Error', error));
    },
    []
  );

  const isLectureFinished = () => {
    courses.map((course: ICourse) => {
      console.log('LICOES ====>', course.lecture);
      const findLectureFinished = course.lecture.find((lecture: ILectures) => {
        lecture.finished === true;
      });
      if (findLectureFinished) setIsFinished(true);
      else setIsFinished(false);
    });
  };

  const isProfessorLogged = () => {
    data &&
      data.map((user) => {
        if (
          !user.roles.includes('professor') &&
          authCtx.user.roles.includes('professor')
        ) {
          setIsProfessor(true);
        } else {
          setIsProfessor(false);
        }
      });
  };

  useEffect(() => {
    getAllCourses();
    isLectureFinished();
    isProfessorLogged();
  });

  return (
    <>
      <Typography component="h5" variant="h5">
        Lectures
      </Typography>
      <Box className={classesStyles.boxItem}>
        {courses ? (
          courses.map((courseName: ICourse) => {
            return (
              <div key={courseName._id}>
                <Typography component="h5" variant="h5">
                  {courseName.nameCourse}
                </Typography>
                {authCtx.user.roles.includes('professor') && (
                  <Button
                    key={courseName._id}
                    className={classesStyles.buttonItem}
                    variant="contained"
                    startIcon={<PlusOne />}
                    onClick={() => addHandler(courseName._id)}
                  >
                    Add Lecture
                  </Button>
                )}
                {courseName.lecture ? (
                  courseName.lecture.map((lecture: ILectures) => {
                    console.log('Lições', lecture);
                    return (
                      <div key={lecture._id}>
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
                                <div key={work._id}>
                                  <WorkItem
                                    key={Math.random()}
                                    filename={work.filename}
                                    filepath={work.filepath}
                                    owner={work.owner}
                                  />
                                </div>
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
                            <p>No justifications here found for this lecture</p>
                          ))}
                      </div>
                    );
                  })
                ) : (
                  <h3>No data found</h3>
                )}
              </div>
            );
          })
        ) : (
          <h3>No data found</h3>
        )}
      </Box>

      <NewLectureModal
        courseId={courseId}
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
