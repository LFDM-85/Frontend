import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Download } from '@mui/icons-material';

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

interface Props {
  attendance: {
    filename: string;
    owner: string;
    filepath: string;
  };
}
export const JustificationItem = ({ attendance }: Props) => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.item}>
        <Download />
        <ListItemText>
          {attendance.filename} -------- By: {attendance.owner}
        </ListItemText>
        <a href={attendance.filepath}>DOWNLOAD</a>
      </ListItem>
    </>
  );
};
