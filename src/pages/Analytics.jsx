import "../styles/Analytics.css";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Analytics() {
  const chartRef = useRef(null);
const isInView = useInView(chartRef, { once: true, amount: 0.5});
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimateChart(true);
    }
  }, [isInView]);

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 2500, 3200, 4100],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, "#6366f1");
          gradient.addColorStop(1, "#8b5cf6");
          return gradient;
        },
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: animateChart
      ? {
        duration: 1500,
        easing: "easeOutQuart",
      }
      : false,
    plugins: {
      legend: {
        labels: { color: "#ffffff" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#1f2937" },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#1f2937" },
      },
    },
  };

  return (
    <div className="analytics">
      <h2 className="analytics__title">Analytics Overview</h2>

      <div className="analytics__stats">
        <div className="stat">
          <p>Total Revenue</p>
          <h3>
            $<CountUp end={24900} duration={2} separator="," />
          </h3>
        </div>

        <div className="stat">
          <p>Growth</p>
          <h3>
            <CountUp end={18} duration={2} />%
          </h3>
        </div>

        <div className="stat">
          <p>Active Users</p>
          <h3>
            <CountUp end={1245} duration={2} separator="," />
          </h3>
        </div>

        <div className="stat">
          <p>Conversion Rate</p>
          <h3>
            <CountUp end={4.6} duration={2} decimals={1} />%
          </h3>
        </div>
      </div>

      <div className="analytics__highlight">
        <h4>🔥 Top Performing Plan</h4>
        <p>Premium Plan generated $12,400 revenue this month.</p>
      </div>
      <div className="analytics__chart" ref={chartRef}>
        <h4>Monthly Revenue</h4>
        {animateChart && (
          <Bar data={revenueData} options={options} key="animated" />
        )}
      </div>

      <div className="analytics__table">

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rahul</td>
            <td>Pro</td>
            <td>$49</td>
            <td className="success">Success</td>
          </tr>
          <tr>
            <td>Shivam</td>
            <td>Basic</td>
            <td>$19</td>
            <td className="success">Success</td>
          </tr>
          <tr>
            <td>Adharsh</td>
            <td>Premium</td>
            <td>$99</td>
            <td className="pending">Pending</td>
          </tr>
          <tr>
            <td>Module</td>
            <td>Enterprise</td>
            <td>$199</td>
            <td className="pending">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}
