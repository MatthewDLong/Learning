import React, { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";

const EndOfDayStockTable = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchStocks = async () => {
      const apiKey = "<API KEY HERE>";
      try {
        let response = await fetch(
          `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL`
        );
        response = await response.json();

        if (mounted) {
          setStockData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStocks();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>symbol</th>
          <th>open</th>
          <th>high</th>
          <th>low</th>
          <th>close</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {stockData &&
          stockData.length > 0 &&
          stockData.map((row) => (
            <tr key={row.open.toString() + row.date}>
              <td data-testid="symbol">{row.symbol}</td>
              <td data-testid="open">{row.open}</td>
              <td data-testid="high">{row.high}</td>
              <td data-testid="low">{row.low}</td>
              <td data-testid="close">{row.close}</td>
              <td data-testid="date">
                {format(parseISO(row.date), "dd/MM/yyyy")}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default EndOfDayStockTable;
