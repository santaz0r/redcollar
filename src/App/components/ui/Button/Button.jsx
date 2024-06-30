import styles from './btn.module.scss';

const MyButton = ({ children, onClick, classes, type = 'button', disabledOption = false, primary = true }) => {
  const setClass = () => (primary ? styles.primary : styles.secondary);

  return (
    <button
      className={`${styles.btn} ${classes} ${setClass()}`}
      onClick={onClick}
      type={type}
      disabled={disabledOption}
    >
      {children}
    </button>
  );
};

export default MyButton;
