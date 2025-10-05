<template>
  <div id="app">
    <StarfieldCanvas />
    <main class="content">
      <MainTable />
    </main>
  </div>
</template>

<script setup lang="ts">
import StarfieldCanvas from './components/starfieldCanvas.vue'
import MainTable from './components/mainTable.vue'
</script>

<style>
#app {
  /* height: 100%; */
  width: 100%;
}

.content {
  position: relative;
  z-index: 1; /* keeps it above the canvas */
}
</style>
