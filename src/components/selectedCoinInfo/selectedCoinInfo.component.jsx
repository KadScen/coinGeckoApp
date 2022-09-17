import { useContext, useEffect } from "react";

import "./selectedCoinInfo.styles.scss";

import { CurrencyDataContext } from "../../contexts/currency-data.context";
import { FavoriteCoinsContext } from "../../contexts/favoriteCoins.context";

function SelectedCoinInfo() {
  const { selectedCurrency } = useContext(CurrencyDataContext);
  const { favoriteCoins, setFavoriteCoins } = useContext(FavoriteCoinsContext);

  const win = window.sessionStorage;

  document
    .getElementById("alreadyInFavMessage")
    .setAttribute("class", "isVisible");

  useEffect(() => {
    win.setItem("favCoins", JSON.stringify(favoriteCoins));
  }, [favoriteCoins]);

  function handleSetFavoriteCoins() {
    const existingCoin = favoriteCoins.find(
      (favCoin) => favCoin.id === selectedCurrency.id
    );

    if (existingCoin) {
      document
        .getElementById("alreadyInFavMessage")
        .removeAttribute("class", "isVisible");
      return null;
    }

    return setFavoriteCoins([...favoriteCoins, selectedCurrency]);
  }

  return (
    <div className="selectedCoinInfo">
      <h3>
        <img
          alt={selectedCurrency.id}
          src={selectedCurrency.image}
          width="30"
          height="30"
        />
        {selectedCurrency.name} ({selectedCurrency.symbol})
      </h3>
      <br />
      <p>
        CURRENT PRICE: <span>{selectedCurrency.current_price}</span>
      </p>
      <p>
        MARKET CAP: <span>{selectedCurrency.market_cap}</span>
      </p>
      <p>
        LOW 24H: <span>{selectedCurrency.low_24h}</span>
      </p>
      <p>
        HIGH 24H: <span>{selectedCurrency.high_24h}</span>
      </p>
      <p>
        CIRCULATING SUPPLY: <span>{selectedCurrency.circulating_supply}</span>
      </p>
      <p>
        TOTAL SUPPLY: <span>{selectedCurrency.total_supply}</span>
      </p>
      <p>
        MARKET CAP RANK: <span>{selectedCurrency.market_cap_rank}</span>
      </p>
      <br />
      <p className="addToFavButton" onClick={() => handleSetFavoriteCoins()}>
        + ADD TO FAVORITES
      </p>
      <span id="alreadyInFavMessage" className="isVisible">
        Currency already added to favorite
      </span>
    </div>
  );
}

export default SelectedCoinInfo;
