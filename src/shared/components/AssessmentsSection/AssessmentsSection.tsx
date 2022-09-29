import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { IAssessment, IClass, IUser } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import { AssessmentItem } from '../AssessmentItem/AssessmentItem';
import { ClassItem } from '../ClassItem/ClassItem';

export const AssessmentsSection = () => {
  const authCtx = useAuth();

  const [classes, setClasses] = useState<IClass[]>([]);
  const [assessment, setAssessments] = useState<IAssessment[]>([]);

  useEffect(() => {
    axios
      .get(`auth/${authCtx.user.email}`)
      .then((res) => {
        const getClasses = res.data.classes;
        const getAssessments = res.data.assessment;
        console.log(res.data);

        setClasses(getClasses);

        setAssessments(getAssessments);
        console.log(assessment);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  const lectureHandler = (aclass: any) => {
    console.log(aclass);
    console.log('searching for lectures');
  };

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
          classes.map((aclass: any) => {
            return (
              <>
                <div>
                  <ClassItem name={aclass} />

                  {assessment ? (
                    assessment.map((assessment: any) => {
                      return (
                        <div
                          key={Math.random()}
                          onClick={() => lectureHandler(assessment)}
                        >
                          <AssessmentItem name={assessment} />
                        </div>
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
        {/* {assessment ? (
          assessment.map((assessment: any) => {
            return (
              <div
                key={Math.random()}
                onClick={() => lectureHandler(assessment)}
              >
                <AssessmentItem name={assessment} />
              </div>
            );
          })
        ) : (
          <h3>No data found</h3>
        )} */}
      </Box>
    </div>
  );
};
