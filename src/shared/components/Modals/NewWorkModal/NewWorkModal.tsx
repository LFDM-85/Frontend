import { Box } from '@mui/material';
import BasicModal from '../../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import axios from '../../../../interceptors/axios';
import { useState } from 'react';

const NewWorkModal = ({ open, onClose, lectureId }: any) => {
  const [file, setFile] = useState(null);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData();

    if (file != undefined) {
      formData.append('file', file);
      console.log(file);
      // formData.append('filename', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      axios
        .post('work/uploadfile', file, config)
        .then((res) => {
          console.log(res.data._id);
          if (res.status === 201) {
            console.log('Lecture was created');
            axios
              .patch(`/lectures/${res.data._id}/add-lecture/${lectureId}`)
              .then((res) => {
                if (res.status === 201)
                  console.log('Lecture added to the class');
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
    }
  }

  const getContent = () => (
    <form method="post">
      <input type="file" onChange={handleChange} />
    </form>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Add Work"
      subTitle="Add new work to the lecture"
      content={getContent()}
      onSubmit={handleSubmit}
    ></BasicModal>
  );
};

export default NewWorkModal;
