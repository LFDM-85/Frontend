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

export const WorkSection = () => {
  const authCtx = useAuth();
  const [classes, setClasses] = useState<IClass[]>(() => []);
  const [open, setOpen] = useState(false);
  const [lectureId, setLectureId] = useState<string>();
  const { data } = useGetAllUsersData();
  const [numberInput, setNumberInput] = useState('');
  const [isWorkFile, setIsWorkFile] = useState<boolean>(true);

  const handleNumberInputChange = (event: any) => {
    console.log(numberInput);
  };

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

  console.log('User:', authCtx.user._id);
  const addAttendanceHandle = (lectureId: string) => {
    axios
      .post('attendance/create', { attendance: false, validation: false })
      .then((res) => {
        if (res.status === 200) {
          axios
            .patch(`/auth/${authCtx.user._id}/add-attendance/${res.data._id}`, {
              attendance: true,
            })
            .catch((error) => console.log('Error', error));

          axios
            .patch(`/lectures/${res.data._id}/add-attendance/${lectureId}`, {
              attendance: true,
            })
            .catch((error) => console.log('Error', error));
        }
      })
      .catch((error) => console.log(`Error: ${error} `));
  };

  const addAssessments = data ? (
    data.map((student) => {
      if (student.roles.includes('student')) {
        return (
          <div style={{ display: 'flex' }} key={Math.random()}>
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
              value={numberInput}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setNumberInput(event.target.value);
              }}
            />
            <Button
              style={{ margin: 15 }}
              variant="contained"
              startIcon={<Send />}
              onClick={handleNumberInputChange}
            >
              Submit
            </Button>
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
                    <Box>
                      <Typography component="h6" variant="h6">
                        {lecture.summary}
                      </Typography>
                      {!authCtx.user.roles.includes('student') &&
                        addAssessments}
                      {authCtx.user.roles.includes('student') && (
                        <>
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
                          <Button
                            size="small"
                            style={{ margin: 15 }}
                            variant="contained"
                            startIcon={<FilePresent />}
                            onClick={() => {
                              setIsWorkFile(false);
                              addHandler(lecture._id);
                            }}
                          >
                            Justifications
                          </Button>
                        </>
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
                              onClick={() => {
                                setIsWorkFile(true);
                                addHandler(lecture._id);
                              }}
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
                        <Box
                          sx={{ display: 'flex', alignContent: 'flex-start' }}
                        >
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
            {authCtx.user.roles.includes('student')
              ? 'Works & Attendance'
              : 'Works'}
          </Typography>

          <Box>
            <Box>{getWorks}</Box>
          </Box>
        </Box>
        <Box></Box>
      </div>
      {isWorkFile ? (
        <NewWorkModal
          lectureId={lectureId}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        <NewJustificationModal
          lectureId={lectureId}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};
