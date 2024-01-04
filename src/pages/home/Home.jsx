import React from "react";

import "./Home.scss";

import Banner from "./Banner/Banner";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Trending from "./Trending/Trending";

const Home = () => {
  return (
    <div className="homePage">
      <Banner />
      <Trending />
      <div style={{ height: 500 }}></div>
    </div>
  );
};

export default Home;
