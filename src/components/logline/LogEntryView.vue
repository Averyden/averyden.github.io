<template>
  <div class="logEntry">
    <span class="logTime">[{{ time }}]</span>
    <span class="logLevel" :class="`level-${entry.level}`">[{{ entry.level.toUpperCase() }}]</span>
    <span v-if="entry.service" class="logScope">[{{ entry.service }}]</span>
    <span v-if="entry.environment" class="logScope">[{{ entry.environment }}]</span>
    <span class="logMessage">{{ entry.message }}</span>
  </div>
  <div v-if="entry.tags?.length" class="logMeta">Tags: {{ entry.tags.join(', ') }}</div>
  <div v-if="entry.metadata && Object.keys(entry.metadata).length" class="logMeta">
    {{ formattedMetadata }}
  </div>
  <template v-if="entry.error">
    <div class="logError">{{ entry.error.name }}: {{ entry.error.message }}</div>
    <div v-for="(line, i) in stackLines" :key="i" class="logStack">{{ line }}</div>
  </template></template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LogEntry } from '@averyden/logline'

const props = defineProps<{
  entry: LogEntry
}>()

const time = computed(() =>
  props.entry.timestamp.toLocaleTimeString('en-GB', { hour12: false }),
)

const formattedMetadata = computed(() =>
  Object.entries(props.entry.metadata ?? {})
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(' '),
)

const stackLines = computed(() => {
  const error = props.entry.error
  if (!error?.stack) return []
  const lines = error.stack.split('\n').filter((line) => line.trim())
  // the first stack line usually repeats "Name: message" — skip it if so
  const header = `${error.name}: ${error.message}`
  if (lines[0]?.trim() === header || lines[0]?.startsWith(error.name)) {
    lines.shift()
  }
  return lines.slice(0, 4)
})
</script>

<style scoped>
.logEntry {
  display: flex;
  gap: 4px;
  align-items: baseline;
  flex-wrap: wrap;
}

.logTime,
.logScope {
  color: #919191;
  flex-shrink: 0;
}

.logLevel {
  flex-shrink: 0;
}

.level-debug {
  color: #919191;
}

.level-info {
  color: #41ff41;
}

.level-warn {
  color: #ffbd2e;
}

.level-error,
.level-fatal {
  color: #ff5f56;
}

.logMessage {
  color: #e0e0e0;
  word-break: break-word;
}

.logMeta,
.logError,
.logStack {
  color: #919191;
  padding-left: 10px;
}

.logError {
  color: #ff5f56;
}

.logStack {
  padding-left: 22px;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
