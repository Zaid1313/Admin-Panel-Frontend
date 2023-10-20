import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Post() {
  const [posts, setPosts] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:4000/post/");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.log("Error fetching posts:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        loadData();
        alert("Post was deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
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
            <h1>List of Posts</h1>
          </div>
          <div className="col-md-2">
            <Link
              className="btn bg-white text-dark mx-1 border-dark"
              style={{ fontWeight: "600", fontSize: "17px" }}
              to="/addPost?mode=create"
            >
              Add Post
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Post ID</th>
                <th>User Name</th>
                <th>Content</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.postId}>
                  <td>{post.postId}</td>
                  <td>{post.User.name}</td>
                  <td>{post.content}</td>
                  <td>
                    <Link
                      className="btn bg-white text-dark mx-1 "
                      style={{ fontWeight: "500", fontSize: "15px" }}
                      to={`/addPost?mode=update&postId=${post.postId}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      style={{ fontWeight: "500", fontSize: "15px" }}
                      onClick={() => handleDelete(post.postId)}
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
