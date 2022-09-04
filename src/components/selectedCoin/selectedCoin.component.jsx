import { useContext } from "react";

import "./selectedCoin.styles.scss";

import SelectedCoinInfo from "../selectedCoinInfo/selectedCoinInfo.component";
import SelectedCoinForm from "../selectedCoinForm/selectedCoinForm.component";

import { CurrencyDataContext } from "../../contexts/currency-data.context";

function SelectedCoin() {
  const { selectedCurrency } = useContext(CurrencyDataContext);

  if (selectedCurrency === null) {
    return (
      <div className="selectedCoinContainer">
        <p>Select a coin to view more information</p>
      </div>
    );
  } else {
    return (
      <div className="selectedCoinContainer">
        <SelectedCoinInfo />
        <SelectedCoinForm />
      </div>
    );
  }
}

export default SelectedCoin;
