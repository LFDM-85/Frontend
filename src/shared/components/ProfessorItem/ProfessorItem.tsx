import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { useState } from 'react';
import axios from '../../../interceptors/axios';
// import axios from '../../../interceptors/axios';



type Props ={
  name: string,
  key: string,
  isValidated: boolean
}

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#4BB7EA',
    border: '1px solid #000',
    borderRadius: '20px',
    margin: '5px 5px'
  }
});
export const ProfessorItem = ({ name, key, isValidated }: Props) => {
  const classes = useStyles();
  const [validate, setValidate] = useState(isValidated);

  const updateValidate = {
    isValidated: setValidate(!isValidated)
  };

  const setValidationHandler = async () => {
    await axios.patch(`/auth/${key}`, updateValidate)
      .catch((error) => console.log('Error', error));
    
  };

  return (  
    <ListItem className={classes.item} onClick={setValidationHandler}>
      <ListItemText key={key}>{name}</ListItemText>      
      {validate && <CheckIcon />}
    </ListItem>
    
  );
};

