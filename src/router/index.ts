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
        return { name: 'HomeView', params: { date: formattedDate } }
      }
    },
    {
      path: '/home/:date',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const today = new Date()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const formattedDate = `${today.getFullYear()}-${month}-${today.getDate()}`
        return { name: 'HomeView', params: { date: formattedDate } }
      }
    },
    {
      path: '/evaluate',
      name: 'EvaluateView',
      component: EvaluateView
    },
    {
      path: '/yesno',
      name: 'YesNoView',
      component: YesNoView
    },
    {
      path: '/numericvalue',
      name: 'NumericValueView',
      component: NumericValueView
    },
    {
      path: '/timer',
      name: 'TimerView',
      component: TimerView
    },
    {
      path: '/frequency',
      name: 'FrequencyView',
      component: FrequencyView
    },
    {
      path: '/timeframe',
      name: 'TimeFrame',
      component: TimeFrame
    },
    {
      path: '/deletehabits',
      name: 'DeleteHabitsView',
      component: DeleteHabitsView,
    }
  ]
})

export default router