import React from "react";
import "../Table/Table.scss";
import { Link } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const VideoManage = () => {
  return (
    <div class="container">
      <aside class="sidebar">
        <h2>Sidebar</h2>
        <Link to={"/dashBoard"}>
          <p style={{ marginTop: "15px ", fontSize: "20px" }}>Video Manage</p>
        </Link>
        <Link to={"/"}>
          <p style={{ marginTop: "15px ", fontSize: "20px" }}>Home</p>
        </Link>
      </aside>

      <main class="content">
        <table class="custom-table">
          <p className="custom">Submit your link's</p>
          <tbody>
            <div>
              <ContentWrapper>
                <form>
                  <div className="loginBannerContent">
                    <div className="searchInput">
                      <input type="text" placeholder="name" name="name" />
                      <input type="text" placeholder="link" name="text" />
                      <div className="google">
                        <button>Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </ContentWrapper>
            </div>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default VideoManage;
