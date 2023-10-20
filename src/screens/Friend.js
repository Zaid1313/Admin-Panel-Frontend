import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Friend() {
  const [friends, setFriends] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:4000/friend/");
      if (response.ok) {
        const data = await response.json();
        setFriends(data);
        // console.log("Friend data: ", data);
      } else {
        console.log("Error fetching friends:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching friends:", error);
    }
  };

  const handleDelete = async (friendId) => {
    try {
      const response = await fetch(`http://localhost:4000/friend/${friendId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        loadData();
        alert("Friend was deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mt-2">
      <div className="card p-3">
        <div className="row">
          <div className="col-md-10">
            <h1>List of Friends</h1>
          </div>
          <div className="col-md-2">
            <Link
              className="btn bg- text-dark mx-1 border-dark"
              style={{ fontWeight: "600", fontSize: "17px" }}
              to="/addFriend?mode=create"
            >
              Add Friend
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Friend ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {friends.map((friend) => (
                <tr key={friend.friendId}>
                  <td>{friend.friendId}</td>
                  <td>{friend.Sender ? friend.Sender.name : "N/A"}</td>
                  <td>{friend.Reciever ? friend.Reciever.name : "N/A"}</td>
                  <td>{friend.status}</td>
                  <td>
                    <Link
                      className="btn bg-white text-dark mx-1 "
                      style={{ fontWeight: "500", fontSize: "14px" }}
                      to={`/addFriend?mode=update&friendId=${friend.friendId}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      style={{ fontWeight: "500", fontSize: "14px" }}
                      onClick={() => handleDelete(friend.friendId)}
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
