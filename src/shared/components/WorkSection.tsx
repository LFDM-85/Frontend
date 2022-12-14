import { FilePresent, PlusOne, Send } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import useAuth from '../hooks/useAuth';
import { ICourse, ILectures, IUser, IWorks } from '../interfaces/interfaces';
import NewWorkModal from './Modals/NewWorkModal';
import NewJustificationModal from './Modals/NewJustificationModal';
import WorkItem from './WorkItem';
import useGetAllUsersData from '../hooks/useGetAllUsersData';

import AddAssessments from './AddAssessments';
import React from 'react';

const WorkSection = memo(() => {
  const authCtx = useAuth();
  const [courses, setCourses] = useState<ICourse[]>(() => []);
  const [open, setOpen] = useState(false);
  const [lectureId, setLectureId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const { data } = useGetAllUsersData();
  const [numberInput, setNumberInput] = useState<any>({});
  const [isWorkFile, setIsWorkFile] = useState<boolean>(true);
  const [getInfo, setGetInfo] = useState<any>({});

  const handleNumberInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      email: string,
      lecture_Id: string
    ) => {
      setNumberInput((values: any) => {
        return {
          ...values,
          [lecture_Id]: {
            ...values[lecture_Id],
            [email]: event.target.value,
          },
        };
      });
    },
    []
  );

  const addHandler = useCallback((id: string, userEmail: string) => {
    setOpen(true);
    setLectureId(id);
    setUserEmail(userEmail);
  }, []);

  useEffect(() => {
    axios
      .get(`user/${authCtx.user.email}`)
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  const addAssessmentsHandler = useCallback(() => {
    for (const key in numberInput) {
      const element = numberInput[key];
      const lectId = key;
      for (const key in element) {
        const userEmailGrade: string = key;
        const grade: number = element[key];

        axios
          .post('/assessments/create', {
            assessmentValue: grade,
            userEmail: userEmailGrade,
          })
          .then((res) => {
            const assessmentId: string = res.data._id;
            if (res.status === 200) {
              axios
                .patch(
                  `/users/${userEmailGrade}/add-assessment/${res.data._id}`
                )
                .catch((error) => console.log('Error', error));
              axios
                .patch(`/lectures/${assessmentId}/add-assessment/${lectId}`)
                .catch((error) => console.log('Error', error));
            }
          })
          .catch((error) => console.log(`Error: ${error} `));
      }
    }
  }, []);

  const addAttendanceHandle = useCallback(
    (lectureId: string) => {
      axios
        .post('attendance/create', { attendance: true, validation: false })
        .then((res) => {
          console.log(res.data);
          const attendanceId: string = res.data._id;
          if (res.status === 200) {
            axios
              .patch(
                `/users/${authCtx.user.email}/add-attendance/${res.data._id}`,
                {
                  attendance: true,
                }
              )
              .catch((error) => console.log('Error', error));

            axios
              .patch(`/lectures/${attendanceId}/add-attendance/${lectureId}`, {
                attendance: true,
              })
              .catch((error) => console.log('Error', error));
          }
        })
        .catch((error) => console.log(`Error: ${error} `));
    },
    [lectureId]
  );

  const getInformation = useCallback((data: IUser[]) => {
    const info = data.map((user) => {
      return {
        name: user.name,
        email: user.email,
        roles: user.roles,
        classes: user.courses.map((course: ICourse) => {
          return {
            nameCourse: course.nameCourse,
            lecture: course.lecture.map((lecture: ILectures) => {
              return {
                summary: lecture.summary,
                description: lecture.description,
                assessment: lecture.assessment,
              };
            }),
          };
        }),
      };
    });
    setGetInfo(info);
  }, []);
  useEffect(() => {
    getInformation(data);
  }, [data]);

  const getWorks = courses ? (
    courses.map((course: ICourse) => {
      return (
        <React.Fragment key={course._id}>
          <Typography component="h6" variant="h6">
            {course.nameCourse}
          </Typography>

          {course.lecture ? (
            course.lecture.map((lecture: ILectures) => {
              return (
                <>
                  <Box>
                    <Typography component="h6" variant="h6">
                      {lecture.summary}
                    </Typography>
                    {!authCtx.user.roles.includes('student') && (
                      <Box>
                        {getInfo.map((user: IUser) => {
                          if (!user.roles.includes('student')) {
                            return;
                          }
                          return (
                            <>
                              <Box>
                                <AddAssessments
                                  key={Math.random()}
                                  handleInput={handleNumberInputChange}
                                  user={user}
                                  numberInput={numberInput}
                                  lecture_Id={lecture._id}
                                />
                              </Box>
                            </>
                          );
                        })}
                      </Box>
                    )}
                    {authCtx.user && (
                      <>
                        {authCtx.user.roles.includes('student') && (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={() =>
                                  addAttendanceHandle(lecture._id)
                                }
                              />
                            }
                            label="Attendance"
                          />
                        )}
                        {authCtx.user.roles.includes('student') && (
                          <Button
                            size="small"
                            style={{ margin: 15 }}
                            variant="contained"
                            startIcon={<FilePresent />}
                            onClick={() => {
                              setIsWorkFile(false);
                              addHandler(lecture._id, authCtx.user.email);
                            }}
                          >
                            Justifications
                          </Button>
                        )}
                        <Button
                          size="small"
                          key={lecture._id}
                          style={{ margin: 15 }}
                          variant="contained"
                          startIcon={<PlusOne />}
                          onClick={() => {
                            setIsWorkFile(true);
                            addHandler(lecture._id, authCtx.user.email);
                          }}
                        >
                          {authCtx.user.roles.includes('student')
                            ? 'Submit Work'
                            : 'Add Work'}
                        </Button>
                        {authCtx.user.roles.includes('professor') && (
                          <Button
                            size="small"
                            style={{ margin: 15 }}
                            variant="contained"
                            startIcon={<Send />}
                            onClick={addAssessmentsHandler}
                          >
                            Submit Assessments
                          </Button>
                        )}
                      </>
                    )}
                  </Box>
                  {authCtx.user.roles.includes('student') &&
                    lecture.work &&
                    lecture.work.map((work: IWorks) => {
                      if (work.owner.includes('professor')) {
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

                  {data ? (
                    data.map((user) => {
                      if (
                        user.roles.includes('professor') &&
                        lecture.work &&
                        authCtx.user.roles.includes('student')
                      ) {
                        lecture.work.map((work: IWorks) => {
                          if (work.owner.includes('professor')) {
                            return (
                              <WorkItem
                                key={Math.random()}
                                filename={work.filename}
                                filepath={work.filepath}
                                owner={work.owner}
                              />
                            );
                          }
                        });
                      }
                    })
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', alignContent: 'flex-start' }}>
                        <h3>No work found for this lecture</h3>
                      </Box>
                    </>
                  )}
                </>
              );
            })
          ) : (
            <h3>No lecture found</h3>
          )}
        </React.Fragment>
      );
    })
  ) : (
    <p>No data found!</p>
  );

  return (
    <>
      <div>
        <Box>
          <Typography component="h5" variant="h5">
            Works & Attendance
          </Typography>

          <Box sx={{ margin: '20px' }}>
            <Box>{getWorks}</Box>
          </Box>
        </Box>
        <Box></Box>
      </div>
      {isWorkFile ? (
        <NewWorkModal
          userEmail={userEmail}
          lectureId={lectureId}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        <NewJustificationModal
          userEmail={userEmail}
          lectureId={lectureId}
          open={open}
          onClose={() => {
            setOpen(false);
            setIsWorkFile(true);
          }}
        />
      )}
    </>
  );
});

WorkSection.displayName = 'WorkSection';

export default WorkSection;
