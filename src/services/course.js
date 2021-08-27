import http from "../http-common";

class CourseDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`); // this is the url added to the base URL
  }
  get(id) {
    return http.get(`/id/${id}`);
  }
  find(query, page = 0) {
    var getURL = "?";
    for (const [key, value] of Object.entries(query)) {
      getURL += key + "=" + value + "&";
    }
    getURL += "page=" + page;
    return http.get(getURL);
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
}
export default new CourseDataService();
