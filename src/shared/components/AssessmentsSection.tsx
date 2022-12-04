import { Typography } from '@mui/material';
import { ICourse, ILectures } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../hooks/useAuth';
import LectureItem from './LectureItem';
import CourseItem from './CourseItem';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import { makeStyles } from '@mui/styles';
import React, { memo } from 'react';

const useStyles = makeStyles({
  boxItem: {
    mb: 2,
    height: '80vh',
    overflow: 'hidden',
    overflowY: 'scroll',
    padding: '15px',
    margin: '15px',
  },
});

const AssessmentsSection = memo(() => {
  const authCtx = useAuth();
  const { data } = useGetAllUsersData();
  const classesStyles = useStyles();

  const signUser = authCtx.user;

  const renderAssessment = data ? (
    data.map((user) => {
      if (user.email === signUser.email) {
        return user.courses.map((course: ICourse) => {
          return (
            <>
              <div key={course._id}>
                <CourseItem key={course._id} name={course.nameCourse} />
                {course &&
                  course.lecture.map((lecture: ILectures) => {
                    if (lecture.assessment[0]) {
                      const assessmentUserEmail =
                        lecture.assessment[0].userEmail;
                      const assessmentValue =
                        lecture.assessment[0].assessmentValue;

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
                            {signUser.email === assessmentUserEmail ? (
                              <h3 key={lecture.assessment[0]._id}>
                                Assessment:{' '}
                                {lecture.assessment[0].assessmentValue}
                              </h3>
                            ) : (
                              <h3> No assessment found</h3>
                            )}
                          </Box>
                        </>
                      );
                    }
                  })}
              </div>
            </>
          );
        });
      }
    })
  ) : (
    <h3>No data found</h3>
  );

  return (
    <>
      <Typography component="h5" variant="h5">
        My Assessments
      </Typography>
      <Box className={classesStyles.boxItem}>{renderAssessment}</Box>
    </>
  );
});

AssessmentsSection.displayName = 'AssessmentsSection';

export default React.memo(AssessmentsSection);
