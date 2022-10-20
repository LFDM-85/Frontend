import { TextField } from '@mui/material';
import { IUser } from '../../interfaces/interfaces';
import { StudentItem } from '../StudentItem/StudentItem';

interface Props {
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    email: string
  ) => void;
  numberInput: any;
  user: IUser;
  key: number;
}

const AddAssessments: React.FC<Props> = ({
  handleInput,
  numberInput,
  user,
  key,
}: Props) => {
  // console.log(user);
  return (
    <div style={{ display: 'flex' }} key={key}>
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
          value={numberInput[user.email] ?? 0}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 20 } }}
          onChange={(e) => handleInput(e, user.email)}
        />
      </>
    </div>
  );
};

export default AddAssessments;
