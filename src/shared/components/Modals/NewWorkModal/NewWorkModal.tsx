import { Box, TextField } from '@mui/material';
import BasicModal from '../../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import axios from '../../../../interceptors/axios';

const NewWorkModal = ({ open, onClose, lectureId }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { filename: '', description: '' },
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
  const addWork = (inputs: any) => {
    axios
      .post('work/create', { ...inputs, finished: false })
      .then((res) => {
        console.log(res.data._id);
        if (res.status === 201) {
          console.log('Lecture was created');
          axios
            .patch(`/lectures/${res.data._id}/add-lecture/${lectureId}`)
            .then((res) => {
              if (res.status === 201) console.log('Lecture added to the class');
            })
            .catch(function (error) {
              alert('Lecture already added!');
              console.log(error.message);
              return;
            });
          return;
        }
      })
      .catch(function (error) {
        alert('Lectures already exists!');
        console.log(error.message);
        return;
      });
  };

  const submitHandler = async ({
    filename,
    description,
  }: {
    filename: string;
    description: string;
  }) => {
    const inputs = {
      filename,
      description,
    };

    addWork(inputs);
  };

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="filename"
        label="Add File"
        {...register('filename', {
          required: 'File is required!',
          minLength: {
            value: 3,
            message: 'Invalid filename, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 55,
            message: 'Invalid filename, must have less then 55 characters',
          },
        })}
        autoComplete="filename"
        autoFocus
        error={!!errors?.filename}
        helperText={errors?.filename ? errors.filename.message : null}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Add Work"
      subTitle="Add new work to the lecture"
      content={getContent()}
      onSubmit={handleSubmit(submitHandler)}
    ></BasicModal>
  );
};

export default NewWorkModal;
