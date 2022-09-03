import { createContext, useState } from "react";

export const CurrencyDataContext = createContext({
  products: [],
});

export const CurrencyDataProvider = ({ children }) => {
  const [currenciesData, setCurrenciesData] = useState([]);
  const value = { currenciesData, setCurrenciesData };

  return (
    <CurrencyDataContext.Provider value={value}>
      {children}
    </CurrencyDataContext.Provider>
  );
};
