<script setup lang="ts">
import sitemap from '../../public/sitemap.json';
</script>

<template>
  <main>
    <h2>Sitemap</h2>
    <ul>
      <li v-for="item in sitemap" :key="item.link">
        <a :href="item.link">{{ item.name }}</a>
      </li>
    </ul>
  </main>
</template>

<style scoped>
a {
  display: block;
}
</style>
