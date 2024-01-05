import React from "react";

import "./Home.scss";

import Banner from "./Banner/Banner";
import Trending from "./Trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./TopRated/TopRated";
import Cart from "../../components/Cart/Cart";

const Home = () => {
  return (
    <div className="homePage">
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
      {/* <Cart /> */}
      {/* <div style={{ height: 500 }}></div> */}
    </div>
  );
};

export default Home;
