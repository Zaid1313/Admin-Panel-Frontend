import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:4000/user/");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.log("Error fetching users:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const formatDate = (isoDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        loadData();
        alert("User was deleted successfully");

      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mt-2 ">
      <div className="card p-3">
        <div className="row">
          <div className="col-md-10">
            <h1>List of Users</h1>
          </div>
          <div className="col-md-2">
            <Link
              className="btn bg-white text-dark mx-1 border-dark"
              style={{ fontWeight: "600", fontSize: "17px" }}
              to="/addUser?mode=create"
            >
              Add User
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Date of birth</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.dateOfBirth)}</td>
                  <td>
                    <Link
                      className="btn bg-white text-dark mx-1 "
                      style={{ fontWeight: "500", fontSize: "15px" }}
                      to={`/addUser?mode=update&userId=${user.userId}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      style={{ fontWeight: "500", fontSize: "15px" }}
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
