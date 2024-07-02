import styles from './congrats.module.scss';
import common from '../../../styles/_common.module.scss';
import MyButton from '../ui/Button/Button';
import moment from 'moment';

const Congrats = ({ eventData = {}, onClose, modalText, isFailed = false, isCreated = false, isUnicorn = false }) => {
  const { title, location, dateStart } = eventData;
  const day = moment.utc(dateStart).format('dddd');
  const date = moment.utc(dateStart).format('D MMMM');
  const time = moment.utc(dateStart).format('HH:mm');
  const text = isFailed ? 'Попробуйте позже' : isCreated ? 'Вы добавили новое событие:' : 'Вы теперь участник события:';
  const setClass = () => {
    if (isFailed) return styles.bird;
    return isUnicorn ? styles.unicorn : styles.hand;
  };

  const handleClose = () => onClose();
  return (
    <div className={`${styles.congrats} ${setClass()}`}>
      <div className={styles.congrats__wrapper}>
        <div className={styles.congrats__title}>{modalText}</div>
        <div className={styles.congrats__subtitle}>
          {text} <span>{title}</span>
        </div>
        <div className={styles.congrats__info}>
          {!isFailed && (
            <div className={styles.congrats__date}>
              <div>{day}</div>
              <div>{date}</div>
              <div>{time}</div>
            </div>
          )}
          <div className={styles.congrats__location}>{location}</div>
        </div>
        <MyButton onClick={handleClose} classes={styles.congrats__btn}>
          {isFailed ? 'Хорошо' : 'Отлично'}
        </MyButton>
      </div>
      <button className={common.modal__btn_close} onClick={handleClose}></button>
    </div>
  );
};

export default Congrats;
