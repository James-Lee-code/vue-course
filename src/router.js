import { createRouter, createWebHistory } from 'vue-router'
import CoursesList from './pages/courses/CourseList.vue'
import CourseDetail from './pages/courses/CourseDetail.vue'
import CourseContact from './pages/requests/CourseContact.vue'
import CourseRegister from './pages/courses/CourseRegistration.vue'
import RequestCourse from './pages/requests/RequestCourse.vue'
import NotFound from './pages/NotFound.vue'
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/courses' },

    {
      path: '/courses',
      name: 'courses',
      component: CoursesList
    },

    {
      path: '/courses/:id',
      name: 'course-detail',
      component: CourseDetail,
      props: true,
      children: [
        {
          path: 'contact',
          name: 'course-contact',
          component: CourseContact,
          props: true
        }
      ]
    },

    { path: '/register', component: CourseRegister, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestCourse, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/courses');
  } else {
    next();
  }
});
export default router
