import { useFormContext } from 'react-hook-form';
import styles from './textarea.module.scss';

const TextareaField = ({ label, field, placeholder, validationRules, isRequired, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const setRequiredClass = () => (isRequired ? styles.required : '');
  return (
    <div className={` ${styles.container}`}>
      <label className={styles.label} htmlFor={field}>
        <div className={`${styles.label__title} ${setRequiredClass()}`}>{label}</div>

        <textarea id={field} placeholder={placeholder} {...register(field, validationRules)} {...rest} />
      </label>
      {<div className={styles.error}>{errors[field]?.message?.toString()}</div>}
    </div>
  );
};

export default TextareaField;
