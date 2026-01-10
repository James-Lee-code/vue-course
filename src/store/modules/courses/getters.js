export default {
  courses(state) {
    return state.courses;
  },

  hasCourses(state) {
    return state.courses && state.courses.length > 0;
  },

  isCourse(_, getters, __, rootGetters) {
    const courses = getters.courses;
    const userId = rootGetters.userId;

    return courses.some(course => course.userId === userId);
  },

  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    return (new Date().getTime() - lastFetch) / 1000 > 60;
  }
};
