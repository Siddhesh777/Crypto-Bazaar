import React from "react";
import { Navbar, Footer, CoinDisplay } from "../../Components";
import "../../App.css";

function Home() {
  return (
    <div className="container">
      <Navbar />
      <CoinDisplay />
      <Footer />
    </div>
  );
}
export default Home;
