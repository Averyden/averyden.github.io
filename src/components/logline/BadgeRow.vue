<template>
  <div class="badgeRow">
    <a
      v-for="badge in badges"
      :key="badge.alt"
      :href="badge.href"
      target="_blank"
      class="badgeLink"
    >
      <img :src="badge.src" :alt="badge.alt" :title="badge.alt" class="badge" draggable="false" />
    </a>
  </div>
</template>

<script setup lang="ts">
interface Badge {
  src: string
  href: string
  alt: string
}

const badges: Badge[] = [
  {
    src: 'https://img.shields.io/npm/v/@averyden/logline?style=for-the-badge&logo=npm',
    href: 'https://www.npmjs.com/package/@averyden/logline',
    alt: 'npm version',
  },
  {
    src: 'https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white',
    href: 'https://www.typescriptlang.org/',
    alt: 'TypeScript',
  },
  {
    src: 'https://img.shields.io/badge/License-MIT-yellow',
    href: 'https://github.com/Averyden/logline/blob/master/LICENSE',
    alt: 'License: MIT',
  },
]
</script>

<style scoped>
.badgeRow {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
}

.badgeLink {
  line-height: 0;
}

.badge {
  height: 20px;
  width: auto;
  user-select: none;
}
</style>
