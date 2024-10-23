import React, { useState, useEffect } from 'react';
import { useStockData } from '../hooks/useStockData';

const stockSymbols = ['AAPL', 'AMZN', 'GOOGL', 'META', 'NVDA', 'MSFT', 'TSLA', 'NFLX', 'ADBE', 'IBM'];

const StockCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % stockSymbols.length); // Show 3 at a time
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stockSymbols.length - 3 : (prevIndex - 3 + stockSymbols.length) % stockSymbols.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % stockSymbols.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl text-gray-700 bg-white px-4 py-2 rounded-full shadow z-10"
        onClick={goToPrevious}
      >
        &lt;
      </button>

      <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}>
        {stockSymbols.map((symbol, index) => (
          <div key={symbol} className="w-1/3 flex-shrink-0 p-4">
            <StockItem symbol={symbol} />
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl text-gray-700 bg-white px-4 py-2 rounded-full shadow z-10"
        onClick={goToNext}
      >
        &gt;
      </button>
    </div>
  );
};

const StockItem: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { data, loading } = useStockData(symbol);

  if (loading) {
    return <div className="p-4 bg-gray-100 rounded-lg shadow-md">Loading...</div>;
  }

  if (!data || !data['Time Series (Daily)']) {
    return <div className="p-4 bg-gray-100 rounded-lg shadow-md">No data available</div>;
  }

  const latestDate = Object.keys(data['Time Series (Daily)'])[0];
  const stockData = data['Time Series (Daily)'][latestDate];
  const price = stockData['4. close'];
  const change = (parseFloat(stockData['4. close']) - parseFloat(stockData['1. open'])).toFixed(2);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{symbol}</h3>
      <p className="text-sm">Price: {price} USD</p>
      <p className={`text-sm ${parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        Change: {change} USD
      </p>
    </div>
  );
};

export default StockCarousel;
