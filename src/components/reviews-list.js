import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ReviewsList() {
  const { loggedInUsername } = useContext(AuthContext);
  return loggedInUsername ? (
    <div>secret review list</div>
  ) : (
    <p>Please log in to check reviews</p>
  );
}
export default ReviewsList;
