import { Delete } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

// ================================
// pass style to diferent file
// ================================

type Props = {
  id: string;
  name: string;
  key: string;
  icontoggle: boolean;
  deleteShow: boolean;
  wasPresent: boolean | undefined;
};

export const StudentItem = ({ name, id, deleteShow, wasPresent }: Props) => {
  const useStyles = makeStyles({
    item: {
      height: '50px',
      alignItems: 'center',
      backgroundColor: '#e8c792',
      border: '1px solid #000',
      borderRadius: '5px',
      margin: '5px 5px',
      padding: '5px',
    },
  });
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemText key={id}>
        {name} - {wasPresent ? 'Present' : 'Not Present'}
      </ListItemText>
      {deleteShow && <Delete />}
    </ListItem>
  );
};
