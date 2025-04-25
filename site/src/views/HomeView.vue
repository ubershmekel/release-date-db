<script setup lang="ts">
import sitemap from '../../public/sitemap.json';

type ProjectType = typeof sitemap[0]

const byCategory: { [key: string]: ProjectType[] } = {};
sitemap.forEach(item => {
  if (!byCategory[item.category]) {
    byCategory[item.category] = []
  }
  byCategory[item.category].push(item)
})
const keys = Object.keys(byCategory).sort();
const categoryList: { categoryName: string, projects: ProjectType[] }[] = [];
for (const key of keys) {
  const projects = byCategory[key].sort((a, b) => a.name.localeCompare(b.name));
  categoryList.push({ categoryName: key, projects })
}

</script>

<template>
  <main>
    <h2>Projects</h2>
    <div v-for="categoryObj in categoryList" :key="categoryObj.categoryName">
      <h3>{{ categoryObj.categoryName }}</h3>
      <ul>
        <li v-for="item in categoryObj.projects" :key="item.link">
          <a :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
a {
  display: block;
}

h3 {
  text-transform: capitalize;
}
</style>
