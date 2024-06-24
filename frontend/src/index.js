import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

import './globalStyles.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add('fonts-loading');
});

window.addEventListener("load", function () {
  document.body.classList.remove('fonts-loading');
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
