<template>
  <header class="nav1" id="top">
    <h1 style="margin-top: 0">
      <b id="rainbow" :style="{ color: rainbowColor }">Averyden</b>
    </h1>

    <p class="smallMargin" id="sub">
      <b style="color: slateblue">Hallo!! ヾ(•ω•`)o</b>
    </p>

    <p class="smallMargin">
      <b style="color: slateblue"
        >Welcome to my temporary portfolio while I work on the rest of the site.
      </b>
      <span id="eepy" :style="{ color: 'slateblue' }">{{ eepyText }}</span>
    </p>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const rainbowColor = ref<string>(getRandomColor())
const eepyText = ref<string>('(～﹃～)~zZ')

let rainbowInterval: ReturnType<typeof setInterval> | null = null
let eepyInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  rainbowInterval = setInterval(() => {
    rainbowColor.value = getRandomColor()
  }, 1000)

  eepyInterval = setInterval(() => {
    eepyText.value = eepyText.value === '(～﹃～)~zZ' ? '(～﹃～)~ZzZ' : '(～﹃～)~zZ'
  }, 2000)
})

onUnmounted(() => {
  if (rainbowInterval) clearInterval(rainbowInterval)
  if (eepyInterval) clearInterval(eepyInterval)
})

function getRandomColor(): string {
  const charset = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += charset[Math.floor(Math.random() * 16)]
  }
  return color
}
</script>

<style scoped>
.nav1 {
  text-align: center;
}

.smallMargin {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
