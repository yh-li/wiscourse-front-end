import React, { useEffect, useState } from "react";
import CourseDataService from "../services/course";
import { Link } from "react-router-dom";
function Course(props) {
  const initialCourseState = {
    id: null,
    name: "",
    dep: "",
    no: "",
    reviews: [],
  };
  const [course, setCourse] = useState(initialCourseState);
  const getCourse = (id) => {
    CourseDataService.get(id)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCourse(props.match.params.id);
  }, [props.match.params.id]);
  const deleteReview = (reviewId, index) => {
    CourseDataService.deleteReview(reviewId, props.user.id)
      .then((response) => {
        setCourse((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
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
              {course.dep} {course.no}
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
            {course.reviews.length > 0 ? (
              course.reviews.map((review, index) => (
                <div className="col-lg-4 pb-1" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">
                        {review.text} <br />
                        <strong>User: </strong>
                        {review.name}
                        <br />
                        <strong>Date: </strong>
                        {review.date}
                      </p>
                      {props.user && props.user.id === review.user_id && (
                        <div className="row">
                          <a
                            onClick={() => deleteReview(review._id, index)}
                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                          >
                            Delete
                          </a>
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
