import { Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material';
import CourseCard from '../../../shared/components/UI/CourseCard';

const layoutSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '500px',
  height: '100vh',
} as const;

const title = {
  color: (theme: Theme) => theme.palette.secondary.main,
  fontFamily: 'Pacifico',
};

const card = {
  width: '25em',
  // height: '200%',
  margin: '1em',
};

const defaultGrid = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '500px',
};

const courses = [
  {
    id: 1,
    title: 'Mathematics I',
    image:
      'https://images.unsplash.com/photo-1632571401005-458e9d244591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    description: 'Mathematics first level',
  },
  {
    id: 2,
    title: 'History',
    image:
      'https://images.unsplash.com/photo-1491841651911-c44c30c34548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'History of Portugal first level',
  },
  {
    id: 3,
    title: 'Chemistry I',
    image:
      'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=717&q=80',
    description: 'Organic Chemistry first level',
  },
];

function Courses() {
  return (
    <section id="courses">
      <Grid container component="main" sx={layoutSection}>
        <Grid container sx={defaultGrid}>
          {courses.map((course) => (
            <Grid item sx={card} key={course.id}>
              <CourseCard
                image={course.image}
                title={course.title}
                description={course.description}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </section>
  );
}

export default Courses;
