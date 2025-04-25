<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink to="/"><img alt="Release Date DB" class="logo" src="/favicon.png" />Release Date DB</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <hr />
    </div>
  </header>

  <RouterView />

  <footer>
    <p>Release Date DB was made by <a href="https://bsky.app/profile/ubershmekel.bsky.social">ubershmekel</a> and <a
        href="https://github.com/ubershmekel/release-date-db">the source is on github</a></p>
  </footer>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  /* This centers the content vertically */
}

nav a {
  margin-right: 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  /* Center the image and text together */

}

nav a:hover {
  text-decoration: underline;
}

nav a:visited {
  color: inherit;
}

.logo {
  height: 2rem
}

footer {
  margin-top: 3rem;
}
</style>
