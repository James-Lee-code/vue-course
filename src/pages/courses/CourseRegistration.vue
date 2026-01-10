<template>
  <div>
  <section>
    <base-card>
      <h2>註冊新增課程</h2>
      <course-form @save-data="saveData"></course-form>
    </base-card>
  </section>
  </div>
</template>

<script>
import CourseForm from '@/components/courses/CourseForm.vue';

export default {
  components: {
    CourseForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('courses/registerCourse', data);
      this.$router.replace('/courses');
    }
  }
};
</script>