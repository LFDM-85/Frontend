import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Work } from '@mui/icons-material';

type Props = {
  filename: string;
  filepath: string;
  owner: string
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
export const WorkItem = (work: Props) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemText>{work.filename} - {work.owner} - {work.filepath }</ListItemText>
      <Work />
    </ListItem>
  );
};
