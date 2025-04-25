<template>
  <button class="copy-button" :onclick="copyText">{{ buttonText }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps(['text'])
let buttonText = ref('Copy');

function copyText() {
  navigator.clipboard.writeText(props.text)
    .then(() => {
      buttonText.value = 'Copied!';
      setTimeout(() => {
        buttonText.value = 'Copy';
      }, 1000);
    })
    .catch(err => console.error('Error copying text: ', err));
}
</script>