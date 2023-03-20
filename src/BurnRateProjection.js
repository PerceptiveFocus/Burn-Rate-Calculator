import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [initialBalance, setInitialBalance] = useState(1000000);
  const [expenses, setExpenses] = useState(500000);

  const quarters = [...Array(12).keys()].map((x) => x + 1);

  const createBurnRateChart = () => {
    const cashBalance = [initialBalance];
    for (let i = 1; i < quarters.length; i++) {
      cashBalance.push(cashBalance[i - 1] - expenses);
    }
    const burnRate = cashBalance.map((value) => value - expenses);

    const chartData = {
      labels: quarters,
      datasets: [
        {
          label: 'Burn Rate Projection',
          data: burnRate,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Quarter',
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Cash Balance',
            },
          },
        ],
      },
    };

    const ctx = document.getElementById('burn-rate-chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Burn Rate Projection</h1>
      <div className="form-group">
        <label htmlFor="initial-balance">Initial Balance:</label>
        <input
          type="number"
          className="form-control"
          id="initial-balance"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="expenses">Expenses:</label>
        <input
          type="number"
          className="form-control"
          id="expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={createBurnRateChart}>
        Create Chart
      </button>
      <canvas id="burn-rate-chart"></canvas>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
