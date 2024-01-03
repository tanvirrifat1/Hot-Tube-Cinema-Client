import React, { useContext, useState } from "react";
import "./Login.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [disable, setDisabled] = useState(true);
  const { signIn, googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        fetch("http://localhost:5000/api/v1/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((user) => {
            if (user) {
              axios
                .post("http://localhost:5000/api/v1/auth/login", {
                  email: user?.data?.email,
                })
                .then((data) => {
                  console.log(data?.data);
                });
            }
            navigate(from, { replace: true });
          });
      })
      .catch((err) => console.error(err));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successfully!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replcae: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          // title: `${errorCode} ${errorMessage}`,
          title: `UserLogin successfully`,
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
          },
        });
      });
  };

  return (
    <div>
      <ContentWrapper>
        <form onSubmit={handleLogin}>
          <div className="loginBannerContent">
            <span className="titleLog">Welcome.</span>
            <span className="subTitle">Login Here</span>
            <div className="searchInput">
              <input type="text" placeholder="Email" name="email" />
              <input type="password" placeholder="Password" name="password" />
              <div className="google">
                <button>Login</button>
                <button onClick={handleGoogleLogin}>
                  <FcGoogle />
                </button>
              </div>
            </div>
            <div className="titleHello">
              You dont have any account please{" "}
              <span>
                <Link to={"/signUp"}>SignUp</Link>
              </span>
            </div>
          </div>
        </form>
      </ContentWrapper>
    </div>
  );
};

export default Login;
