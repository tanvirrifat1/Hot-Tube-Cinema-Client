import React, { useContext } from "react";
import "./Table.scss";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TOKEN } from "../../Shared/TOKEN";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getUserInfo } from "../../Shared/auth.service";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserShield } from "react-icons/fa";

const Table = () => {
  const { role } = getUserInfo();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem(TOKEN);
  const { data, refetch, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/user", {
        headers: {
          authorization: token,
        },
      });
      return res.json();
    },
  });

  const handleUpdate = (id) => {
    fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ role: "admin" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            if (data?.data) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          }
        });
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div class="container">
      <aside class="sidebar">
        <h2>Sidebar</h2>
        <Link to={"/videoManage"}>
          <p style={{ marginTop: "15px ", fontSize: "20px" }}>User Manage </p>
        </Link>
        <Link to={"/"}>
          <p style={{ marginTop: "15px ", fontSize: "20px" }}>Home</p>
        </Link>
      </aside>

      <main class="content">
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Update Here</th>
              <th>Delete Here</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user, i) => (
              <tr key={user?.id}>
                <td>{i + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.role}</td>
                <th>
                  {user?.role === "admin" ? (
                    "admin"
                  ) : (
                    <button style={{ fontSize: "25px" }}>
                      <FaUserShield onClick={() => handleUpdate(user?.id)} />
                    </button>
                  )}
                </th>
                <th>
                  {user.role !== "admin" && (
                    <button style={{ fontSize: "25px" }}>
                      <AiFillDelete onClick={() => handleDelete(user?.id)} />
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Table;
