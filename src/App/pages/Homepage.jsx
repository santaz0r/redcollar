import { useState } from 'react';
import moment from 'moment';
import 'moment/dist/locale/ru';
import Calendar from '../components/Calendar/Calendar';
import Header from '../components/Header/Header';

import { useSelector } from 'react-redux';
import { getEventsList } from '../store/events';

const TOTAL_DAYS = 42;

const HomePage = () => {
  moment.updateLocale('ru', {
    week: { dow: 1 },
  });
  const events = useSelector(getEventsList);

  const [momentInst, setMomentInst] = useState(moment());

  const startDay = momentInst.clone().startOf('month').startOf('week');

  const handlePrev = () => {
    setMomentInst((prev) => prev.clone().subtract(1, 'month'));
  };
  const handleNext = () => {
    setMomentInst((prev) => prev.clone().add(1, 'month'));
  };

  return (
    <>
      <Header today={momentInst} handlePrev={handlePrev} handleNext={handleNext} />
      <Calendar startDay={startDay} momentInst={momentInst} totalDays={TOTAL_DAYS} events={events} />
    </>
  );
};

export default HomePage;
