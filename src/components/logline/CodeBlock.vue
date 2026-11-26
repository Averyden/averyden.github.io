<template>
  <div class="codeBlock">
    <div class="codeHeader">
      <span v-if="label" class="codeLabel">{{ label }}</span>
      <button class="copyButton" type="button" @click="copy">
        {{ copied ? '[copied!]' : '[copy]' }}
      </button>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  label?: string
}>()

const copied = ref(false)
let copiedTimeout: ReturnType<typeof setTimeout> | null = null

async function copy(): Promise<void> {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  if (copiedTimeout) clearTimeout(copiedTimeout)
  copiedTimeout = setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.codeBlock {
  max-width: 500px;
  margin: 10px auto;
  border: 1px solid #438600;
  background: #0d0d0d;
  text-align: left;
}

.codeHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 8px;
  border-bottom: 1px solid #438600;
  background: rgba(0, 0, 0, 0.6);
}

.codeLabel {
  color: #00ffc8;
  font-size: 0.7rem;
}

.copyButton {
  font-family: monospace;
  font-size: 0.7rem;
  background: none;
  border: none;
  color: #ff0095;
  cursor: pointer;
  padding: 0;
}

.copyButton:hover {
  color: #830057;
}

pre {
  margin: 0;
  padding: 8px 10px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.72rem;
  line-height: 1.5;
  color: #e0e0e0;
}
</style>
