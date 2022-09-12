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
  const [isBuyOrSell, setIsBuyOrSell] = useState([]);

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

  // console.log("it cost: ", fetchCurrenciesPriceDiff);
  // console.log("Currency to buy Data Works!?: ", currenciesToBuyData);

  const handleBuyOrSell = (data) => {
    setIsBuyOrSell(data);
    const getBuyButton = document.getElementById("buyButton");
    const getSellButton = document.getElementById("sellButton");
    if (data === "buy") {
      getBuyButton.setAttribute("class", "buttonSelected");
      getSellButton.setAttribute("class", "buttonNotSelected");
    } else if (data === "sell") {
      getSellButton.setAttribute("class", "buttonSelected");
      getBuyButton.setAttribute("class", "buttonNotSelected");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrencyToBuy(e.target.currency.value);
    setAmountToBuy(e.target.amount.value);
    const element = document.getElementById("submitResponseText");
    const elementErr = document.getElementById("submitErrorResponseText");
    if (element) element.remove();
    if (elementErr) elementErr.remove();

    if (isBuyOrSell === "buy") {
      let x = document.createElement("p");
      x.setAttribute("id", "submitResponseText");
      x.innerText = `You Have Purchased ${amountToBuy} ${
        selectedCurrency.symbol
      } For ${fetchCurrenciesPriceDiff * amountToBuy} ${
        currenciesToBuyData.symbol
      }`;
      document.getElementById("submitResponseContainer").appendChild(x);
    } else if (isBuyOrSell === "sell") {
      let x = document.createElement("p");
      x.setAttribute("id", "submitResponseText");
      x.innerText = `You Have Sell ${amountToBuy} ${
        selectedCurrency.symbol
      } For ${fetchCurrenciesPriceDiff * amountToBuy} ${
        currenciesToBuyData.symbol
      }`;
      document.getElementById("submitResponseContainer").appendChild(x);
    } else {
      let x = document.createElement("p");
      x.setAttribute("id", "submitErrorResponseText");
      x.innerText = `Please Select BUY Or Sell Above`;
      document.getElementById("submitResponseContainer").appendChild(x);
    }
  };

  return (
    <div className="selectedCoinForm">
      <div className="selectedCoinFormButtons">
        <button id="buyButton" onClick={() => handleBuyOrSell("buy")}>
          BUY
        </button>
        <button id="sellButton" onClick={() => handleBuyOrSell("sell")}>
          SELL
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <select id="currency" name="currency">
          {coinList[0].map((currency) => {
            return (
              <option name="currency" key={currency} value={currency} required>
                {capitalizeFirstLetter(currency)}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          step=".000001"
          required
        ></input>
        <input type="submit"></input>
        <span id="submitResponseContainer"></span>
      </form>
    </div>
  );
}

export default SelectedCoinForm;
