<template>
  <header>
    <nav>
        <router-link to="/" class="logo-link"><img src="UP.png" alt="up" class="logo"></router-link>
      <ul>
        <li>
          <router-link to="/courses">所有課程</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">留言</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">登入</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">登出</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/courses');
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-link {
  padding: 0;
  border: none;
}

.logo {
  height: 3rem;
  width: auto;
  display: block;
  transition: transform 0.2s ease;
}

.logo-link:hover .logo {
  transform: scale(1.05);
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}


</style>