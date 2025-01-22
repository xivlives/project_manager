"use client";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimelineChart = ({ data }) => {
  const chartData = {
    labels: data.map(project => project.title),
    datasets: [
      {
        label: 'Days to Completion',
        data: data.map(project => {
          const start = dayjs(project.startDate);
          const end = dayjs(project.endDate);
          return end.diff(start, 'day');
        }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Days',
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: 'Projects',
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default TimelineChart;
