import React, { useEffect, useState } from "react";
import CourseDataService from "../services/course";
import { Link } from "react-router-dom";
import "./courses-list.css";
import { Pagination } from "react-bootstrap";
import "./course-list.css";
function CoursesList(props) {
  const [courses, setCourses] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNo, setSearchNo] = useState("");
  const [searchDep, setSearchDep] = useState("");
  const [deps, setDeps] = useState(["All Departments"]);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberofPages] = useState(0);
  const [currentPageLimit, setCurrentPageLimit] = useState([]);
  useEffect(() => {
    retrieveCourses();
    setCurrentPageLimit(getPageRange(page, numberOfPages));
    retrieveDeps();
  }, []);
  useEffect(() => {
    retrieveCourses();
    setCurrentPageLimit(getPageRange(page, numberOfPages));
  }, [page, numberOfPages]);
  const nextPage = (next) => {
    if (page === 0 && next === -1) {
    } else if (page === numberOfPages - 1 && next === 1) {
    } else {
      setPage(parseInt(page) + next);
    }
  };
  const getPageRange = (page, numberOfPages) => {
    if (numberOfPages <= 10) return [0, Math.max(numberOfPages - 1, 0)];
    else {
      if (page <= 5) return [0, 9];
      else if (page + 5 > numberOfPages)
        return [numberOfPages - 10, numberOfPages - 1];
      else return [page - 5, page + 4];
    }
  };
  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };
  const onChangeSearchNo = (e) => {
    setSearchNo(e.target.value);
  };
  const onChangeSearchDep = (e) => {
    setSearchDep(e.target.value);
  };
  /* const retrieveCourses = () => {
    CourseDataService.getAll(page)
      .then((response) => {
        setCourses(response.data.response);
        setNumberofPages(response.data.total);
      })
      .catch((e) => {
        console.log("Error in retriving courses: ", e);
      });
  }; */
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
  const retrieveCourses = () => {
    const query = {};
    if (searchDep && searchDep !== "All Departments") query.dep = searchDep;
    if (searchName) query.name = searchName;
    if (searchNo) query.no = searchNo;
    CourseDataService.find(query, page)
      .then((response) => {
        console.log(response.data.total);
        setCourses(response.data.response);
        setNumberofPages(response.data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <select className="form-select" onChange={onChangeSearchDep}>
            {deps.map((dep) => {
              return (
                <option value={dep} key={dep}>
                  {dep.substr(0, 20)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-lg-4 col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search by course name"
            value={searchName}
            onChange={onChangeSearchName}
          />
        </div>
        <div className="search-bar col-lg-4 col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search by course number"
            value={searchNo}
            onChange={onChangeSearchNo}
          />

          <button
            className="btn btn-outline-secondary search-btn"
            type="button"
            onClick={() => {
              if (page === 0) retrieveCourses();
              else setPage(0, retrieveCourses);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="row">
        {courses.map((course) => {
          return (
            <div className="col-lg-4 pb-1" key={course._id}>
              <div className="card course-card">
                <div className="card-body">
                  <h5 className="card-title">
                    {course.dep} {course.number}
                  </h5>
                  <p className="card-text course-name">{course.name}</p>
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
        {numberOfPages > 1 && (
          <Pagination>
            <div className="pagination-bar">
              <Pagination.First onClick={() => setPage(0)} />
              <Pagination.Prev onClick={() => nextPage(-1)} />
              {Array(currentPageLimit[1] - currentPageLimit[0] + 1)
                .fill(null)
                .map((_, i) => {
                  return currentPageLimit[0] + i === page ? (
                    <Pagination.Item
                      key={i}
                      onClick={() => setPage(currentPageLimit[0] + i)}
                      className="page-box"
                    >
                      <strong>{currentPageLimit[0] + i + 1}</strong>
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      key={i}
                      onClick={() => setPage(currentPageLimit[0] + i)}
                      className="page-box"
                    >
                      {currentPageLimit[0] + i + 1}
                    </Pagination.Item>
                  );
                })}
              <Pagination.Next onClick={() => nextPage(1)} />
              <Pagination.Last onClick={() => setPage(numberOfPages - 1)} />
            </div>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default CoursesList;
