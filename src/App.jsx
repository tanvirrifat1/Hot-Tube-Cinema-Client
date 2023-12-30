import React, { useEffect } from "react";
import { fetchDataFromApi } from "./ultis/api";

const App = () => {
  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      console.log(res);
    });
  };

  return <div className="app">app</div>;
};

export default App;
