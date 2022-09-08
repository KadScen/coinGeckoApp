import { useContext, useState } from "react";

import { FavoriteCoinsContext } from "../../contexts/favoriteCoins.context";

import "./favoriteCoins.styles.scss";

export const FavoriteCoins = () => {
  const { favoriteCoins, setFavoriteCoins } = useContext(FavoriteCoinsContext);
  const [coinToDelete, setCoinToDelete] = useState(favoriteCoins);

  const handleRemoveFavoriteCoin = (favCurrency) => {
    coinToDelete.filter((coinToRemove) => coinToRemove.id !== favCurrency.id);
    setFavoriteCoins(coinToDelete);
  };

  if (favoriteCoins.length === 0) {
    return (
      <div className="favorite-coins-container">
        <div className="favorite-coins-texts">
          <h1>Favorite Coins</h1>
          <p>No Favorite Coins Added</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="favorite-coins-container">
        <div className="favorite-coins-texts">
          <h1>Favorite Coins</h1>
          <div className="favorite-coins-buttons-container">
            {favoriteCoins.map((favCurrency) => {
              return (
                <p
                  className="favorite-coin-button"
                  onClick={() => handleRemoveFavoriteCoin(favCurrency)}
                  key={favCurrency.id}
                >
                  <img
                    width="30"
                    height="30"
                    alt={favCurrency.name}
                    src={favCurrency.image}
                  />
                  {favCurrency.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
