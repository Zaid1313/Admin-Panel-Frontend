import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddPost() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [users, setUsers] = useState([]);

  const mode = queryParams.get("mode");
  let postId;
  if (mode === "update") {
    postId = queryParams.get("postId");
  }

    useEffect(() => {
      const fetchData = async () => {
        let userResponse = await fetch("http://localhost:4000/user/");
        if (userResponse.ok) {
          const usersData = await userResponse.json();
          setUsers(usersData);
        }
        if (mode === "update" && postId) {
          try {
            const response = await fetch(`http://localhost:4000/post/${postId}`);
            if (response.ok) {
              const data = await response.json();
              setFormData({
                userId: data.userId,
                content: data.content,
              });
            }
          } catch (error) {
            console.error("Error fetching post data:", error);
          }
        }
      };
      fetchData();
    }, [mode, postId]);

  const [formData, setFormData] = useState({
    userId: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postId) {
      formData.postId = postId;
    }
    try {
      const response = await fetch("http://localhost:4000/post/", {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          userId: "",
          content: "",
        });
        alert(`Post ${mode === "create" ? "created" : "updated"} successfully`);
        console.log("Post created/updated successfully");
      } else {
        console.error("Error creating/updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="container w-75 mt-5">
        <div>
          <h2>{mode === "create" ? "Add New Post" : "Update Post"}</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>Select User</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={formData.userId}
              name="userId"
            >
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.email}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter post content"
              name="content"
              value={formData.content}
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
