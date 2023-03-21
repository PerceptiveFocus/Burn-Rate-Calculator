import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Chart from 'chart.js/auto';

const useBurnRateChart = (initialBalance, expenses, quarters) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    updateChart();
  }, [initialBalance, expenses, quarters]);

  const calculateBurnRateData = (initialBalance, expenses, quarters) => {
    const cashBalance = [initialBalance];
    for (let i = 1; i < quarters; i++) {
      cashBalance.push(cashBalance[i - 1] - expenses);
    }
    const burnRate = cashBalance.map((value) => value - expenses);

    const chartData = {
      labels: [...Array(quarters).keys()].map((x) => x + 1),
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
        x: {
          title: {
            display: true,
            text: 'Quarter',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Cash Balance',
          },
        },
      },
    };

    return { chartData, chartOptions };
  };

  const updateChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const burnRateData = calculateBurnRateData(initialBalance, expenses, quarters);
    const ctx = canvasRef.current.getContext('2d');

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: burnRateData.chartData,
      options: burnRateData.chartOptions,
    });
  };

  return { updateChart, canvasRef };
};

const BurnRateCalculator = () => {
  const [initialBalance, setInitialBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [quarters, setQuarters] = useState(0);

  const { updateChart, canvasRef } = useBurnRateChart(initialBalance, expenses, quarters);

  return (
    <Container>
      <h1 className="my-4 text-center">Burn Rate Projection Calculator</h1>
      <Form>
        <Form.Group controlId="initialBalance">
          <Form.Label>Starting Cash Balance</Form.Label>
          <Form.Control
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(parseInt(e.target.value))}
            placeholder="Enter starting cash balance"
          />
        </Form.Group>
        <Form.Group controlId="expenses">
          <Form.Label>Monthly Expenses</Form.Label>
          <Form.Control
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(parseInt(e.target.value))}
            placeholder="Enter monthly expenses"
          />
        </Form.Group>
        <Form.Group controlId="quarters">
          <Form.Label>Number of Quarters</Form.Label>
          <Form.Control
            type="number"
            value={quarters}
            onChange={(e) => setQuarters(parseInt(e.target.value))}
            placeholder="Enter number of quarters"
          />
        </Form.Group>
      </Form>
      <Button
        className="mb-4"
        onClick={updateChart}
        disabled={!initialBalance || !expenses || !quarters} // Add this line
      >
        Update Chart
      </Button>
      <canvas ref={canvasRef}></canvas>
      {!initialBalance || !expenses || !quarters && ( // Add this line
        <div className="alert alert-danger" role="alert">
          Please enter values for all fields
        </div>
      )}
    </Container>
  );
};

export default BurnRateCalculator;
