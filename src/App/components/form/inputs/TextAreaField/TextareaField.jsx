import { useFormContext } from 'react-hook-form';
import styles from './textarea.module.scss';

const TextareaField = ({ label, field, placeholder, validationRules, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={` ${styles.container}`}>
      <label className={styles.label} htmlFor={field}>
        <div className={styles.label__title}>{label}</div>

        <textarea id={field} placeholder={placeholder} {...register(field, validationRules)} {...rest} />
      </label>
      {<div className={styles.error}>{errors[field]?.message?.toString()}</div>}
    </div>
  );
};

export default TextareaField;
