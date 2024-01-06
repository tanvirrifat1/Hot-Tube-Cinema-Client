import React from "react";

import "./Home.scss";

import Banner from "./Banner/Banner";
import Trending from "./Trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./TopRated/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
