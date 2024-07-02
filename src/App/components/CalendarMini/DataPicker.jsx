import { useState } from 'react';
import moment from 'moment';
import CalendarGrid from './CalendarGrid';

import styles from './calendar-mini.module.scss';
import MiniHeader from './MiniHeader';
import { useFormContext } from 'react-hook-form';

const TOTAL_DAYS = 42;

const DataPicker = ({ validationRules }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [momentInst, setMomentInst] = useState(moment());
  const startDay = momentInst.clone().startOf('month').startOf('week');
  const handlePrev = () => setMomentInst((prev) => prev.clone().subtract(1, 'month'));
  const handleNext = () => setMomentInst((prev) => prev.clone().add(1, 'month'));

  const [isActive, setIsActive] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleOpenStart = () => {
    setIsActive(true);
    setIsStart(true);
    setIsEnd(false);
  };

  const handleOpenEnd = () => {
    setIsActive(true);
    setIsStart(false);
    setIsEnd(true);
  };

  const setDateStart = (data) => {
    const date = data.format('DD.MM.YYYY');
    console.log(date);
    setStartDate(date);
  };

  const setDateEnd = (data) => {
    const date = data.format('DD.MM.YYYY');
    console.log(date);
    setEndDate(date);
  };

  const handleSubmit = () => {
    setValue('dateStart', startDate, { shouldValidate: true });
    setValue('dateEnd', endDate);

    setIsActive(false);
    setIsStart(false);
    setIsEnd(false);
  };

  const notice = () => (isEnd ? 'Выберите конечную дату' : 'Выберите дату начала');

  return (
    <div className={styles.date_picker}>
      <div className={styles.date_picker__inputs}>
        <div className={styles.date_picker__input}>
          <div className={styles.date_picker__label}> Начало</div>

          <input
            className={isStart ? styles.active : undefined}
            type="text"
            placeholder=""
            defaultValue={startDate}
            onClick={handleOpenStart}
            {...register('dateStart', validationRules)}
            readOnly
          />
        </div>
        <div className={styles.date_picker__input}>
          <div className={styles.date_picker__label}>Конец</div>
          <input
            className={isEnd ? styles.active : undefined}
            type="text"
            placeholder=""
            defaultValue={endDate}
            onClick={handleOpenEnd}
            readOnly
          />
        </div>
      </div>
      {<div className={styles.error}>{errors['dateStart']?.message?.toString()}</div>}
      {isActive && (
        <>
          {isStart && (
            <div className={styles.calendar} key={'start'}>
              <MiniHeader today={momentInst} handlePrev={handlePrev} handleNext={handleNext} notice={notice()} />
              <CalendarGrid
                startDay={startDay}
                momentInst={momentInst}
                totalDays={TOTAL_DAYS}
                setDateStart={setDateStart}
                pickerStart={startDate}
                pickerEnd={endDate}
                onClick={handleSubmit}
              />
            </div>
          )}
          {isEnd && (
            <div className={styles.calendar} key={'end'}>
              <MiniHeader today={momentInst} handlePrev={handlePrev} handleNext={handleNext} notice={notice()} />
              <CalendarGrid
                startDay={startDay}
                momentInst={momentInst}
                totalDays={TOTAL_DAYS}
                setDateEnd={setDateEnd}
                pickerStart={startDate}
                pickerEnd={endDate}
                onClick={handleSubmit}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DataPicker;
