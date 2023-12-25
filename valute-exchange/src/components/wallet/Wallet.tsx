import React, { useEffect, useState, ChangeEvent } from 'react';
import styles from './wallet.module.css'
interface Rates {
  [key: string]: number;
}

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

export default function Wallet(): JSX.Element {
  const [rates, setRates] = useState<Rates>({});
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('AUD');
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    const currencyData = async () => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${baseCurrency}`
        );
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.log('Ошибка API', error);
      }
    };

    currencyData();
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleBuyClick = () => {
    alert('Поздравляем с покупкой!');
  };

  return (
    <div>
      <div className={styles['walletContainer']}>
        <h2>КУПИТЬ ВАЛЮТУ</h2>
        <label htmlFor='baseCurrency'>Ваша валюта:</label>
        <select
          id='baseCurrency'
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
        >
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor='targetCurrency'>Вы хотите купить:</label>
        <select
          id='targetCurrency'
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
        >
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor='amount'>Укажите количество:</label>
        <input
          type='number'
          id='amount'
          value={amount}
          onChange={handleAmountChange}
          min='0'
        />
        {amount ? (
          <div className={styles['buttonContainer']}>
            <h3>
              Курс обмена {baseCurrency} к {targetCurrency}
            </h3>
            <p>
            {amount} {baseCurrency} = { (amount * rates[targetCurrency]).toFixed(2) } {targetCurrency}
            </p>
            <button onClick={handleBuyClick}>Купить</button>
          </div>
        ) : (
          <p>Введите количество валюты</p>
        )}
      </div>
    </div>
  );
}
