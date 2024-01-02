import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./ultis/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./Redux/Slice/HomeSlice";
import Home from "./pages/home/Home";

const App = () => {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
