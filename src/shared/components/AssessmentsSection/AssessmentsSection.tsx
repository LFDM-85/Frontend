import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import { IClass, ILectures } from '../../interfaces/interfaces';
import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import { LectureItem } from '../LectureItem/LectureItem';
import { ClassItem } from '../ClassItem/ClassItem';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';

export const AssessmentsSection = () => {
  const authCtx = useAuth();
  const { data } = useGetAllUsersData();

  const getUserId = data
    ? data.map((user) => {
        return user._id;
      })
    : 'error';

  const compare = authCtx.user.id === getUserId;

  const renderAssessment = data ? (
    data.map((user) => {
      if (compare) {
        return user.classes.map((aclass: IClass) => {
          return (
            <>
              <div key={aclass._id}>
                <ClassItem key={aclass._id} name={aclass.nameClass} />
                {aclass &&
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
                            <h3 key={lecture.assessment._id}>
                              Assessment: {lecture.assessment.assessmentValue}
                            </h3>
                          ) : (
                            <h3> No assessment found</h3>
                          )}
                        </Box>
                      </>
                    );
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
        {renderAssessment}
      </Box>
    </div>
  );
};
