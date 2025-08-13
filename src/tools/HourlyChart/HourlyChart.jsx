"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HourlyChart({ data }) {
  const labels = data.map(item => new Date(item.ts).getHours() + ":00");

  const chartData = {
    labels,
    datasets: [
      {
        label: "Tüketim (kWh)",
        data: data.map(item => item.kwh),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgb(75, 192, 192)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "24 Saatlik Elektrik Tüketimi" }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "kWh" }
      },
      x: {
        title: { display: true, text: "Saat" }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}
