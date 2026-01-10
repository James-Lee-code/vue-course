export default {
  async contactCourse(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-couse-project-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.courseId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to send request!');
    }

    newRequest.id = responseData.name;

    context.commit('addRequest', newRequest);
  },

  async loadRequests(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const allCourses = context.rootGetters['courses/courses'];
    const myCourses = allCourses.filter(c => c.userId === userId);

    const requests = [];

    for (const course of myCourses) {
      const response = await fetch(
        `https://vue-couse-project-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${course.id}.json?auth=${token}`
      );

      const responseData = await response.json();

      if (response.ok && responseData) {
        for (const key in responseData) {
          requests.push({
            id: key,
            userEmail: responseData[key].userEmail,
            message: responseData[key].message,
            courseId: course.id, // ★ 正確保留課程 ID
          });
        }
      }
    }

    context.commit('setRequests', requests);
  },
};
