import styles from './confirm.module.scss';
import common from '../../../styles/_common.module.scss';
import MyButton from '../ui/Button/Button';

const Confirm = ({ onClose, onLeave }) => {
  return (
    <div className={styles.confirm}>
      <div className={styles.confirm__wrapper}>
        <div className={styles.confirm__title}>Вы действительно хотите отменить участие?</div>
        <div className={styles.confirm__btns}>
          <MyButton onClick={onClose} classes={styles.confirm__btn} primary={false}>
            Нет
          </MyButton>
          <MyButton onClick={onLeave} classes={styles.confirm__btn}>
            Да
          </MyButton>
        </div>
      </div>
      <button className={common.modal__btn_close} onClick={onClose}></button>
    </div>
  );
};

export default Confirm;
