import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import {makeStyles} from '@mui/styles';
// import axios from '../../../interceptors/axios';



type Props ={
  name: string,
  key: string,
  isValidated: boolean
}
const randomColor = Math.floor(Math.random()*16777215).toString(16);

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: `${ randomColor }`,
    border: '1px solid #000',
    borderRadius: '20px',
    margin: '5px 5px'
  }
});
export const ProfessorItem = ({ name, key, isValidated }: Props) => {
  const classes = useStyles();

  // const changeIsValidatedHandler = () => { };



  return (  
    <ListItem className={classes.item}>
      <ListItemText key={key}>{name}</ListItemText>      
      {isValidated && <CheckIcon />}
    </ListItem>
    
  );
};

