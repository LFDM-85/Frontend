import { Add, Delete } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IClass } from '../../interfaces/interfaces';

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#e8c792',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});

interface IProps {
  name: string;
  id: string;
  icontoggle: IClass | undefined;
  role: string[];
  classToggle: () => void;
}
export const PeopleItem = ({
  name,
  id,
  icontoggle,
  role,
  classToggle,
}: IProps) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item} onClick={classToggle}>
      <ListItemText key={id}>
        {name} - {role}
      </ListItemText>
      {icontoggle && <Delete />}
      {!icontoggle && <Add />}
    </ListItem>
  );
};
