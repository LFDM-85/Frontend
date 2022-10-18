import { Box, Button, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Download, Send, Work } from '@mui/icons-material';
import axios from 'axios';

// ================================
// pass style to diferent file
// ================================

type Props = {
  filename: string;
  filepath: string;
  owner: string;
};

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#64AAF0',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});
export const WorkItem = (work: Props) => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.item}>
        <Work />
        <ListItemText>
          {work.filename} -------- By: {work.owner}
        </ListItemText>
        <a href={work.filepath}>DOWNLOAD</a>
      </ListItem>
    </>
  );
};
