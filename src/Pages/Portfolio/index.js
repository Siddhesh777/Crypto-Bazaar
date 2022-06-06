import React, { useEffect, useState } from "react";
import { Navbar, Footer, SpanningTable } from "../../Components";
import axios from "axios";
import "./styles.css";

function Portfolio(props) {
  const [portfolio, setPortfolio] = useState([]);
  const [data, setData] = useState([]);
  const [component, setComponent] = useState("");
  const [coin_id, setCoin_id] = useState("");
  const [coin_quantity, setCoin_quantity] = useState("");
  const [removeCoin_id, setRemoveCoin_id] = useState("");
  const [removeCoin_quantity, setRemoveCoin_quantity] = useState("");

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=1000&page=1&sparkline=false";

  useEffect(() => {
    axios.get(url).then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/getPortfolio", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => setPortfolio(res.portfolio));
  }, []);

  async function handleAddInPortfolio() {
    try {
      const res = await fetch("http://localhost:5000/addInPortfolio", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          coin_id: coin_id,
          coin_quantity: coin_quantity,
        }),
      });
      const response = await res.json();
      setPortfolio(response);
    } catch (e) {
      console.log("error");
    }
  }

  async function handleRemoveFromPortfolio() {
    try {
      const res = await fetch("http://localhost:5000/removeFromPortfolio", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          coin_id: removeCoin_id,
          coin_quantity: removeCoin_quantity,
        }),
      });
      const response = await res.json();
      setPortfolio(response);
    } catch (e) {
      console.log("error");
    }
  }

  return (
    <>
      <Navbar />
      <h1 className="portfolio_heading">YOUR PORTFOLIO</h1>
      <SpanningTable portfolio={portfolio} data={data} />
      {!component && (
        <div className="ARbtns">
          <div
            variant="primary"
            onClick={() => setComponent(1)}
            className="AddInPortfolio"
          >
            + Add
          </div>
          <div
            variant="primary"
            onClick={() => setComponent(2)}
            className="RemoveFromPortfolio"
          >
            - Remove
          </div>
        </div>
      )}
      {component === 1 && (
        <div className="AddInPortfolioForm">
        <form onSubmit={handleAddInPortfolio}>
          <div className="input_section">
            <input
              type="text"
              placeholder="Currency Id"
              value={coin_id}
              onChange={(e) => setCoin_id(e.target.value)}
            />
          </div>
          <div className="input_section">
            <input
              type="number"
              placeholder="Quantity"
              value={coin_quantity}
              onChange={(e) => setCoin_quantity(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="AddInPortfolioSubmitBtn"
          >
            + Add
          </button>
        </form>
        </div>
      )}
      {component === 2 && (
        <div className="removeFromPortfolioForm">
        <form
          onSubmit={handleRemoveFromPortfolio}
        >
          <div className="input_section">
            <input
              type="text"
              placeholder="Currency Id"
              value={removeCoin_id}
              onChange={(e) => setRemoveCoin_id(e.target.value)}
            />
          </div>
          <div className="input_section">
            <input
              type="number"
              placeholder="Quantity"
              value={removeCoin_quantity}
              onChange={(e) => setRemoveCoin_quantity(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="RemoveFromPortfolioSubmitBtn"
          >
            - Remove
          </button>
        </form>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Portfolio;
