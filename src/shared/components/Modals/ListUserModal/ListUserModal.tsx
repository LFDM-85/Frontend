import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import BasicModal from '../../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from '../../../../interceptors/axios';
import { IUser } from '../../../interfaces/interfaces';
import { StudentItem } from '../../StudentItem/StudentItem';

const NewUserModal = ({ open, onClose }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { summary: '', description: '' },
  });

  const [users, setUsers] = useState<IUser[]>([]);

  const getUsersList = () => {
    axios
      .get('auth/all')
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const modalStyles = {
    inputFields: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      marginBottom: '15px',
      '.MuiInput-root': {
        marginBottom: '20px',
      },
    },
  };

  const submitHandler = () => {
    console.log('submited');
  };

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="summary"
        label="Summary"
        {...register('summary', {
          required: 'Summary is required!',
          minLength: {
            value: 3,
            message: 'Invalid summary, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 55,
            message: 'Invalid summary, must have less then 55 characters',
          },
        })}
        autoComplete="summary"
        autoFocus
        error={!!errors?.summary}
        helperText={errors?.summary ? errors.summary.message : null}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        {...register('description', {
          required: 'Description is required!',
          minLength: {
            value: 3,
            message:
              'Invalid description, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 55,
            message: 'Invalid description, must have less then 55 characters',
          },
        })}
        autoComplete="description"
        autoFocus
        error={!!errors?.description}
        helperText={errors?.description ? errors.description.message : null}
      />
      {users ? (
        users.map((student) => {
          if (student.roles.includes('student')) {
            return (
              <div
                onClick={() => {
                  console.log(student.name);
                }}
              >
                <StudentItem
                  key={student._id}
                  id={student._id}
                  name={student.name}
                />
              </div>
            );
          }
        })
      ) : (
        <h3>No data found</h3>
      )}
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New Student"
      subTitle="Add new student to the lecture"
      content={getContent()}
      onSubmit={handleSubmit(submitHandler)}
    ></BasicModal>
  );
};

export default NewUserModal;
