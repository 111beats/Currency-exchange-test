import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const currencyOptions = [
  'AUD',
  'BGN',
  'BRL',
  'CAD',
  'CHF',
  'CNY',
  'CZK',
  'DKK',
  'GBP',
  'HKD',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'ISK',
  'JPY',
  'KRW',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PHP',
  'PLN',
  'RON',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'USD',
  'ZAR',
];

export default function Chart() {
  const [data, setData] = useState(null);
  const [currencyInit, setCurrencyInit] = useState<string>('AUD');
  const [currency, setCurrency] = useState<string>('USD');
  const [periodStart, setPeriodStart] = useState<string>('2023-12-23');
  const [periodEnd, setPeriodEnd] = useState<string>('2023-11-23');
  const [minCurrencyValue, setMinCurrencyValue] = useState<number>(0);
  const [maxCurrencyValue, setMaxCurrencyValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/${periodEnd}..${periodStart}?from=${currencyInit}&to=${currency}`
        );
        const result = await response.json();
        setData(result);

        const currencyValues = Object.values(result.rates).map(
          (rate) => rate[currency]
        );
        const minCurrency = Math.min(...currencyValues);
        const maxCurrency = Math.max(...currencyValues);

        setMinCurrencyValue(minCurrency);
        setMaxCurrencyValue(maxCurrency);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [periodStart, periodEnd, currencyInit, currency]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = Object.keys(data.rates).map((date) => ({
    date,
    [currency]: data.rates[date][currency],
  }));
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <div className=''>
      <div>
        <label>Выберите период:</label>
        <input
          type='date'
          value={periodEnd}
          onChange={(e) => setPeriodEnd(e.target.value)}
          max={currentDate}
        />
        <input
          type='date'
          value={periodStart}
          onChange={(e) => setPeriodStart(e.target.value)}
          max={currentDate}
        />
      </div>
      <div>
        <label>Выберите валюту (из):</label>
        <select
          onChange={(e) => setCurrencyInit(e.target.value)}
          value={currencyInit}
        >
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Выберите валюту (в):</label>
        <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: 800, height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <XAxis dataKey='date' />
            <YAxis domain={[minCurrencyValue, maxCurrencyValue]} />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey={currency} stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
