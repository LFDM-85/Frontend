import { ListItem, ListItemText } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { makeStyles } from '@mui/styles';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';
import axios from '../../../interceptors/axios';
import { IClass, IUser } from '../../interfaces/interfaces';
import { PeopleItem } from '../PeopleItem/PeopleItem';

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
export const EditClassItem = ({ name, id }: Props) => {
  const { data } = useGetAllUsersData();
  const classes = useStyles();

  const toggleHandler = (people: IUser) => {
    {
      people.classes &&
        people.classes.map((aclass: IClass) => {
          if (aclass._id === id) {
            axios.patch(`auth/${people._id}/remove-class/${id}`).then((res) => {
              console.log('User removed from class');
            });
          } else {
            axios.patch(`auth/${people._id}/add-class/${id}`).then((res) => {
              console.log('User added to class');
            });
          }
        });
    }
    {
      !people.classes && <h3>No classes found to add people</h3>;
    }
  };

  return (
    <>
      <ListItem className={classes.item}>
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
              <div>
                <PeopleItem
                  key={people._id}
                  id={people._id}
                  name={people.name}
                  role={people.roles}
                  icontoggle={people.classes.find(
                    (item) => item.nameClass === name
                  )}
                  classToggle={() => toggleHandler(people)}
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
