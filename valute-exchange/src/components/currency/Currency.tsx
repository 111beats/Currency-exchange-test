import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import styles from './currency.module.css';

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

const ITEMS_PER_PAGE:number = 6;

export default function Currency():JSX.Element {
  const [currency, setCurrency] = useState<{ [key: string]: number }>({});
  const [defaultCurrency, setDefaultCurrency] = useState('EUR');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const currencyData = async () => {
      try {
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await fetch(
          `https://api.frankfurter.app/latest?base=${defaultCurrency}&limit=${ITEMS_PER_PAGE}&skip=${skip}`
        );
        const data = await response.json();
        setCurrency(data.rates);
      } catch (error) {
        console.log('Ошибка API', error);
      }
    };
    currencyData();
  }, [defaultCurrency, currentPage]);
  

  const handleBaseCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDefaultCurrency(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCurrencies = Object.entries(currency).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(Object.keys(currency).length / ITEMS_PER_PAGE);

  return (
    <div>
      <div className={styles['selected']}>
        <h2>КУРСЫ ОБМЕНА ВАЛЮТ</h2>
        <h6>УКАЖИТЕ ВАШУ ВАЛЮТУ</h6>
        <select
          className='baseCurrency'
          value={defaultCurrency}
          onChange={handleBaseCurrencyChange}
        >
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <h3>Курсы обмена для {defaultCurrency}</h3>
      <div className={styles['list']}>
        {filteredCurrencies.map(([currencyCode, rate]) => (
          <Card key={currencyCode} style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>{currencyCode}</Card.Title>
              <Card.Text>
                {`1 ${defaultCurrency} = ${rate.toFixed(2)} ${currencyCode}`}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className={styles['pagination']}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
