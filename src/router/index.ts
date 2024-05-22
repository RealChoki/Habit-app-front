import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EvaluateView from '@/views/EvaluateView.vue'
import YesNoView from '@/views/YesNoView.vue'
import NumericValueView from '@/views/NumericValueView.vue'
import TimerView from '@/views/TimerView.vue'
import FrequencyView from '../views/FrequencyView.vue'
import TimeFrame from '../views/TimeFrame.vue'
import DeleteHabitsView from '../views/DeleteHabitsView.vue'

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
      path: '/home/:date',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const today = new Date()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const formattedDate = `${today.getFullYear()}-${month}-${today.getDate()}`
        return { name: 'home', params: { date: formattedDate } }
      }
    },
    {
      path: '/evaluateview',
      name: 'EvaluateView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EvaluateView
    },
    {
      path: '/yesnoview',
      name: 'YesNoView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: YesNoView
    },
    {
      path: '/numericvalueview',
      name: 'NumericValueView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: NumericValueView
    },
    {
      path: '/timerview',
      name: 'TimerView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TimerView
    },
    {
      path: '/frequencyview',
      name: 'FrequencyView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FrequencyView
    },
    {
      path: '/timeframe',
      name: 'TimeFrame',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TimeFrame
    },
    {
      path: '/deletehabitsview',
      name: 'DeleteHabitsView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DeleteHabitsView
    }
  ]
})

export default router
