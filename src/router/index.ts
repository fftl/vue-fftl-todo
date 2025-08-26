import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Index from '@/views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
    },
  ],
})

export default router
