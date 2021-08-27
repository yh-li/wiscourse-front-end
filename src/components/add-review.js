import React, { useContext, useEffect, useState } from "react";
import CourseDataService from "../services/course";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import http from "../http-common";
const AddReview = (props) => {
  const { loggedInUsername } = useContext(AuthContext);
  //see if we can find a review from the curent user for the current course
  const [review, setReview] = useState();
  const getReview = (course_id, username) => {
    if (course_id && username) {
      http.get(`/reviews/${username}/${course_id}`).then((response) => {
        console.log(response);
        let existing = false;
        if (response.data) existing = true;
        setReview({ editing: existing, review: response.data });
      });
    }
  };
  useEffect(() => {
    getReview(props.match.params.course_id, loggedInUsername);
  }, [props.match.params.course_id, loggedInUsername]);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event) => {
    setReview((prevReview) => ({
      ...prevReview,
      review: { ...prevReview.review, text: event.target.value },
    }));
  };
  const saveReview = () => {
    console.log(review);
    var data = {
      text: review.review.text,
      username: loggedInUsername,
      course_id: props.match.params.course_id,
    };
    if (review.editing) {
      data.review_id = review.review._id;
      CourseDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      CourseDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      {loggedInUsername ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link
                to={"/courses/" + props.match.params.course_id}
                className="btn btn-success"
              >
                Back to Course
              </Link>
            </div>
          ) : review ? (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {review.editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review.review ? review.review.text : ""}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          ) : (
            <label htmlFor="description">Review Loading...</label>
          )}
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default AddReview;
