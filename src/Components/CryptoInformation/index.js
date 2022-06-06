import React from "react";
import "./styles.css";

function CryptoInformation() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let coin_id = params.id;
  let coin_image = params.ImgUrl;
  let coin_current_price = params.price;
  let coin_mk = params.mk;
  let high = params.h;
  let low = params.l;
  let rank = params.rank;
  return (
    <div className="cryptoInformation">
      <h1>{coin_id}</h1>
      <img src={coin_image} />
      <p>Current Price : ₹ {coin_current_price}</p>
      <p>Market Cap : {coin_mk}</p>
      <p>24h High : {high} </p>
      <p>24h Low : {low} </p>
      <p>Market Cap Rank :{rank}</p>
    </div>
  );
}

export default CryptoInformation;
