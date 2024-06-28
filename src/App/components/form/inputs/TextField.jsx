import { useState } from 'react';
import styles from './text-field.module.scss';
import { useFormContext } from 'react-hook-form';

const TextField = ({ label, field, type = 'text', placeholder, handleTrim, isHide = false, validationRules }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInput = () => {
    setValue(field, '');
  };
  return (
    <div className={` ${isHide ? styles.hide : styles.container}`}>
      <label className={styles.label} htmlFor={field}>
        <div className={styles.label__title}>{label}</div>

        <input
          type={showPassword ? 'text' : type}
          id={field}
          placeholder={placeholder}
          {...register(field, validationRules)}
          onChange={handleTrim}
        />
        {type === 'text' && <button onClick={clearInput}></button>}
      </label>
      {<div className={styles.error}>{errors[field]?.message?.toString()}</div>}
      {type === 'password' && (
        <label className={styles.pass__label}>
          <input type="checkbox" onChange={toggleShowPassword} checked={showPassword} />
        </label>
      )}
    </div>
  );
};

export default TextField;
