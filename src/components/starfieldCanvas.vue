<template>
  <canvas ref="canvas" class="starfield"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number

const stars: Star[] = []
const shootingStars: ShootingStar[] = []

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
    this.opacitySpeed = (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1)
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

class ShootingStar {
  x: number = 0
  y: number = 0
  length: number = 0
  speed: number = 0
  angle: number = 0
  opacity: number = 0
  color: string = '255, 255, 255'
  active: boolean = false

  constructor(width: number, height: number) {
    this.reset(width, height)
  }

  reset(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height * 0.5
    this.length = Math.random() * 80 + 50
    this.speed = Math.random() * 8 + 5

    const minAngle = (20 * Math.PI) / 180
    const maxAngle = (70 * Math.PI) / 180
    this.angle = Math.random() * (maxAngle - minAngle)

    const colors = ['230, 232, 199', '150, 200, 255', '255, 200, 200', '200, 255, 200']
    this.color = colors[Math.floor(Math.random() * colors.length)]!

    this.opacity = 1
    this.active = true
  }
  update(width: number, height: number) {
    if (!this.active) return

    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed
    this.opacity -= 0.02

    if (this.x > width || this.y > height || this.opacity <= 0) {
      this.active = false
      setTimeout(() => this.reset(width, height), Math.random() * 5000 + 3000)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return
    const xEnd = this.x - Math.cos(this.angle) * this.length
    const yEnd = this.y - Math.sin(this.angle) * this.length

    ctx.strokeStyle = `rgba(${this.color},${this.opacity})`
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(xEnd, yEnd)
    ctx.stroke()
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

  shootingStars.forEach((shootingStar) => {
    shootingStar.update(width, height)
    shootingStar.draw(ctx!)
  })

  animationFrameId = requestAnimationFrame(animate)
}

function setup(width: number, height: number) {
  stars.length = 0
  shootingStars.length = 0

  for (let i = 0; i < 350; i++) {
    stars.push(new Star(width, height))
  }

  for (let i = 0; i < 2; i++) {
    shootingStars.push(new ShootingStar(width, height))
  }
}

onMounted(() => {
  if (!canvas.value) return

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx = canvas.value.getContext('2d')

  setup(canvas.value.width, canvas.value.height)
  animate()

  window.addEventListener('resize', () => {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    setup(canvas.value.width, canvas.value.height)
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
