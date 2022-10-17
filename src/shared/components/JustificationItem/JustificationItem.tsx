import { Box, Button, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Download, Send, Work } from '@mui/icons-material';
import axios from 'axios';

// ================================
// pass style to diferent file
// ================================

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#b99fe0',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});
export const JustificationItem = (attendance: any) => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.item}>
        <Work />
        <ListItemText>
          {attendance.filename} -------- By: {attendance.owner}
        </ListItemText>
        <a href={attendance.filepath}>DOWNLOAD</a>
      </ListItem>
    </>
  );
};
