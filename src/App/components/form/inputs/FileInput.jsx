import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './file.module.scss';

import fileService from '../../../services/file.service';

const FileInput = () => {
  const { register, setValue } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploaded, setUploaded] = useState();

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    const regex = /^image\//;
    setDragActive(false);
    const formData = new FormData();
    files.forEach((i) => {
      if (i.type.match(regex)) {
        formData.append('files', i);
      }
    });
    console.log(formData.getAll('files'));
    const res = await fileService.uploadFiles(formData);
    console.log('res', res);
    // setValue('files', files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <>
      <div
        style={{ border: '1px dashed #000', padding: '20px', cursor: 'pointer' }}
        onDragStart={onDragOver}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
      >
        {dragActive && 'ТШЩШТШГТШНГИНГШИ'}
        Перетащите файлы сюда или кликните для выбора
      </div>

      {selectedFiles && <div>!!!!{selectedFiles.name}!!!!</div>}
      {uploaded && (
        <h2>
          <img src={`http://localhost:1337/${uploaded[0].url}`} alt="kek" />
          {uploaded[0].name}
        </h2>
      )}
    </>
  );
};

export default FileInput;
