import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './InventoryReport.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function InventoryReport() {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const baseUrl = window.location.hostname === 'localhost'
                ? 'http://localhost:5000'
                : import.meta.env.VITE_POS_API_BASE_URL;
                const response = await axios.get(`${baseUrl}/api/inventory`);
                console.log('Fetched inventory data:', response.data);
                // Ensure quantity is converted to numbers
                const formattedData = response.data.map((item) => ({
                    name: item.name,
                    quantity: parseFloat(item.quantity),
                }));
                setInventoryData(formattedData);
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };
        fetchInventory();
    }, []);

    const chartData = {
        labels: inventoryData.map((data) => data.name),
        datasets: [
            {
                label: 'Quantity in Stock',
                data: inventoryData.map((data) => data.quantity),
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
                text: 'Inventory Report',
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

    if (inventoryData.length === 0) {
        return <p>Loading inventory data...</p>;
    }

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
