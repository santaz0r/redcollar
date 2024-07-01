import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { filesEndpoint } from '../../../config.json';
import fileService from '../../../services/file.service';

import styles from './file.module.scss';

const FileInput = () => {
  const { register, setValue } = useFormContext();
  const [dragActive, setDragActive] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const files = [...e.dataTransfer.files];
    const regex = /^image\//;
    setDragActive(false);
    const formData = new FormData();
    files.forEach((i) => {
      if (i.type.match(regex)) {
        formData.append('files', i);
      }
    });

    const res = await fileService.uploadFiles(formData);
    setIsUploading(false);

    setUploaded((prev) => {
      const newArr = [...prev, ...res];
      setValue('files', newArr);
      return newArr;
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const setDragOverClass = () => {
    return dragActive ? `${styles.drop} ${styles.drag_over}` : styles.drop;
  };

  const handleDelete = async (id) => {
    setUploaded((prev) => {
      const newArr = prev.filter((item) => item.id !== id);
      setValue('files', newArr);
      return newArr;
    });
  };
  return (
    <div className={styles.files}>
      <div
        className={setDragOverClass()}
        onDragStart={onDragOver}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
      >
        {dragActive ? 'Отпускай' : 'Выберите фото или перетащите сюда'}
      </div>

      {uploaded && (
        <div className={styles.uploaded}>
          {uploaded.map((i) => (
            <div key={i.id} className={styles.uploaded__images}>
              <button onClick={() => handleDelete(i.id)} className={styles.uploaded__remove}></button>
              <img src={`${filesEndpoint}${i.url}`} alt="photo" />
            </div>
          ))}
          {isUploading && <div>Загружаем...</div>}
        </div>
      )}
    </div>
  );
};

export default FileInput;
