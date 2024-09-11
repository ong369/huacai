import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Screen',
    component: () => import('@/pages/screen/Screen.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/pages/screen/Screen.vue')
  }
]



const router = createRouter({
 /*  history: createWebHistory(
    import.meta.env.VITE_PUBLIC_PATH
  ), */
  
  history: createWebHashHistory(),
  routes
})

export default router
