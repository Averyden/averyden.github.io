<template>
  <div class="subText">
    <img :src="project.icon" :alt="`${project.name} icon`" width="25" />
    <a :href="project.repo" target="_blank">[{{ project.name }}]</a> -
    <span v-html="project.description"></span>
  </div>

  <div class="subText">
    <img v-for="lang in project.langs" :key="lang" :src="`/languageIcons/${lang}.png`" :alt="`${lang} icon`" class="langIcon"/>
  </div>

  <div class="projectPreview">
    <img v-if="preview" :src="preview.src" />
    <p style="font-style: italic">{{ preview?.caption || '[no current previews to show]' }}</p>
  </div>

  <a v-if="project.demo" :href="project.demo" target="_blank" class="tryButton">
    [try it out here]
  </a>
  <hr class="divider" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Project {
  name: string
  description: string
  repo: string
  demo?: string
  icon: string
  langs: string[]
}

const props = defineProps<{ project: Project }>()

interface Preview {
  src: string
  caption: string
}

const previews: Record<string, Preview[]> = {
  Notesu: [
    { src: '/projectPreviews/notesu/addingNotes.gif', caption: 'creating notes in Notesu.' },
    {
      src: '/projectPreviews/notesu/configDeadline.gif',
      caption: 'configuring the deadline of a note in Notesu.',
    },
    {
      src: '/projectPreviews/notesu/configDelete.gif',
      caption: 'deleting a note in Notesu.',
    },
    { src: '/projectPreviews/notesu/noteEditing.gif', caption: 'editing a note in Notesu.' },
    { src: '/projectPreviews/notesu/notesuStill.png', caption: 'Notesu preview.' }, //? the one singular png :troll:
  ],

  Pasman: [
    {
      src: '/projectPreviews/pasman/pasManMainVault.png',
      caption: 'Pasman main password vault that is completely empty.',
    },
    {
      src: '/projectPreviews/pasman/pasManRegisterInvalidMail.png',
      caption: 'attempting to register an account in pasman, using an invalid email.',
    },
    {
      src: '/projectPreviews/pasman/pasmanEmailFormatDetection.gif',
      caption: 'demonstration of code being able to recognize a valid email format in pasman.',
    },
    {
      src: '/projectPreviews/pasman/pasManComputerLeaked.gif',
      caption: 'checking how many breaches a password has been involved with in Pasman.',
    },
    {
      src: '/projectPreviews/pasman/pasManAccountDeletion.gif',
      caption: 'deleting an account in Pasman.',
    },
  ],

  LazGamba: [
    {
      src: '/projectPreviews/lazGamba/losing.gif',
      caption: 'not hitting the jackpot in LazGamba.',
    },
    {
      src: '/projectPreviews/lazGamba/winning.gif',
      caption: 'hitting the jackpot in LazGamba.',
    },
  ],

  Acto: [
    {
      src: '/projectPreviews/acto/actionDelete.gif',
      caption: 'Deleting an existing action in Acto.',
    },
    {
      src: '/projectPreviews/acto/completeAction.gif',
      caption: 'Marking an action as complete in Acto.',
    },
    {
      src: '/projectPreviews/acto/createAction.gif',
      caption: 'Creating an action in Acto.',
    },
  ],

  MetaTune: [
    {
      src: '/projectPreviews/metatune/metaDark.png',
      caption: 'MetaTune with dark mode turned on.',
    },
    { src: '/projectPreviews/metatune/metaLight.png', caption: 'MetaTune preview.' },
    {
      src: '/projectPreviews/metatune/metaToggle.gif',
      caption: 'Toggling dark mode in MetaTune',
    }, // That moment when youre entire selling point isnt actually the functionality, but rather the fucking dark mode... idk what else to showcase lmao its pretty basic
    {
      src: '/projectPreviews/metatune/metaUsage.gif',
      caption: 'Uploading an audio file into MetaTune, and editing its connected meta data.',
    },
  ],
}

const preview = ref<Preview | null>(null)

onMounted(() => {
  const projectPreviews = previews[props.project.name]
  if (projectPreviews?.length) {
    preview.value = projectPreviews[Math.floor(Math.random() * projectPreviews.length)]
  }
})
</script>

<style scoped>
.langIcon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.divider {
  color: #438600;
  margin: 10px auto;
  width: 20%;
}
</style>
