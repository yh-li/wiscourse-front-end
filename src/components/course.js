import React, { useContext, useEffect, useState } from "react";
import CourseDataService from "../services/course";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Moment from "react-moment";
import "moment-timezone";
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
  const getCourse = (id) => {
    CourseDataService.get(id)
      .then((response) => {
        setCourse(response.data.course);
        setReviews(response.data.reviews);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCourse(props.match.params.id);
  }, [props.match.params.id]);
  const deleteReview = (reviewId, index) => {
    CourseDataService.deleteReview(reviewId)
      .then((response) => {
        setReviews((prevReviews) => {
          prevReviews.splice(index, 1);
          return {
            ...prevReviews,
          };
        });
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
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">
                        {review.text} <br />
                        <strong>User: </strong>
                        {review.username}
                        <br />
                        <strong>Created: </strong>
                        <Moment format="YYYY/MM/DD hh:mm" tz="America/Chicago">
                          {review.create_date}
                        </Moment>
                        <span> CDT</span>
                      </p>
                      {loggedInUsername === review.username && (
                        <div className="row">
                          <button
                            onClick={() => deleteReview(review._id, index)}
                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                          >
                            Delete
                          </button>
                          <Link
                            to={{
                              pathname:
                                "/courses/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review,
                              },
                            }}
                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No reviews yet.</div>
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
