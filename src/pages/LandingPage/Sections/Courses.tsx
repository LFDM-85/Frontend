import { Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material';
import CourseCard from '../../../shared/components/UI/CourseCard';
// import mathematics from '../../../assets/courses/mathematics.jpg';
// import chemistry from '../../../assets/courses/chemistry.jpg';
// import history from '../../../assets/courses/history.jpg';
// import coding from '../../../assets/courses/coding.jpg';

const layoutSection = {
  position: 'relative',
  height: '85vh',
  justifyContent: 'center',
} as const;

const title = {
  color: (theme: Theme) => theme.palette.secondary.main,
  fontFamily: 'Pacifico',
};

const description = {
  color: (theme: Theme) => theme.palette.secondary.main,
};

const card = {
  width: '25em',
  // height: '200%',
  margin: '1em',
};
const descriptionImageGrid = {
  margin: '2em',
  width: '36rem',
};

const defaultGrid = {
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2em',
};

function Courses() {
  return (
    <>
      <Grid container component="main" sx={layoutSection}>
        <Grid container sx={defaultGrid}>
          <Typography variant="h1" component="h1" sx={title}>
            Your Courses
          </Typography>
        </Grid>

        <Grid container sx={defaultGrid}>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1632571401005-458e9d244591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              title="Mathematics"
              description="Mathematics 1st Level"
            />
          </Grid>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1491841651911-c44c30c34548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              title="History"
              description="History of Portugal"
            />
          </Grid>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=717&q=80"
              title="Chemistry"
              description="Organic Chemistry"
            />
          </Grid>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              title="Computer Science"
              description="Introduction to JavaScript"
            />
          </Grid>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1632571401005-458e9d244591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              title="Mathematics"
              description="Mathematics 1st Level"
            />
          </Grid>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1491841651911-c44c30c34548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              title="History"
              description="History of Portugal"
            />
          </Grid>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=717&q=80"
              title="Chemistry"
              description="Organic Chemistry"
            />
          </Grid>
          <Grid item sx={card}>
            <CourseCard
              image="https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              title="Computer Science"
              description="Introduction to JavaScript"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Courses;
