<script setup lang="ts">
import { ref, onMounted } from 'vue'
import yaml from 'js-yaml'
import type { PageYaml, Release } from '@/types/yamls'

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

function simpleDate(date: Date) {
  if (isValidDate(date)) {
    return date.toISOString().split('T')[0]
  } else {
    return date;
  }
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

function averageReleaseGap(releases: Release[]) {
  const dates = releases.filter(release => isValidDate(release.release_date)).map(release => release.release_date)
  dates.push(new Date());
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime())
  const firstDate = sortedDates[0]
  const lastDate = sortedDates[sortedDates.length - 1]
  return yearsBetween(firstDate, lastDate) / (releases.length - 1);
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

function recentRelease(releases: Release[]): Release | undefined {
  for (const release of releases) {
    if (isValidDate(release.release_date)) {
      return release
    }
  }
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
      <p>Average years between releases: <span class="years-between">{{ averageReleaseGap(yamlData.releases).toFixed(1)
      }} years</span></p>
      <p>Releases:</p>
      <ul>
        <li>Since last release: <span class="years-between">{{ yearsBetween(new Date(),
          recentRelease(yamlData.releases)!.release_date).toFixed(1) }} years</span></li>
        <li v-for="(release, index) in yamlData.releases" :key="release.title">
          <p>{{ simpleDate(release.release_date) }} <span class="title">{{ release.title }}</span></p>
          <p class="years-between" v-if="index + 1 < yamlData.releases.length && isValidDate(release.release_date)">{{
            yearsBetween(
              yamlData.releases[index + 1].release_date, release.release_date).toFixed(1) }} years</p>
          <p></p>
        </li>
      </ul>
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