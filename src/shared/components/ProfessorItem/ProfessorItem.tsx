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

  const setValidationHandler = async () => {
    
    const response = await axios.patch(`/auth/${key}`, {isValidated: setValidate(!isValidated)})
      .catch((error) => console.log('Error', error));
    if (response && response.data) {
      console.log(response);
      console.log(response.data);
    }    
  };

  return (  
    <ListItem key={key} className={classes.item} onClick={setValidationHandler}>
      <ListItemText >{name}</ListItemText>      
      {validate && <CheckIcon />}
    </ListItem>
    
  );
};

