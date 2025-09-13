<template>
  <StarfieldCanvas />
  <main class="app-content">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import StarfieldCanvas from './components/starfieldCanvas.vue'
</script>

<style>
.app-content {
  position: relative;
  z-index: 1;
}
</style>
