<template>
  <p>Average release gap
    <GapBar :gap="averageGap" :maxGap="maxGap"></GapBar>
  </p>
  <hr />
  <ul class="releases">
    <li>Since last release
      <GapBar :gap="gapByIndex(-1)" :max-gap="maxGap"></GapBar>
    </li>
    <li v-for="(release, index) in releases" :key="release.title">
      <p>{{ simpleDate(release.release_date) }} <span class="title">{{ release.title }}</span></p>
      <GapBar v-if="hasGap(index)" :gap="gapByIndex(index)" :maxGap="maxGap"></GapBar>
    </li>
  </ul>

</template>

<script setup lang="ts">
import type { Release } from '@/types/yamls';
import { average, isValidDate, simpleDate, yearsBetween } from '@/utils/dates';
import GapBar from './GapBar.vue';

const props = defineProps(['releases'])

function averageReleaseGap(releases: Release[]) {
  const dates = releases.filter(release => isValidDate(release.release_date)).map(release => release.release_date)
  dates.push(new Date());
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime())
  const firstDate = sortedDates[0]
  const lastDate = sortedDates[sortedDates.length - 1]
  return yearsBetween(firstDate, lastDate) / (releases.length - 1);
}

function recentRelease(releases: Release[]): Release | undefined {
  for (const release of releases) {
    if (isValidDate(release.release_date)) {
      return release
    }
  }
}

const gaps = [];
for (let i = 1; i < props.releases.length; i++) {
  if (!isValidDate(props.releases[i - 1].release_date)) {
    continue;
  }
  gaps.push(yearsBetween(props.releases[i - 1].release_date, props.releases[i].release_date))
}
const maxGap = Math.max(...gaps);
const averageGap = average(gaps);

function gapByIndex(index: number): number {
  if (index === -1) {
    return yearsBetween(new Date(),
      recentRelease(props.releases)!.release_date);
  }
  return yearsBetween(
    props.releases[index + 1].release_date, props.releases[index].release_date);
}

function hasGap(index: number): boolean {
  return index + 1 < props.releases.length && isValidDate(props.releases[index].release_date)
}

</script>

<style scoped>
.releases li {
  list-style: none;
}

hr {
  border: 1px solid #ddd;
  width: 30rem;
}

ul {
  padding: 0;
}
</style>
