<template>
  <div class="about">
    <h2>About Release Date DB</h2>
    <p>
      The idea is to have a database of release dates for games and other
      projects. This will hopefully help estimate when the next release will be.
    </p>
    <h2>How to contribute</h2>
    <p>Please bring in new releases data for projects that a lot of people are waiting for 🙏</p>
    <p>1. You can generate the YAML yourself. But you can also use your AI agent with the following prompt:</p>
    <CopyButton :text="instructions" />
    <pre>
      {{ instructions }}
    </pre>
    <p>2. Copy the resulting yaml</p>
    <p>3. Create a pull request in the <a href="https://github.com/ubershmekel/release-date-db/tree/main/data">GitHub
        release-date-db repo</a>
      by going into the appropriate folder and clicking "Add file".
    </p>
    <p>4. Paste the yaml file contents and submit the pull request.</p>
    <p>5. When the pull request is approved and merged, the site will be updated.</p>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import CopyButton from '@/components/CopyButton.vue';

const instructions = `
Generate a yaml file for PLACE_YOUR_BOOK_SHOW_NAME_HERE major releases,
so instead of rows for variant releases in the same year, just add
them to the title. And make sure to sort the releases with the most
recent release first. Follow this format:

\`\`\`
name: Mario
creator: Nintendo
releases:
  - title: Super Mario Bros. Wonder
    release_date: 2023-10-20

  - title: Super Mario Odyssey
    release_date: 2017-10-27
\`\`\`
`;

</script>
