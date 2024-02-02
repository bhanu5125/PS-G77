import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import axios from 'axios';

const Graph = () => {
  const chartRef = useRef(null);
  const [gdata, setdata] = useState()

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem("email")
      try {
        const response = await axios.get(`/activityset/${email}`)
        setdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [])
  useEffect(() => {
    // Data for the chart
    const datasets = [
      [5, 8, 10, 3],
      [1, 6, 9, 4, 2],
      [10, 7, 3],
      [8, 5, 2, 10],
      [9, 4, 7, 1, 3],
      [6, 8, 2, 10, 4],
      [10, 6, 3, 8],
    ];
  
    const labels = ['22-12-23', '24-12-23', '25-12-23', '26-12-23', '27-12-23', '28-12-23', '2024-02-01'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Scores',
          data: datasets.map((dataset) => dataset.reduce((acc, val) => acc + val, 0) / dataset.length),
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderWidth: 1,
        },
      ],
    };

    // Chart configuration
    const config = {
      type: 'line', // Use 'bar' type for histogram
      data: data,
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
            display: false,
          },
        },
        elements: {
          bar: {
            borderRadius: 8, // Adjust the bar corner radius
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
        categoryPercentage: 0.2, // Adjust the space between bars
        scales: {
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
          },
          y: {
            grid: {
              display: false, // Hide y-axis grid lines
            },
          },
        },
      },
    };

    // Create the chart
    const myChart = new Chart(chartRef.current, config);

    // Cleanup the chart on component unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  return <div style={{width:'400px',height:'500px',zoom:1}}>
    <canvas  ref={chartRef}  />
    </div>;
};

export default Graph;
