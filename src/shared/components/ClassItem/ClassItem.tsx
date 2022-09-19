import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';

type Props = {
  
  name: string,
  
}

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#4BB7EA',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px'
  }
});
export const ClassItem = ({ name }: Props) => {

  const classes = useStyles();
  // const [open, setOpen] = useState(isOpen);

  // const setOpenHandler = () => {
  //   setOpen(prevState => !prevState);
  // };

  // useEffect(() => {
  //   axios.patch(`/auth/${id}`, { 'isValidated': validate })
  //     .catch((error) => console.log('Error', error));
  // }, [setValidationHandler]);

  return (  
    <ListItem className={classes.item} >
      <ListItemText>{name}</ListItemText>      
      
    </ListItem>
    
  );
};

