import { PlusOne, Send } from '@mui/icons-material';
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
import { WorkItem } from '../WorkItem/WorkItem';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';
import { StudentItem } from '../StudentItem/StudentItem';

export const WorkSection = () => {
  const authCtx = useAuth();
  const [classes, setClasses] = useState<IClass[]>(() => []);
  const [open, setOpen] = useState(false);
  const [lectureId, setLectureId] = useState<string>();
  const [attendance, setAttendance] = useState<string>();
  const { data } = useGetAllUsersData();

  const addHandler = (id: string) => {
    setOpen(true);
    setLectureId(id);
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

  const addAttendanceHandle = (lectureId: string) => {
    axios
      .post('attendance/create', { attendance: false, validation: false })
      .then((res) => {
        if (res.status === 200) {
          setAttendance(res.data._id);
        }
        axios
          .patch(`/auth/${authCtx.user.id}/add-attendance/${attendance}`, {
            attendance: true,
          })
          .catch((error) => console.log('Error', error));

        axios
          .patch(`/lectures/${res.data._id}/add-attendance/${lectureId}`, {
            attendance: true,
          })
          .catch((error) => console.log('Error', error));
      })
      .catch((error) => console.log(`Error: ${error} `));
  };

  const addAssessments = data ? (
    data.map((student) => {
      if (student.roles.includes('student')) {
        return (
          <div
            style={{ display: 'flex' }}
            key={student._id}
            onClick={() => addAssessmentHandler(student._id)}
          >
            <StudentItem
              key={student._id}
              id={student._id}
              name={student.name}
              icontoggle={false}
              deleteShow={false}
            />
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
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
      return aclass.lecture ? (
        aclass.lecture.map((lecture: ILectures) => {
          return (
            <>
              <Box>
                <Box>
                  <Typography component="h6" variant="h6">
                    {lecture.summary}
                  </Typography>
                  {!authCtx.user.roles.includes('student') && addAssessments}
                  {authCtx.user.roles.includes('student') && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => addAttendanceHandle(lecture._id)}
                        />
                      }
                      label="Attendance"
                    />
                  )}
                </Box>
                {lecture.works ? (
                  lecture.works.map((work: IWorks) => {
                    return (
                      <>
                        <Button
                          size="small"
                          key={work._id}
                          style={{ margin: 15 }}
                          variant="contained"
                          startIcon={<PlusOne />}
                          onClick={() => addHandler(lecture._id)}
                        >
                          {authCtx.user.roles.includes('student')
                            ? 'Submit Work'
                            : 'Add Work'}
                        </Button>
                        <WorkItem key={work._id} filename={work.filename} />
                      </>
                    );
                  })
                ) : (
                  <>
                    <Box sx={{ display: 'flex', alignContent: 'flex-start' }}>
                      <h3>No work found for this lecture</h3>
                      <Button
                        size="small"
                        style={{ margin: 15 }}
                        variant="contained"
                        startIcon={<PlusOne />}
                        onClick={() => addHandler(lecture._id)}
                      >
                        {authCtx.user.roles.includes('student')
                          ? 'Submit Work'
                          : 'Add Work'}
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </>
          );
        })
      ) : (
        <h3>No lecture found</h3>
      );
    })
  ) : (
    <h3>No class found</h3>
  );

  const addAssessmentHandler = (userId: string) => {
    console.log(userId);
    // const isAttended = data ? (
    //   data.map((user) => {
    //     if (user._id !== userId) {
    //       return;
    //     }
    //     if (user._id === userId) {
    //       return user.classes.map((aclass) => {
    //         return aclass.lecture.map((lecture) => {
    //           if (lecture._id === lectureId) {
    //             if (lecture.attendance) {
    //               console.log('esteve presente');
    //               return lecture.attendance;
    //             } else {
    //               console.log('nao esteve presente');
    //             }
    //           }
    //           if (lecture._id !== lectureId) console.log('erro');
    //         });
    //       });
    //     }
    //   })
    // ) : (
    //   <h3>Erro</h3>
    // );
  };

  return (
    <>
      <div>
        <Box>
          <Typography component="h5" variant="h5">
            {authCtx.user.roles.includes('student')
              ? 'Works & Attendance'
              : 'Works'}
          </Typography>

          <Box>
            <Box>{getWorks}</Box>
          </Box>
        </Box>
        <Box>
          <Typography component="h5" variant="h5">
            Attendance & Assessment
          </Typography>

          {/* {authCtx.user.roles.includes('professor') && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: 470 }}>{addAssessments}</Box>
            </Box>
          )} */}
          <Button
            style={{ margin: 15 }}
            variant="contained"
            startIcon={<Send />}
            onClick={() => console.log('clicked')}
          >
            Submit
          </Button>
        </Box>
      </div>
      <NewWorkModal
        lectureId={lectureId}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
