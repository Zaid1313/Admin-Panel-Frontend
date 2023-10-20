import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddUser() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access the query parameters
  const mode = queryParams.get("mode");
  let userId;
  if (mode === "update") {
    userId = queryParams.get("userId");
  }

  useEffect(() => {
    if (mode === "update" && userId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/user/${userId}`);
          if (response.ok) {
            const data = await response.json();

            setFormData({
              name: data.name,
              email: data.email,
              password: data.password,
              dateOfBirth: new Date(data.dateOfBirth)
                .toISOString()
                .split("T")[0],
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [mode, userId]);
  // console.log("param1 ", mode);
  // console.log("userId ", userId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      formData.userId = userId;
    }
    try {
      const response = await fetch("http://localhost:4000/user/", {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          dateOfBirth: "",
        });
        alert(`User ${mode === "create" ? "created" : "updated"} successfully`);
        console.log("User created/updated successfully");
      } else {
        console.error("Error creating/updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="container w-75 mt-5">
        <div>
          <h2>{mode === "create" ? "Add New User" : "Update User"}</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter your date of birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
