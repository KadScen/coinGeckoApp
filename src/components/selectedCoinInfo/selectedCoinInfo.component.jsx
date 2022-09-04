import { useContext } from "react";

import "./selectedCoinInfo.styles.scss";

import { CurrencyDataContext } from "../../contexts/currency-data.context";

function SelectedCoinInfo() {
  const { selectedCurrency } = useContext(CurrencyDataContext);

  return (
    <div className="selectedCoinInfo">
      <h3>
        {selectedCurrency.name} ({selectedCurrency.symbol})
      </h3>
      <br />
      <p>CURRENT PRICE: {selectedCurrency.current_price}</p>
      <p>MARKET CAP: {selectedCurrency.market_cap}</p>
      <p>LOW 24H: {selectedCurrency.low_24h}</p>
      <p>HIGH 24H: {selectedCurrency.high_24h}</p>
      <p>CIRCULATING SUPPLY: {selectedCurrency.circulating_supply}</p>
      <p>TOTAL SUPPLY: {selectedCurrency.total_supply}</p>
      <p>MARKET CAP RANK: {selectedCurrency.market_cap_rank}</p>
      <br />
      <p onClick={"onClickFunc"}>+ ADD TO FAVORITES</p>
    </div>
  );
}

export default SelectedCoinInfo;
