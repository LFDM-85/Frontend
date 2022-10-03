import { ListItem, ListItemText } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { makeStyles } from '@mui/styles';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';
import { StudentItem } from '../StudentItem/StudentItem';
import axios from '../../../interceptors/axios';
import { IClass } from '../../interfaces/interfaces';
import { useState } from 'react';
import { PeopleItem } from '../PeopleItem/PeopleItem';

type Props = {
  name: string;
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
export const EditClassItem = ({ name, id, toggle }: any) => {
  const { data } = useGetAllUsersData();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const classes = useStyles();

  const toggleHandler = (email: string) => {
    axios.get(`/auth/${email}`).then((res) => {
      console.log(res.data);
      {
        res.data.classes ? (
          res.data.classes.map((aclass: IClass) => {
            if (aclass._id === id) {
              setIsAdded(true);
              console.log(isAdded);
            } else {
              setIsAdded(false);
              console.log(isAdded);
            }

            {
              !isAdded &&
                axios
                  .patch(`auth/${res.data._id}/add-class/${id}`)
                  .then((res) => {
                    setIsAdded(true);
                    console.log('User added to class');
                  });
            }
            {
              isAdded &&
                axios
                  .patch(`auth/${res.data._id}/remove-class/${id}`)
                  .then((res) => {
                    setIsAdded(false);
                    console.log('User removed from class');
                  });
            }
          })
        ) : (
          <h3>No data</h3>
        );
      }
    });
  };

  return (
    <>
      <ListItem className={classes.item} onClick={toggle}>
        <ListItemText>{name}</ListItemText>
        <CastForEducationIcon />
      </ListItem>
      {data ? (
        data.map((people) => {
          if (
            people.roles.includes('student') ||
            people.roles.includes('professor')
          ) {
            return (
              <div onClick={() => toggleHandler(people.email)}>
                <PeopleItem
                  key={people._id}
                  id={people._id}
                  name={people.name}
                  icontoggle={isAdded}
                />
              </div>
            );
          }
        })
      ) : (
        <h3>No data found</h3>
      )}
    </>
  );
};
