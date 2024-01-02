import React, { useState } from "react";
import "./Banner.scss";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  console.log(query);

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  searchQueryHandler();
                }
              }}
            />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
