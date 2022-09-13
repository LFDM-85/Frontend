import { Delete, Edit } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { useEffect, useState } from 'react';
import axios from '../../../interceptors/axios';

type Props = {
  id: string,
  name: string,
  key: string,
 }

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#e8c792',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px'
  }
});
export const StudentItem = ({ name, id }: Props) => {
  

  const classes = useStyles();

  return (  
    <ListItem className={classes.item} >
      <ListItemText key={id} >{name}</ListItemText>
      <Delete/>
      
    </ListItem>
    
  );
};

