import React, { useState } from 'react';
import StockDataDisplay from './components/StockDataDisplay';
import { useStockData } from './hooks/useStockData';
import Sidebar from './components/Sidebar';
import StockChart from './components/StockChart';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StockCarousel from './components/StockCarousel';


const App: React.FC = () => {
  const [symbol, setSymbol] = useState<string | null>('IBM'); // Default to AAPL
  const { data, loading } = useStockData(symbol || '');

  return (
    <div className="flex">
      {/* Sidebar with stock symbols */}
      <Sidebar onSelectStock={setSymbol} />

      {/* Main content area */}
      <div className="flex-1 min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Stock Data Search</h1>
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <>
            <StockCarousel />
            <StockDataDisplay data={data} />
            <StockChart data={data} />

          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default App;
