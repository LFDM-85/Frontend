import { TextField } from '@mui/material';
import { IUser } from '../../interfaces/interfaces';
import { StudentItem } from '../StudentItem/StudentItem';

function AddAssessments(handleInput: any, numberInput: any, user: IUser) {
  return (
    <div style={{ display: 'flex' }} key={Math.random()}>
      <>
        <StudentItem
          // key={'agdfg@adfd.com'}
          // id={'agdfg@adfd.com'}
          // name={'userName'}
          key={user.email}
          id={user.email}
          name={user.name}
          icontoggle={false}
          deleteShow={false}
        />

        <TextField
          id="outlined-number"
          label="Assessment"
          type="number"
          name={'user.email'}
          // value={numberInput[user.email] ?? 0}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 20 } }}
          onChange={() => handleInput}
        />
      </>
    </div>
  );
}

export default AddAssessments;
