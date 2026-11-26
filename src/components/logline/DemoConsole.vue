<template>
  <TerminalWindow title="logline — live demo (bun run dev)">
    <div v-if="!entries.length" class="demoEmpty">[no log entries yet — press a button o(≧∀≦)o]</div>
    <LogEntryView
      v-for="(entry, i) in entries"
      :key="entry.timestamp.getTime() + '-' + i"
      :entry="entry"
    />
  </TerminalWindow>

  <div class="demoControls">
    <button v-for="level in LOG_LEVELS" :key="level" class="demoButton" @click="log(level)">
      {{ level }}
    </button>
    <button class="demoButton demoClear" @click="clear">clear</button>
  </div>

  <div class="demoControls">
    <label class="demoLabel">minLevel:</label>
    <select v-model="minLevel" class="demoSelect">
      <option v-for="level in LOG_LEVELS" :key="level" :value="level">{{ level }}</option>
    </select>
  </div>

  <p class="demoNote">the real @averyden/logline library, running in your browser (｡･∀･)ﾉﾞ</p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  ConsoleTransport,
  LOG_LEVELS,
  createLogger,
  type LogLevel,
  type LogEntry,
  type LogContext,
  type Logger,
  type Transport,
} from '@averyden/logline'
import TerminalWindow from './TerminalWindow.vue'
import LogEntryView from './LogEntryView.vue'

const MAX_ENTRIES = 50

class CaptureTransport implements Transport {
  private readonly sink: (entry: LogEntry) => void

  constructor(sink: (entry: LogEntry) => void) {
    this.sink = sink
  }

  log(entry: LogEntry): void {
    this.sink(entry)
  }
}

const entries = ref<LogEntry[]>([])
const minLevel = ref<LogLevel>('debug')
const pressCount = ref(0)

function buildLogger(level: LogLevel): Logger {
  return createLogger({
    service: 'logline-demo',
    environment: 'your-browser',
    minLevel: level,
    transports: [
      new ConsoleTransport(),
      new CaptureTransport((entry) => {
        entries.value = [entry, ...entries.value].slice(0, MAX_ENTRIES)
      }),
    ],
  })
}

let logger = buildLogger(minLevel.value)

watch(minLevel, (level) => {
  logger = buildLogger(level)
})

interface DemoCall {
  message: string
  error?: unknown
  context?: LogContext
}

const DEMO_MESSAGES: Record<LogLevel, () => DemoCall> = {
  debug: () => ({
    message: 'someone is poking the demo buttons',
    context: { metadata: { presses: pressCount.value } },
  }),
  info: () => ({
    message: 'demo button pressed successfully',
    context: { metadata: { presses: pressCount.value } },
  }),
  warn: () => ({
    message: 'button mashing detected',
    error: new Error('suspiciously high press rate'),
    context: { metadata: { presses: pressCount.value, suspicion: 'high' } },
  }),
  error: () => ({
    message: 'demo exploded (not really)',
    error: new Error('fake error for demonstration purposes'),
  }),
  fatal: () => ({
    message: 'catastrophic demo failure',
    error: new Error('this is fine (._.)'),
  }),
}

function log(level: LogLevel): void {
  pressCount.value += 1
  const call = DEMO_MESSAGES[level]()
  if (level === 'debug' || level === 'info') {
    logger[level](call.message, call.context)
  } else {
    logger[level](call.message, call.error, call.context)
  }
}

function clear(): void {
  entries.value = []
}
</script>

<style scoped>
.demoEmpty {
  color: #919191;
}

.demoControls {
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
}

.demoButton {
  font-family: monospace;
  font-size: 0.75rem;
  padding: 4px 10px;
  background: none;
  border: 1px solid #41ff41;
  color: #41ff41;
  cursor: pointer;
}

.demoButton:hover {
  background: rgba(65, 255, 65, 0.15);
}

.demoClear {
  border-color: #830057;
  color: #ff0095;
}

.demoSelect {
  font-family: monospace;
  font-size: 0.75rem;
  background: #0d0d0d;
  color: #00ffc8;
  border: 1px solid #41ff41;
  padding: 3px 6px;
}

.demoLabel {
  color: #00ffc8;
  font-size: 0.75rem;
}

.demoNote {
  max-width: 500px;
  margin: 10px auto;
  color: #919191;
  font-size: 0.7rem;
  font-style: italic;
}
</style>
