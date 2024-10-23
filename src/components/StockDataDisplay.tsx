import React from 'react';

type StockDataDisplayProps = {
  data: any;
};

const StockDataDisplay: React.FC<StockDataDisplayProps> = ({ data }) => {
  if (!data || !data['Time Series (Daily)']) return <p>No data available</p>;

  const timeSeries = data['Time Series (Daily)'];
  const latestDate = Object.keys(timeSeries)[0];
  const latestData = timeSeries[latestDate];

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Stock Data for {data['Meta Data']['2. Symbol']}</h2>
      <p><strong>Date:</strong> {latestDate}</p>
      <p><strong>Open:</strong> {latestData['1. open']}</p>
      <p><strong>Close:</strong> {latestData['4. close']}</p>
      <p><strong>High:</strong> {latestData['2. high']}</p>
      <p><strong>Low:</strong> {latestData['3. low']}</p>
    </div>
  );
};

export default StockDataDisplay;
