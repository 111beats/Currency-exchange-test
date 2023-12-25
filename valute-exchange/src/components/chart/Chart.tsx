import  { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './chart.module.css';

type Rate = {
  [currency: string]: number;
};

type RateData = {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Rate>;
};
const currencyOptions: string[] = [
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

export default function Chart(): JSX.Element {
  const [data, setData] = useState<RateData | null>(null);
  const [currencyInit, setCurrencyInit] = useState<string>('USD');
  const [currency, setCurrency] = useState<string>('TRY');
  const [periodStart, setPeriodStart] = useState<string>('2023-12-23');
  const [periodEnd, setPeriodEnd] = useState<string>('2023-11-23');
  const [minCurrencyValue, setMinCurrencyValue] = useState<number>(0);
  const [maxCurrencyValue, setMaxCurrencyValue] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/${periodEnd}..${periodStart}?from=${currencyInit}&to=${currency}`
        );
        const result: RateData = await response.json();
        console.log(result, 'res');
        setData(result);

        const currencyValues = Object.values(result.rates).map(
          (rate) => rate[currency]
        ) as number[];

        const minCurrency = Math.min(...currencyValues);
        const maxCurrency = Math.max(...currencyValues);

        setMinCurrencyValue(minCurrency);
        setMaxCurrencyValue(maxCurrency);
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasError(true);
      }
    };

    fetchData();
  }, [periodStart, periodEnd, currencyInit, currency]);

  if (hasError) {
    return <h3>Error</h3>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = Object.keys(data.rates).map((date) => ({
    date,
    [currency]: data.rates[date][currency],
  }));
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
          ДИНАМИКА ЦЕНЫ ВАЛЮТЫ
        </h1>
      </div>
      <div className={styles['mainContainer']}>
        <div className={styles['text']}>
          <div>
            <h4>Выберите период:</h4>
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
            <h4>Выберите валюту (из):</h4>
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
            <h4>Выберите валюту (в):</h4>
            <select
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles['chart']}>
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
    </>
  );
}
