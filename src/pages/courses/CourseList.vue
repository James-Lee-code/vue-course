<template>
  <div>
  <base-dialog :show="!!error" title="An Error Occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <course-filter @change-filter="setFilter"></course-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCourses(true)">載入</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">登入</base-button>
        <base-button v-if="isLoggedIn && !isCourse && !isLoading" link to="/register">新增課程</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner> 
      </div>
      <ul v-if="hasCourses">
        <course-item
          v-for="course in filteredCourses"
          :key="course.id"
          :id="course.id"
          :name="course.name"
          :rate="course.hourlyRate"
          :areas="course.areas"
        ></course-item>
      </ul>

      <h3 v-else>目前沒有課程</h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import CourseItem from '@/components/courses/CourseItem.vue'
import CourseFilter from '@/components/courses/CourseFilter.vue'

export default {
  components: {
    CourseItem,
    CourseFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: {
        toeic: true,
        ielts: true,
        career: true
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCourse() {
      return this.$store.getters['courses/isCourse'];
    },
    filteredCourses() {
      const courses = this.$store.getters['courses/courses']

      return courses.filter((course) => {
        if (this.activeFilter.toeic && course.areas.includes('多益課程')) {
          return true
        }
        if (this.activeFilter.ielts && course.areas.includes('雅思課程')) {
          return true
        }
        if (this.activeFilter.career && course.areas.includes('課後輔導')) {
          return true
        }
        return false
      })
    },
    hasCourses() {
      return !this.isLoading && this.$store.getters['courses/hasCourses']
    }
  },
  created() {
    this.loadCourses();
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilter = updatedFilters
    },
    async loadCourses(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('courses/loadCourses', {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Failed to load courses.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
