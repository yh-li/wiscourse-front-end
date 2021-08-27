//helper file
import axios from "axios";
export default axios.create({
  //baseURL: "https://stormy-lake-18988.herokuapp.com/api/v1/courses",
  baseURL: "http://localhost:5000/api/v1/courses",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
