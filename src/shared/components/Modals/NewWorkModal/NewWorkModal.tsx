import BasicModal from '../../common/BasicModal/BasicModal';
import axios from '../../../../interceptors/axios';
import { ChangeEvent, FormEvent, useState } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  lectureId: string | undefined;
}

const NewWorkModal = ({ open, onClose, lectureId }: IProps) => {
  const [file, setFile] = useState<File>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null) {
      return;
    }
    const fileEvent = event.target.files[0];
    if (file) setFile(fileEvent);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();

    if (file != undefined) {
      formData.append('file', file);
      console.log(file);
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
