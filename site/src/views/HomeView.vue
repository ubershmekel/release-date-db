<script setup lang="ts">
import { ref, onMounted } from 'vue'
import yaml from 'js-yaml'
import type { PageYaml, Release } from '@/types/yamls'
import { isValidDate, yearsBetween } from '@/utils/dates'
import ReleaseList from '@/components/ReleaseList.vue'

const yamlData = ref<PageYaml | null>(null)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const res = await fetch('/data/games/mario.yml')
  // const res = await fetch('/data/books/game-of-thrones.yml')
  const text = await res.text()
  const data = yaml.load(text) as PageYaml;
  console.log(data);
  if (res.status !== 200) {
    errorMessage.value = `Error fetching data: ${res.statusText}`
    return
  }
  if (!data.releases) {
    errorMessage.value = 'Failed to fetch releases'
    return
  }
  yamlData.value = data;
})


</script>

<template>
  <main>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <p v-if="!yamlData && !errorMessage">Loading...</p>
    <div v-if="yamlData">
      <h2>{{ yamlData.name }}</h2>
      <subtitle>Release dates</subtitle>

      <p>Creator: {{ yamlData.company }}</p>
      <ReleaseList :releases="yamlData.releases"></ReleaseList>
    </div>

  </main>
</template>

<style>
.title {
  opacity: 0.7;
}

.years-between {
  font-weight: bold;
}
</style>