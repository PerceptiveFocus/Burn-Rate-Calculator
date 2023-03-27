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
  // ... (rest of the useState hooks)

  // Define quarters and years arrays
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const years = [...Array(endYear - startYear + 1).keys()].map(
    (x) => x + startYear
  );

  // Create chart reference using React ref
  const chartRef = useRef(null);

  // Define effect to create and update chart
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chartData = generateChartData(); // You need to define this function
    const chartOptions = {}; // Set your chart options here

    if (chartInstance) {
      chartInstance.data = chartData;
      chartInstance.options = chartOptions;
      chartInstance.update();
    } else {
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });
      setChartInstance(newChartInstance);
    }
  }, [initialBalance, expenses, startYear, endYear, chartInstance, years, quarters]);

  const generateChartData = () => {
    // Generate data points for the chart
    const dataPoints = years.flatMap((year) =>
      quarters.map((quarter) => ({
        x: `${year}-${quarter}`,
        y: initialBalance - expenses * (year - startYear) * 4,
      }))
    );

    return {
      labels: dataPoints.map((point) => point.x),
      datasets: [
        {
          label: 'Burn Rate',
          data: dataPoints.map((point) => point.y),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        },
      ],
    };
  };

  // ... (rest of the component code)

  return (
    <div className="container">
      <h1>Burn Rate Projection</h1>
      <div className="form-group">
        {/* ... (rest of the input fields) */}
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

// ... (rest of the component code)

return (
  <div className="container">
    <h1>Burn Rate Projection</h1>
    <div className="form-group">
      {/* ... (rest of the input fields) */}
    </div>
    <canvas ref={chartRef} />
  </div>
);

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
