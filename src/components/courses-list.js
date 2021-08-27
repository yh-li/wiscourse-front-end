import React, { useEffect, useState } from "react";
import CourseDataService from "../services/course";
import { Link } from "react-router-dom";
import "./courses-list.css";
function CoursesList(props) {
  const [courses, setCourses] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNo, setSearchNo] = useState("");
  const [searchDep, setSearchDep] = useState("");
  const [deps, setDeps] = useState(["All Departments"]);
  useEffect(() => {
    retrieveCourses();
    retrieveDeps();
  }, []);
  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };
  const onChangeSearchNo = (e) => {
    setSearchNo(e.target.value);
  };
  const onChangeSearchDep = (e) => {
    setSearchDep(e.target.value);
  };
  const retrieveCourses = () => {
    CourseDataService.getAll()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((e) => {
        console.log("Error in retriving courses: ", e);
      });
  };
  const retrieveDeps = () => {
    CourseDataService.getDeps()
      .then((response) => {
        setDeps(["All Departments"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  /*   const refreshList = () => {
    retrieveCourses();
  }; */
  const find = () => {
    const query = {};
    if (searchDep) query.dep = searchDep;
    if (searchName) query.name = searchName;
    if (searchNo) query.no = searchNo;
    CourseDataService.find(query)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by course name"
            value={searchName}
            onChange={onChangeSearchName}
          />
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by course number"
            value={searchNo}
            onChange={onChangeSearchNo}
          />
        </div>

        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchDep}>
            {deps.map((dep) => {
              return (
                <option value={dep} key={dep}>
                  {dep.substr(0, 20)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={find}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {courses.map((course) => {
          return (
            <div className="col-lg-4 pb-1" key={course._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {course.dep} {course.number}
                  </h5>
                  <p className="card-text">{course.name}</p>
                  <div className="row">
                    <Link
                      to={"/courses/" + course._id}
                      className="btn  btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    {/*                     <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + "Madison"}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursesList;
