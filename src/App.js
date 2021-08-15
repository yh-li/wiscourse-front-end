import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Course from "./components/course";
import CoursesList from "./components/courses-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = useState(null);
  //these are
  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/courses" className="navbar-brand">
          Course Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/courses"} className="nav-link">
              Courses
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/courses"]} component={CoursesList} />
          <Route
            path="/courses/:id/review"
            render={(props) => <AddReview {...props} user={user} />} //loading addreview component through render since this has props
          />
          <Route
            path="/courses/:id"
            render={(props) => <Course {...props} user={user} />} //loading addreview component through render since this has props
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />} //loading addreview component through render since this has props
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
