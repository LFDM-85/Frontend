import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import BasicModal from '../../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from '../../../../interceptors/axios';

const NewUserModal = ({ open, onClose}: any) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', password: '' },
  });

  const [showFields, setShowFields] = useState(false);

  const showPasswordHandler = () => {
    setShowFields(!showFields);
  };

  const modalStyles = {
    inputFields: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      marginBottom: '15px',
      '.MuiInput-root': {
        marginBottom: '20px',
      }

    }
  };

  const submitHandler = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
    }) => {
    
    
    const inputs = {
      name,
      email,
      password,
    };
    
    console.log(inputs);

    const STUDENT_ROLE = ['student'];

    axios.post('auth/signup', { ...inputs, role: STUDENT_ROLE, isValidated: true }).then((res) => {
      if (res.status === 201) {
        alert('Student was created');
        return;
      }
    }).catch(function (error) {
      alert('Email already exists!');
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
        id="name"
        label="Student Name"
        {...register('name', {
          required: 'Name is required!',
          minLength: {
            value: 3,
            message:
                      'Invalid name, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 25,
            message: 'Invalid name, must have less then 25 characters',
          },
        })}
        autoComplete="name"
        autoFocus
        error={!!errors?.name}
        helperText={errors?.name ? errors.name.message : null}
        inputProps={{ maxLength: 25 }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        {...register('email', {
          required: 'Email is required!',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        autoComplete="email"
        autoFocus
        error={!!errors?.email}
        helperText={errors?.email ? errors.email.message : null}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        {...register('password', {
          required: 'Password is required!',
          minLength: {
            value: 8,
            message:
                    'Invalid password, must have between 8 to 25 characters',
          },
          maxLength: {
            value: 25,
            message:
                    'Invalid password, must have less then 25 characters',
          },
        })}
        label="Password"
        type={showFields ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        error={!!errors?.password}
        helperText={errors?.password ? errors.password.message : null}
        inputProps={{ maxLength: 25 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={showPasswordHandler}
                aria-label="toggle password"
                edge="end"
              >
                {showFields ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );



  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title='New Student'
      subTitle='Add new student to school'
      content={getContent()}
      onSubmit={handleSubmit(submitHandler)}

    ></BasicModal>
  );
};

export default NewUserModal;


