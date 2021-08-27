import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Course from "./components/course";
import CoursesList from "./components/courses-list";
import ReviewsList from "./components/reviews-list";
import Login from "./components/login";
import Register from "./components/Register";
import AuthContext from "./context/AuthContext";
import http from "./http-common";
function App() {
  const { loggedInUsername, getLoggedIn } = useContext(AuthContext);
  //these are
  const history = useHistory();
  async function logout() {
    await http.get("/auth/logout");
    await getLoggedIn();
    history.push("/");
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
            {loggedInUsername && (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            )}
          </li>

          {!loggedInUsername && (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/courses"]} component={CoursesList} />
          <Route
            path="/courses/:id/review"
            render={(props) => <AddReview {...props} />} //loading addreview component through render since this has props
          />
          <Route
            path="/courses/:id"
            render={(props) => <Course {...props} />} //loading addreview component through render since this has props
          />
          <Route
            path="/login"
            component={Login} //loading addreview component through render since this has props
          />
          <Route path="/register" component={Register} />
          <Route path="/reviews" component={ReviewsList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
