import styles from './modal.module.scss';

const Modal = ({ children, setActive }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.modal} type="button" onClick={() => setActive(false)}></button>
      <div className={styles.modal__content}>{children}</div>
    </div>
  );
};

export default Modal;
