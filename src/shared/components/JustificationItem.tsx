import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Download } from '@mui/icons-material';
import React, { memo } from 'react';

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#b99fe0',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});

interface Props {
  attendance: {
    filename: string;
    owner: string;
    filepath: string;
  };
}
const JustificationItem = memo(({ attendance }: Props) => {
  const classesStyles = useStyles();

  return (
    <>
      <ListItem className={classesStyles.item}>
        <Download />
        <ListItemText>
          {attendance.filename} -------- By: {attendance.owner}
        </ListItemText>
        <a href={attendance.filepath}>DOWNLOAD</a>
      </ListItem>
    </>
  );
});

JustificationItem.displayName = 'JustificationItem';

export default JustificationItem;
