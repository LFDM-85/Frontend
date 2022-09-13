import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import {makeStyles} from '@mui/styles';
// import axios from '../../../interceptors/axios';



type Props ={
  name: string,
  key: string,
  isValidated: boolean
}

const useStyles = makeStyles({
  item: {
    height: '35px',
    width: '250px',
    alignItems: 'center',
    backgroundColor: '#4BB7EA',
    border: '1px solid #000',
    borderRadius: '20px',
    margin: '5px 5px'
  }
});
export const ProfessorItem = ({ name, key, isValidated }: Props) => {
  const classes = useStyles();

  return (  
    <ListItem className={classes.item}>
      <ListItemText key={key}>{name}</ListItemText>      
      {isValidated && <CheckIcon />}
    </ListItem>
    
  );
};

