import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EvaluateView from '@/views/EvaluateView.vue'
import YesNoView from '@/views/YesNoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/EvaluateView',
      name: 'EvaluateView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EvaluateView.vue')
    },
    {
      path: '/YesNoView',
      name: 'YesNoView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/YesNoView.vue')
    },
    {
      path: '/NumericValueView',
      name: 'NumericValueView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NumericValueView.vue')
    },
    {
      path: '/TimerView',
      name: 'TimerView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TimerView.vue')
    }
  ]
})

export default router
