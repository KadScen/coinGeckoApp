import { useContext } from "react";

import { CurrencyDataContext } from "../../contexts/currency-data.context";

import "./selectedCoinForm.styles.scss";

function SelectedCoinForm() {
  const { coinList } = useContext(CurrencyDataContext);

  function capitalizeFirstLetter(currency) {
    return currency.charAt(0).toUpperCase() + currency.slice(1);
  }

  return (
    <div className="selectedCoinForm">
      <div className="selectedCoinFormButtons">
        <button>BUY</button>
        <button>SELL</button>
      </div>
      <form>
        <select id="currency" name="currency">
          {coinList[0].map((currency) => {
            return (
              <option key={currency} value={currency}>
                {capitalizeFirstLetter(currency)}
              </option>
            );
          })}
        </select>
        <input type="number"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default SelectedCoinForm;
