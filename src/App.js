import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Course from "./components/course";
import CoursesList from "./components/courses-list";
import Login from "./components/login";
import CourseDataService from "./services/course";
import coursesText from "./courses";
import course from "./services/course";
function App() {
  const [user, setUser] = useState(null);
  //these are
  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  /*   async function addCourses() {
    console.log("User wants to add courses");
    const courses = coursesText.split("\n");
    //ajax playground
    console.log(courses);
    var interval = 30 * 1000; //1 second
    for (var i = 0; ; i++) {
      if (i * 1000 >= courses.length) break;
      setTimeout(
        (i) => {
          for (var j = 0; j < 1000; j++) {
            if (1000 * i + j >= courses.length) break;
            const [dep, courseNo, courseName] =
              courses[1000 * i + j].split("\t");
            var data = {
              number: courseNo,
              courseName: courseName,
              dep: dep,
            };
            CourseDataService.createCourse(data);
            //console.log(data);
          }
        },
        i * interval,
        i
      );
    }
  } */
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
      <button className="btn btn-outline-secondary" type="button">
        ?????
      </button>
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
