import React, { useContext, useState } from "react";
import CourseDataService from "../services/course";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const AddReview = (props) => {
  const { loggedInUsername } = useContext(AuthContext);
  //see if we can find a review from the curent user for the current course

  let initialReviewState = "";
  let editing = false;
  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text;
  }
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event) => {
    setReview(event.target.value);
  };
  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      course_id: props.match.params.id,
    };
    if (editing) {
      data.review_id = props.location.state.currentReview._id;
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
                to={"/courses/" + props.match.params.id}
                className="btn btn-success"
              >
                Back to Course
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default AddReview;
