import { useContext } from "react";

import "./selectedCoinInfo.styles.scss";

import { CurrencyDataContext } from "../../contexts/currency-data.context";
import { FavoriteCoinsContext } from "../../contexts/favoriteCoins.context";

function SelectedCoinInfo() {
  const { selectedCurrency } = useContext(CurrencyDataContext);
  const { favoriteCoins, setFavoriteCoins } = useContext(FavoriteCoinsContext);

  function handleSetFavoriteCoins() {
    const existingCoin = favoriteCoins.find(
      (favCoin) => favCoin.id === selectedCurrency.id
    );

    if (existingCoin) {
      return null;
    }

    return setFavoriteCoins([...favoriteCoins, selectedCurrency]);
  }

  console.log(favoriteCoins);

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
    </div>
  );
}

export default SelectedCoinInfo;
