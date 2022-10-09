import BasicModal from '../../common/BasicModal/BasicModal';
import axios from '../../../../interceptors/axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { margin } from '@mui/system';
import { UploadFile } from '@mui/icons-material';

interface IProps {
  open: boolean;
  onClose: () => void;
  lectureId: string | undefined;
}

const NewJustificationModal = ({ open, onClose, lectureId }: IProps) => {
  const [file, setFile] = useState<any>();

  const handleChange = (file: ChangeEvent) => {
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const upload = await axios({
      url: '/work/uploadfile',
      method: 'post',
      data: formData,
    }).then((r) => r);

    console.log(upload);
  };

  const getContent = () => (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" onChange={handleChange} />
      </form>
    </>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Add Justification"
      subTitle="Add new justification to the lecture"
      content={getContent()}
      onSubmit={handleSubmit}
    ></BasicModal>
  );
};

export default NewJustificationModal;
