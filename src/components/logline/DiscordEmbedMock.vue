<template>
  <div class="discordMock">
    <div class="discordBar" :style="{ background: barColor }"></div>
    <div class="discordBody">
      <div class="discordHeader">
        <div class="discordAvatar">L</div>
        <div>
          <div class="discordBot">
            logline <span class="discordBotTag">APP</span> <span class="discordTime">{{ time }}</span>
          </div>
          <div class="discordTitle">{{ embed.title }}</div>
          <div class="discordDescription">{{ embed.description }}</div>
        </div>
      </div>
      <div v-if="embed.fields?.length" class="discordFields">
        <div v-for="field in embed.fields" :key="field.name" class="discordField">
          <div class="fieldName">{{ field.name }}</div>
          <div class="fieldValue">{{ field.value }}</div>
        </div>
      </div>
      <div v-if="embed.footer" class="discordFooter">{{ embed.footer.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDiscordEmbed, type LogEntry } from '@averyden/logline'

const props = defineProps<{
  entry: LogEntry
}>()

const embed = computed(() => formatDiscordEmbed(props.entry))
const time = computed(() =>
  props.entry.timestamp.toLocaleTimeString('en-GB', { hour12: false }),
)

const barColor = computed(() => {
  const color = embed.value.color
  return '#' + color.toString(16).padStart(6, '0')
})
</script>

<style scoped>
.discordMock {
  display: flex;
  max-width: 500px;
  margin: 10px auto;
  border: 1px solid #438600;
  background: #313338;
  text-align: left;
  font-family: monospace;
}

.discordBar {
  width: 4px;
  flex-shrink: 0;
}

.discordBody {
  padding: 8px 10px;
  flex-grow: 1;
}

.discordHeader {
  display: flex;
  gap: 8px;
}

.discordAvatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #41ff41;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.discordBot {
  font-size: 0.75rem;
  color: #fff;
  font-weight: bold;
}

.discordBotTag {
  background: #5865f2;
  color: #fff;
  font-size: 0.55rem;
  padding: 1px 3px;
  border-radius: 3px;
  vertical-align: middle;
}

.discordTime {
  font-size: 0.6rem;
  color: #949ba4;
  font-weight: normal;
}

.discordTitle {
  font-size: 0.75rem;
  color: #fff;
  margin-top: 3px;
}

.discordDescription {
  font-size: 0.7rem;
  color: #dbdee1;
  margin-top: 2px;
  word-break: break-word;
}

.discordFields {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  margin-top: 8px;
  padding-left: 36px;
}

.fieldName {
  font-size: 0.65rem;
  font-weight: bold;
  color: #fff;
}

.fieldValue {
  font-size: 0.65rem;
  color: #dbdee1;
}

.discordFooter {
  margin-top: 8px;
  padding-left: 36px;
  font-size: 0.6rem;
  color: #949ba4;
}
</style>
