import React, { useEffect, useContext } from "react";

import { CurrencyDataContext } from "../../contexts/currency-data.context";
import SelectedCoin from "../selectedCoin/selectedCoin.component";
import "./allCoins.styles.scss";

function AllCoins() {
  const { currenciesData, setCurrenciesData, setSelectedCurrency, coinList } =
    useContext(CurrencyDataContext);

  useEffect(() => {
    const fetchCoinsData = async () => {
      await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad"
      )
        .then((response) => response.json())
        .then((data) => setCurrenciesData(data));
    };
    fetchCoinsData().catch(console.error);
  }, []);

  useEffect(() => {
    const findInCurrencies = () => {
      Object.values(currenciesData).forEach((currency) => {
        if (coinList[0].indexOf(currency.name) !== -1) {
          tableCreation(currency);
        }
      });
    };
    findInCurrencies();
  }, [currenciesData]);

  const tableCreation = (currency) => {
    let x = document.createElement("TR");
    x.setAttribute("id", currency.id + "Class");
    x.onclick = function showCoinInfo() {
      setSelectedCurrency(currency);
    };

    let tdName = document.createElement("TD");
    tdName.setAttribute("class", "tdName");
    tdName.innerText = `${currency.name}`;

    let tdVolume = document.createElement("TD");
    tdVolume.setAttribute("class", "notInSmallScreen");
    tdVolume.innerText = `${currency.total_volume}`;

    let tdMarketCap = document.createElement("TD");
    tdMarketCap.setAttribute("class", "notInSmallScreen");
    tdMarketCap.innerText = `${currency.market_cap}`;

    let tdPrice = document.createElement("TD");
    tdPrice.innerText = `${currency.current_price}`;

    x.appendChild(tdName);
    x.appendChild(tdVolume);
    x.appendChild(tdMarketCap);
    x.appendChild(tdPrice);

    document.getElementById("coinsData").appendChild(x);
  };

  return (
    <>
      <div className="allCoins-container">
        <h1>ALL COINS</h1>
        <table>
          <thead>
            <tr>
              <th className="thName">NAME</th>
              <th className="notInSmallScreen">TOTAL SUPPLY</th>
              <th className="notInSmallScreen">MARKET CAP</th>
              <th>CURRENT PRICE</th>
            </tr>
          </thead>
          <tbody id="coinsData"></tbody>
        </table>
      </div>
      <SelectedCoin />
    </>
  );
}

export default AllCoins;
