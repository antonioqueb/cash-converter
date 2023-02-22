import React, { useState, useEffect } from 'react';

interface ExchangeRate {
  [key: string]: number;
}

const ExchangeDisplay = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string | null>('USD');
  const [toCurrency, setToCurrency] = useState<string | null>('MXN');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate | null>(null);

  useEffect(() => {
    fetch('https://openexchangerates.org/api/latest.json?app_id=661d74b51e214000a7c4a326ebb076a4')
      .then(response => response.json())
      .then(data => {
        setExchangeRates(data.rates);
        setFromCurrency('USD');
        setToCurrency('MXN');
      });
  }, []);
  

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? null : value);
  }

  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  }

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  }

  const handleConversion = () => {
    if (exchangeRates && fromCurrency && toCurrency && amount !== null) {
      const converted = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
      setConvertedAmount(converted);
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
          <div className="card-header bg-primary text-white" style={{ textAlign: "center", fontSize: "24px", padding: "20px 0" }}>
          <br/>
                <h2 className="m-0">CashConverter</h2>
                <br/>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="amount">Cantidad:</label>
                <br/>
            <br/>
                <input type="number" id="amount" className="form-control" value={amount || ''} onChange={handleAmountChange} />
              </div>
              <div className="form-group">
              <br/>
                <label htmlFor="from-currency">De:</label>
                <br/>
            <br/>
                <select id="from-currency" className="form-control" value={fromCurrency || ''} onChange={handleFromCurrencyChange}>
                  {exchangeRates && Object.keys(exchangeRates).map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
              <br/>
                <label htmlFor="to-currency">A:</label>
                <br/>
            <br/>
                <select id="to-currency" className="form-control" value={toCurrency || ''} onChange={handleToCurrencyChange}>
                  {exchangeRates && Object.keys(exchangeRates).map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div><br/>
            <br/>
            
            <button className="btn btn-primary btn-block" onClick={handleConversion}>Convertir</button>
              <br/>
            <br/>
              {convertedAmount !== null && (
                <div className="text-center mt-3">
                  <h4>{amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}</h4>
                  </div>
          )}
        </div>
        <div className="card-footer bg-primary text-white">
        </div>
      </div>
    </div>
  </div>
  <footer className="text-center  py-3 mt-auto">
        <p>
          Creado por <a href="https://github.com/antonioqueb">Antonio Queb</a>
        </p>
      </footer>
</div>
);
};

export default ExchangeDisplay;