import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import BurnRateCalculator from './BurnRateProjection';

try {
  ReactDOM.render(
    <React.StrictMode>
      <BurnRateCalculator />
    </React.StrictMode>,
    document.getElementById('root')
  );
} catch (error) {
  console.error('Error rendering React app:', error);
}
