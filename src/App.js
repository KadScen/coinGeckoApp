import './App.scss';
import AllCoins from './components/allCoins/allCoins.component';
import { FavoriteCoins } from './components/favoriteCoins/favoriteCoins.component';

function App() {
  return (
    <div className="App">
      <FavoriteCoins/>
      <AllCoins/>
    </div>
  );
}

export default App;
