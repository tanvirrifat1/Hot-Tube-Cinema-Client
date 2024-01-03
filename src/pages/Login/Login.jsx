import React from "react";
import "./Login.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div>
      <ContentWrapper>
        <div className="loginBannerContent">
          <span className="titleLog">Welcome.</span>
          <span className="subTitle">Login Here</span>
          <div className="searchInput">
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <div className="google">
              <button>Login</button>
              <button>
                <FcGoogle />
              </button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Login;
