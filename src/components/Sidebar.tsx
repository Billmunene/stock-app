import React, { useState } from 'react';

type SidebarProps = {
  onSelectStock: (symbol: string) => void;
};

const popularStocks = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'NFLX', 'FB', 'NVDA', 'IBM', 'ORCL'];

const Sidebar: React.FC<SidebarProps> = ({ onSelectStock }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSelectStock(inputValue.toUpperCase());
    }
  };

  return (
    <div className="w-64 bg-white text-gray-800 h-screen p-6 shadow-lg flex flex-col">
      {/* Stock Search */}
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-2">Search Stock</h4>
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded mr-2 w-full"
            placeholder="Enter stock symbol"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </div>
      </div>

      {/* Popular Stocks List */}
      <div>
        <h4 className="font-semibold text-lg mb-4">Popular Stocks</h4>
        <ul>
          {popularStocks.map(stock => (
            <li
              key={stock}
              className="cursor-pointer py-2 hover:bg-gray-100 rounded-md px-4 text-sm"
              onClick={() => onSelectStock(stock)}
            >
              {stock}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
