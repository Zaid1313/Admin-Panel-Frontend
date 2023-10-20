import React from "react";
// import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div id="sidebar">
      <div className="text-danger mt-5 px-3">
        <h1>Admin panel</h1>
      </div>
      <ul>
        <li className="item">
          <a href="/users">Users</a>
        </li>
        <li className="item">
          <a href="/posts">Posts</a>
        </li>
        <li className="item">
          <a href="/friends">Friends</a>
        </li>
      </ul>
    </div>
  );
}
