import { useState } from 'react';
import styles from './text-field.module.scss';
import Regexp from './patterns';

const TextField = ({ label, field, type = 'text', placeholder, register, error, value = '', isHide, handleTrim }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className={isHide ? styles.hide : ''}>
      <label className={styles.label} htmlFor={field}>
        <div className={styles.label__title}>{label}</div>
        <input
          type={showPassword ? 'text' : type}
          id={field}
          placeholder={placeholder}
          defaultValue={value}
          {...register(field, {
            required: 'Поле обязательно для заполнения',
            pattern: {
              value: Regexp[field].pattern,
              message: Regexp[field].message,
            },
          })}
          onChange={handleTrim}
        />
      </label>
      {<div className="error">{error[field]?.message?.toString()}</div>}
      {type === 'password' && type === field && (
        <label htmlFor="chk" className={'styles.pass_label'}>
          <input type="checkbox" id="chk" onChange={toggleShowPassword} checked={showPassword} />
        </label>
      )}
    </div>
  );
};

export default TextField;
