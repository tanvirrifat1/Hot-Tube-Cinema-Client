import React from "react";
import "./Table.scss";
import { Link } from "react-router-dom";
import { TOKEN } from "../../Shared/TOKEN";
import { useQuery } from "@tanstack/react-query";

const Table = () => {
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

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div class="container">
      <aside class="sidebar">
        <h2>Sidebar</h2>
        <Link to={"/userManage"}>
          <p style={{ marginTop: "15px ", fontSize: "20px" }}>User</p>
        </Link>
        <p style={{ marginTop: "5px ", fontSize: "20px" }}>Manage User</p>
      </aside>

      <main class="content">
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user, i) => (
              <tr key={user?.id}>
                <td>{i + 1}</td>
                <td>{user?.name}</td> <td>{user?.role}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Table;
