import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Chart from 'chart.js/auto';

const useBurnRateChart = (initialBalance, expenses, period, periodType) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    updateChart();
  }, [initialBalance, expenses, period, periodType]);

  const calculateBurnRateData = (initialBalance, expenses, period, periodType) => {
    let quarters;
    if (periodType === 'quarters') {
      quarters = period;
    } else {
      quarters = period * 4;
    }

    const cashBalance = [initialBalance];
    for (let i = 1; i < quarters; i++) {
      cashBalance.push(cashBalance[i - 1] - expenses);
    }
    const burnRate = cashBalance.map((value, index) => value - (expenses * index));

    let xAxisLabel;
    if (periodType === 'quarters') {
      xAxisLabel = 'Quarter';
    } else {
      xAxisLabel = 'Year';
    }

    const chartData = {
      labels: [...Array(quarters).keys()].map((x) => (periodType === 'quarters' ? x + 1 : Math.floor((x + 1) / 4))),
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
            text: xAxisLabel,
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

    const burnRateData = calculateBurnRateData(initialBalance, expenses, period, periodType);
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
  const [period, setPeriod] = useState(0);
  const [periodType, setPeriodType] = useState('quarters');

  const { updateChart, canvasRef } = useBurnRateChart(initialBalance, expenses, period, periodType);

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
        <Form.Group controlId="period">
          <Form.Label>Number of {periodType === 'quarters' ? 'Quarters' : 'Years'}</Form.Label>
          <Form.Control
            type="number"
            value={period}
            onChange={(e) => setPeriod(parseInt(e.target.value))}
            placeholder={`Enter number of ${periodType === 'quarters' ? 'quarters' : 'years'}`}
          />
        </Form.Group>
        <Form.Group controlId="periodType">
          <Form.Label>Period Type</Form.Label>
          <Form.Control as="select" value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
            <option value="quarters">Quarters</option>
            <option value="years">Years</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Button
        className="mb-4"
        onClick={updateChart}
        disabled={!initialBalance || !expenses || !period}
      >
        Update Chart
      </Button>
      <canvas ref={canvasRef}></canvas>
      {!initialBalance || !expenses || !period ? (
        <div className="alert alert-danger" role="alert">
          Please enter values for all fields
        </div>
      ) : null}
    </Container>
  );
};

export default BurnRateCalculator;

