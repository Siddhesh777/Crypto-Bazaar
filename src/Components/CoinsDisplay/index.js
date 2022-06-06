import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import CurrencyCard from "../CurrencyCard";
import "./styles.css";

function CoinDisplay() {
  const [currencies, setCurrencies] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [visible, setVisible] = React.useState(10);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=1000&page=1&sparkline=false";
  axios.get(url).then((res) => {
    setCurrencies(res.data);
  });

  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function LoadMore() {
    setVisible(visible + 3);
  }

  const filteredCoins = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <form className="search-btn">
          <input
            style={{textDecoration:"none",outlineWidth:"0px"}}
            type="text"
            placeholder="Search Coin"
            onChange={handleSearch}
            className="coin-search"
          />
        </form>
        <Grid
          container
          style={{ gap: 40 }}
          justifyContent="center"
          className="data"
        >
          {filteredCoins.slice(0, visible).map(CurrencyCard)}
        </Grid>
        {visible < 1000 && (
          <div variant="primary" onClick={LoadMore} className="AddButton">
            View More
          </div>
        )}
      </div>
    </>
  );
}

export default CoinDisplay;
