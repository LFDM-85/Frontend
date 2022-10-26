import { ListItem, ListItemText } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { makeStyles } from '@mui/styles';

// ================================
// pass style to diferent file
// ================================

type Props = {
  name: string;
};

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#32a852',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});
export const AssessmentItem = ({ name }: Props) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemText>{name}</ListItemText>
      <AssessmentIcon />
    </ListItem>
  );
};
