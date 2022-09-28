import { ListItem, ListItemText } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { makeStyles } from '@mui/styles';

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
export const ClassItem = ({ name }: Props) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemText>{name}</ListItemText>
      <CastForEducationIcon />
    </ListItem>
  );
};
