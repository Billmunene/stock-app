import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import './StockChart.css';

type StockChartProps = {
  data: any;
};

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const [period, setPeriod] = useState('1Y'); // Default period to '1Y' for the 1-year view

  if (!data || !data['Time Series (Daily)']) return null;

  const timeSeries = data['Time Series (Daily)'];

  // Transform and sort data
  const chartData = Object.keys(timeSeries).map(date => ({
    date,
    close: parseFloat(timeSeries[date]['4. close']),
  })).reverse();

  // Get the latest and previous close prices
  const latestClose = chartData[0]?.close || 0;
  const previousClose = chartData[1]?.close || latestClose;

  // Calculate percentage change
  const percentageChange = ((latestClose - previousClose) / previousClose) * 100;

  // Filter chart data based on selected period
  const filteredData = chartData.filter((entry) => {
    const currentDate = dayjs(entry.date);
    switch (period) {
      case '1D':
        return currentDate.isAfter(dayjs().subtract(1, 'day'));
      case '1W':
        return currentDate.isAfter(dayjs().subtract(1, 'week'));
      case '1M':
        return currentDate.isAfter(dayjs().subtract(1, 'month'));
      case '3M':
        return currentDate.isAfter(dayjs().subtract(3, 'month'));
      case '6M':
        return currentDate.isAfter(dayjs().subtract(6, 'month'));
      case '1Y':
        return currentDate.isAfter(dayjs().subtract(1, 'year'));
      case '5Y':
        return currentDate.isAfter(dayjs().subtract(5, 'year'));
      default:
        return true;
    }
  });

  return (
    <div className="stock-chart-container w-full p-6 bg-white shadow-lg rounded-xl">
      <div className="chart-header flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{data['Meta Data']['2. Symbol']} Stock Prices</h2>
          <p className="text-gray-500">Last updated at {dayjs().format('HH:mm')}</p>
        </div>
        <div className="text-right">
          <span className={`font-bold mr-2 ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
          </span>
          <span className="text-xl font-semibold text-gray-700">${latestClose.toFixed(2)}</span>
        </div>
      </div>

      <div className="time-period-selectors flex space-x-2 mb-4">
        {['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`time-btn px-3 py-1 border rounded ${period === p ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="w-full h-96"> {/* Full width and set height */}
        <ResponsiveContainer width="100%" height="100%"> 
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 12 }} />
            <YAxis domain={['auto', 'auto']} tick={{ fill: '#888', fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#82ca9d" // Line color
              fillOpacity={1}
              fill="url(#colorGradient)" // Gradient fill below the line
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
