import { useEffect, useState } from "react";

const API_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_HzfKBYbyvPPBlIm0ldD2lUpthbMQenFgrWmqGHKb";

const commonCurrencyCodes = [
  "USD", // United States Dollar
  "EUR", // Euro
  "JPY", // Japanese Yen
  "GBP", // British Pound Sterling
  "AUD", // Australian Dollar
  "CAD", // Canadian Dollar
  "CHF", // Swiss Franc
  "CNY", // Chinese Yuan
  "SEK", // Swedish Krona
  "NZD", // New Zealand Dollar
];

const Exchange = () => {
  const [currencyA, setCurrencyA] = useState("USD");
  const [currencyB, setCurrencyB] = useState("EUR");
  const [ratio, setRatio] = useState(1);
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(0);

  const getRatio = async () => {
    try {
      const url = new URL(API_URL);
      url.searchParams.append("base_currency", currencyA);
      url.searchParams.append("currencies", currencyB);

      const response = await fetch(url);
      const result = await response.json();
      const ratio = Object.values(result.data)[0];

      setRatio(ratio);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getRatio();
  }, [currencyA, currencyB]);

  useEffect(() => {
    setResult((amount * ratio).toFixed(2));
  }, [amount, ratio]);

  return (
    <div>
      <Dropdown setter={setCurrencyA} value={currencyA} />
      <Dropdown setter={setCurrencyB} value={currencyB} />
      <br />
      <br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {result > 0 && (
        <p>
          Result: {result} {currencyB}
        </p>
      )}
    </div>
  );
};

const Dropdown = ({ setter, value }) => {
  return (
    <select value={value} onChange={(e) => setter(e.target.value)}>
      {commonCurrencyCodes.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default Exchange;
