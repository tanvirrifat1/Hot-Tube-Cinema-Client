import React, { useEffect } from "react";
import { fetchDataFromApi } from "./ultis/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./Redux/Slice/HomeSlice";

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
    <div className="app">
      app
      {url?.total_pages}
    </div>
  );
};

export default App;
