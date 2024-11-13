import React from 'react';
import { Bar } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './SalesReport.css';  


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SalesReport() {
 
  const salesData = [
    { date: '2024-11-01', amount: 100 },
    { date: '2024-11-02', amount: 150 },
    { date: '2024-11-03', amount: 120 },
    { date: '2024-11-04', amount: 180 },
    { date: '2024-11-05', amount: 160 },
  ];

 
  const chartData = {
    labels: salesData.map((data) => data.date), 
    datasets: [
      {
        label: 'Sales Amount ($)', 
        data: salesData.map((data) => data.amount), 
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 1, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Report',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="sales-report-container">
      <h2>Sales Report</h2>
      <div className="chart-container"> 
        <Bar data={chartData} options={chartOptions} /> 
      </div>
    </div>
  );
}

export default SalesReport;
