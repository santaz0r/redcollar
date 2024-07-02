import { useState } from 'react';
import styles from './text-field.module.scss';
import { useFormContext } from 'react-hook-form';

const TextField = ({ label, field, type = 'text', placeholder, isHide = false, validationRules, ...rest }) => {
  const {
    register,
    setValue,
    formState: { errors, isSubmitted },
    watch,
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = field === 'password';
  const isRePassword = field === 'repassword';
  const passwordValue = watch('password');
  const rePasswordValue = watch('repassword');
  const passwordsMatch = passwordValue === rePasswordValue && isSubmitted;
  const existPassValues = !passwordValue && !rePasswordValue;
  const borderStyle = existPassValues
    ? 'solid 2px inherit'
    : (isPassword || isRePassword) && passwordsMatch
    ? 'solid 2px green'
    : 'solid 1px red';

  const hasError = errors[field];
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInput = () => {
    setValue(field, '');
  };

  const setErrorClass = () => (hasError ? styles.error : '');

  return (
    <div className={` ${isHide ? styles.hide : styles.container}`}>
      <label className={`${styles.label} ${setErrorClass()}`} htmlFor={field}>
        <div className={styles.label__title}>{label}</div>

        <input
          style={isPassword || isRePassword ? { border: borderStyle } : {}}
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
