import moment from 'moment';
import styles from './calendar.module.scss';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import EventInfo from '../EventInfo/EventInfo';

const Calendar = ({ startDay, momentInst, totalDays, events }) => {
  const day = startDay.clone().subtract(1, 'day');
  const [isModalActive, setModalActive] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);

  const daysArr = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
  const setWeekend = (day) => {
    const isWeekend = day === 0 || day === 6;
    return isWeekend ? styles.weekend : '';
  };

  const handleClick = (event) => {
    console.log(event);
    setModalActive(true);
    setEventInfo(event);
  };

  const handleModalClose = () => setModalActive(false);

  // const convertToUnix = (day) => day.format('X');
  // console.log('2024-06-30T10:00:00.000Z'.format('X'));
  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isCurrentMonth = (day) => momentInst.isSame(day, 'month');
  const formatDayOfMonth = (day) => {
    return day.date() === 1 ? day.format('D MMM') : day.format('D');
  };

  return (
    <>
      {isModalActive && (
        <Modal setActive={setModalActive}>
          <EventInfo eventData={eventInfo} onClose={handleModalClose} />
        </Modal>
      )}
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
                  {!isCurrentDay(i) ? (
                    formatDayOfMonth(i)
                  ) : (
                    <div className={styles.current_day}>{formatDayOfMonth(i)}</div>
                  )}
                </div>
              </div>
              <div className={styles.events}>
                {events
                  .filter((e) => i.isSame(e.dateStart, 'day'))
                  .map((e) => (
                    <button onClick={() => handleClick(e)} key={e.id} className={styles.event}>
                      {e.title}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
