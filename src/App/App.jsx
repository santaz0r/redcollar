import moment from 'moment';
import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';

import './App.module.scss';

function App() {
  moment.updateLocale('en', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week');
  return (
    <>
      <Header />
      <Calendar startDay={startDay} />
    </>
  );
}

export default App;
