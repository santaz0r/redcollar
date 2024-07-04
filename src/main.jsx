import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import store from './App/store/createStore';
import { Provider } from 'react-redux';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
