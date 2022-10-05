import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { IClass, ILectures } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import { LectureItem } from '../LectureItem/LectureItem';
import { ClassItem } from '../ClassItem/ClassItem';

export const AssessmentsSection = () => {
  const authCtx = useAuth();

  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    axios
      .get(`auth/${authCtx.user.email}`)
      .then((res) => {
        const classData = res.data.classes;
        setClasses(classData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return (
    <div>
      <Typography component="h5" variant="h5">
        My Assessments
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
          classes.map((aclass: IClass) => {
            return (
              <>
                <div key={aclass._id}>
                  <ClassItem key={aclass._id} name={aclass.nameClass} />
                  {aclass.lecture ? (
                    aclass.lecture.map((lecture: ILectures) => {
                      return (
                        <>
                          <Box
                            key={lecture._id}
                            sx={{
                              mb: 2,
                              ml: 2,
                            }}
                          >
                            <LectureItem
                              key={lecture._id}
                              summary={lecture.summary}
                              description={lecture.description}
                            />
                            {lecture.assessment ? (
                              <h3>
                                Assessment: {lecture.assessment.assessmentValue}
                              </h3>
                            ) : (
                              <h3>No assessment found</h3>
                            )}
                          </Box>
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
