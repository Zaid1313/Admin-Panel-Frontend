import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddFriend() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [users, setUsers] = useState([]);

  const mode = queryParams.get("mode");
  let friendId;
  if (mode === "update") {
    friendId = queryParams.get("friendId");
  }

  useEffect(() => {
    const fetchData = async () => {
      let userResponse = await fetch("http://localhost:4000/user/");
      if (userResponse.ok) {
        const usersData = await userResponse.json();
        setUsers(usersData);
      }
      if (mode === "update" && friendId) {
        try {
          const response = await fetch(
            `http://localhost:4000/friend/${friendId}`
          );
          if (response.ok) {
            const data = await response.json();
            setFormData({
              senderId: data.senderId,
              receiverId: data.receiverId,
              status: data.status,
            });
          }
        } catch (error) {
          console.error("Error fetching friend data:", error);
        }
      }
    };
    fetchData();
  }, [mode, friendId]);

  const [formData, setFormData] = useState({
    senderId: "",
    receiverId: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (friendId) {
      formData.friendId = friendId;
    }

    console.log("Status value to be inserted:", formData.status);

    try {
      const response = await fetch("http://localhost:4000/friend/", {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          senderId: "",
          receiverId: "",
          status: "",
        });
        alert(
          `Friend ${mode === "create" ? "created" : "updated"} successfully`
        );
        console.log("Friend created/updated successfully");
      } else {
        console.error("Error creating/updating friend:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="container w-75 mt-5">
        <div>
          <h2>{mode === "create" ? "Add New Friend" : "Update Friend"}</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicSender">
            <Form.Label>Select Sender</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={formData.senderId}
              name="senderId"
            >
              <option value="">Select a Sender</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.email}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicReceiver">
            <Form.Label>Select Receiver</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={formData.receiverId}
              name="receiverId"
            >
              <option value="">Select a Receiver</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.email}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status }
              onChange={handleChange}
            >
              <option value="">Select a Status</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
