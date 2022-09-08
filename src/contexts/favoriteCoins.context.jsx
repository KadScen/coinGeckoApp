import { createContext, useState } from "react";

export const FavoriteCoinsContext = createContext({
  favoriteCoins: [],
});

export const FavoriteCoinsProvider = ({ children }) => {
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  const value = {
    favoriteCoins,
    setFavoriteCoins,
  };

  return (
    <FavoriteCoinsContext.Provider value={value}>
      {children}
    </FavoriteCoinsContext.Provider>
  );
};
