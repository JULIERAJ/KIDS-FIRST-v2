import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './globalStyles.css';

// import { Provider } from 'react-redux';

import App from './App';
// import { store } from './pages/Panels/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}  
    {/* <Provider> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>,
);
