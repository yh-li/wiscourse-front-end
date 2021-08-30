import React, { useContext, useEffect, useState } from "react";
import CourseDataService from "../services/course";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Moment from "react-moment";
import "moment-timezone";
import { Pagination } from "react-bootstrap";
import "./course.css";
import { PencilSquare, Trash2Fill } from "react-bootstrap-icons";
function Course(props) {
  const initialCourseState = {
    id: null,
    name: "",
    dep: "",
    no: "",
    reviews: [],
  };
  const [course, setCourse] = useState(initialCourseState);
  const [reviews, setReviews] = useState([]);
  const { loggedInUsername } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberofPages] = useState(0);
  const [currentPageLimit, setCurrentPageLimit] = useState([]);
  const getCourse = (id) => {
    CourseDataService.get(id, page)
      .then((response) => {
        setCourse(response.data.course);
        setReviews(response.data.reviews);
        setNumberofPages(response.data.numberOfPages);
        setCurrentPageLimit(getPageRange(page, numberOfPages));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCourse(props.match.params.id);
  }, [props.match.params.id]);
  useEffect(() => {
    getCourse(props.match.params.id);
    setCurrentPageLimit(getPageRange(page, numberOfPages));
  }, [page, numberOfPages]);
  useEffect(() => {
    if (reviews.length <= 0 && page >= 0 && numberOfPages > 0)
      setPage(numberOfPages - 1);
  }, [reviews]);
  const nextPage = (next) => {
    console.log(page);
    if (page <= 0 && next === -1) {
      setPage(0);
    } else if (page >= numberOfPages - 1 && next === 1) {
      setPage(Math.max(0, numberOfPages - 1));
    } else {
      setPage(parseInt(page) + next);
    }
  };
  const getPageRange = (page, numberOfPages) => {
    if (numberOfPages === 0 || numberOfPages === undefined) return [0, 0];
    if (numberOfPages <= 10) return [0, numberOfPages - 1];
    else {
      if (page <= 5) return [0, 9];
      else if (page + 5 > numberOfPages)
        return [numberOfPages - 10, numberOfPages - 1];
      else return [page - 5, page + 4];
    }
  };
  const deleteReview = (reviewId, index) => {
    CourseDataService.deleteReview(reviewId)
      .then((response) => {
        getCourse(props.match.params.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {course ? (
        <div>
          <h5>{course.name}</h5>
          <p>
            <strong>
              {course.dep} {course.number}
            </strong>
          </p>
          <Link
            to={"/courses/" + props.match.params.id + "/review"}
            className="btn btn-primary"
          >
            Add Review
          </Link>
          <h4>Reviews</h4>
          <div className="row">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div className="col-lg-4 pb-1" key={index}>
                  <div className="card ">
                    <div className="card-body">
                      <p className="card-text">
                        <p className="card-text-review">{review.text}</p>
                        <div className="card-text-footer">
                          <div className="card-text-footer-left">
                            {review.username}
                            {loggedInUsername === review.username && (
                              <>
                                <Link
                                  onClick={() =>
                                    deleteReview(review._id, index)
                                  }
                                >
                                  <Trash2Fill />
                                </Link>
                                <Link
                                  to={{
                                    pathname:
                                      "/courses/" +
                                      props.match.params.id +
                                      "/review",
                                    state: {
                                      currentReview: review,
                                    },
                                  }}
                                >
                                  <PencilSquare />
                                </Link>
                              </>
                            )}
                          </div>
                          <div className="card-text-footer-right">
                            {" "}
                            <Moment
                              format="YYYY/MM/DD hh:mm"
                              tz="America/Chicago"
                            >
                              {review.create_date}
                            </Moment>
                            <span> CDT</span>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No reviews yet.</div>
            )}
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
                          className="page-box"
                          onClick={() => setPage(currentPageLimit[0] + i)}
                        >
                          <strong>{currentPageLimit[0] + i + 1}</strong>
                        </Pagination.Item>
                      ) : (
                        <Pagination.Item
                          key={i}
                          className="page-box"
                          onClick={() => setPage(currentPageLimit[0] + i)}
                        >
                          {currentPageLimit[0] + i + 1}
                        </Pagination.Item>
                      );
                    })}
                  <Pagination.Next onClick={() => nextPage(1)} />
                  <Pagination.Last
                    onClick={() => setPage(Math.max(0, numberOfPages - 1))}
                  />
                </div>
              </Pagination>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No course selected</p>
        </div>
      )}
    </div>
  );
}

export default Course;
