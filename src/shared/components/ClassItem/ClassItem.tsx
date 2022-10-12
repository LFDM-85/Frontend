import { ListItem, ListItemText } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { makeStyles } from '@mui/styles';

// ================================
// pass style to diferent file
// check props/any
// ================================

type Props = {
  name: string;
  toggle: () => void;
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
export const ClassItem = ({ name, toggle }: any) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item} onClick={toggle}>
      <ListItemText>{name}</ListItemText>
      <CastForEducationIcon />
    </ListItem>
  );
};
