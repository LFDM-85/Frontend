import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';

// ================================
// pass style to diferent file
// ================================

type Props = {
  id: string;
  name: string;
  key: string;
  isValidated: boolean;
};

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
export const ProfessorItem = ({ name, id, isValidated }: Props) => {
  const classes = useStyles();
  const [validate, setValidate] = useState(isValidated);

  const setValidationHandler = () => {
    setValidate((prevState) => !prevState);
  };

  useEffect(() => {
    axios
      .patch(`/auth/${id}`, { isValidated: validate })
      .catch((error) => console.log('Error', error));
  }, [setValidationHandler]);

  return (
    <ListItem className={classes.item} onClick={setValidationHandler}>
      <ListItemText key={id}>{name}</ListItemText>
      {validate && <CheckIcon />}
    </ListItem>
  );
};
