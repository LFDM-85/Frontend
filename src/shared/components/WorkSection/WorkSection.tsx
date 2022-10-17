import { FilePresent, PlusOne, Send } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import useAuth from '../../hooks/useAuth';
import { IClass, ILectures, IWorks } from '../../interfaces/interfaces';
import NewWorkModal from '../Modals/NewWorkModal/NewWorkModal';
import NewJustificationModal from '../Modals/NewJustificationModal/NewJustificationModal';
import { WorkItem } from '../WorkItem/WorkItem';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';
import { StudentItem } from '../StudentItem/StudentItem';
import { finished } from 'stream';

// ================================
// pass style to diferent file
// users from hooks
// split logic into various files
// ================================

export const WorkSection = () => {
  const authCtx = useAuth();
  const [classes, setClasses] = useState<IClass[]>(() => []);
  const [open, setOpen] = useState(false);
  const [lectureId, setLectureId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const { data } = useGetAllUsersData();
  const [numberInput, setNumberInput] = useState<any>({});
  const [isWorkFile, setIsWorkFile] = useState<boolean>(true);
  const [wasPresent, setWasPresent] = useState<boolean>(false);

  const handleNumberInputChange = (event: any) => {
    setNumberInput((values: any) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  };

  console.log(numberInput);

  const addHandler = (id: string, userEmail: string) => {
    setOpen(true);
    setLectureId(id);
    setUserEmail(userEmail);
  };

  const checkAttendance = () => {
    data &&
      data.map((user) => {
        const currUser = authCtx.user;
        if (user.email === currUser.email) {
          user.classes.map((aclass) => {
            aclass.lecture.map((lecture) => {
              // console.log(lecture.attendance.attendance);
              if (
                lecture.attendance &&
                lecture.attendance.owner === currUser.email &&
                lecture.attendance.attendance === true
              ) {
                console.log(lecture.attendance.attendance);
                return setWasPresent(true);
              } else {
                return setWasPresent(false);
              }
            });
          });
        }
      });
  };

  // const getInfo = () => {
  //   data.map((user) => {
  //     return {
  //       name: user.name,
  //       email: user.email,
  //       classes: user.classes.map((aclass) => {
  //         return {
  //           nameClass: aclass.nameClass,
  //           lecture: aclass.lecture.map((lecture) => {
  //             return {
  //               summary: lecture.summary,
  //               description: lecture.description,
  //               assessment: lecture.assessment,
  //             };
  //           }),
  //         };
  //       }),
  //     };
  //   });
  // };

  useEffect(() => {
    axios
      .get(`auth/${authCtx.user.email}`)
      .then((res) => {
        const classData = res.data.classes;
        setClasses(classData);
      })
      .catch((error) => console.log(`Error: ${error}`));

    checkAttendance();
  }, []);

  const addAttendanceHandle = (lectureId: string) => {
    axios
      .post('attendance/create', { attendance: true, validation: false })
      .then((res) => {
        console.log(res.data);
        setWasPresent(true);
        const attendanceId: string = res.data._id;
        if (res.status === 200) {
          axios
            .patch(
              `/auth/${authCtx.user.email}/add-attendance/${res.data._id}`,
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
  };

  const addAssessments = data ? (
    data.map((user) => {
      if (user.roles.includes('student')) {
        return (
          <div style={{ display: 'flex' }} key={Math.random()}>
            <StudentItem
              key={user._id}
              id={user._id}
              name={user.name}
              icontoggle={false}
              deleteShow={false}
              wasPresent={wasPresent}
            />

            <TextField
              id="outlined-number"
              label="Assessment"
              type="number"
              name={user.email}
              value={numberInput[user.email] ?? 0}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: 0, max: 20 } }}
              onChange={handleNumberInputChange}
            />
          </div>
        );
      }
    })
  ) : (
    <h3>No data found</h3>
  );

  const getWorks = classes ? (
    classes.map((aclass: IClass) => {
      return (
        <>
          <Typography component="h6" variant="h6">
            {aclass.nameClass}
          </Typography>

          {aclass.lecture ? (
            aclass.lecture.map((lecture: ILectures) => {
              return (
                <>
                  <Box>
                    <Typography component="h6" variant="h6">
                      {lecture.summary}
                    </Typography>
                    {!authCtx.user.roles.includes('student') && addAssessments}
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
                            // onClick={submitHandlerGrades}
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
        </>
      );
    })
  ) : (
    <h3>No class found</h3>
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
};
