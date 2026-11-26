<template>
  <section class="nav1" id="info">
    <h2 class="smallMargin" id="infoTitle">
      <b style="color: slateblue">Logline:</b>
    </h2>
    <div class="subText tagline">lightweight structured logging for TypeScript o(_^▽^_)┛</div>

    <BadgeRow />

    <hr class="divider" />

    <h2 class="smallMargin sectionTitle"><b style="color: slateblue">screen shots:</b></h2>

    <TerminalWindow title="logline — sample output">
      <LogEntryView v-for="(entry, i) in sampleEntries" :key="'sample-' + i" :entry="entry" />
    </TerminalWindow>

    <TerminalWindow title="logline — DiscordTransport">
      <DiscordEmbedMock :entry="discordSample" />
    </TerminalWindow>

    <p class="bestViewed">best viewed at 800x600 with a CRT monitor (⌐■_■)</p>

    <hr class="divider" />

    <h2 class="smallMargin sectionTitle"><b style="color: slateblue">try it out:</b></h2>
    <DemoConsole />

    <hr class="divider" />

    <h2 class="smallMargin sectionTitle"><b style="color: slateblue">quick start:</b></h2>

    <CodeBlock label="setup.ts" :code="SETUP_SNIPPET" />
    <CodeBlock label="errors.ts" :code="ERROR_SNIPPET" />
    <CodeBlock label="discord.ts" :code="DISCORD_SNIPPET" />

    <hr class="divider" />

    <h2 class="smallMargin sectionTitle"><b style="color: slateblue">download:</b></h2>
    <CodeBlock label="terminal" :code="INSTALL_COMMAND" />

    <p class="requirements">
      requirements: TypeScript &ge; 5.0 &middot; node &ge; 18 &middot; zero dependencies
    </p>
    <p class="npmLink">
      get it on
      <a href="https://www.npmjs.com/package/@averyden/logline" target="_blank" class="inlineLink"
        >[npm]</a
      >
      or view the
      <a href="https://github.com/Averyden/logline" target="_blank" class="inlineLink">[source]</a>
    </p>

    <hr class="divider" />
  </section>
</template>

<script setup lang="ts">
import BadgeRow from '@/components/logline/BadgeRow.vue'
import TerminalWindow from '@/components/logline/TerminalWindow.vue'
import LogEntryView from '@/components/logline/LogEntryView.vue'
import DiscordEmbedMock from '@/components/logline/DiscordEmbedMock.vue'
import DemoConsole from '@/components/logline/DemoConsole.vue'
import CodeBlock from '@/components/logline/CodeBlock.vue'
import { sampleEntries, discordSample } from '@/components/logline/sampleEntries'

const INSTALL_COMMAND = 'bun add @averyden/logline'

const SETUP_SNIPPET = `import { ConsoleTransport, createLogger } from '@averyden/logline'

const logger = createLogger({
  service: 'checkout-api',
  environment: 'production',
  transports: [new ConsoleTransport()],
})

logger.info('Checkout started', {
  tags: ['checkout'],
  metadata: { orderId: 'order-123' },
})`

const ERROR_SNIPPET = `try {
  await processCheckout()
} catch (error) {
  logger.error('Checkout failed', error, {
    metadata: { orderId: 'order-123' },
  })
}`

const DISCORD_SNIPPET = `import { DiscordTransport } from '@averyden/logline'

const logger = createLogger({
  transports: [
    new DiscordTransport({
      webhookUrl: process.env.DISCORD_WEBHOOK_URL!,
    }),
  ],
})`
</script>

<style scoped>
.tagline {
  margin-bottom: 5px;
}

.sectionTitle {
  margin-top: 5px;
  margin-bottom: 5px;
}

.divider {
  color: #41ff41;
  margin: 10px 0;
}

.bestViewed {
  color: #919191;
  font-size: 0.7rem;
  font-style: italic;
}

.requirements,
.npmLink {
  color: #00ffc8;
  font-size: 0.75rem;
}
</style>
