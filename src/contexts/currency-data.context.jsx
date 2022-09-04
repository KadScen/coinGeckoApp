import { createContext, useState } from "react";

const coinUsed = ["Bitcoin", "Ethereum", "XRP", "Bitcoin Cash", "Litecoin"];

export const CurrencyDataContext = createContext({
  currenciesData: [],
  selectedCurrency: null,
  coinList: coinUsed,
});

export const CurrencyDataProvider = ({ children }) => {
  const [currenciesData, setCurrenciesData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const coinList = useState(coinUsed);
  const value = {
    currenciesData,
    setCurrenciesData,
    selectedCurrency,
    setSelectedCurrency,
    coinList,
  };

  return (
    <CurrencyDataContext.Provider value={value}>
      {children}
    </CurrencyDataContext.Provider>
  );
};
