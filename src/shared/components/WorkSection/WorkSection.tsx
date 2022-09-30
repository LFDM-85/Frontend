import { PlusOne } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';
import useAuth from '../../hooks/useAuth';
import { IClass, ILectures, IWorks } from '../../interfaces/interfaces';
import { WorkItem } from '../WorkItem/WorkItem';

export const WorkSection = () => {
  const authCtx = useAuth();
  const [classes, setClasses] = useState<IClass[]>(() => []);

  const addHandler = (id: string) => {
    console.log('Add file', id);
  };

  useEffect(() => {
    axios
      .get(`auth/${authCtx.user.email}`)
      .then((res) => {
        console.log(res.data);
        const classData = res.data.classes;
        setClasses(classData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  const getWorks = classes ? (
    classes.map((aclass: IClass) => {
      return aclass.lecture ? (
        aclass.lecture.map((lecture: ILectures) => {
          return (
            <>
              <Box>
                <Typography component="h6" variant="h6">
                  {lecture.summary}
                </Typography>
                {lecture.works ? (
                  lecture.works.map((work: IWorks) => {
                    return (
                      <>
                        <Button
                          size="small"
                          style={{ margin: 15 }}
                          variant="contained"
                          startIcon={<PlusOne />}
                          component="span"
                          onClick={() => addHandler(lecture._id)}
                        >
                          Add Work
                        </Button>
                        <WorkItem key={work._id} filename={work.filename} />
                      </>
                    );
                  })
                ) : (
                  <>
                    <Box sx={{ display: 'flex', alignContent: 'flex-start' }}>
                      <h3>No work found for this lecture</h3>
                      <label htmlFor="upload-photo">
                        <input
                          style={{ display: 'none' }}
                          id="upload-photo"
                          name="upload-photo"
                          type="file"
                        />
                        <Button
                          size="small"
                          style={{ margin: 15 }}
                          variant="contained"
                          startIcon={<PlusOne />}
                          component="span"
                          onClick={() => addHandler(lecture._id)}
                        >
                          Add Work
                        </Button>
                      </label>
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

  return (
    <>
      <div>
        <Typography component="h5" variant="h5">
          Works & Attendance
        </Typography>
        <Container sx={{ display: 'flex' }}>
          <Box>
            <Box>works</Box>
            <Box>{getWorks}</Box>
          </Box>
          <Box>Attendance</Box>

          <Box>Assessment</Box>
        </Container>
      </div>
    </>
  );
};
