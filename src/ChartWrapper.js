import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const ChartWrapper = ({ chartData, chartOptions }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  }, [chartData, chartOptions]);

  return <canvas ref={canvasRef} />;
};

export default ChartWrapper;
