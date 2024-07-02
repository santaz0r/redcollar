import { useSelector } from 'react-redux';
import styles from './modal.module.scss';
import { getTriggerLoading } from '../../store/events';

const Modal = ({ children, setActive }) => {
  const triggerLoading = useSelector(getTriggerLoading);
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.modal}
        type="button"
        disabled={triggerLoading}
        onClick={() => setActive(false)}
      ></button>
      <div className={styles.modal__content}>{children}</div>
    </div>
  );
};

export default Modal;
