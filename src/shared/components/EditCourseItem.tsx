import { ListItem, ListItemText } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { makeStyles } from '@mui/styles';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import axios from '../../interceptors/axios';
import { ICourse, IUser } from '../interfaces/interfaces';
import PeopleItem from './PeopleItem';
import { memo, useCallback } from 'react';
import React from 'react';

type Props = {
  name: string;
  id: string;
};

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#4BB7EA',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});
const EditCourseItem = memo(({ name, id }: Props) => {
  const { data } = useGetAllUsersData();
  const classesStyles = useStyles();

  const toggleHandler = useCallback(async (people: IUser) => {
    const mapclass = people.courses.map((aclass: ICourse) => {
      if (aclass._id === id) {
        return axios.patch(`users/${people._id}/remove-course/${id}`);
      } else {
        return axios.patch(`users/${people._id}/add-course/${id}`);
      }
    });

    await Promise.all(mapclass);
  }, []);

  const renderPeople = data ? (
    data.map((people) => {
      if (
        people.roles.includes('student') ||
        people.roles.includes('professor')
      ) {
        return (
          <div key={people._id}>
            <PeopleItem
              key={people._id}
              id={people._id}
              name={people.name}
              role={people.roles}
              icontoggle={people.courses.find(
                (item) => item.nameCourse === name
              )}
              courseToggle={() => toggleHandler(people)}
            />
          </div>
        );
      }
    })
  ) : (
    <h3>No data found</h3>
  );

  return (
    <>
      <ListItem className={classesStyles.item}>
        <ListItemText>{name}</ListItemText>
        <CastForEducationIcon />
      </ListItem>
      {renderPeople}
    </>
  );
});

EditCourseItem.displayName = 'EditCourseItem';
export default EditCourseItem;
