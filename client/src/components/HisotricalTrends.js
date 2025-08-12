import React, { useEffect, useState } from 'react';
import { getDailySummaries } from '../api';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './HistoricalTrends.css'; // Import the CSS file

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const HistoricalTrends = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = cities.map(async (city) => {
          const response = await getDailySummaries(city);
          return { city, data: response.data };
        });

        const results = await Promise.all(dataPromises);
        const dataObj = results.reduce((acc, { city, data }) => {
          acc[city] = data;
          return acc;
        }, {});

        console.log(dataObj)

        setData(dataObj);
      } catch (error) {
        console.error('Error fetching historical trends:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: [],
    datasets: cities.map(city => ({
      label: city,
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }))
  };

  Object.keys(data).forEach(city => {
    data[city].forEach(summary => {
      if (!chartData.labels.includes(summary.date)) {
        chartData.labels.push(summary.date);
      }
      const cityIndex = cities.indexOf(city);
      const dateIndex = chartData.labels.indexOf(summary.date);
      chartData.datasets[cityIndex].data[dateIndex] = summary.avg_temp;
    });
  });

  return (
    <div className="container">
      <h2 className="header">Historical Trends</h2>
      <div className="chart-container">
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};

export default HistoricalTrends;
