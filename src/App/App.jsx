import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/dist/locale/ru';
import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';

import './App.module.scss';

const URL =
  'http://localhost:1337/api/{{path}}?pagination%5BpageSize%5D=100&populate=participants%2C%20owner%2C%20photos';
const TOTAL_DAYS = 42;

function App() {
  moment.updateLocale('ru', {
    week: { dow: 1 },
  });

  const [momentInst, setMomentInst] = useState(moment());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${URL.replace('{{path}}', 'events')}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
      });
  }, []);

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
}

export default App;
