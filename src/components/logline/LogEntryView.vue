<template>
  <div class="logEntry">
    <span class="logTime">{{ time }}</span>
    <span class="logLevel" :class="`level-${entry.level}`">{{ entry.level.toUpperCase() }}</span>
    <span class="logMessage">{{ entry.message }}</span>
  </div>
  <div v-if="entry.tags?.length" class="logMeta">Tags: {{ entry.tags.join(', ') }}</div>
  <div v-if="entry.metadata && Object.keys(entry.metadata).length" class="logMeta">
    {{ formattedMetadata }}
  </div>
  <template v-if="entry.error">
    <div class="logError">{{ entry.error.name }}: {{ entry.error.message }}</div>
    <div v-for="(line, i) in stackLines" :key="i" class="logStack">{{ line }}</div>
  </template>
</template>

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

const stackLines = computed(() =>
  (props.entry.error?.stack ?? '').split('\n').filter((line) => line.trim()).slice(0, 4),
)
</script>

<style scoped>
.logEntry {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.logTime {
  color: #919191;
  flex-shrink: 0;
}

.logLevel {
  flex-shrink: 0;
  min-width: 46px;
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
  padding-left: 96px;
}

.logError {
  color: #ff5f56;
}

.logStack {
  padding-left: 108px;
  white-space: pre;
}
</style>
