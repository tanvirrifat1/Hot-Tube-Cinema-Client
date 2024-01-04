import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Table from "../Table/Table";

const Main = () => {
  return (
    <div>
      <Header />
      {/* <Table /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
