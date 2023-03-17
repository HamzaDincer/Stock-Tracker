// IntradayChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const IntradayChart = ({ symbol, timeSeriesData }) => {
  const chartData = {
    labels: Object.keys(timeSeriesData),
    datasets: [
      {
        label: `${symbol} Intraday Close Price`,
        data: Object.values(timeSeriesData).map((entry) => parseFloat(entry['4. close'])),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default IntradayChart;
