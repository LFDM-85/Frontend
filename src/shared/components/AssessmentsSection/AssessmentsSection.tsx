import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import {
  IAssessment,
  IClass,
  ILectures,
  IUser,
} from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import { LectureItem } from '../LectureItem/LectureItem';
import { ClassItem } from '../ClassItem/ClassItem';

export const AssessmentsSection = () => {
  const authCtx = useAuth();

  const [classes, setClasses] = useState<IClass[]>([]);
  // const [lectures, setLectures] = useState<ILectures[]>([]);

  useEffect(() => {
    axios
      .get(`auth/${authCtx.user.email}`)
      .then((res) => {
        const classData = res.data.classes;
        const lecturesData = res.data.classes.lecture;
        setClasses(classData);
        // setLectures(lecturesData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  console.log(classes);
  // console.log(lectures);

  return (
    <div>
      <Typography component="h5" variant="h5">
        My Assessments
      </Typography>
      <Box
        sx={{
          mb: 2,
          // flexDirection: 'column',
          height: 400,
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
                  <ClassItem key={aclass._id} name={aclass.nameClass} />
                  {aclass.lecture ? (
                    aclass.lecture.map((lecture: ILectures) => {
                      return (
                        <>
                          <LectureItem
                            key={lecture._id}
                            summary={lecture.summary}
                            description={lecture.description}
                            // assessment={lecture.assessment}
                          />
                          {lecture.assessment ? (
                            <h3>{lecture.assessment.assessmentValue}</h3>
                          ) : (
                            <h3>No assessment found</h3>
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
    </div>
  );
};
