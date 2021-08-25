import http from "../http-common";

class CourseDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`); // this is the url added to the base URL
  }
  get(id) {
    return http.get(`/id/${id}`);
  }
  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }
  createReview(data) {
    return http.post("/reviews", data);
  }
  updateReview(data) {
    return http.put("/reviews", data);
  }
  deleteReview(id, userId) {
    return http.delete(`/reviews?id=${id}`, { data: { user_id: userId } });
  }
  getDeps() {
    return http.get("/deps");
  }
  createCourse(data) {
    console.log("Trying to create course");
    return http.post("/create", data);
  }
}
export default new CourseDataService();
