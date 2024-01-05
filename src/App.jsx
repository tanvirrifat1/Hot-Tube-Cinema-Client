import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./ultis/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./Redux/Slice/HomeSlice";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Error from "./pages/404/Error";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./components/Router/Main";
import Table from "./components/Table/Table";

import { getUserInfo } from "./Shared/auth.service";
import VideoManage from "./components/Dasbard/VideoManage";
import Cart from "./components/Cart/Cart";

const App = () => {
  const { role } = getUserInfo();
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        {role === "admin" && <Route path="/table" element={<Table />} />}
        <Route path="/videoManage" element={<VideoManage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
