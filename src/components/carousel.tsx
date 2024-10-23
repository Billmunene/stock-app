import React, { useState } from 'react';

type Stock = {
  symbol: string;
  name: string;
};

type StockCarouselProps = {
  stocks: Stock[];
};

const StockCarousel: React.FC<StockCarouselProps> = ({ stocks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stocksPerPage = 3; // Number of stocks to display per slide

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + stocksPerPage < stocks.length ? prevIndex + stocksPerPage : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - stocksPerPage >= 0 ? prevIndex - stocksPerPage : stocks.length - stocksPerPage
    );
  };

  // Get the stocks to display in the current slide
  const displayedStocks = stocks.slice(currentIndex, currentIndex + stocksPerPage);

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Popular Stocks</h4>
        <div>
          <button
            onClick={prevSlide}
            className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded hover:bg-gray-400"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex space-x-4 overflow-hidden">
        {displayedStocks.map((stock) => (
          <div key={stock.symbol} className="bg-white shadow-md rounded-lg p-4 flex-1">
            <h5 className="font-bold text-lg mb-2">{stock.symbol}</h5>
            <p className="text-gray-600">{stock.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockCarousel;
