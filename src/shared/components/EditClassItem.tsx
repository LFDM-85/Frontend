import { ListItem, ListItemText } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { makeStyles } from '@mui/styles';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import axios from '../../interceptors/axios';
import { IClass, IUser } from '../interfaces/interfaces';
import { PeopleItem } from './PeopleItem';
import { useCallback } from 'react';

// ================================
// pass style to diferent file
// classes & users from hooks
// ================================

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
  // const [addIcon, setAddIcon] = useState<boolean>();

  const toggleHandler = useCallback(async (people: IUser) => {
    const mapclass = people.classes.map((aclass: IClass) => {
      if (aclass._id === id) {
        return axios.patch(`auth/${people._id}/remove-class/${id}`);
      } else {
        return axios.patch(`auth/${people._id}/add-class/${id}`);
      }
    });
    // return axios.patch(`auth/${people._id}/add-class/${id}`);

    await Promise.all(mapclass);
  }, []);

  const renderPeople = data ? (
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
  );

  return (
    <>
      <ListItem className={classes.item}>
        <ListItemText>{name}</ListItemText>
        <CastForEducationIcon />
      </ListItem>
      {renderPeople}
    </>
  );
};
