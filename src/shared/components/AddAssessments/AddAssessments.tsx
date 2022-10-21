import { TextField } from '@mui/material';
import { IUser } from '../../interfaces/interfaces';
import { StudentItem } from '../StudentItem/StudentItem';

interface Props {
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    email: string,
    lecture_Id: string
  ) => void;
  numberInput: any;
  user: IUser;
  key: number;
  lecture_Id: string;
}

const AddAssessments: React.FC<Props> = ({
  handleInput,
  numberInput,
  user,
  key,
  lecture_Id,
}: Props) => {
  console.log(numberInput);
  console.log(lecture_Id);
  return (
    <div style={{ display: 'flex' }} key={key}>
      <>
        <StudentItem
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
          name={user.email}
          value={numberInput[lecture_Id]?.[user.email] ?? 0}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 20 } }}
          onChange={(e) => handleInput(e, user.email, lecture_Id)}
        />
      </>
    </div>
  );
};

export default AddAssessments;
