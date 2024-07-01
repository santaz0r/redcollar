import moment from 'moment';
import styles from './grid.module.scss';
import MyButton from '../ui/Button/Button';

const CalendarGrid = ({
  startDay,
  momentInst,
  totalDays,
  setDateStart,
  setDateEnd,
  pickerStart,
  pickerEnd,
  onClick,
}) => {
  const day = startDay.clone().subtract(1, 'day');
  const daysArr = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

  //   const isPassed = (dateStart) => moment().isAfter(dateStart);

  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isCurrentMonth = (day) => momentInst.isSame(day, 'month');

  const isPickerStart = (day) => {
    if (!pickerStart) return;
    const date = moment(pickerStart, 'DD.MM.YYYY');
    const dateInUTC = date.utc().format();

    return moment(dateInUTC).isSame(day, 'day') ? styles.pick_start : '';
  };

  const isPickerEnd = (day) => {
    if (!pickerEnd) return;
    const date = moment(pickerEnd, 'DD.MM.YYYY');
    const dateInUTC = date.utc().format();

    return moment(dateInUTC).isSame(day, 'day') ? styles.pick_end : '';
  };

  const isInRage = (day) => {
    if (!pickerEnd || !pickerStart) return;
    const dateStart = moment(pickerStart, 'DD.MM.YYYY');
    const dateEnd = moment(pickerEnd, 'DD.MM.YYYY');
    const dateToCheck = moment(day, 'DD.MM.YYYY');

    return dateToCheck.isBetween(dateStart, dateEnd) ? styles.in_range : '';
  };

  const formatDay = (day) => day.format('D');

  const transitionDate = (day) => {
    setDateStart ? setDateStart(day) : setDateEnd(day);
  };
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
          <div className={`${styles.cell} ${!isCurrentMonth(i) ? styles.current_month : ''}`} key={i.unix()}>
            <div className={styles.row}>
              <div className={styles.day}>
                <button
                  className={`${styles.day__wrapper} ${isPickerEnd(i)} ${isPickerStart(i)} ${isInRage(i)}`}
                  onClick={() => transitionDate(i)}
                >
                  {!isCurrentDay(i) ? formatDay(i) : <div className={styles.current_day}>{formatDay(i)}</div>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MyButton classes={styles.calendar__submit} onClick={onClick}>
        Применить
      </MyButton>
    </>
  );
};

export default CalendarGrid;
