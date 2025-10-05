<template>
  <h2 id="infoTitle" class="titleMargin">
    <b style="color: slateblue; margin-bottom: 10px">Projects:</b>
  </h2>
  <div class="scrollable-content">
    <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
    <div class="extraInfo">
      not all of my projects are listed here.
      <br />
      feel free to visit my

      <a href="https://github.com/Averyden" target="_blank" class="inlineLink">[github]</a> to see
      further projects i am working on (｡･∀･)ﾉﾞ
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'

interface Project {
  name: string
  description: string
  repo: string
  demo?: string
  icon: string
}

const projects: Project[] = [
  {
    name: 'MetaTune',
    description: 'A Vue.js application allowing users to edit audio metadata',
    repo: 'https://github.com/Averyden/MetaTune',
    demo: 'https://averyden.github.io/MetaTune',
    icon: '/projectAssets/metaIcon.png',
  },
  {
    name: 'LazGamba',
    description:
      'a small little side project based on an inside joke from within the <a href="https://twitch.tv/ShyLily" target="_blank">ShyLily</a> twitch community.',
    repo: 'https://github.com/Averyden/lazGamba',
    demo: 'https://averyden.github.io/LazGamba',
    icon: 'projectAssets/lazGambTMPIcon.webp',
  },
  {
    name: 'Notesu',
    description: 'a w.i.p sticky note website started as a hobby project',
    repo: 'https://github.com/Averyden/Notesu',
    demo: 'https://averyden.github.io/Notesu',
    icon: 'projectAssets/notesu.png',
  },
  {
    name: 'pasman',
    description: 'a password manager written in Python using the TKinter library.',
    repo: 'https://github.com/Averyden/password-manager',
    icon: 'projectAssets/pasman.png',
  },
  {
    name: 'acto',
    description: 'todo manager written in Python. [Archival project]',
    repo: 'https://github.com/Averyden/Acto',
    icon: 'projectAssets/noIcon.png',
  },
]
</script>
