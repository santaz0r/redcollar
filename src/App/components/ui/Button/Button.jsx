import styles from './btn.module.scss';

const MyButton = ({ title, onClick, classes, type = 'button', disabledOption }) => {
  return (
    <button className={`${styles.btn} ${classes}`} onClick={onClick} type={type} disabled={disabledOption}>
      {title}
    </button>
  );
};

export default MyButton;
