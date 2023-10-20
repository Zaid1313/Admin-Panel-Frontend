import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import User from "./screens/User";
import Post from "./screens/Post";
import Friend from "./screens/Friend";
import SideBar from "./components/SideBar";
import AddUser from "./screens/AddUser";
import AddPost from "./screens/AddPost";
import AddFriend from "./screens/AddFriend";

function App() {
  return (
    <div>
      <div className="row">
        <div className="col-md-2 ">
          <SideBar />
        </div>
        <div className="col-md-10 ">
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/users" />} />
              <Route exact path="/users" element={<User />} />
              <Route exact path="/addUser" element={<AddUser/>}/>
              <Route exact path="/posts" element={<Post />} />
              <Route exact path="/addPost" element={<AddPost/>} />
              <Route exact path="/friends" element={<Friend />} />
              <Route exact path="/addFriend" element={<AddFriend/>} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
