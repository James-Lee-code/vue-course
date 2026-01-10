export default {
  async registerCourse(context, data) {
    const userId = context.rootGetters.userId;
    const courseData = {
      name: data.name,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
      userId: userId,
    };
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-couse-project-default-rtdb.asia-southeast1.firebasedatabase.app/courses.json?auth=` + token,
      {
        method: 'POST',
        body: JSON.stringify(courseData)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to register!');
      throw error;
    }

    context.commit('registerCourse', {
      ...courseData,
      id: responseData.name
    });
  },

  async loadCourses(context, payload) {
    if (!payload?.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-couse-project-default-rtdb.asia-southeast1.firebasedatabase.app/courses.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    const courses = [];

    for (const key in responseData) {
      courses.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
        userId: responseData[key].userId
      });
    }

    context.commit('setCourses', courses);
    context.commit('setFetchTimestamp');
  }
};
