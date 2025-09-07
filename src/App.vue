<template>
  <canvas ref="canvas" class="starfield"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number

const stars: Star[] = []

class Star {
  x: number
  y: number
  size: number
  speed: number
  direction: number

  color: string

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height

    this.size = Math.random() * 1.5 + 0.5
    this.speed = Math.random() * 0.3

    this.direction = Math.random() * Math.PI * 2

    this.color = this.assignColor(['Pink', 'Purple', 'White'])
  }

  assignColor(colors: string[]): string {
    const choice = colors[Math.floor(Math.random() * colors.length)]
    switch (choice) {
      case 'pink':
        return 'rgb(255, 150, 200)'
      case 'purple':
        return 'rgb(194, 110, 194)'
      default:
        return 'rgb(255,255,255)'
    }
  }

  update(width: number, height: number) {
    this.x += Math.cos(this.direction) * this.speed
    this.y += Math.sin(this.direction) * this.speed

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = Math.random() * width
      this.y = Math.random() * height
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

function animate(width: number, height: number) {
  if (!ctx || !canvas.value) return

  ctx.clearRect(0, 0, width, height)
  stars.forEach((star) => {
    star.update(width, height)
    star.draw(ctx!)
  })
}
// eslint-disable-next-line prefer-const
animationFrameId = requestAnimationFrame(() => animate(canvas.value!.width, canvas.value!.height))

onMounted(() => {
  if (!canvas.value) return

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx = canvas.value.getContext('2d')

  stars.length = 0
  for (let i = 0; i < 350; i++) {
    stars.push(new Star(canvas.value.width, canvas.value.height))
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.starfield {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  pointer-events: none;
  z-index: -1;
}
</style>
