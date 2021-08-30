import http from "../http-common";

class CourseDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`); // this is the url added to the base URL
  }
  get(id, page = 0) {
    return http.get(`/id/${id}?page=${page}`);
  }
  find(query, page = 0) {
    var getURL = "?";
    console.log(query);
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
  deleteReview(id) {
    return http.delete(`/reviews`, { data: { review_id: id } });
  }
  getDeps() {
    return http.get("/deps");
  }
}
export default new CourseDataService();
