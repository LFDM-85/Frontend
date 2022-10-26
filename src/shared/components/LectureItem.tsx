import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

// ================================
// pass style to diferent file
// ================================

type Props = {
  summary: string;
  description: string;
  // assessment: IAssessment;
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
export const LectureItem = ({ summary, description }: Props) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemText>{summary}</ListItemText>
      <ListItemText>{description}</ListItemText>
      <DeveloperBoardIcon />
    </ListItem>
  );
};
