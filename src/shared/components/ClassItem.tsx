import { ListItem, ListItemText } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { makeStyles } from '@mui/styles';
import React from 'react';

interface Props {
  name: string;
  toggle?: () => void;
}

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#4BB7EA',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});

const ClassItem: React.FC<Props> = ({ name, toggle }: Props) => {
  const classesStyles = useStyles();

  return (
    <ListItem className={classesStyles.item} onClick={toggle}>
      <ListItemText>{name}</ListItemText>
      <CastForEducationIcon />
    </ListItem>
  );
};

export default React.memo(ClassItem);
