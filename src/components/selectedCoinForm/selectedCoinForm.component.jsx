import { useContext, useEffect, useState } from "react";

import { CurrencyDataContext } from "../../contexts/currency-data.context";

import "./selectedCoinForm.styles.scss";

function SelectedCoinForm() {
  const { coinList, selectedCurrency, currenciesData } =
    useContext(CurrencyDataContext);
  const [fetchCurrenciesPriceDiff, setFetchCurrenciesPriceDiff] = useState([]);
  const [currencyToBuy, setCurrencyToBuy] = useState([]);
  const [amountToBuy, setAmountToBuy] = useState([]);
  const [currenciesToBuyData, setCurrencyToBuyData] = useState([]);

  function capitalizeFirstLetter(currency) {
    return currency.charAt(0).toUpperCase() + currency.slice(1);
  }

  //Fetch all the currency data from the selected currency in the input
  useEffect(() => {
    const findInCurrencies = () => {
      Object.values(currenciesData).forEach((currency) => {
        if (currencyToBuy === currency.name) {
          setCurrencyToBuyData(currency);
        }
      });
    };
    findInCurrencies();
  }, [currencyToBuy]);

  //Fetch the price diff between 2 currencies using the Coingecko api
  useEffect(() => {
    const currenciesDiffPrice = async () => {
      await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCurrency.id}&vs_currencies=${currenciesToBuyData.symbol}`
      )
        .then((response) => response.json())
        .then((data) =>
          setFetchCurrenciesPriceDiff(
            data[selectedCurrency.id][currenciesToBuyData.symbol]
          )
        )
        .catch((err) => {
          console.log(err.message);
        });
    };
    currenciesDiffPrice();
  }, [selectedCurrency, currenciesToBuyData]);

  console.log("it cost: ", fetchCurrenciesPriceDiff);
  console.log("Currency to buy Data Works!?: ", currenciesToBuyData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrencyToBuy(e.target.currency.value);
    setAmountToBuy(e.target.amount.value);

    const element = document.getElementById("submitResponseText");
    if (element) element.remove();
    let x = document.createElement("p");
    x.setAttribute("id", "submitResponseText");
    x.innerText = `You Have Purchased ${amountToBuy} ${
      selectedCurrency.symbol
    } For ${fetchCurrenciesPriceDiff * amountToBuy} ${
      currenciesToBuyData.symbol
    }`;
    document.getElementById("submitResponseContainer").appendChild(x);
  };

  return (
    <div className="selectedCoinForm">
      <div className="selectedCoinFormButtons">
        <button>BUY</button>
        <button>SELL</button>
      </div>
      <form onSubmit={handleSubmit}>
        <select id="currency" name="currency">
          {coinList[0].map((currency) => {
            return (
              <option name="currency" key={currency} value={currency}>
                {capitalizeFirstLetter(currency)}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          min="0"
          step=".0000000001"
        ></input>
        <input type="submit"></input>
        <span id="submitResponseContainer"></span>
      </form>
    </div>
  );
}

export default SelectedCoinForm;
