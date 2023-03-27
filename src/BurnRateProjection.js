import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import { calculateLinearRegression } from './linearRegression';

const BurnRateProjection = ({
  initialBalance: initialBalanceProp,
  expenses: expensesProp,
  startYear: startYearProp,
  endYear: endYearProp,
}) => {
  const [initialBalance, setInitialBalance] = useState(initialBalanceProp);
  const [expenses, setExpenses] = useState(expensesProp);
  const [startYear, setStartYear] = useState(startYearProp);
  const [endYear, setEndYear] = useState(endYearProp);
  const [chartInstance, setChartInstance] = useState(null);

  // Define quarters and years arrays
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const years = [...Array(endYear - startYear + 1).keys()].map(
    (x) => x + startYear
  );

  // Create chart reference using React ref
  const chartRef = useRef(null);

  // Define effect to create and update chart
  useEffect(() => {
    // ... (rest of the useEffect)
  }, [initialBalance, expenses, startYear, endYear, chartInstance, years, quarters]);

  const handleInputChange = useCallback((event, setState, minValue = 0) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      setState('');
    } else {
      setState(Math.max(value, minValue));
    }
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="initial-balance-input">Initial Balance:</label>
        <input
          type="number"
          id="initial-balance-input"
          value={initialBalance}
          min="0"
          onChange={(event) => handleInputChange(event, setInitialBalance)}
        />
      </div>
      <div>
        <label htmlFor="expenses-input">Expenses:</label>
        <input
          type="number"
          id="expenses-input"
          value={expenses}
          min="0"
          onChange={(event) => handleInputChange(event, setExpenses)}
        />
      </div>
      <div>
        <label htmlFor="start-year-input">Start Year:</label>
        <input
          type="number"
          id="start-year-input"
          value={startYear}
          min="0"
          onChange={(event) => handleInputChange(event, setStartYear)}
        />
      </div>
      <div>
        <label htmlFor="end-year-input">End Year:</label>
        <input
          type="number"
          type="number"
          id="end-year-input"
          value={endYear}
          min={startYear}
          onChange={(event) => handleInputChange(event, setEndYear, startYear)}
        />
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

BurnRateProjection.defaultProps = {
  initialBalance: 20,
  expenses: 10,
  startYear: 2000,
  endYear: 2023,
};

BurnRateProjection.propTypes = {
  initialBalance: PropTypes.number,
  expenses: PropTypes.number,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
};

export default BurnRateProjection;



