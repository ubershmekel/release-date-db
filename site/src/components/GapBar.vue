<script setup lang="ts">
import type { Release } from '@/types/yamls';
import { isValidDate, simpleDate, yearsBetween } from '@/utils/dates';

const props = defineProps(['gap', 'maxGap'])

</script>

<template>
  <div class="gap-vis">
    <div class="time-bar-container">
      <div class="bar" :style="{ width: `${gap / maxGap * 100}%` }">
      </div>
    </div>
    <p class="years-between">
      {{ gap.toFixed(1) }} years</p>

  </div>

</template>

<style scoped>
.gap-vis {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar {
  height: 1rem;
  background-color: #66f;
}

.time-bar-container {
  height: 1rem;
  background-color: #ddd;
  border-radius: 0.3rem;
  width: 16rem;
  overflow: hidden;
}
</style>