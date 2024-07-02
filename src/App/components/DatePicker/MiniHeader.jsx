import styles from './header.module.scss';
import common from '../../../styles/_common.module.scss';

const MiniHeader = ({ today, handleNext, handlePrev, notice }) => {
  const month = today.format('MMMM YYYY');
  return (
    <header className={styles.header}>
      <div className={styles.header__notice}>{notice}</div>
      <div className={styles.header__month_nav}>
        <button onClick={handlePrev} className={`${styles.header__btn} ${common.nav__btn}`}></button>
        <div className={styles.header__month}>{month}</div>
        <button onClick={handleNext} className={`${styles.header__btn} ${common.nav__btn}`}></button>
      </div>
    </header>
  );
};

export default MiniHeader;
