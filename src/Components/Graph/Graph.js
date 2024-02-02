import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Graph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem('email');
      try {
        const response = await axios.get(`/activityset/${email}`);
        const data = response.data.scores;

        // Extract dates and data for Attention and Reflex
        const dates = Object.keys(data);
        const attentionData = data['Attention'] || [];
        const reflexData = data['Reflex'] || [];

        const config = {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: 'Attention',
                data: attentionData,
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Reflex',
                data: reflexData,
                backgroundColor: 'rgba(255, 159, 64, 0.7)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
                angleLines: {
                  display: true,
                  lineWidth: 1,
                },
                position: 'bottom',
              },
              y: {
                beginAtZero: true,
                max: 10,
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          },
        };

        const myChart = new Chart(chartRef.current, config);

        return () => {
          myChart.destroy();
        };
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div style={{ width: '600px', height: '400px', zoom: 1 }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Graph;
