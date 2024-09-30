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
      path: '/homeview/:date',
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
      path: '/evaluateview',
      name: 'EvaluateView',
      component: EvaluateView
    },
    {
      path: '/yesnoview',
      name: 'YesNoView',
      component: YesNoView
    },
    {
      path: '/numericvalueview',
      name: 'NumericValueView',
      component: NumericValueView
    },
    {
      path: '/timerview',
      name: 'TimerView',
      component: TimerView
    },
    {
      path: '/frequencyview',
      name: 'FrequencyView',
      component: FrequencyView
    },
    {
      path: '/timeframe',
      name: 'TimeFrame',
      component: TimeFrame
    },
    {
      path: '/deletehabitsview/:date',
      name: 'DeleteHabitsView',
      component: DeleteHabitsView,
      props: true // Ensure props are passed
    }
  ]
})

export default router