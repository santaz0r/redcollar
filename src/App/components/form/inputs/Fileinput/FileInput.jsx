import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { filesEndpoint } from '../../../../config.json';
import fileService from '../../../../services/file.service';

import styles from './file.module.scss';

const FileInput = () => {
  const { setValue } = useFormContext();
  const inputFileRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const processFiles = async (files) => {
    setIsUploading(true);
    const regex = /^image\//;
    const formData = new FormData();
    files.forEach((file) => {
      if (file.type.match(regex)) {
        formData.append('files', file);
      }
    });

    try {
      const res = await fileService.uploadFiles(formData);
      setUploaded((prev) => {
        const newArr = [...prev, ...res];
        setValue('photos', newArr);
        return newArr;
      });
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    }

    setIsUploading(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    await processFiles(files);
    setDragActive(false);
  };

  const handleFileChange = async (e) => {
    const files = [...e.target.files];
    await processFiles(files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const openDialog = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const setDragOverClass = () => {
    return dragActive ? `${styles.drop} ${styles.drag_over}` : styles.drop;
  };

  const handleDelete = async (id) => {
    setUploaded((prev) => {
      const newArr = prev.filter((item) => item.id !== id);
      setValue('photos', newArr);
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
        onClick={openDialog}
      >
        {dragActive ? 'Отпускай' : 'Выберите фото или перетащите сюда'}
        <input
          className={styles.hidden}
          ref={inputFileRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
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
