import { createRouter, createWebHistory } from 'vue-router'
import ProjectList from '@/components/ProjectList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ProjectList,
    },
    {
      path: '/logline',
      component: () => import('@/components/LoglineView.vue'),
    },
  ],
})

export default router
