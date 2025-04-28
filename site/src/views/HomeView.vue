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
    <p>
      I made this site so I could guess how much time is left until the next Pixel is
      coming out so I could decide whether
      to buy it now or wait for the next generation. I also
      wanted to estimate how much longer I have to wait until Nintendo release their next Mario game. You can
      <RouterLink to="/about">add to the db</RouterLink> too btw.
    </p>
    <div v-for="categoryObj in categoryList" :key="categoryObj.categoryName">
      <h3>{{ categoryObj.categoryName }}</h3>
      <ul>
        <li v-for="item in categoryObj.projects" :key="item.link">
          <a class="project-link" :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.project-link {
  display: block;
}

h3 {
  text-transform: capitalize;
}
</style>
