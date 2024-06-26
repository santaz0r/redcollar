import moment from 'moment';
import styles from './calendar.module.scss';

const Calendar = ({ startDay, momentInst, totalDays }) => {
  const day = startDay.clone().subtract(1, 'day');

  const daysArr = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
  const setWeekend = (day) => {
    const isWeekend = day === 0 || day === 6;
    return isWeekend ? styles.weekend : '';
  };

  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isCurrentMonth = (day) => momentInst.isSame(day, 'month');

  return (
    <>
      <div className={`${styles.calendar} ${styles.calendar__header}`}>
        {[...Array(7)].map((_, index) => (
          <div key={index} className={`${styles.cell} ${styles.cell__header}`}>
            <div className={styles.row}>
              {moment()
                .day(index + 1)
                .format('dd')}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.calendar}>
        {daysArr.map((i) => (
          <div
            className={`${styles.cell} ${setWeekend(i.day())} ${!isCurrentMonth(i) && styles.current_month}`}
            key={i.unix()}
          >
            <div className={styles.row}>
              <div className={styles.day}>
                <div className={styles.day__wrapper}>
                  {!isCurrentDay(i) ? i.format('D') : <div className={styles.current_day}>{i.format('D')}</div>}
                </div>
              </div>
              <div className={styles.events}>
                <div className={styles.event}>event - 1</div>
                <div className={styles.event}>event - 2</div>
                <div className={styles.event}>event - 3</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
