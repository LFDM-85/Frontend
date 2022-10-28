import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Work } from '@mui/icons-material';

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
  const classesStyles = useStyles();

  return (
    <>
      <ListItem className={classesStyles.item}>
        <Work />
        <ListItemText>
          {work.filename} -------- By: {work.owner}
        </ListItemText>
        <a href={work.filepath}>DOWNLOAD</a>
      </ListItem>
    </>
  );
};
