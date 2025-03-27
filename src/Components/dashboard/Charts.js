import React from 'react';
import './MainDash.css'
import { Doughnut, Line } from "react-chartjs-2";
import arrowDown from '../../assets/svgs/arrowDown.svg';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import chartData from './jsonData/chartData.json';
import DailyData from './jsonData/DailyData.json';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);



// Register necessary elements
export const DoughnutCharts = () => {
  return (
    <div className="DoughnutCharts-container">
      <div className="DoughnutCharts">
        <h4>Analytics</h4>
        <Doughnut
          data={{
            labels: chartData.map((item) => item.label),
            datasets: [
              {
                data: chartData.map((item) => item.value),
                backgroundColor: ['#4F63F9', '#0BF7F2', '#068081'],
                borderColor: '#fff',
                borderWidth: 2,
                cutout: '65%',
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
            }
          }}
        />
      </div>

      <div className="ml-4 text-sm">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center mb-1">
            <div
              className="w-2.5 h-2.5 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-700">{item.value}% {item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};



export const LineCharts = () => {
  return (
    <div className="linechart">
      <div className='linechartTop'>
        <h4>Sales Chart</h4>
        <div>
          <h6>Daily</h6>
          <img src={arrowDown} alt="" />
        </div>

      </div>

      <Line
        data={{
          labels: DailyData.map((item) => item.label),
          datasets: [
            {
              label: "Sales",
              data: DailyData.map((item) => item.value),
              borderColor: '#068081',
              borderWidth: 2.5,
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(6, 128, 129, 0.3)'); // Top of shadow
                gradient.addColorStop(1, 'rgba(6, 128, 129, 0)'); // Fade-out bottom
                return gradient;
              },
              pointBackgroundColor: '#068081',
              pointBorderColor: '#fff',
              pointRadius: 5,
              fill: true,
              tension: 0.4,
            }
          ]
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              display: true,
              grid: { display: false }
            },

            y: {
              display: true, // Keep Y-axis grid
              grid: { color: "rgba(0, 0, 0, 0.1)" }, // Lighter grid lines
              ticks: { display: false } // Hide Y-axis labels (values)
            }
          },
          plugins: {
            legend: {
              display: false,
            }
          }
        }}
      />
    </div>
  );
};
