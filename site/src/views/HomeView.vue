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

function averageReleaseGap(releases: Release[]) {
  const dates = releases.filter(release => isValidDate(release.release_date)).map(release => release.release_date)
  dates.push(new Date());
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime())
  const firstDate = sortedDates[0]
  const lastDate = sortedDates[sortedDates.length - 1]
  return yearsBetween(firstDate, lastDate) / (releases.length - 1);
}



</script>

<template>
  <main>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <p v-if="!yamlData && !errorMessage">Loading...</p>
    <div v-if="yamlData">
      <h2>{{ yamlData.name }} release dates</h2>

      <p>Creator: {{ yamlData.company }}</p>
      <p>Average release gap: <span class="years-between">{{ averageReleaseGap(yamlData.releases).toFixed(1)
          }} years</span></p>
      <p>Releases:</p>
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