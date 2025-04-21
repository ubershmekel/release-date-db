<script setup lang="ts">
import { ref, onMounted } from 'vue'
import yaml from 'js-yaml'
import type { PageYaml } from '@/types/yamls'

const yamlData = ref<PageYaml | null>(null)

onMounted(async () => {
  const res = await fetch('/data/games/mario.yml')
  const text = await res.text()
  yamlData.value = yaml.load(text) as any
})

function simpleDate(date: Date) {
  return date.toISOString().split('T')[0]
}

function monthsBetween(dateA: Date, dateB: Date) {
  // Get the amount of months between two dates
  const msInMonth = 30.44 * 24 * 60 * 60 * 1000; // average month in ms
  const diffMs = Math.abs(dateB.getTime() - dateA.getTime());
  return diffMs / msInMonth;
}
function yearsBetween(dateA: Date, dateB: Date) {
  // Get the amount of months between two dates
  const msInMonth = 365 * 24 * 60 * 60 * 1000; // average month in ms
  const diffMs = Math.abs(dateB.getTime() - dateA.getTime());
  return diffMs / msInMonth;
}

</script>

<template>
  <main>
    <div>
      <h2>Fetched YAML</h2>

      <div v-if="yamlData">
        {{ yamlData.name }}
        <!-- {{ yamlData }} -->
        <ul>
          <li v-for="(release, index) in yamlData.releases" :key="release.title">
            <p v-if="index > 0">{{ yearsBetween(release.release_date, yamlData.releases[index -
              1].release_date).toFixed(1) }} years</p>
            <p>{{ release.title }}</p>
            <p>{{ simpleDate(release.release_date) }}</p>
          </li>
        </ul>
      </div>
      <p v-else>Loading...</p>
    </div>

  </main>
</template>
