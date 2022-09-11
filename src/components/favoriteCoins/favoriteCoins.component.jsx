import { useContext, useState, useEffect } from "react";

import { FavoriteCoinsContext } from "../../contexts/favoriteCoins.context";

import "./favoriteCoins.styles.scss";

export const FavoriteCoins = () => {
  const { favoriteCoins, setFavoriteCoins } = useContext(FavoriteCoinsContext);
  const [coinToDelete, setCoinToDelete] = useState(favoriteCoins);

  const win = window.sessionStorage;

  useEffect(() => {
    if (win.getItem("favCoins"))
      setFavoriteCoins(JSON.parse(win.getItem("favCoins")));
  }, []);

  useEffect(() => {
    setCoinToDelete(favoriteCoins);
  }, [favoriteCoins]);

  const handleRemoveFavoriteCoin = (currencyToDelete) => {
    const newCoins = coinToDelete.filter(
      (coinToRemove) => coinToRemove.id !== currencyToDelete.id
    );
    console.log("currency to delete is: ", newCoins);
    setFavoriteCoins(newCoins);
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
                  <span className="favorite-coin-button-content">
                    <img
                      width="30"
                      height="30"
                      alt={favCurrency.name}
                      src={favCurrency.image}
                    />
                    <span>{favCurrency.name}</span>
                  </span>
                  <span className="removeButtonStyle">Remove</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
