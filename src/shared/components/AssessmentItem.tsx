import { ListItem, ListItemText } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { makeStyles } from '@mui/styles';
import React from 'react';

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
const AssessmentItem = ({ name }: Props) => {
  const classesStyles = useStyles();

  return (
    <ListItem className={classesStyles.item}>
      <ListItemText>{name}</ListItemText>
      <AssessmentIcon />
    </ListItem>
  );
};

export default React.memo(AssessmentItem);
