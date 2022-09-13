import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import axios from '../../../interceptors/axios';



type Props ={
  name: string,
  key: string,
  isValidated: boolean
}
export const ProfessorItem = ({ name, key, isValidated }: Props) => {
  

  // const changeIsValidatedHandler = () => { };



  return (  
    <ListItem>
      <ListItemText key={key}>{name}</ListItemText>      
      {isValidated && <CheckIcon />}
    </ListItem>
    
  );
};

