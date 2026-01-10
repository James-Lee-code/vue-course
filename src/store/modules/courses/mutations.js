export default {
  registerCourse(state, payload) {
    state.courses.push(payload);
  },
  setCourses(state, payload) {
    state.courses = [...state.courses, ...payload];
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};