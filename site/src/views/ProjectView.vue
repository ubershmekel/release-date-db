<script setup lang="ts">
import { ref, onMounted } from 'vue'
import yaml from 'js-yaml'
import type { PageYaml, Release } from '@/types/yamls'
import ReleaseList from '@/components/ReleaseList.vue'
import { isValidDate } from '@/utils/dates'

// thanks to `props: true` in route
const props = defineProps(['folder', 'file'])
console.log("props", props)
const yamlData = ref<PageYaml | null>(null)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const res = await fetch(`/data/${props.folder}/${props.file}.yml`)
  // const res = await fetch('/data/games/mario.yml')
  // const res = await fetch('/data/books/game-of-thrones.yml')
  const text = await res.text()
  const data = yaml.load(text) as PageYaml;
  console.log(data);
  if (res.status !== 200) {
    errorMessage.value = `Error fetching data: ${res.statusText}`
    return
  }

  for (const release of data.releases) {
    if (!isValidDate(release.release_date)) {
      // Check if it's a date string like '2025-10'
      const date = new Date(release.release_date)
      if (isValidDate(date)) {
        release.release_date = date
      }
    }
  }

  if (!data.releases) {
    errorMessage.value = 'Failed to fetch releases'
    return
  }
  yamlData.value = data;
})


</script>

<template>
  <div class="project-page">
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <p v-if="!yamlData && !errorMessage">Loading...</p>
    <div v-if="yamlData">
      <h2>{{ yamlData.name }}</h2>
      <h3>Release dates</h3>

      <p>Creator: {{ yamlData.company }}</p>
      <ReleaseList :releases="yamlData.releases"></ReleaseList>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
