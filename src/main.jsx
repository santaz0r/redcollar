import ReactDOM from 'react-dom/client';
import App from './App/App';

import './index.scss';
import store from './App/store/createStore';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
