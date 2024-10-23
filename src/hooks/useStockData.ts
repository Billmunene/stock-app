import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY; // Access the key from .env

export const useStockData = (symbol: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(result => {
          setData(result);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [symbol]);

  return { data, loading };
};
