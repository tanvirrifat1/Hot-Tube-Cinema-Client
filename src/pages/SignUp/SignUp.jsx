import React, { useContext, useState } from "react";
import "./SignUp.scss";
import { FcGoogle } from "react-icons/fc";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../components/Provider/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const [isLoading, SetIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, googleSignIn, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    SetIsLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=c71fd21009b2244466212ed88a7ea531`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.data.display_url) {
          createUser(data.email, data.password)
            .then((result) => {
              const loggedUser = result.user;
              console.log(loggedUser);
              updateUserProfile(data.name, imgData.data.display_url).then(
                () => {
                  const saveUser = {
                    name: data.name,
                    email: data.email,
                    image: imgData.data.display_url,
                    password: data.password,
                  };
                  fetch(
                    "https://hot-tube-cimena-server.vercel.app/api/v1/user",
                    {
                      method: "POST",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(saveUser),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data) {
                        handleData(data);
                        console.log("User profile updated");
                        reset();
                        Swal.fire("User Create successfully!");
                        navigate("/");
                        SetIsLoading(false);
                      }
                    });
                }
              );
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast(errorCode, errorMessage, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        }
      });
  };

  const handleData = (data) => {
    axios
      .post("https://hot-tube-cimena-server.vercel.app/api/v1/auth/login", {
        email: data?.data?.email,
      })
      .then((data) => {
        console.log(data?.data);
      });
  };

  const handleGoogleSignUp = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        fetch("https://hot-tube-cimena-server.vercel.app/api/v1/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((user) => {
            console.log(user?.data?.email);
            if (user) {
              axios
                .post(
                  "https://hot-tube-cimena-server.vercel.app/api/v1/auth/login",
                  {
                    email: user?.data?.email,
                  }
                )
                .then((data) => {
                  console.log(data?.data);
                });
            }
            navigate(from, { replace: true });
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <div className="SignUpBannerContent">
            <span className="titleLog">Welcome.</span>
            <span className="subTitle">SignUp Here</span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Name"
                name="name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
              <input
                type="file"
                placeholder="image"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-500">PhotoURL is required</span>
              )}
              <input
                type="email"
                placeholder="email"
                name="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
              <input
                type="password"
                placeholder="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
              />{" "}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              <div className="googleSignUp">
                <button>Login</button>
                <button onClick={handleGoogleSignUp}>
                  <FcGoogle />
                </button>
              </div>
            </div>
            <div className="titleSignUp">
              Already have an account please
              <span>
                <Link to={"/login"}>Login</Link>
              </span>
            </div>
          </div>
        </form>
      </ContentWrapper>
    </div>
  );
};

export default SignUp;
