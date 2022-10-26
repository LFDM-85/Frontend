import { Box, TextField } from '@mui/material';
import BasicModal from '../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import axios from '../../../interceptors/axios';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const NewClassModal = ({ open, onClose }: IProps) => {
  const { data } = useGetAllUsersData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { nameClass: '', open: true },
  });
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

  const submitHandler = async ({
    nameClass,
    open,
  }: {
    nameClass: string;
    open: boolean;
  }) => {
    const inputs = {
      nameClass,
      open,
    };

    console.log(inputs);

    axios
      .post('class/create', { ...inputs, open: true })
      .then((res) => {
        if (res.status === 201) {
          alert('Class was created');
          return;
        }
      })
      .catch(function (error) {
        alert('Class already exists!');
        console.log(error.message);
        return;
      });
  };

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nameClass"
        label="Class Name"
        {...register('nameClass', {
          required: 'Class Name is required!',
          minLength: {
            value: 3,
            message: 'Invalid name, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 25,
            message: 'Invalid name, must have less then 25 characters',
          },
        })}
        autoComplete="nameClass"
        autoFocus
        error={!!errors?.nameClass}
        helperText={errors?.nameClass ? errors.nameClass.message : null}
        inputProps={{ maxLength: 25 }}
      />
    </Box>
  );
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New Class"
      subTitle="Add new class to school"
      content={getContent()}
      onSubmit={handleSubmit(submitHandler)}
    ></BasicModal>
  );
};
