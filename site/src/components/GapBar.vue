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
    <div v-if="gap > maxGap" class="late-bar" :style="{ width: '3%' }">
      <span class="plus">+</span>
    </div>

    <div class="years-between">
      {{ gap.toFixed(1) }} years</div>

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
  /* flex-shrink: 0 is when mobile causes the red plus to take
  space from the blue bar */
  flex-shrink: 0;
}

.plus {
  color: #fff;

}

.late-bar {
  background-color: #f00;
  width: 3%;
  height: 1rem;
  border-radius: 0.3rem;
  text-align: center;
  display: flex;
  align-items: center;
  /* vertical alignment */
  justify-content: center;
  /* horizontal alignment */
}

.years-between {
  margin-bottom: 0;
}
</style>
