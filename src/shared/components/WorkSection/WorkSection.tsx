import { PlusOne } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import useAuth from '../../hooks/useAuth';
import { IClass, ILectures, IUser, IWorks } from '../../interfaces/interfaces';
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

  const addAssessments = data ? (
    data.map((student) => {
      if (student.roles.includes('student')) {
        return (
          <div
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
          </div>
        );
      }
    })
  ) : (
    <h3>No data found</h3>
  );

  const addAssessmentHandler = (id: string) => {
    console.log('assessment added');
  };

  return (
    <>
      <div>
        <Typography component="h5" variant="h5">
          Works & Attendance
        </Typography>

        <Box>
          <Box>{getWorks}</Box>
        </Box>
        <Box></Box>

        {authCtx.user.roles.includes('professor') && (
          <Box>{addAssessments}</Box>
        )}
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
