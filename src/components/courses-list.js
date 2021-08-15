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
        console.log(response.data);
        setCourses(response.data.courses);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveDeps = () => {
    CourseDataService.getDeps()
      .then((response) => {
        console.log(response.data);
        setDeps(["All Departments"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveCourses();
  };
  const find = (query, by) => {
    CourseDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setCourses(response.data.courses);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByName = () => {
    find(searchName, "name");
  };
  const findByNo = () => {
    find(searchNo, "no");
  };
  const findByDep = () => {
    find(searchDep, "dep");
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
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by course number"
            value={searchNo}
            onChange={onChangeSearchNo}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNo}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchDep}>
            {deps.map((dep) => {
              return <option value={dep}>{dep.substr(0, 20)}</option>;
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDep}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {courses.map((course) => {
          const sum = `${course.dep} ${course.number}`;
          return (
            <div className="col-lg-4 pb-1">
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
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + "Madison"}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
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
