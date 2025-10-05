<template>
  <table class="mainBox">
    <tbody>
      <tr>
        <th>
          <NavHeader />
        </th>
      </tr>
      <tr>
        <th>
          <AboutSection />
          <!-- <hr class="divider" /> -->
          <ProjectList />
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import NavHeader from './NavHeader.vue'
import ProjectList from './ProjectList.vue'
import AboutSection from './AboutSection.vue'
</script>

<style scoped>
.mainBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.divider {
  color: #41ff41;
  margin: 10px 0;
}
</style>
