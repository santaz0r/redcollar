/* eslint-disable react/prop-types */
import styles from './calendar.module.scss';

const Calendar = ({ startDay }) => {
  const day = startDay.clone().subtract(1, 'day');
  const totalDays = 42;
  const daysArr = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
  const setWeekend = (day) => {
    console.log(day);
    const isWeekend = day === 0 || day === 6;
    return isWeekend ? styles.weekend : null;
  };
  console.log(daysArr);
  return (
    <div className={styles.calendar}>
      {daysArr.map((i) => (
        <div className={`${styles.cell} ${setWeekend(i.day())}`} key={i.format('DDMMYYYY')}>
          <div className={styles.row}>
            <div className={styles.day}>{i.format('D')}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
