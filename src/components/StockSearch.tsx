import React, { useState } from 'react';

type StockSearchProps = {
  onSearch: (symbol: string) => void;
};

const StockSearch: React.FC<StockSearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue.toUpperCase());
  };

  return (
    <div className="flex justify-center items-center my-4">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded mr-2"
        placeholder="Enter stock symbol"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </div>
  );
};

export default StockSearch;
