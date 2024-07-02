import moment from 'moment';
import styles from './calendar.module.scss';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import EventInfo from '../EventInfo/EventInfo';
import EventBadge from '../ui/EventBadge/EventBadge';
import CheckEmailForm from '../form/CheckEmailForm/CheckEmailForm';
import Congrats from '../Congrats/Congrats';

const Calendar = ({ startDay, momentInst, totalDays, events }) => {
  const day = startDay.clone().subtract(1, 'day');
  const [isModalActive, setModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState('event');

  const [eventInfo, setEventInfo] = useState(null);
  const daysArr = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
  const setWeekend = (day) => {
    const isWeekend = day === 0 || day === 6;
    return isWeekend ? styles.weekend : '';
  };

  const handleClick = (event) => {
    setModalActive(true);
    setEventInfo(event);
    setCurrentModal('event');
  };

  const handleModalClose = () => setModalActive(false);
  const isPassed = (dateStart) => moment().isAfter(dateStart);

  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isCurrentMonth = (day) => momentInst.isSame(day, 'month');
  const formatDayOfMonth = (day) => {
    return day.date() === 1 ? day.format('D MMM') : day.format('D');
  };

  return (
    <>
      {isModalActive && (
        <Modal>
          {currentModal === 'event' && (
            <EventInfo setCurrentModal={setCurrentModal} eventData={eventInfo} onClose={handleModalClose} />
          )}
          {currentModal === 'login' && <CheckEmailForm onClose={handleModalClose} setActive={setModalActive} />}
          {currentModal === 'congrats' && (
            <Congrats eventData={eventInfo} onClose={handleModalClose} modalText={'Поздравляем!'} />
          )}
          {currentModal === 'failed' && (
            <Congrats onClose={handleModalClose} modalText={'Что-то пошло не так'} isFailed />
          )}
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
            className={`${styles.cell} ${setWeekend(i.day())} ${!isCurrentMonth(i) ? styles.current_month : ''}`}
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
                    <EventBadge
                      key={e.id}
                      title={e.title}
                      onClick={() => handleClick(e)}
                      isPassed={!isPassed(e.dateStart)}
                      participants={e.participants}
                      owner={e.owner}
                    />
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
