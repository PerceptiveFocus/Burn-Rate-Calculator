import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BurnRateProjection from './BurnRateProjection';

(async () => {
  try {
    ReactDOM.render(
      <React.StrictMode>
        <BurnRateProjection />
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch (error) {
    console.error('Error rendering React app:', error);
  }
})();
