import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue')
  },
  {
    path: '/todo-list',
    name: 'TodoList',
    component: () => import('@/views/TodoList.vue')
  },
  {
    path: '/counter',
    name: 'Counter',
    component: () => import('@/views/Counter.vue')
  },
  {
    path: '/save-links',
    name: 'SaveLinks',
    component: () => import('@/views/SaveLinks.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
