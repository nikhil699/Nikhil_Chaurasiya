import React, { useState, useEffect } from 'react';

const CurrencySwapForm = () => {
  const [tokenPrices, setTokenPrices] = useState({});
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch token prices
    fetch('https://interview.switcheo.com/prices.json')
      .then(response => response.json())
      .then(data => setTokenPrices(data))
      .catch(error => console.error("Error fetching token prices:", error));
  }, []);

  const handleSwap = () => {
    if (fromCurrency === toCurrency) {
      setErrorMessage("Cannot swap the same currency");
      return;
    }
    if (amount <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }
    setErrorMessage('');
    
    // Assuming tokenPrices contains the exchange rate data
    const fromRate = tokenPrices[fromCurrency];
    const toRate = tokenPrices[toCurrency];
    if (fromRate && toRate) {
      const converted = (amount * fromRate) / toRate;
      setConvertedAmount(converted);
    } else {
      setErrorMessage("Unable to fetch exchange rate for selected currencies");
    }
  };

  return (
    <div>
      <h1>Currency Swap Form</h1>
      <div>
        <label>From:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="">Select Currency</option>
          {Object.keys(tokenPrices).map(token => (
            <option key={token} value={token}>{token}</option>
          ))}
        </select>
      </div>

      <div>
        <label>To:</label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="">Select Currency</option>
          {Object.keys(tokenPrices).map(token => (
            <option key={token} value={token}>{token}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <button onClick={handleSwap}>Swap</button>

      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      {convertedAmount > 0 && <p>Converted Amount: {convertedAmount}</p>}
    </div>
  );
};

export default CurrencySwapForm;
