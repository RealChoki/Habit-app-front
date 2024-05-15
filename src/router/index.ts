import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EvaluateView from '@/views/EvaluateView.vue'
import YesNoView from '@/views/YesNoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const today = new Date()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const formattedDate = `${today.getFullYear()}-${month}-${today.getDate()}`
        return { name: 'home', params: { date: formattedDate } }
      }
    },
    {
      path: '/home/:date?',
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
