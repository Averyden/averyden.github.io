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
  opacity: number
  opacitySpeed: number

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.size = Math.random() * 1.5 + 0.5
    this.speed = Math.random() * 0.3
    this.direction = Math.random() * Math.PI * 2
    this.color = this.assignColor(['pink', 'purple', 'white'])
    this.opacity = Math.random()
    this.opacitySpeed = (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1)
  }

  assignColor(colors: string[]): string {
    const choice = colors[Math.floor(Math.random() * colors.length)]
    switch (choice) {
      case 'pink':
        return '255, 150, 200'
      case 'purple':
        return '194, 110, 194'
      default:
        return '255, 255, 255'
    }
  }

  update(width: number, height: number) {
    this.x += Math.cos(this.direction) * this.speed
    this.y += Math.sin(this.direction) * this.speed

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = Math.random() * width
      this.y = Math.random() * height
    }

    this.opacity += this.opacitySpeed
    if (this.opacity <= 0 || this.opacity >= 1) {
      this.opacitySpeed *= -1
      this.opacity = Math.max(0, Math.min(1, this.opacity))
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
    ctx.fill()
  }
}

function animate() {
  if (!ctx || !canvas.value) return

  const { width, height } = canvas.value
  ctx.clearRect(0, 0, width, height)

  stars.forEach((star) => {
    star.update(width, height)
    star.draw(ctx!)
  })

  animationFrameId = requestAnimationFrame(animate)
}

function setupStars(width: number, height: number, count = 350) {
  stars.length = 0
  for (let i = 0; i < count; i++) {
    stars.push(new Star(width, height))
  }
}

onMounted(() => {
  if (!canvas.value) return

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx = canvas.value.getContext('2d')

  setupStars(canvas.value.width, canvas.value.height)

  animate()

  window.addEventListener('resize', () => {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    setupStars(canvas.value.width, canvas.value.height)
  })
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
