import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './InventoryReport.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function InventoryReport() {
  
  const inventoryData = [
    { item: 'Chow Mein', quantity: 50 },
    { item: 'Fried Rice', quantity: 30 },
    { item: 'Orange Chicken', quantity: 20 },
    { item: 'Broccoli Beef', quantity: 15 },
    { item: 'Spring Rolls', quantity: 25 },
  ];

  const chartData = {
    labels: inventoryData.map((data) => data.item),
    datasets: [
      {
        label: 'Quantity in Stock',
        data: inventoryData.map((data) => data.quantity),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Inventory Report',
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
          text: 'Item',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantity',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="inventory-report-container">
      <h2>Inventory Report</h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default InventoryReport;
