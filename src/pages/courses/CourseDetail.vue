<template>
  <div>
  <div v-if="selectedCourse">
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/小時</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>加入課程</h2>
          <base-button link :to="contactLink">留言</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>

        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
  <p v-else>加載中...</p>
  </div>
</template>

<script>
export default {
  computed: {
    courseId() {
      return this.$route.params.id;
    },

    selectedCourse() {
      return this.$store.getters['courses/courses'].find(
        (course) => course.id == this.courseId
      );
    },

    fullName() {
      return this.selectedCourse
        ? `${this.selectedCourse.name}`
        : '';
    },

    areas() {
      return this.selectedCourse?.areas || [];
    },

    rate() {
      return this.selectedCourse?.hourlyRate || 0;
    },

    description() {
      return this.selectedCourse?.description || '';
    },
    contactLink() {
      return `/courses/${this.courseId}/contact`;
    },
  },
};
</script>
