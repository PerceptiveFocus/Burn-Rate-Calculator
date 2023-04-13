import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import MainComponent from './MainComponent';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MainComponent />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

