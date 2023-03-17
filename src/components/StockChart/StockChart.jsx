import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);


Chart.register(...registerables);

const StockChart = ({ symbol, timeSeriesData }) => {

    if (!timeSeriesData) {
        return <div>Loading...</div>;
    }
    const filteredObject = {};
    Object.keys(timeSeriesData).forEach(key => {
        const keyDateObj = new Date(key);
        const keyHour = keyDateObj.getHours();
        if (keyHour >= 9 && keyHour <= 16) {
            filteredObject[key] = timeSeriesData[key];
        }
    })
    const chartData = {
        labels: Object.keys(filteredObject),
        datasets: [
            {
                label: `${symbol} Intraday Close Price`,
                data: Object.values(filteredObject).map((entry) => parseFloat(entry['4. close'])),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };
    return (
        <div>
            <Line data={chartData} options={{ maintainAspectRatio: false, scales: { x: { type: 'time', time: { unit: 'hour' }, ticks: { source: 'data' } }, }, }} />
        </div>
    );
};

export default StockChart;
