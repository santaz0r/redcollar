import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './text-field.module.scss';

const TextField = ({
  label,
  field,
  type = 'text',
  placeholder,
  isHide = false,
  validationRules,
  isRequired = false,
  ...rest
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const hasError = errors[field];
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const clearInput = () => setValue(field, '');

  const setErrorClass = () => (hasError ? styles.error : '');
  const setRequiredClass = () => (isRequired ? styles.required : '');

  const getFieldClass = (fieldName) => {
    fieldName === 'repassword' ? '' : styles.input_success;
    if (Object.keys(errors).length > 0) {
      return errors[fieldName] ? styles.input_error : '';
    }
    return '';
  };

  return (
    <div className={` ${isHide ? styles.hide : styles.container}`}>
      <label className={`${styles.label} ${setErrorClass()} `} htmlFor={field}>
        <div className={`${styles.label__title} ${setRequiredClass()}`}>{label}</div>

        <input
          className={` ${getFieldClass(field)}`}
          type={showPassword ? 'text' : type}
          id={field}
          placeholder={placeholder}
          {...register(field, validationRules)}
          {...rest}
        />

        {type === 'text' && (
          <button className={`${styles.label__button} ${setErrorClass()}`} onClick={clearInput}></button>
        )}
      </label>
      {
        <div className={styles.error}>
          <div className={hasError ? `${styles.error__message} ${styles.active}` : styles.error__message}>
            {hasError?.message?.toString()}
          </div>
        </div>
      }
      {type === 'password' && (
        <label className={styles.pass__label}>
          <input type="checkbox" onChange={toggleShowPassword} checked={showPassword} />
        </label>
      )}
    </div>
  );
};

export default TextField;
