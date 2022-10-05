import { Delete } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  id: string;
  name: string;
  key: string;
  icontoggle: boolean;
  deleteShow: boolean;
};

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
export const StudentItem = ({ name, id, deleteShow }: Props) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemText key={id}>{name}</ListItemText>
      {deleteShow && <Delete />}
    </ListItem>
  );
};
