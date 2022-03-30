import React from "react";
import axios from "axios";
import {Card as Coincard,Navbar,Footer} from "../../Components";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom"; 
import "../../App.css";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=1000&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [visible ,setVisible] = React.useState(5);

  axios.get(url).then((res) => {
    setCoins(res.data);
  });

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function LoadMore()
  {
    setVisible(visible+3);
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div >
      <Navbar/>
      <div className="container">
      <form>
          <input
            type="text"
            placeholder="Search Coin"
            onChange={handleChange}
            className="coin-search"
          />
        </form>
        
      <Grid
        container
        style={{ gap: 15 }}
        justifyContent="center"
        className="data"
      >
        {filteredCoins.slice(0,visible).map(Coincard)}
      </Grid>
      {visible<1000 &&
      <div  variant="primary" onClick={LoadMore} className="AddButton" >
        V i e w  M o r e
      </div>}
    </div>
    <Footer/>
    </div>
  );
}
export default App;
