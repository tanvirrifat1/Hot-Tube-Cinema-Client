import React from "react";
import "./Table.scss";

const Table = () => {
  return (
    <div>
      <div class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>30</td>
              <td>30</td>
              <td>30</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Jane Smith</td>
              <td>30</td>
              <td>30</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
