import React from "react";

import "./Home.scss";

import Banner from "./Banner/Banner";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp");
  return (
    <div className="homePage">
      <Banner />
    </div>
  );
};

export default Home;
